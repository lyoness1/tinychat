# tinychat backend developer spec.


The client is running an instance of SocketIO for frequency, open, bi-directional communication with the server. 


## ROUTES
------

- "/"

    USER opens landing page, index.html. CLIENT prompts user for name. 


- "/chat"

    Case 1: USER submits name as a valid (at least one letter) string as form data with the tag <name="name">. SERVER routes user to /chat.html, passing: `{'name': <string>}`

    Case 2: USER doesn't submit name and SERVER reloads landing page.


## EVENTS
------

- CLIENT calls 'joined' event, passing no data. SERVER emits 'status' event. Server passes `{'msg': name + ' has entered the room.'}`. The 'broadcast' option for the socketio instance should be set to 'true'. 


- CLIENT calls 'left' event, passing no data. SERVER emits 'status' event. Server passes `{'msg': name + ' has left the room.'}`. The 'broadcast' option for the socketio instance should be set to 'true'. 


- CLIENT calls 'text' event, passing `{'user': user, 'msg': text}` to SERVER. SERVER emits 'message' event, passing `{"msg": msg, "name": name, "stamp": stamp}`. The "msg" is the body of the message, "name" is the user's name, and "stamp" is a string representing the current time. "stamp" should be pre-formatted as "HH:MM AM/PM, Day". The 'broadcast' option for the socketio instance should be set to 'true'. 