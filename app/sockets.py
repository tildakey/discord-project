from flask_socketio import SocketIO, send
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages

@socketio.on("message")
def on_chat_sent(data):
    send({'message': data['message']}, room=data['room'], broadcase=True)
