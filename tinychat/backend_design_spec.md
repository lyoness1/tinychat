# tinychat backend developer spec.


The client is running an instance of SocketIO for frequency, open, bi-directional communication with the server. 


## ROUTES
------

- "/"
    USER opens landing page, index.html. CLIENT prompts user for name. 
    

- "/chat"

    Case 1: USER submits name as a valid (at least one letter) string.
            SERVER routes user to /chat.html, passing: `{'name': <string>}`

    Case 2: User doesn't submit name and landing page reloads.


## EVENTS
------

- CLIENT calls 'joined' event, passing no data. SERVER emits 'status' event. 