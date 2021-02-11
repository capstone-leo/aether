import React, { Component } from "react";
import Recorder from "recorderjs";

const rec = new Recorder(source /* [, config] */); //element that contains sound output
//function playSound() main.js
export class JamRecorder extends Component {
  render() {
    return (
      <div className="jamRecorder">
        <h1>test</h1>
      </div>
    );
  }
}

export default JamRecorder;
