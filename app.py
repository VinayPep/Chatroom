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
    print("-"*10)
    print("pm", data)
    print("-"*10)
    username = data['username']
    room = data['socket_id']
    join_room(room)
    emit('recieve_private_message_req', username + ' has entered the room.', to=room)
# socket.emit('send_private_message_req', {"username":"{{ data }}", "socket_id":"FW72lNwnhAnuWH90AAAD"})

@socketio.on("send_private_message", namespace='/personal')
def private_message(data):
    """
    data format
    {
        from_username:""
        message:""
        to_username:""
        socket_id:""
    }
    """
    print("-"*10)
    print("pm", data)
    print("-"*10)
    msg_data = {
        "from_username": data['from_username'],
        "from_socket_id" :request.sid,
        "msg": data["message"],
        "to_username":data['to_username'],
        "to_socket_id":data['socket_id'],
    }
    room = data['socket_id']
    emit('recieve_private_message', msg_data, to=room)
# socket.emit('send_private_message', {"from_username":"", "message":"", "to_username":"", "socket_id":"FW72lNwnhAnuWH90AAAD"})


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