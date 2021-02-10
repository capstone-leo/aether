import React, { Component } from "react";
//import { addInstrument, addDrum } from "./App.js";

//NOTES: importing and using functions on an onClick does
//nothing. Same goal is achieved by the event listeners
//in App.js

export class TonePalette extends Component {
  render() {
    return (
      <div className="TonePalette">
        <img src="./oneDie.png" id="addInstrumentIcon"></img>
        <button id="addInstrumentIcon">+ instrument</button>
        <img src="./drum-30128.png" id="drumIcon"></img>
        <img src="./vippng.com-trompeta-png-1767976.png" id="trumpetIcon"></img>
        <img src="./chord.png" id="chordIcon"></img>
      </div>
    );
  }
}

export default TonePalette;
