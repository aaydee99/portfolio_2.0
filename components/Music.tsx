"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MUSIC } from "@/lib/data";
import { isPlaying, position, subscribe, toggleMusic } from "@/lib/music";
import { PauseIcon, PlayIcon } from "./Icons";

const usePlaying = () => useSyncExternalStore(subscribe, isPlaying, () => false);
const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

function PlayButton() {
  const playing = usePlaying();
  return (
    <button className="mplay" onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

export function MusicCard() {
  const [pos, setPos] = useState({ t: 0, dur: MUSIC.loopSeconds });
  useEffect(() => { const id = setInterval(() => setPos(position()), 500); return () => clearInterval(id); }, []);
  return (
    <div className="music">
      <div className="lbl"><span>Music</span></div>
      <div className="mrow">
        <div className="cover" />
        <div><div className="mt">{MUSIC.title}</div><div className="ms">{MUSIC.subtitle}</div></div>
        <PlayButton />
      </div>
      <div className="mbar"><i style={{ width: `${pos.dur ? (pos.t / pos.dur) * 100 : 0}%` }} /></div>
      <div className="mtime"><span>{fmt(pos.t)}</span><span>{fmt(pos.dur)}</span></div>
    </div>
  );
}

export function MusicPill() {
  const playing = usePlaying();
  return (
    <div className={`fpill ${playing ? "playing" : ""}`}>
      <div className="disc"><i /></div>
      <span className="mt">{MUSIC.title}</span>
      <span className="eq"><b /><b /><b /></span>
      <PlayButton />
    </div>
  );
}
