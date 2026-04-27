import { C, card } from "../tokens/design";
import { useClock } from "../hooks/useClock";

export default function ClockCard() {
  const { hours, minutes, seconds, dateStr } = useClock();
  return (
    <section
      className="clockCard"
      style={{
        ...card, padding: "26px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.45)",
      }}
      aria-label="时钟卡片"
    >
      <div className="clockTime" style={{
        fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', 'Inter', monospace",
        fontSize: 44, fontWeight: 300, color: C.text,
        letterSpacing: 4, lineHeight: 1,
      }}>
        {hours}
        <span style={{ color: C.accent, animation: "blink 1s step-end infinite", fontWeight: 300 }}>:</span>
        {minutes}
      </div>
      <div className="clockSeconds" style={{ fontFamily: "'SF Mono', monospace", fontSize: 16, color: C.textMuted, marginTop: 6, fontWeight: 400, letterSpacing: 3, opacity: 0.7 }}>{seconds}</div>
      <div style={{ fontSize: 12.5, color: C.textSec, marginTop: 10, fontWeight: 400 }}>{dateStr}</div>
      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, background: "rgba(110,190,175,0.08)", padding: "2px 10px", borderRadius: 8 }}>
        UTC+8
      </div>
    </section>
  );
}
