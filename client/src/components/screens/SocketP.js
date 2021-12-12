import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";
import './chatbox.css'

let endPoint = "http://127.0.0.1:5000";
let socket = io.connect(`${endPoint}`);
var private_socket = io.connect('/private', { transports: ['polling'] })

const SocketG = () => {
  const [message, setMessage] = useState('');
  const [receipent, setReceipent] = useState('');
  const [messages, setMessages] = useState(["Enter online available Reciepent's username above and start chatting"]);
  var name = JSON.parse(localStorage.getItem('user'));
  private_socket.emit('username', name);

  useEffect(() => {
    private_socket.on('new_private_message', function (msg) {
      setMessages([...messages, msg])
    })
    return () => {
      private_socket.off('new_private_message');
    };
  }, []);



  const handleChangeM = (event) => {
    const { name, value } = event.target
    setMessage(value)
  }
  const handleChangeR = (event) => {
    const { name, value } = event.target
    setReceipent(value)
  }

  const Send = () => {
    if (message !== "") {
      setMessage("")
      var u = JSON.parse(localStorage.getItem('user'));
      private_socket.emit('private_message', { 'username': receipent, 'message': `${u}:${message}` });
      setMessages([...messages, `${u}:${message}`])
    } else {
      alert("Please Add A Message");

    }

  }

  return (
    // const { messages, message } = this.state;
    <div className="chatroom">
      <h3>ChatBox</h3>
      <div className="d-flex" id="receipent">
        <label>Reciepent</label>
        <input id="receipent" type="text" placeholder="Enter Reciepent's username" style={{ width: "100%" }} value={receipent} onChange={handleChangeR} />
      </div>
      <ul className="chats mats" id="chats" >
        {messages.length > 0 &&
          messages.map((msg) => (

            <li className={`chat ${JSON.parse(localStorage.getItem('user')) == msg.split(':')[0] ? "right" : "left"}`}>
              <b>{msg.split(':')[0].charAt(0).toUpperCase() + msg.split(':')[0].slice(1)}</b><br />
              <p>{msg.split(':')[1]}</p>
            </li>
          ))
        }
      </ul>
      <input type="text" value={message} name="message" placeholder="Enter Message" onChange={handleChangeM} />
      <button onClick={() => Send()}>Send Message</button>

    </div>
  )
};

export default SocketG;