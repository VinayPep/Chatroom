import React, { Component } from "react";
import io from "socket.io-client";
// import Message from "./Message";

let endPoint = "http://127.0.0.1:5000";
let socket = io.connect(`${endPoint}`);
socket = io.connect('/group',{ transports : ['polling'] })

class Socket extends Component {
  state = {
    messages: ["Hello and Welcome"],
    message: "",
    username: {}
  };

  //Recieving
  componentDidMount = () => {
    socket.on("message", (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });
  };



  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = () => {
    const { message } = this.state;
    if (message !== "") {
      this.setState({
        message: ""
      });
      // socket.emit("message",{msg:message,usr:localStorage.getItem('usr')});
      var u = JSON.parse(localStorage.getItem('user'));
      socket.emit("message", `${u}:${message}`);
    } else {
      alert("Please Add A Message");

    }
  };

  render() {
    const { messages, message } = this.state;
    console.log(messages)
    return (
      <div className="chatroom">
        <h3>ChatBox</h3>
        <ul className="chats" >
          {messages.length > 0 &&
            messages.map((msg) => (
              
                <li className={`chat ${JSON.parse(localStorage.getItem('user')) == msg.split(':')[0] ? "right" : "left"}`}>
                  <b>{msg.split(':')[0].charAt(0).toUpperCase() + msg.split(':')[0].slice(1)}</b><br/>
                  <p>{msg.split(':')[1]}</p>
                </li>

              
            ))
          }
        </ul>
        <input type="text" value={message} name="message" onChange={e => this.onChange(e)} />
        <button onClick={() => this.onClick()}>Send Message</button>
      </div>
    );
  }
}
export default Socket;