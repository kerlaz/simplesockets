const WebSocketServer = require("ws").Server;
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

const server = http.createServer(app);
server.listen(port);

console.log(`server listening on ${port}`);

const wss = new WebSocketServer({ server: server});

console.log('websocket server created');

let uid = 0;
wss.on('connection', ws => {
    ws.id = 'user'+uid;
    uid++;
    console.log(`User #${uid} connected`);
    ws.send(JSON.stringify({
        text: `User #${uid} connected`,
        type: 'system'
    }));
    ws.on('message', message => {

        wss.clients.forEach(client => {
            if(ws.id !== client.id) {
                client.send(message);
                console.log(`Message from User #${ws.id} is sent`)
            }
        })
    })
});
