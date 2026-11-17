"use client";
// Lo-fi loop synthesised with the Web Audio API, or a real track if MUSIC.src is set.
import { MUSIC } from "./data";

type Listener = () => void;
const listeners = new Set<Listener>();
let playing = false;
let actx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let nextT = 0;
let step = 0;
let startAt = 0;
let audioEl: HTMLAudioElement | null = null;

const CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62]];
const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const SPB = 60 / 76 / 2; // eighth notes at 76 bpm

function note(f: number, t: number, d: number, type: OscillatorType, g: number, cut: number) {
  if (!actx || !master) return;
  const o = actx.createOscillator(), v = actx.createGain(), fl = actx.createBiquadFilter();
  o.type = type; o.frequency.value = f; fl.type = "lowpass"; fl.frequency.value = cut;
  v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + 0.04); v.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(fl).connect(v).connect(master); o.start(t); o.stop(t + d + 0.05);
}
function kick(t: number) {
  if (!actx || !master) return;
  const o = actx.createOscillator(), v = actx.createGain();
  o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
  v.gain.setValueAtTime(0.5, t); v.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  o.connect(v).connect(master); o.start(t); o.stop(t + 0.32);
}
function hat(t: number, g: number) {
  if (!actx || !master) return;
  if (!noise) {
    noise = actx.createBuffer(1, actx.sampleRate * 0.05, actx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = actx.createBufferSource(), f = actx.createBiquadFilter(), v = actx.createGain();
  s.buffer = noise; f.type = "highpass"; f.frequency.value = 7000;
  v.gain.setValueAtTime(g, t); v.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  s.connect(f).connect(v).connect(master); s.start(t);
}
function tick() {
  if (!actx) return;
  while (nextT < actx.currentTime + 0.2) {
    const bar = Math.floor(step / 8) % 4, b = step % 8, c = CHORDS[bar];
    if (b === 0) c.forEach((m) => note(hz(m), nextT, SPB * 8, "triangle", 0.05, 1400));
    if (b === 0 || b === 5) kick(nextT);
    if (b === 4) hat(nextT, 0.12);
    hat(nextT, b % 2 ? 0.04 : 0.07);
    if (b === 0 || b === 3 || b === 6) note(hz(c[0] - 24), nextT, SPB * 2, "sine", 0.18, 400);
    if ([2, 5, 7].includes(b) && Math.random() < 0.6) note(hz(c[1 + Math.floor(Math.random() * 3)] + 12), nextT, SPB * 3, "sine", 0.04, 2200);
    nextT += SPB * (b % 2 ? 0.92 : 1.08);
    step++;
  }
}

export function toggleMusic() {
  if (MUSIC.src) {
    audioEl = audioEl || Object.assign(new Audio(MUSIC.src), { loop: true });
    if (playing) audioEl.pause(); else audioEl.play().catch(() => {});
    playing = !playing;
  } else {
    if (!actx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      actx = new Ctx();
      master = actx.createGain(); master.gain.value = 0.6;
      const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
      master.connect(lp).connect(actx.destination);
    }
    if (!playing) {
      actx.resume();
      master!.gain.setTargetAtTime(0.6, actx.currentTime, 0.1);
      nextT = actx.currentTime + 0.05;
      if (!startAt) startAt = actx.currentTime;
      timer = setInterval(tick, 50);
      playing = true;
    } else {
      if (timer) clearInterval(timer);
      master!.gain.setTargetAtTime(0, actx.currentTime, 0.1);
      playing = false;
    }
  }
  listeners.forEach((l) => l());
  return playing;
}

export const isPlaying = () => playing;
export function subscribe(l: Listener) { listeners.add(l); return () => { listeners.delete(l); }; }
export function position(): { t: number; dur: number } {
  if (MUSIC.src && audioEl) return { t: audioEl.currentTime, dur: audioEl.duration || 0 };
  if (actx && startAt) return { t: (actx.currentTime - startAt) % MUSIC.loopSeconds, dur: MUSIC.loopSeconds };
  return { t: 0, dur: MUSIC.loopSeconds };
}
