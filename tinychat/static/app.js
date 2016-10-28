var socket;
var user;

$(document).ready(function(){

    // SOCKET CONNECTION EVENTS
    // Open socket connection in chat page
    socket = io.connect('http://' + document.domain + ':' + location.port + '/chat');

    // Trigger 'left' event upon window unload before disconnecting socket 
    $(window).bind("beforeunload", function() {
        socket.emit('left', {})
        socket.disconnect();
    });

    // Trigger 'joined' event on server when the connection to socket is made
    socket.on('connect', function() {
        socket.emit('joined', {});
    });

    // STATUS UPDATES
    // Create a status html element block
    function createStatus (data) {
        var $update = $("<div></div>", {"class": "col-xs-12 update"});
        var $status = $("<p></p>", {"class": "status"}).html(data.msg);
        $update.append($status);
        return $update;
    };

    // Broadcasts status message to room when user joins or exits
    socket.on('status', function (data) {
        var $update = createStatus(data);
        $('#main-chat').prepend($update);
    });

    // MESSAGE SENDING
    // Grab text from input box, empty input box, call 'text' event on server
    function getMessage() {
        user = $('#user').data('user');
        text = $('#message-input').val();
        $('#message-input').val('');
        socket.emit('text', {'user': user, 'msg': text});
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

    // Create a chat html element block
    function createMessage (data) {
        var $chatRow = $("<div></div>", {"class": "row message-data"});
        var $chatHeader = $("<div></div>", {"class": "col-xs-12 message-data-header"});
        var $chatHeaderName = $("<h5></h5>").html(data.name);
        var $chatHeaderStamp = $("<h6></h6>").html(data.stamp);
        var $icon = $("<i></i>", {"class": "fa fa-circle"});
        if (data.name === user) {
            var $chatHeaderName = $("<h5></h5>").html(data.name + ' ');
            $chatHeaderName.append($icon);
            $chatHeaderName.addClass('mine');
            $chatHeaderStamp.addClass('mine');
        } else {
            var $chatHeaderName = $("<h5></h5>").html(' ' + data.name);
            $chatHeaderName.prepend($icon);
        }
        $chatHeader.append($chatHeaderName);
        $chatHeader.append($chatHeaderStamp);

        var $chatMessage = $("<div></div>", {"class": "col-xs-8 message-data-content"});
        if (data.name === user) {
            $chatMessage.addClass("my-message pull-right");
        }
        var $message = $("<p></p>").html(data.msg);
        $chatMessage.append($message);

        $chatRow.append($chatHeader);
        $chatRow.append($chatMessage);

        return $chatRow;
    };

    // Broadcasts message to room 
    socket.on('message', function (data) {
        console.log(data)
        $chatRow = createMessage(data);
        $('#main-chat').prepend($chatRow);
    });

});