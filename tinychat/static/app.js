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
        socket.emit('left', {})
        socket.disconnect();
    });

    // Call joined event on server when the connection to socket is made
    socket.on('connect', function() {
        socket.emit('joined', {});
    });

    // Creates a status html element block
    function createStatus (data) {
        var $update = $("<div></div>", {"class": "col-xs-12"});
        var $status = $("<p></p>", {"class": "status"}).html(data.msg);
        $update.append($status);
        return $update;
    };

    // Broadcasts status message to room when user joins or exits
    socket.on('status', function (data) {
        var $update = createStatus(data);
        $('#main-chat').prepend($update);
    });

    // Broadcasts message to room 
    socket.on('message', function (data) {
        console.log(data)
        var $chatRow = $("<div></div>", {"class": "row"});

        var $chatHeader = $("<div></div>", {"class": "col-xs-12"});
        var $chatHeaderName = $("<h5></h5>").html(data.name);
        var $chatHeaderStamp = $("<h6></h6>").html(data.stamp);
        $chatHeader.append($chatHeaderName);
        $chatHeader.append($chatHeaderStamp);

        var $chatMessage = $("<div></div>", {"class": "col-xs-8"});
        var $message = $("<p></p>").html(data.msg);
        $chatMessage.append($message);

        $chatRow.append($chatHeader);
        $chatRow.append($chatMessage)

        $('#main-chat').prepend($chatRow);
    });

    // Grabs text from message box, empties the box, calls text event on server
    function getMessage() {
        text = $('#message-input').val();
        $('#message-input').val('');
        socket.emit('text', {'msg': text});
    };

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