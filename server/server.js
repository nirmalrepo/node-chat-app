const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            //runs the err callback because function has a parameter with the callback function
            callback('Name and room name are requires');
        }else {
            //join the group
            socket.join(params.room);

            //io.emit - to all io.to('The office Fans').emit-to all the people in that room
            //socket.broadcast.emit - to all except current socket.broadcast.to('The office Fans).emit
            //socket.emit - specifically to one user

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
            callback();
        }
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});