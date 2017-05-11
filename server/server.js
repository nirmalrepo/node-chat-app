/**
 * Created by nirmal on 5/11/17.
 */
const path= require('path');
const http= require('http');
const express=require('express');
const scoketIO=require('socket.io');

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
//We wont use io other than connection
io.on('connection',(socket)=>{
    console.log('New user connected');

    //from server to client
    socket.emit('newMessage',{
        from:'John',
        text:'See you then',
        createdAt:123,
    });

    //from client to server

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message)
    });
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
    });
});

server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
