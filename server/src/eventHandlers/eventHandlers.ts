import {Server} from 'socket.io'
import {AppData, Socket} from './SocketTypes'
import IndexService from './../services/index.service'
// --------------------------------------
// -------- SOCKET.IO handlers ----------
// --------------------------------------

const app: AppData = {
  allSockets: []
}
// structure inspired by
// https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
class Handler {
  public io;
  public handleSocket(io: Server): void {
    // Chatroom
    this.io = io
    this.io.on('connection', (socket: Socket<any, any>) => {
      // app.allSockets.push(socket)
      // console.log(socket.id, 'id socket')
      // socket.on('disconnect', function () {
      //   let index = app.allSockets.findIndex(item => item.id === socket.id);
      //   if (index > -1) {
      //     app.allSockets.slice(index, 1)
      //   }
      //   console.log("Socket disconected")
      // });

    })
    this.getDataSellInterval()
  }

  public getDataSellInterval(): void {
    setInterval(async () => {
      let dataSell = await IndexService.getDataOrder()
      if (dataSell && this.io && this.io.sockets) {
      this.io.sockets.emit('get-data-sell', JSON.stringify(dataSell))
      }
    }, 30 * 1000);
  }
}

export default Handler
