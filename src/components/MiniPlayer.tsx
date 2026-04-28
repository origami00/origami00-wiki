import { useState } from "react";
import { useMusic, type PlayMode } from "../contexts/MusicContext";
import { useContentManager } from "../hooks/useContentManager";
import { C } from "../tokens/design";
import {
  Music, Pause, Play, SkipForward, SkipBack,
  ListMusic, Shuffle, Repeat, ChevronUp, ChevronDown,
} from "lucide-react";

const MODE_ORDER: PlayMode[] = ["list", "shuffle", "loop"];
const MODE_LABELS: Record<PlayMode, string> = { list: "列表播放", shuffle: "随机播放", loop: "单曲循环" };
const MODE_ICONS: Record<PlayMode, typeof ListMusic> = { list: ListMusic, shuffle: Shuffle, loop: Repeat };

export default function MiniPlayer() {
  const { music: musicList } = useContentManager();
  const {
    track, playing, progress, playMode, playlist, queuePos,
    toggle, next, prev, setPlayMode, playTrack, reorderPlaylist,
  } = useMusic();
  const [showPlaylist, setShowPlaylist] = useState(false);

  const cycleMode = () => {
    const idx = MODE_ORDER.indexOf(playMode);
    setPlayMode(MODE_ORDER[(idx + 1) % MODE_ORDER.length]!);
  };
  const ModeIcon = MODE_ICONS[playMode];

  return (
    <div className="miniPlayer" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 900,
      display: "flex", flexDirection: "column",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(100,160,145,0.15), 0 2px 8px rgba(0,0,0,0.04)",
      animation: "miniPlayerIn 0.3s ease",
      width: 260, overflow: "hidden",
    }}>
      {/* Main player row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
        {/* Spinning disc */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0, position: "relative",
          background: `conic-gradient(from 0deg, ${C.accent}40, ${C.accent}80, ${C.accent}, ${C.accent}80, ${C.accent}40)`,
          animation: playing ? "spin 3s linear infinite" : "none",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 14, height: 14, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Music size={6} color={C.accent} />
          </div>
        </div>

        {/* Track info */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {track.title}
          </div>
          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1 }}>
            {track.artist}
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: 4, height: 2, borderRadius: 1, background: "rgba(110,190,175,0.15)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: C.accent, borderRadius: 1, transition: "width 0.3s linear" }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <button onClick={prev} style={{
            width: 26, height: 26, borderRadius: 7, border: "none",
            background: "rgba(110,190,175,0.08)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.accent, transition: "all 0.2s",
          }} aria-label="上一首">
            <SkipBack size={11} />
          </button>
          <button onClick={toggle} style={{
            width: 30, height: 30, borderRadius: 9, border: "none",
            background: C.accent, color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 2px 8px ${C.accent}30`, transition: "all 0.2s",
          }} aria-label={playing ? "暂停" : "播放"}>
            {playing ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: 1 }} />}
          </button>
          <button onClick={next} style={{
            width: 26, height: 26, borderRadius: 7, border: "none",
            background: "rgba(110,190,175,0.08)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.accent, transition: "all 0.2s",
          }} aria-label="下一首">
            <SkipForward size={11} />
          </button>
        </div>
      </div>

      {/* Mode + Playlist toggle bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2,
        padding: "0 12px 8px",
      }}>
        <button
          onClick={cycleMode}
          className="modeBtn"
          style={{ width: 24, height: 24, borderRadius: 6 }}
          title={MODE_LABELS[playMode]}
          aria-label={MODE_LABELS[playMode]}
        >
          <ModeIcon size={11} />
        </button>
        <button
          onClick={() => setShowPlaylist((s) => !s)}
          className={`modeBtn ${showPlaylist ? "active" : ""}`}
          style={{ width: 24, height: 24, borderRadius: 6 }}
          title="播放列表"
          aria-label="播放列表"
        >
          <ListMusic size={11} />
        </button>
      </div>

      {/* Playlist panel */}
      <div className={`playlistPanel ${showPlaylist ? "open" : ""}`} style={{ maxHeight: showPlaylist ? 200 : 0 }}>
        <div style={{ borderTop: "1px solid rgba(110,190,175,0.1)", margin: "0 10px" }} />
        <div style={{ padding: "6px 6px 8px", maxHeight: 190, overflowY: "auto" }}>
          {playlist.map((trackIdx, pos) => {
            const t = musicList[trackIdx];
            if (!t) return null;
            const isActive = pos === queuePos;
            return (
              <div
                key={`${trackIdx}-${pos}`}
                className={`playlistItem ${isActive ? "active" : ""}`}
                onClick={() => playTrack(pos)}
                style={{ padding: "5px 6px" }}
              >
                <span style={{ width: 16, fontSize: 9, textAlign: "center", flexShrink: 0, opacity: 0.5 }}>
                  {isActive ? "▶" : pos + 1}
                </span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11 }}>
                  {t.title}
                </span>
                <div className="moveBtn" style={{ display: "flex", gap: 1, marginLeft: 2 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); reorderPlaylist(pos, pos - 1); }}
                    className="modeBtn"
                    style={{ width: 18, height: 18 }}
                    disabled={pos === 0}
                    aria-label="上移"
                  >
                    <ChevronUp size={10} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); reorderPlaylist(pos, pos + 1); }}
                    className="modeBtn"
                    style={{ width: 18, height: 18 }}
                    disabled={pos === playlist.length - 1}
                    aria-label="下移"
                  >
                    <ChevronDown size={10} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
