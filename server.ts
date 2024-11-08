import { WebSocketServer, WebSocket } from 'ws';
const http = require('http');

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
const expressServer = server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
const ws = new WebSocketServer({noServer : true});

function onSocketPreError(e : Error){
    console.log(e)
}

function onSocketPostError(e : Error){
  console.log(e)

}

expressServer.on('upgrade' ,  (req , socket , head) => {
    socket.on('error' , onSocketPreError);
    if(!!req.headers['BadAuth']){
        socket.write('HTTP/1.1 401 Authorised\r\n\r\n')
        socket.destroy();
    }
    ws.handleUpgrade(req , socket , (websocket)=> {
        socket.removeListener('error' , onSocketPreError);
        ws.emit('connection' ,  websocket , req)
    })
})

ws.on('connection' , (websocket , req)=> {
  websocket.on('error' , onSocketPostError);
  ws.on('message' , (msg , isBinary)=> {
    ws.clients.forEach(client => {
         if(client.readyState === WebSocket.OPEN){
          client.send(msg , {binary : isBinary})
         }

    });
  })
  ws.close('close' , ()=> {
    console.log('Connection is closed')
  })
})

