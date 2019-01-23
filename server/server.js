const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');


socket.emit('newMessage', generateMessage('Sam', 'Welcome da suthu'));

socket.broadcast.emit('newMessage', generateMessage('Sam', 'Puthusa oruthe vanthurka'))

socket.on('createMessage', (newMessage) => {
    console.log('Biju unaku message', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

//broadcast will not allow to send the message to the sender himself
    // socket.broadcast.emit('newMessage', {
    //         from: newMessage.from,
    //         text: newMessage.text,
    //         createdAt: new Date().getTime()
    //     });
});

    socket.on('disconnect', ()=> {
        console.log('User is disconnected');
    })
});

server.listen(port, () => {
    console.log(`${port} port la start airchu`);
});
