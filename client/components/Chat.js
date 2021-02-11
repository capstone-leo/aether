import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import store from '../store'
import receiveMessage from '../reducer/messages'
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
        }, 3000)
      : null;
  });

  const sendMessage = () => {
    console.log({message})
    console.log('messages from the store bakc in the frontend', store.getState().messages)
      socket.emit('add_message', message);
      // setMessage('');
      // store.dispatch(receiveMessage(message))
      setMessage('')
      // console.log(newMessage)
      console.log('store on send', store.getState())
    }
  const messageList = store.getState().messages.map((message, i)=>
  <li key={i}>{message}</li>)

  const removeMessage = () => {};

  return (
    <div id="chat-box">
      <ul id="message-list">
        {messageList}
      </ul>
      <input
        style={{ background: 'transparent', color: 'whitesmoke' }}
        // value={message}
        id="new-message"
        onInput={(e) => {
          setMessage(e.target.value);
          console.log(messageList)
        }}
        onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        placeholder="chat"
      ></input>
    </div>
  );
};

const mapStateToProps = (messages) => (messages);

export default connect(mapStateToProps, null)(Chat);
