import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { C, card } from "../tokens/design";
import { useClock } from "../hooks/useClock";
import { useCalendar } from "../hooks/useCalendar";

export default function ClockCard() {
  const { hours, minutes, seconds, dateStr } = useClock();
  const { days, year, monthName, goNext, goPrev } = useCalendar();
  const [showCalendar, setShowCalendar] = useState(false);
  const wd = ["一", "二", "三", "四", "五", "六", "日"];
  const navBtn = {
    width: 28, height: 28, borderRadius: 10,
    border: "none", background: "rgba(110,190,175,0.08)",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: C.accent, transition: "all 0.2s",
  };

  return (
    <section
      className="clockCard"
      style={{
        ...card, padding: "26px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.45)",
        position: "relative", minHeight: showCalendar ? 220 : undefined,
      }}
      aria-label="时钟卡片"
    >
      {showCalendar ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 14 }}>
            <button onClick={goPrev} className="navBtn" style={navBtn} aria-label="上个月">
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "0.02em" }}>
              {year}年 {monthName}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={goNext} className="navBtn" style={navBtn} aria-label="下个月">
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setShowCalendar(false)}
                className="navBtn"
                style={{ ...navBtn, background: "rgba(110,190,175,0.15)" }}
                aria-label="返回时钟"
              >
                <Clock size={13} />
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px 0", textAlign: "center", width: "100%" }}>
            {wd.map((w, i) => (
              <div key={w} style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 0", color: i >= 5 ? C.accent : C.textMuted }}>
                {w}
              </div>
            ))}
            {days.map((d, i) => (
              <div
                key={`day-${i}`}
                className="dayCell"
                style={{
                  fontSize: 12.5, borderRadius: 10, width: 30, height: 30,
                  margin: "2px auto", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: d?.isToday ? 600 : 400,
                  background: d?.isToday ? C.accent : "transparent",
                  color: d?.isToday ? "#fff" : d ? C.text : "transparent",
                  boxShadow: d?.isToday ? "0 2px 8px rgba(110,190,175,0.3)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {d ? d.day : ""}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
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
          <div
            onClick={() => setShowCalendar(true)}
            style={{
              fontSize: 12.5, color: C.textSec, marginTop: 10, fontWeight: 400,
              cursor: "pointer", borderRadius: 8, padding: "2px 8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.1)"; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSec; }}
            role="button"
            aria-label="打开日历"
          >
            {dateStr}
          </div>
          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, background: "rgba(110,190,175,0.08)", padding: "2px 10px", borderRadius: 8 }}>
            UTC+8
          </div>
        </>
      )}
    </section>
  );
}
