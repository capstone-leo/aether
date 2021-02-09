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
        <img src="./drum-30128.png" id="drumIcon"></img>
        <img src="./piano-icon-11854.png" id="pianoIcon"></img>
        <img src="./chord.png" id="chordIcon"></img>
        <img src="./marimba.png" id="marimbaIcon"></img>
      </div>
    );
  }
}

export default TonePalette;
