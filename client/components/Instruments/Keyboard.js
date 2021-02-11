import React, { Component } from "react";

import {
  playAb1,
  playAb2,
  playAb3,
  playAb4,
  playAb5,
  playAb6,
  playAb7,
  playA0,
  playA1,
  playA2,
  playA3,
  playA4,
  playA5,
  playA6,
  playA7,
  playBb0,
  playBb1,
  playBb2,
  playBb3,
  playBb4,
  playBb5,
  playBb6,
  playBb7,
  playB0,
  playB1,
  playB2,
  playB3,
  playB4,
  playB5,
  playB6,
  playB7,
  playC1,
  playC2,
  playC3,
  playC4,
  playC5,
  playC6,
  playC7,
  playC8,
  playDb1,
  playDb2,
  playDb3,
  playDb4,
  playDb5,
  playDb6,
  playDb7,
  playD1,
  playD2,
  playD3,
  playD4,
  playD5,
  playD6,
  playD7,
  playEb1,
  playEb2,
  playEb3,
  playEb4,
  playEb5,
  playEb6,
  playEb7,
  playE1,
  playE2,
  playE3,
  playE4,
  playE5,
  playE6,
  playE7,
  playF1,
  playF2,
  playF3,
  playF4,
  playF5,
  playF6,
  playF7,
  playGb1,
  playGb2,
  playGb3,
  playGb4,
  playGb5,
  playGb6,
  playGb7,
  playG1,
  playG2,
  playG3,
  playG4,
  playG5,
  playG6,
  playG7,
  playNote,
} from "../tone-functions/keyboard.js";

//window.addEventListener("keydown", playNote);

export class Keyboard extends Component {
  render() {
    return (
      <div className="pianoPage">
        <div className="piano">
          <div className="white-key" onClick={playA0}></div>
          <div className="black-key" onClick={playBb0}></div>
          <div className="white-key" onClick={playB0}></div>
          <div className="white-key" onClick={playC1}></div>
          <div className="black-key" onClick={playDb1}></div>
          <div className="white-key" onClick={playD1}></div>
          <div className="black-key" onClick={playEb1}></div>
          <div className="white-key" onClick={playE1}></div>
          <div className="white-key" onClick={playF1}></div>
          <div className="black-key" onClick={playGb1}></div>
          <div className="white-key" onClick={playG1}></div>
          <div className="black-key" onClick={playAb1}></div>
          <div className="white-key" onClick={playA1}></div>
          <div className="black-key" onClick={playBb1}></div>
          <div className="white-key" onClick={playB1}></div>
          <div className="white-key" onClick={playC2}></div>
          <div className="black-key" onClick={playDb2}></div>
          <div className="white-key" onClick={playD2}></div>
          <div className="black-key" onClick={playEb2}></div>
          <div className="white-key" onClick={playE2}></div>
          <div className="white-key" onClick={playF2}></div>
          <div className="black-key" onClick={playGb2}></div>
          <div className="white-key" onClick={playG2}></div>
          <div className="black-key" onClick={playAb2}></div>
          <div className="white-key" onClick={playA2}></div>
          <div className="black-key" onClick={playBb2}></div>
          <div className="white-key" onClick={playB2}></div>
          <div className="white-key" onClick={playC3}></div>
          <div className="black-key" onClick={playDb3}></div>
          <div className="white-key" onClick={playD3}></div>
          <div className="black-key" onClick={playEb3}></div>
          <div className="white-key" onClick={playE3}></div>
          <div className="white-key" onClick={playF3}></div>
          <div className="black-key" onClick={playGb3}></div>
          <div className="white-key" onClick={playG3}></div>
          <div className="black-key" onClick={playAb3}></div>
          <div className="white-key" onClick={playA3}></div>
          <div className="black-key" onClick={playBb3}></div>
          <div className="white-key" onClick={playB3}></div>
          <div className="white-key" onClick={playC4}></div>
          <div className="black-key" onClick={playDb4}></div>
          <div className="white-key" onClick={playD4}></div>
          <div className="black-key" onClick={playEb4}></div>
          <div className="white-key" onClick={playE4}></div>
          <div className="white-key" onClick={playF4}></div>
          <div className="black-key" onClick={playGb4}></div>
          <div className="white-key" onClick={playG4}></div>
          <div className="black-key" onClick={playAb4}></div>
          <div className="white-key" onClick={playA4}></div>
          <div className="black-key" onClick={playBb4}></div>
          <div className="white-key" onClick={playB4}></div>
          <div className="white-key" onClick={playC5}></div>
          <div className="black-key" onClick={playDb5}></div>
          <div className="white-key" onClick={playD5}></div>
          <div className="black-key" onClick={playEb5}></div>
          <div className="white-key" onClick={playE5}></div>
          <div className="white-key" onClick={playF5}></div>
          <div className="black-key" onClick={playGb5}></div>
          <div className="white-key" onClick={playG5}></div>
          <div className="black-key" onClick={playAb5}></div>
          <div className="white-key" onClick={playA5}></div>
          <div className="black-key" onClick={playBb5}></div>
          <div className="white-key" onClick={playB5}></div>
          <div className="white-key" onClick={playC6}></div>
          <div className="black-key" onClick={playDb6}></div>
          <div className="white-key" onClick={playD6}></div>
          <div className="black-key" onClick={playEb6}></div>
          <div className="white-key" onClick={playE6}></div>
          <div className="white-key" onClick={playF6}></div>
          <div className="black-key" onClick={playGb6}></div>
          <div className="white-key" onClick={playG6}></div>
          <div className="black-key" onClick={playAb6}></div>
          <div className="white-key" onClick={playA6}></div>
          <div className="black-key" onClick={playBb6}></div>
          <div className="white-key" onClick={playB6}></div>
          <div className="white-key" onClick={playC7}></div>
          <div className="black-key" onClick={playDb7}></div>
          <div className="white-key" onClick={playD7}></div>
          <div className="black-key" onClick={playEb7}></div>
          <div className="white-key" onClick={playE7}></div>
          <div className="white-key" onClick={playF7}></div>
          <div className="black-key" onClick={playGb7}></div>
          <div className="white-key" onClick={playG7}></div>
          <div className="black-key" onClick={playAb7}></div>
          <div className="white-key" onClick={playA7}></div>
          <div className="black-key" onClick={playBb7}></div>
          <div className="white-key" onClick={playB7}></div>
          <div className="white-key" onClick={playC8}></div>
        </div>
      </div>
    );
  }
}

export default Keyboard;
