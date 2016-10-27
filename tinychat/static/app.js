/* Stub JS file for your tinychat app! */

// $(document).ready(function(){
//     // Stub AJAX call that demos getting the fixture data
//     $.getJSON('/fixtures/fakedata.json', function(data) {
//         console.log("success");
//         console.log(data);
//     }).done(function() {
//         console.log("another success message");
//     }).fail(function() {
//         console.error("error");
//     }).always(function() {
//         console.info("complete");
//     });
// });

var socket;

$(document).ready(function(){

    // Open socket connection in chat page
    socket = io.connect('http://' + document.domain + ':' + location.port + '/chat');

    // Trigger leave event before disconnecting socket upon window unload
    $(window).bind("beforeunload", function() {
        console.log("beforeunload triggered");
        socket.emit('left', {})
        socket.disconnect();
    });

    // Call joined event on server when the connection to socket is made
    socket.on('connect', function() {
        console.log("socket connected, joined event triggered");
        socket.emit('joined', {});
    });

    // Broadcasts status message to room when user joins or exits
    socket.on('status', function (data) {
        $('#main-chat').prepend('<br>' + data.msg);
    });

    // Broadcasts message to room 
    socket.on('message', function (data) {
        $('#main-chat').prepend('<br>' + data.msg);
    });

    // Grabs text from message box, empties the box, calls text event on server
    function getMessage() {
        text = $('#message-input').val();
        $('#message-input').val('');
        console.log("text event triggered");
        socket.emit('text', {msg: text});
    }

    // Called getMessage on enter keyup
    $("#message-input").keyup(function (evt) {
        if(evt.keyCode == 13){
            getMessage();
        }
    });

    // Calls getMessage() on send button click
    $("#send").click(function (e) {
        getMessage();
    });

});