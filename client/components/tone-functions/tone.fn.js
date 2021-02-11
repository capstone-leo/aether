//functions for/selection of tones
import * as Tone from "tone";
/* 
let chords = ["A0 C1 E1", "F0 A0 C1", "G0 B0 D1", "D0 F0 A0", "E0 G0 B0"].map(
  formatChords
);

var chordIdx = 0,
  step = 0;

const synth = new Tone.Synth();
const gain = new Tone.Gain(0.7);
synth.oscillator.type = "sine";
gain.toDestination();
synth.connect(gain); */

export default [
  /*   function transpo() {
    // e.preventDefault()
    Tone.Transport.start();
  }, */
  function playC4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "4n");
  },
  function playD4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("D4", "4n");
  },
  function playE4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("E4", "4n");
  },
  function playF4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("F4", "4n");
  },
  function playG4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("G4", "4n");
  },
  function playA4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("A4", "4n");
  },
  function playB4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("B4", "4n");
  },
  function playC5() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "4n");
  },

  function playFilterSynth() {
    const filter = new Tone.Filter().toDestination();
    // set values using an object
    filter.set({
      frequency: "C6",
      type: "highpass",
    });
    const player = new Tone.Player(
      "https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3"
    ).connect(filter);
    player.autostart = true;
  },

  function playStopOscillator() {
    const source = new Tone.Oscillator().toDestination();
    source.start();
    source.stop("+3.5"); // stops the source 3.5 seconds from now
  },

  //same thing as above but you specify the note
  function playDurationOscillator() {
    const source = new Tone.Oscillator("C2").toDestination();
    source.start();
    source.stop("+6"); // IF this is not included the tone renders infinitely
  },

  function playChord() {
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
  },

  function playDetunedChord() {
    const synth = new Tone.PolySynth().toDestination();
    // set the attributes across all the voices using 'set'
    synth.set({ detune: -1200 });
    // play a chord
    synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
  },

  function onRepeat(time) {
    let chord = chords[chordIdx],
      note = chord[step % chord.length];
    synth.triggerAttackRelease(note, "16n", time);
    console.log("step", step % chord.length);
    step++;
  },
  function sinB4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.6);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("B4", 0.5);
  },
  function sinA4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("A4", 0.5);
  },

  function sinC4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("C4", 0.5);
  },

  function sinD4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("D4", 0.5);
  },

  function sinE4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("E4", 0.5);
  },

  function sinF4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("F4", 0.5);
  },

  function sinG4() {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = "sine";
    gain.toDestination();
    synth.connect(gain);
    synth.triggerAttackRelease("G4", 0.5);
  },
  /*   function formatChords(chordString) {
    let chord = chordString.split(" ");
    let arr = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < chord.length; j++) {
        let noteOct = chord[j].split(""),
          note = noteOct[0];
        let oct = noteOct[1] === "0" ? i + 4 : i + 5;
        note += oct;
        arr.push(note);
      }
    }
    return arr;
  }, */
];
