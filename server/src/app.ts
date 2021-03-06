process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import * as http from 'http'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {connect, set} from 'mongoose';
import {Routes} from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import {logger, stream} from '@utils/logger';
import "reflect-metadata";
import {createConnections} from "typeorm";
const socketIoInit = require('socket.io')
import Handler from './eventHandlers/eventHandlers'
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    // this.connectToDatabase();
    // this.connectOrmDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    const server = http.createServer(this.app)
    server.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });

    let io = socketIoInit(server, {
      // enable cors
      allowEIO3: true,
      cors: {
        origin: '*',
        credentials: true
      }
    })
    let handler = new Handler()
    handler.handleSocket(io)
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    // if (this.env !== 'production') {
    //   set('debug', true);
    // }
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;
    const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
    if (!MONGO_PASSWORD) {
      connect(`mongodb://${MONGO_PATH}/${MONGO_DATABASE}`, { ...options });
    } else {
      connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}/${MONGO_DATABASE}?authSource=admin`, { ...options });
    }

  }

  private async connectOrmDatabase() {
    try {
      let linkEntity = "src/entity/*.{ts,js}"
      if (process.env.NODE_ENV === 'production') {
        linkEntity = "dist/entity/*.{ts,js}"
      }
      await createConnections([{
        name: "default",
        type: "mysql",
        host: process.env.WIKI_HOST,
        port: Number(process.env.WIKI_PORT),
        username: process.env.WIKI_USER,
        password: process.env.WIKI_PASSWORD,
        database: process.env.WIKI_DB,
        "entities": [
          linkEntity
        ],
      }]);
      logger.info(`=================================`);
      logger.info(`======= Connected Mysql =======`);
      logger.info(`=================================`);
    } catch (e) {
      logger.info(`=================================`);
      logger.info(`=======Error Mysql ${e.message}=======`);
      logger.info(`=================================`);
    }

  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/v1/', route.router);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
