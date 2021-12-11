from os import uname
import re
from flask import Flask, app, request
from flask.templating import render_template
from models import *
from models import Userdata
import hashlib
from flask_socketio import SocketIO, send, emit, join_room, leave_room
g_name = ""
socketio = SocketIO(app, cors_allowed_origins='*')
users = dict()


# app = Flask(__name__)
# 
@app.route('/test')
def test():
    return render_template('index.html')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signin')
def login():
    return render_template('login.html')

@app.route('/signup')
def register():
    return render_template('register.html')


@app.route('/welcome', methods=["POST"])
def loginsucess():

    if request.method == "POST":
        uname = request.form.get('uname')
        password = request.form.get('psw')
        # print(uname)
        # print(password)
        global g_name
        g_name = uname
        # print(g_name)
        hashedPassword = hashlib.md5(bytes(str(password),encoding='utf-8'))
        hashedPassword = hashedPassword.hexdigest()
        result = db.session.query(Userdata).filter(Userdata.uname==uname, Userdata.password==hashedPassword)
        for row in result:
            if len(row.uname)!= 0:          # we got that email and password matching in our db
                return render_template('welcome.html',data = uname)

        data = "Wrong credentials"
        return render_template('login.html', data = data)
        



@app.route('/registrationsuccess', methods=["POST"])
def registration():

    if request.method == "POST":
        uname = request.form.get('uname')
        email = request.form.get('mail')
        password = request.form.get('psw')
        # print(uname)
        # print(email)
        # print(password)
        hashedPassword = hashlib.md5(bytes(str(password),encoding='utf-8'))
        hashedPassword = hashedPassword.hexdigest()
        entry = Userdata(uname = uname,email = email,password = hashedPassword)
        db.session.add(entry)
        db.session.commit()
        return render_template('login.html')

@app.route('/personal')
def searchpersonal():

    global g_name
    return render_template('personal.html',data = g_name)


@app.route('/group')
def searchall():
    dataset = Userdata.query.with_entities(Userdata.uname)
    answer =[]
    for data in dataset :
         answer.append(data.uname)
    global g_name
    return render_template('group.html',ans = answer)
    
    
@app.route('/room',methods =['GET','POST'])
def enterchat():
        
        user_name = request.form.get("search")
        result = db.session.query(Userdata).filter(Userdata.uname == user_name)
        print(result)
        for row in result:
            if(row.uname!=0):
                return render_template('chatroom.html')
    
        data = "No User Found Sorry :("
        return render_template('personal.html',invalid = data)



@socketio.on('message', namespace='/group')
def handleMessage(msg):
    # print(request.sid)
	send(msg, broadcast=True)
    
@socketio.on("send_private_message_req", namespace='/personal')
def private_message_req(data):
    """
    data format
    {
        username: "" # client who is sending
        socket_id: "" # another client where it wants to connect
    }
    """
    # print("-"*10)
    # print("pm req", data)
    # print("-"*10)
    username = data['username']

    users_keys = list(users.keys())
    room = users[users_keys[0]] if users[users_keys[0]] != data['socket_id'] else users[users_keys[1]]
    # print("room", room)
    # print("data['socket_id']", data['socket_id'])
    # print(users)
    # print("="*10)

    join_room(room)
    emit('recieve_private_message_req', username + ' has entered the room.', to=room)
# js query to run on console: - change the socket_id
# socket.emit('send_private_message_req', {"username":"user1", "socket_id":"FW72lNwnhAnuWH90AAAD"})

@socketio.on("send_private_message", namespace='/personal')
def private_message(data):
    """
    data format
    {
        from_username:""
        message:""
        to_username:""
        socket_id:"" # socket id of recepient
    }
    """
    # print("-"*10)
    # print("pm", data)
    # print("users", users)
    # print("-"*10)

    users_keys = list(users.keys())
    room = users[users_keys[0]] if users[users_keys[0]] != data['socket_id'] else users[users_keys[1]]
    
    msg_data = {
        "from_username": data['from_username'],
        "from_socket_id" :request.sid,
        "msg": data["message"],
        "to_username":data['to_username'],
        "to_socket_id":room,
    }

    emit('recieve_private_message', msg_data, to=room)
# js query to run on console: - change the socket_id and other fields
# socket.emit('send_private_message', {"from_username":"", "message":"", "to_username":"", "socket_id":"FW72lNwnhAnuWH90AAAD"})

@socketio.on("username_mapping", namespace='/personal')
def handle_username(username_mapping_data):
    print("-"*10)
    print("username_mapping", username_mapping_data)
    print("-"*10)
    users[username_mapping_data['username']] = username_mapping_data['socket_id']

@socketio.on('connect')
def connect():
    print("-"*10)
    print(f"SOCKET {request.sid} CONNECTED")
    print("-"*10)

@socketio.on('disconnect')
def disconnect():
    print("-"*10)
    print(f"SOCKET {request.sid} DISCONNECTED")
    print("-"*10)

if __name__ == "__main__":
    socketio.run(app)
  
    # app.run(debug=True, port=4005)
    



# ALTER TABLE users ADD COLUMN id SERIAL PRIMARY KEY 