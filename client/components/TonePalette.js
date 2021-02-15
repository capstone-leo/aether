import React, {Component} from 'react'
//import { addInstrument, addDrum } from "./App.js";

//NOTES: importing and using functions on an onClick does
//nothing. Same goal is achieved by the event listeners
//in App.js

export class TonePalette extends Component {
  render() {
    return (
      <div className="dropdown">
        <div id="divHover">
          hover for sounds
          <br />↓
        </div>
        <div className="TonePalette">
          <img src="./star.png" id="addInstrumentIcon"></img>
          <img src="./drum.png" id="drumIcon"></img>
          <img src="./piano.png" id="pianoIcon"></img>
          <img src="./chord2.png" id="chordIcon"></img>
          <img src="./xylophone.png" id="marimbaIcon"></img>
          <img src="./harp.png" id="harpIcon"></img>
          <img src="./feedbackDelay.png" id="feedbackDelayIcon"></img>
        </div>
      </div>
    )
  }
}

export default TonePalette
