from flask_socketio import SocketIO, send, emit, join_room, leave_room
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://fiscord-project.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages

@socketio.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    print("HIHIHIHHIHIHIHIH")
    emit('open_room', {'room': room}, broadcast=True)

@socketio.on('leave_room')
def on_leave(data):
    room = data['room']
    leave_room(room)
    # emit('open_room', {'room': room}, broadcast=True)

@socketio.on("message")
def on_chat_sent(data):
    print(data, "adashnujhfuiohuijwnhfdiuwenhfduiwenfiuowendfeiuwodnuweiodfnewaiundfewaq@!#@!#@$!$!@#@$$!#$!#@$#$")
    emit('message', data['message'], to=data['room'])
