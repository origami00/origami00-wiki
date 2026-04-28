import { useState } from "react";
import {
  Music, Pause, Play, SkipBack, SkipForward,
  Volume2, VolumeX, ListMusic, Shuffle, Repeat,
  ChevronUp, ChevronDown,
} from "lucide-react";
import { C, card } from "../tokens/design";
import { useMusic, type PlayMode } from "../contexts/MusicContext";
import { useContentManager } from "../hooks/useContentManager";

const MODE_ORDER: PlayMode[] = ["list", "shuffle", "loop"];
const MODE_LABELS: Record<PlayMode, string> = { list: "列表播放", shuffle: "随机播放", loop: "单曲循环" };
const MODE_ICONS: Record<PlayMode, typeof ListMusic> = { list: ListMusic, shuffle: Shuffle, loop: Repeat };

export default function MusicPlayer() {
  const { music: musicList } = useContentManager();
  const {
    track, playing, progress, volume, playMode, playlist, queuePos,
    toggle, next, prev, seek, setVolume, setPlayMode, playTrack, reorderPlaylist,
    elapsedStr, totalStr,
  } = useMusic();

  const [hov, setHov] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [muted, setMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(100);

  const cycleMode = () => {
    const idx = MODE_ORDER.indexOf(playMode);
    setPlayMode(MODE_ORDER[(idx + 1) % MODE_ORDER.length]!);
  };

  const toggleMute = () => {
    if (muted) {
      setVolume(prevVolume);
      setMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setMuted(true);
    }
  };

  const ModeIcon = MODE_ICONS[playMode];

  return (
    <section
      className="musicPlayer"
      style={{
        ...card, padding: "22px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.4)",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? C.shadowHover : C.shadow,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="音乐播放器"
    >
      {/* Track info + disc */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div
          className="disc"
          style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0, position: "relative",
            background: `conic-gradient(from 0deg, ${C.accent}40, ${C.accent}80, ${C.accent}, ${C.accent}80, ${C.accent}40)`,
            animation: playing ? "spin 3s linear infinite" : "none",
            boxShadow: playing ? `0 4px 16px ${C.accent}30` : "0 2px 8px rgba(0,0,0,0.04)",
          }}
          aria-hidden="true"
        >
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 18, height: 18, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Music size={8} color={C.accent} />
          </div>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
          <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 2 }}>{track.artist}</div>
        </div>
      </div>

      {/* Progress */}
      <input
        type="range" min={0} max={100} step={0.1} value={progress}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="播放进度"
        style={{ width: "100%", marginBottom: 6 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, marginBottom: 12 }}>
        <span>{elapsedStr}</span>
        <span>{totalStr}</span>
      </div>

      {/* Volume + Mode controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, maxWidth: 140 }}>
          <button
            onClick={toggleMute}
            className="modeBtn"
            style={{ width: 24, height: 24, minWidth: 24 }}
            aria-label={muted ? "取消静音" : "静音"}
          >
            {muted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
          <input
            type="range" min={0} max={100} step={1} value={muted ? 0 : volume}
            onChange={(e) => { const v = Number(e.target.value); setVolume(v); if (muted && v > 0) setMuted(false); }}
            aria-label="音量"
            style={{ width: "100%", height: 3 }}
          />
        </div>

        {/* Mode + Playlist toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={cycleMode}
            className={`modeBtn ${playMode !== "list" ? "active" : ""}`}
            title={MODE_LABELS[playMode]}
            aria-label={MODE_LABELS[playMode]}
          >
            <ModeIcon size={13} />
          </button>
          <button
            onClick={() => setShowPlaylist((s) => !s)}
            className={`modeBtn ${showPlaylist ? "active" : ""}`}
            title="播放列表"
            aria-label="播放列表"
          >
            <ListMusic size={13} />
          </button>
        </div>
      </div>

      {/* Play controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <button onClick={prev} className="ctrlBtn" style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "rgba(110,190,175,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.accent, transition: "all 0.2s",
        }} aria-label="上一首">
          <SkipBack size={13} />
        </button>
        <button onClick={toggle} className="ctrlBtn ctrlBtnMain" style={{
          width: 40, height: 40, borderRadius: 14, border: "none",
          background: C.accent, color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 14px ${C.accent}40`,
          transition: "all 0.2s",
        }} aria-label={playing ? "暂停播放" : "开始播放"}>
          {playing ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>
        <button onClick={next} className="ctrlBtn" style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "rgba(110,190,175,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.accent, transition: "all 0.2s",
        }} aria-label="下一首">
          <SkipForward size={13} />
        </button>
      </div>

      {/* Playlist panel */}
      <div className={`playlistPanel ${showPlaylist ? "open" : ""}`}>
        <div style={{ borderTop: "1px solid rgba(110,190,175,0.1)", margin: "12px 0 8px" }} />
        {playlist.map((trackIdx, pos) => {
          const t = musicList[trackIdx];
          if (!t) return null;
          const isActive = pos === queuePos;
          return (
            <div
              key={`${trackIdx}-${pos}`}
              className={`playlistItem ${isActive ? "active" : ""}`}
              onClick={() => playTrack(pos)}
            >
              <span style={{ width: 18, fontSize: 10, textAlign: "center", flexShrink: 0, opacity: 0.5 }}>
                {isActive ? "▶" : pos + 1}
              </span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.title}
              </span>
              <span style={{ fontSize: 10, opacity: 0.4, flexShrink: 0 }}>{t.artist}</span>
              <div className="moveBtn" style={{ display: "flex", gap: 2, marginLeft: 4 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); reorderPlaylist(pos, pos - 1); }}
                  className="modeBtn"
                  style={{ width: 20, height: 20 }}
                  disabled={pos === 0}
                  aria-label="上移"
                >
                  <ChevronUp size={11} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); reorderPlaylist(pos, pos + 1); }}
                  className="modeBtn"
                  style={{ width: 20, height: 20 }}
                  disabled={pos === playlist.length - 1}
                  aria-label="下移"
                >
                  <ChevronDown size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
