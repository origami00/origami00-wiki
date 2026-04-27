import { useState } from "react";
import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { C, card } from "../tokens/design";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

export default function MusicPlayer() {
  const { track, playing, progress, toggle, next, prev, seek, elapsedStr, totalStr } = useAudioPlayer();
  const [hov, setHov] = useState(false);
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
    </section>
  );
}
