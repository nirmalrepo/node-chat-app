/**
 * Created by nirmal on 5/11/17.
 */
const path= require('path');
const http= require('http');
const express=require('express');
const scoketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const publicPath= path.join(__dirname,'../public');
//heroku port confgurations
const port=process.env.PORT || 3000;
var app=express();

//now we use http server instead express
var server=http.createServer(app);

//web socket server
var io=scoketIO(server);


//middleware
app.use(express.static(publicPath));

//event handlers
io.on('connection',(socket)=>{
    console.log('New user connected');

    //from server to client
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));



    //from client to server

    socket.on('createLocationMessage',(coords)=>{
        console.log('User was disconnected');
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server'); //is the acknowledgement
        //fire to everybody but me
        // socket.broadcast.emit('newMessage',{
        //         from:message.from,
        //         text:message.text,
        //         createdAt:new Date().getTime()
        //     }
        // );
    });
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
    });
});

server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
