process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/v1/auth.route';
import IndexRoute from '@routes/v1/index.route';
import UsersRoute from '@routes/v1/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();
const listRoutes = [new IndexRoute(), new UsersRoute(), new AuthRoute()]
const app = new App(listRoutes);

app.listen();
