import * as Tone from "tone";

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
export function playBbM() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["Bb2", "Bb4", "D4", "F4"], 0.5);
    },
  }).toDestination();
}
export function playEbM() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
      sampler.triggerAttackRelease(["Eb2", "Eb4", "G4", "Bb4"], 0.5);
    },
  }).toDestination();
}
