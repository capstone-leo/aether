import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

export const Chat = (props) => {
  const { messages } = props;
  const [message, setMessage] = useState('');
  const messageList = useRef(null);
  const sendMessage = () => {
    let newMessage = message;
    if (newMessage) {
      socket.emit('new_message', message);
      setMessage('');
      setTimeout(()=>messageList.current.querySelector('li').remove(), 5000)

    }
      // messageList.child ? setInterval()
    }
  
  
  return (
    <div id="chat-box">
      <ul id="message-list" ref={messageList}>
        {messages &&
          messages.map((message, i) => {
            let { message: text } = message;
            return <li id={i} key={i}>{`${text}`}</li>;
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
