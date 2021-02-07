import React, { Component } from "react";
import { addInstrument } from "./App.js";

export class TonePalette extends Component {
  render() {
    return (
      <div className="TonePalette">
        <button id="addInstrumentButton" onClick={addInstrument}>
          Add
        </button>
      </div>
    );
  }
}

export default TonePalette;
