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

socket.on('newLocationMessage',function(message){
    console.log('newMessage',message);
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User', text:jQuery('[name=message]').val(),
    },function (data) {
        //acknowledgment- we have to use in listener and emitter
        console.log(data)
    });
});

var locationButton=jQuery('#send-location');

locationButton.on('click',function () {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    //get client coordinates
    navigator.geolocation.getCurrentPosition(function (posistion) {
        socket.emit('createLocationMessage',{
            latitude:posistion.coords.latitude,
            longitude:posistion.coords.longitude
        });
    },function () {
        alert('Unable to fetch the location');

    });
});

