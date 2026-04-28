import { createContext, useContext, type ReactNode } from "react";
import { useAudioPlayer, type PlayMode } from "../hooks/useAudioPlayer";
import { useContentManager } from "../hooks/useContentManager";

export interface MusicContextValue {
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

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const { music: musicList } = useContentManager();
  const player = useAudioPlayer(musicList);
  return (
    <MusicContext.Provider value={player}>
      {children}
    </MusicContext.Provider>
  );
}

export type { PlayMode };
