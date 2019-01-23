const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Biju',
        text: 'Nantha da server pesre',
        createdAt: 1234
    });

socket.on('createMessage', (newMessage) => {
    console.log('Biju unaku message', newMessage);
});

    socket.on('disconnect', ()=> {
        console.log('User is disconnected');
    })
});

server.listen(port, () => {
    console.log(`${port} port la start airchu`);
});
