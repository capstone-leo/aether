import React, { useState, useRef } from "react";
import socket from "../socket";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");
  const output = useRef(null);
  //const message = document.getElementById("message");
  //const handle = document.getElementById("handle");
  //const btn = document.getElementById("sending");
  //const output = document.getElementById("output");

  socket.on("chat", function (data) {
    output.value =
      "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
    console.log("output", output);
  });
  return (
    <form id="mario-chat">
      <h2>Mario Chat</h2>
      <div id="chat-window">
        <div id="output" ref={output}>
          {output.value}
        </div>
      </div>
      <input
        id="handle"
        type="text"
        placeholder="Handle"
        onChange={(e) => {
          setHandle(e.target.value);
        }}
      />
      <input
        id="message"
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        id="sending"
        onClick={function (e) {
          socket.emit("chat", { message: message.value, handle: handle.value });
          e.preventDefault();
          console.log(message);
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Chat;
