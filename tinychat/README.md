# README


Hello! Welcome to tinychat. 


This is a simple, one page chat application. It uses FlaskIO and Flask to run the server and backend socket connection, and SocketIO on the frontend for the client socket connection. 


Any number of users can enter the chat room. Each user can enter their name of choice before entering the room. Each person can see their own chats right-aligned and in green, and all others' chat messages left-aligned in blue. Each message contains a timestamp of the time and day the message was created. Each time a new user enters the room, or an existing user exits the room, a status message is broadcast to the entire room. A user can leave the room at any time by clicking on the logo or the link to exit the room. 

The app should work in all modern browsers. 


## What files live where

.


+-- node_modules/


+-- static/


  |   +-- app.js


  |   +-- style.css


+-- templates


  |   +-- index.html


  |   +-- chat.html


+-- frontend_design_spec.md


+-- backend_design_spec.md


+-- README.md


+-- requirements.txt


+-- server.py



* `env/` contains libraries used.
* `node_modules/` contains frameworks for socket.io.
* `app.js` is the main javascript file.
* `style.css` is the main css file.
* `index.html` is the landing page. 
* `chat.html` is the page with the chat box
* `frontend_design_spec.md` has a copy of the information/requirements for this
  exercise.
* `backend_design_spec.md` contains the spec for what the FE developer might write to the
  backend developer. 
* `server.py` runs the app. 


## Running the App

1. Clone this repository into it's own directory. Change directory into this root folder, tinychat/. 

2. Type the following lines of code in the terminal: 

```
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
$ python server.py
```

3. Navigate to `http://127.0.0.1:5000/` in your browser of choice, enter your name, and start chatting! 


NOTE: Because the app is not hosted online, in order to have multiple users engaged simultaneously in the chat, multiple tabs/windows/browsers may be used. 


## Version 2.0

I chose to omit previous messages from the view of incoming new members. All messages submitted and received are rendered dynamically in the DOM and will be lost upon leaving the room. In a future version, I would create a database to store old message by user. Users could login with a unique name and id (email) where they could have access to old message that would load when the chat page was rendered. 

I would add a side bar indicating all of the members currently in the chat room. 

I would allow users to chose an avitar on the homepage where they enter their name. This avitar would be displayed next to their sent messages, and others' avitars would be displayed next to their. 

I would add skins from which the user could chose by linking multiple css files. 


