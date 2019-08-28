const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080});

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
