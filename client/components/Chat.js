import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';



//once we start having usernames/nicknames this needs 
//to be updated for username: message


export const Chat = (props) => {
  const { messages } = props;
  const [message, setMessage] = useState('');
  const messageList = useRef(null);
  useEffect(()=>{
  document.querySelector('li') !== null ? setTimeout(function(){document.querySelector('li').remove() }, 3000) : null;
})

  const sendMessage = () => {
    let newMessage = message;
    if (newMessage) {
      socket.emit('new_message', message);
      setMessage('');
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
        style={{background: 'transparent', color: 'whitesmoke', border: 'none'}}
        value={message}
        id="new-message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e)=>e.key === "Enter" ? sendMessage() : null}
        placeholder="new message"
      ></input>
      {/* <button
       style={{background: 'transparent', color: 'whitesmoke'}}
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      > */}
        {/* Send
      </button> */}
    </div>
  );
};

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps, null)(Chat);
