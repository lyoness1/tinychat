# tinychat backend developer spec.


The client is running an instance of SocketIO for frequency, open, bi-directional communication with the server through events. 


## ROUTES

- "/" - GET

    USER opens landing page, index.html. CLIENT prompts user for name. 


- "/chat" - POST

    Case 1: USER submits name as a valid (at least one letter) string as form data with the tag name="name". SERVER routes user to /chat.html, passing: `{'name': <string>}` to CLIENT`

    Case 2: USER doesn't submit name and SERVER reloads landing page.


## EVENTS

- CLIENT calls 'joined' event on server, passing no data. SERVER emits 'status' event to client. SERVER passes `{'msg': name + ' has entered the room.'}` to client. The 'broadcast' option for the socketio instance should be set to 'true'. 


- CLIENT calls 'left' event on server, passing no data. SERVER emits 'status' event to client. SERVER passes `{'msg': name + ' has left the room.'}`. The 'broadcast' option for the socketio instance should be set to 'true'. 


- CLIENT calls 'text' event on server, passing `{'user': user, 'msg': text}` to server. SERVER emits 'message' event to client, passing `{"msg": msg, "name": name, "stamp": stamp}`. The property "msg" is a string, the body of the message, the property "name" is a string of the user's name, and "stamp" is a string representing the current time. The property value of "stamp" should be pre-formatted as "HH:MM AM/PM, Day". The 'broadcast' option for the socketio instance should be set to 'true'. 