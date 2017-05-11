/**
 * Created by nirmal on 5/11/17.
 */

//create the connection
var socket =io();
socket.on('connect',function(){
    console.log('Connected to server')
});

socket.on('disconnect',function(){
    console.log('Disconnected from server')
});

//newEmail is a custom event from server
socket.on('newMessage',function(message){
    console.log('newMessage',message);
});

//to server

socket.emit('createMessage',{
    from:'Nirmal',
    text:'Yup, that works for me',
});



