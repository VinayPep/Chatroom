from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#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 Github Token

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password@localhost/chatroom"

db = SQLAlchemy(app) 
class Userdata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uname = db.Column(db.String(100),unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(250), unique = False, nullable=False)

#  {% comment %} <button><a href="room">Search It :) <a></button> {% endcomment %}

    