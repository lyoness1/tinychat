from flask import Flask, render_template, redirect, request, session, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_debugtoolbar import DebugToolbarExtension

import datetime

# Initialize app
app = Flask(__name__)

# the toolbar is only enabled in debug mode:
app.debug = True

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = '<replace with a secret key>'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

# Create socket
socketio = SocketIO(app)


################################################################################
# ROUTES
# Render home page
@app.route('/')
def index():
    """"Landing login page to enter a name for access to the chat room."""

    return render_template("index.html")


# Render chat room
@app.route('/chat', methods=["POST"])
def chat():
    """Grabs name from landing page and enters chat room"""

    name = request.form.get('name')

    session['name'] = name

    if name == '':
        return redirect(url_for('.index'))

    return render_template('chat.html', name=name)


################################################################################
# Flask-SocketIO EVENTS
@socketio.on('joined', namespace='/chat')
def joined(message):
    """Sent by clients and broadcast to all people in the room upon enter."""
    
    name = session.get('name')

    # Receive msg from 'connect', creates response, and emits to 'status'
    emit('status', {'msg': name + ' has entered the room.'},  broadcast=True)


@socketio.on('text', namespace='/chat')
def text(message):
    """Sent by clients and broadcast to all people in the room upon message."""

    name = session.get('name')
    stamp = datetime.datetime.now().strftime('%-I:%M %p, %A')
    msg = message['msg']
    
    emit('message', {"msg": msg, "name": name, "stamp": stamp}, broadcast=True)


@socketio.on('left', namespace='/chat')
def left(message):
    """Sent by clients and broadcast to all people in the room upon exit."""

    name = session.get('name')

    # Emits broadcase of person leaving chat
    emit('status', {'msg': name + ' has left the room.'}, broadcast=True)


################################################################################
# Run app through socket

if __name__ == '__main__':
    socketio.run(app)
