const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users=new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            //runs the err callback because function has a parameter with the callback function
            return callback('Name and room name are requires');
        }else {
            //join the group
            socket.join(params.room);
            //First remove the user if existing room and then add to the new room
            users.removeUser(socket.id);
            users.addUser(socket.id,params.name,params.room);

            //io.emit - to all io.to('The office Fans').emit-to all the people in that room
            //socket.broadcast.emit - to all except current socket.broadcast.to('The office Fans).emit
            //socket.emit - specifically to one user

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
            callback();
        }
    });

    socket.on('createMessage', (message, callback) => {
        console.log(socket.id);
        var user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
            //only for perticular room
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user=users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        //we remove user on disconnecting the app
        var user=users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));

        }
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});