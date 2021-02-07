<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import socket from "../socket";

export const Chat = (props) => {
  const { messages } = props;
  const [message, setMessage] = useState("");
=======
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

export const Chat = (props) => {
  const { messages } = props;
  const [message, setMessage] = useState('');
>>>>>>> 2d81759fe8733c646048b611b4462e7e888100c7
  const messageList = useRef(null);

  const sendMessage = () => {
    let newMessage = message;
    if (newMessage) {
<<<<<<< HEAD
      socket.emit("new_message", message);
      setMessage("");
=======
      socket.emit('new_message', message);
      setMessage('');
>>>>>>> 2d81759fe8733c646048b611b4462e7e888100c7
    }
  };

  return (
    <div id="chat-box">
      <ul id="message-list" ref={messageList}>
        {messages &&
          messages.map((message, i) => {
            let { message: text } = message;
            return <li key={i}>{`${text}`}</li>;
          })}
      </ul>
      <input
        value={message}
        id="new-message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="new message"
      ></input>
      <button
<<<<<<< HEAD
        className="chatButton"
=======
>>>>>>> 2d81759fe8733c646048b611b4462e7e888100c7
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        Send
      </button>
    </div>
  );
};

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps, null)(Chat);
