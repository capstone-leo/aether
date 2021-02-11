import * as Tone from "tone";

export function playFeedbackDelayC() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("C2", "32n");
}
export function playFeedbackDelayD() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("D2", "32n");
}
export function playFeedbackDelayE() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("E2", "32n");
}
export function playFeedbackDelayF() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("F2", "32n");
}
export function playFeedbackDelayG() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("G2", "32n");
}
export function playFeedbackDelayA() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("A2", "32n");
}
export function playFeedbackDelayB() {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const tom = new Tone.MembraneSynth({
    octaves: 4,
    pitchDecay: 0.1,
  }).connect(feedbackDelay);
  tom.triggerAttackRelease("B2", "32n");
}
