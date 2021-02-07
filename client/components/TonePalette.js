import React, { Component } from "react";
import { addInstrument, addDrum } from "./App.js";

export class TonePalette extends Component {
  render() {
    return (
      <div className="TonePalette">
        <button id="addInstrumentButton" onClick={addInstrument}>
          Add
        </button>
        <button onClick={addDrum}>Add Drum</button>
        <img src="./drum-30128.png" id="drums"></img>
        <img src="./vippng.com-trompeta-png-1767976.png" id="trumpet"></img>
      </div>
    );
  }
}

export default TonePalette;
