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
    var li=jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

//to server

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi',
// },function (data) {
//     //acknowledgment- we have to use in listener and emitter
//     console.log(data)
// });


jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User', text:jQuery('[name=message]').val(),
    },function (data) {
        //acknowledgment- we have to use in listener and emitter
        console.log(data)
    });
});


