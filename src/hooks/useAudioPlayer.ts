import { useCallback, useEffect, useRef, useState } from "react";
import { musicList as defaultMusic } from "../data/siteData";
import type { MusicTrack } from "../types";

export type PlayMode = "list" | "shuffle" | "loop";

interface AudioPlayerResult {
  track: { title: string; artist: string; duration: number };
  currentTrackIdx: number;
  playing: boolean;
  progress: number;
  volume: number;
  playMode: PlayMode;
  playlist: number[];
  queuePos: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (pct: number) => void;
  setVolume: (v: number) => void;
  setPlayMode: (m: PlayMode) => void;
  playTrack: (pos: number) => void;
  reorderPlaylist: (from: number, to: number) => void;
  elapsedStr: string;
  totalStr: string;
}

export function useAudioPlayer(tracks: MusicTrack[] = defaultMusic): AudioPlayerResult {
  const musicList = tracks;
  const [playlist, setPlaylist] = useState<number[]>(() => musicList.map((_, i) => i));
  const [queuePos, setQueuePos] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(100);
  const [playMode, setPlayMode] = useState<PlayMode>("list");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playModeRef = useRef<PlayMode>("list");
  const playlistRef = useRef(playlist);
  const playingRef = useRef(playing);

  playModeRef.current = playMode;
  playlistRef.current = playlist;
  playingRef.current = playing;

  const trackIdx = playlist[queuePos] ?? 0;
  const track = musicList[trackIdx] ?? musicList[0]!;

  // Reset playlist when track list size changes
  useEffect(() => {
    setPlaylist(musicList.map((_, i) => i));
    setQueuePos(0);
    setPlaying(false);
    setProgress(0);
  }, [musicList.length]);

  // Sync volume to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume / 100;
  }, [volume]);

  // Create / recreate audio on track change
  useEffect(() => {
    const audio = new Audio(track.src);
    audio.preload = "metadata";
    audio.volume = volume / 100;
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setProgress(0);
      const mode = playModeRef.current;
      const len = playlistRef.current.length;
      if (mode === "loop") {
        audio.currentTime = 0;
        audio.play().catch(() => setPlaying(false));
      } else if (mode === "shuffle") {
        // Always pick a random track
        setQueuePos((pos) => {
          if (len <= 1) return 0;
          let r: number;
          do { r = Math.floor(Math.random() * len); } while (r === pos);
          return r;
        });
      } else {
        // "list" mode: play next, stop at end
        setQueuePos((pos) => {
          const next = pos + 1;
          if (next >= len) {
            setPlaying(false);
            return pos;
          }
          return next;
        });
      }
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    // Auto-play new track if already playing
    if (playingRef.current) {
      audio.play().catch(() => setPlaying(false));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [trackIdx, track.src]);

  // Play / pause control (for toggle, next, prev actions)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, trackIdx]);

  // Shuffle: pick a random position different from current
  const shuffleNext = useCallback((current: number): number => {
    if (playlist.length <= 1) return 0;
    let next: number;
    do {
      next = Math.floor(Math.random() * playlist.length);
    } while (next === current);
    return next;
  }, [playlist.length]);

  const getNextPos = useCallback((current: number, direction: 1 | -1): number => {
    if (playMode === "shuffle") return shuffleNext(current);
    const next = current + direction;
    if (next < 0) return playlist.length - 1;
    if (next >= playlist.length) return 0;
    return next;
  }, [playMode, shuffleNext, playlist.length]);

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
    setQueuePos((pos) => getNextPos(pos, 1));
  };

  const prev = () => {
    setPlaying(false);
    setProgress(0);
    setQueuePos((pos) => getNextPos(pos, -1));
  };

  const setVolume = (v: number) => setVolumeState(Math.max(0, Math.min(100, v)));

  const playTrack = (pos: number) => {
    if (pos === queuePos) {
      // Restart current track
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        setProgress(0);
        setPlaying(true);
      }
      return;
    }
    setPlaying(false);
    setProgress(0);
    setQueuePos(pos);
    setPlaying(true);
  };

  const reorderPlaylist = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= playlist.length || to >= playlist.length) return;
    const newPlaylist = [...playlist];
    const [item] = newPlaylist.splice(from, 1) as [number];
    newPlaylist.splice(to, 0, item);
    setPlaylist(newPlaylist);
    // Adjust queuePos if needed
    setQueuePos((pos) => {
      if (pos === from) return to;
      if (from < pos && to >= pos) return pos - 1;
      if (from > pos && to <= pos) return pos + 1;
      return pos;
    });
  };

  const elapsed = Math.floor((progress / 100) * duration);
  const fmt = (s: number): string => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return {
    track: { title: track.title, artist: track.artist, duration },
    currentTrackIdx: trackIdx,
    playing,
    progress,
    volume,
    playMode,
    playlist,
    queuePos,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    setPlayMode,
    playTrack,
    reorderPlaylist,
    elapsedStr: fmt(elapsed),
    totalStr: fmt(duration),
  };
}
