import { useEffect, useRef, useState } from "react";
import { musicList } from "../data/siteData";

interface AudioPlayerResult {
  track: { title: string; artist: string; duration: number };
  playing: boolean;
  progress: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (pct: number) => void;
  elapsedStr: string;
  totalStr: string;
}

export function useAudioPlayer(): AudioPlayerResult {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = musicList[trackIdx] ?? musicList[0]!;

  useEffect(() => {
    const audio = new Audio(track.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setTrackIdx((i) => (i + 1) % musicList.length);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [trackIdx, track.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  const toggle = () => setPlaying((p) => !p);
  const seek = (pct: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration;
      setProgress(pct);
    }
  };
  const next = () => {
    setPlaying(false);
    setProgress(0);
    setTrackIdx((i) => (i + 1) % musicList.length);
  };
  const prev = () => {
    setPlaying(false);
    setProgress(0);
    setTrackIdx((i) => (i - 1 + musicList.length) % musicList.length);
  };

  const elapsed = Math.floor((progress / 100) * duration);
  const fmt = (s: number): string => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return {
    track: { title: track.title, artist: track.artist, duration },
    playing,
    progress,
    toggle,
    next,
    prev,
    seek,
    elapsedStr: fmt(elapsed),
    totalStr: fmt(duration),
  };
}
