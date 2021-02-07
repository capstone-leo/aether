//functions for/selection of tones
import * as Tone from "tone";

export function transpo() {
  // e.preventDefault()
  Tone.Transport.start();
}
export function playC4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C4", "4n");
}
export function playD4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("D4", "4n");
}
export function playE4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("E4", "4n");
}
export function playF4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("F4", "4n");
}
export function playG4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("G4", "4n");
}
export function playA4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("A4", "4n");
}
export function playB4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("B4", "4n");
}
export function playC5() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C5", "4n");
}

export function playFilterSynth() {
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
}

export function playStopOscillator() {
  const source = new Tone.Oscillator().toDestination();
  source.start();
  source.stop("+3.5"); // stops the source 3.5 seconds from now
}

//same thing as above but you specify the note
export function playDurationOscillator() {
  const source = new Tone.Oscillator("C2").toDestination();
  source.start();
  source.stop("+6"); // IF this is not included the tone renders infinitely
}

export function playChord() {
  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
}

export function playDetunedChord() {
  const synth = new Tone.PolySynth().toDestination();
  // set the attributes across all the voices using 'set'
  synth.set({ detune: -1200 });
  // play a chord
  synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
}

let chords = ["A0 C1 E1", "F0 A0 C1", "G0 B0 D1", "D0 F0 A0", "E0 G0 B0"].map(
  formatChords
);

var chordIdx = 0,
  step = 0;

const synth = new Tone.Synth();
const gain = new Tone.Gain(0.7);
synth.oscillator.type = "sine";
gain.toDestination();
synth.connect(gain);

export function formatChords(chordString) {
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
}

export function onRepeat(time) {
  let chord = chords[chordIdx],
    note = chord[step % chord.length];
  synth.triggerAttackRelease(note, "16n", time);
  console.log("step", step % chord.length);
  step++;
}
export function sinB4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.6);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("B4", 0.5);
}
export function sinA4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("A4", 0.5);
}

export function sinC4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("C4", 0.5);
}

export function sinD4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("D4", 0.5);
}

export function sinE4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("E4", 0.5);
}

export function sinF4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("F4", 0.5);
}

export function sinG4() {
  const synth = new Tone.Synth().toDestination();
  const gain = new Tone.Gain(0.7);
  synth.oscillator.type = "sine";
  gain.toDestination();
  synth.connect(gain);
  synth.triggerAttackRelease("G4", 0.5);
}
//percussion
export function playKickDrumToneJS() {
  const kickDrum = new Tone.MembraneSynth({
    volume: 6,
  }).toDestination();
  kickDrum.triggerAttackRelease();
}
export function playSnareWav() {
  const snare = new Audio("./sounds/snare.wav");
  snare.play();
}
export function playClosedHatWav() {
  const snare = new Audio("./sounds/closed-hat.wav");
  snare.play();
}
export function playKickWav() {
  const snare = new Audio("./sounds/kick.wav");
  snare.play();
}
export function playClapWav() {
  const snare = new Audio("./sounds/clap.wav");
  snare.play();
}
export function playToneHanddrum() {
  const player = new Tone.Player(
    "https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3"
  );
  player.autostart = true;
  const filter = new Tone.AutoFilter(4).start();
  const distortion = new Tone.Distortion(0.5);
  // connect the player to the filter, distortion and then to the master output
  player.chain(filter, distortion, Tone.Destination);
}
export function playCM7() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["C4", "E1", "G1", "B1"], 0.5);
    },
  }).toDestination();
}
export function playDm7() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["D4", "C1", "F4", "A1"], 0.5);
    },
  }).toDestination();
}
export function playEm() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["E3", "G3", "E1", "B4"], 0.5);
    },
  }).toDestination();
}
export function playFM4() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["F3", "A3", "Bb3", "C3"], 0.5);
    },
  }).toDestination();
}
export function playG7() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["G1", "G4", "B4", "F4"], 0.5);
    },
  }).toDestination();
}
export function playAm() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["A2", "E4", "C4", "A4"], 0.5);
    },
  }).toDestination();
}
