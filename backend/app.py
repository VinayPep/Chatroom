from os import uname
from datetime import datetime, timedelta
import hashlib, jwt, werkzeug
import re
from flask import Flask, app, request,jsonify,make_response
from flask.templating import render_template, render_template_string
from models import *
from models import Userdata
import hashlib
from functools import wraps
import json

from flask_socketio import SocketIO, send,emit

# app = Flask(__name__)
db.create_all()
db.session.commit()


app.config['SECRET_KEY'] = 'keyissecured12123'
# app.config['SECRET_KEY'] = 'mysecret'


# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if request.headers.get('Authorization'):
            token = request.headers['Authorization']
        # token = request.args.get('token') 
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            print(token)
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
            print(data)
            current_user = data['user']

        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated


@app.route('/loginsuccess', methods=["POST"])
def loginsucess():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        #hashing the input and comparing the hash
        hashedPassword = hashlib.md5(bytes(str(password),encoding='utf-8'))
        hashedPassword = hashedPassword.hexdigest()
        result = db.session.query(Userdata).filter(Userdata.email==email, Userdata.password==hashedPassword)
        for row in result:
            if (len(row.email)!=0):
                print(row.email)
                token = jwt.encode({'user':row.email, 'exp': datetime.utcnow()+timedelta(minutes=15)}, app.config['SECRET_KEY'])
                print("Token ",token)
                return make_response(jsonify({'token' : token,'user':row.name}), 201)
    return make_response('could not verify', 401, {'WWW-Authenticate':'Basic="Login Required"'})
    


@app.route('/registrationsuccess', methods=["POST"])
def registration():

    if request.method == "POST":
        data = request.get_json()
        # print(data)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        hashedPassword = hashlib.md5(bytes(str(password),encoding='utf-8'))
        hashedPassword = hashedPassword.hexdigest()
        entry = Userdata(name = name,email = email,password = hashedPassword)
        db.session.add(entry)
        db.session.commit()
        return jsonify(data)

@app.route('/user',methods=["GET"])
@token_required
def dashboard(current_user):
    return jsonify([
    {'id': user.id, 'name': user.name, 'email': user.email}
    for user in Userdata.query.all()
  ])
    # return make_response(jsonify({'data' : result}), 201)

socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
users={}

@socketio.on('message', namespace='/group')
def handleMessage(msg, methods=['GET', 'POST']):
    print(msg)
    send(msg,broadcast=True)

@socketio.on('username', namespace='/private')
def receive_username(username):
    users[username] = request.sid
    #users.append({username : request.sid})
    #print(users)
    print('Username added!')

@socketio.on('private_message', namespace='/private')
def private_message(payload):
    recipient_session_id = users[payload['username']]
    message = payload['message']

    emit('new_private_message', message, room=recipient_session_id)



if __name__ == "__main__":
    app.run(debug=True)
    socketio.run(app)
