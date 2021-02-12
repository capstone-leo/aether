import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import store from '../store'
import receiveMessage, { deleteMessage } from '../reducer/messages'
import { nanoid } from 'nanoid'
// import nanoid from 'nanoid'

//once we start having usernames/nicknames this needs
//to be updated for username: message

export const Chat = (props) => {
  const { messages } = props;
  const [message, setMessage] = useState('')


  useEffect(() => {
    document.querySelector('li') !== null
      ? setTimeout(function () {
          document.querySelector('li').remove();
          removeMessage()
        }, 1000)
      : null;
  });

  const sendMessage = () => {
      socket.emit('add_message', {message: message, id: nanoid()});
      setMessage('')
      console.log('first store', store.getState().messages)
      document.getElementById('new-message').value=''
      setTimeout(function () {
        removeMessage(message, store.getState().messages)
      }, 1000)
    }
  

  const messageList = 
  store.getState().messages.map((message, i)=>
  <li key={i}>{message}</li>)

  const removeMessage = (message, id) => {
    socket.emit('remove_message', id)
    setTimeout(function () {
      // document.querySelector('li').remove();
      console.log('latemessages', store.getState().messages)
    }, 3000)
  }
  

  return (
    <div id="chat-box">
      <ul id="message-list">
        {/* {messageList} */}
      </ul>
      <input
        style={{ background: 'transparent', color: 'whitesmoke' }}
        // value={message}
        id="new-message"
        onInput={(e) => {
          setMessage(e.target.value);
         
        }}
        onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        placeholder="chat"
      ></input>
    </div>
  );
};

const mapStateToProps = (messages) => (messages);

export default connect(mapStateToProps, null)(Chat);
