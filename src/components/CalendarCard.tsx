import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, card } from "../tokens/design";
import { useCalendar } from "../hooks/useCalendar";

export default function CalendarCard() {
  const { days, year, monthName, goNext, goPrev } = useCalendar();
  const wd = ["一", "二", "三", "四", "五", "六", "日"];
  const nb = {
    width: 28, height: 28, borderRadius: 10,
    border: "none", background: "rgba(110,190,175,0.08)",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: C.accent, transition: "all 0.2s",
  };
  return (
    <section
      className="calendarCard"
      style={{
        ...card, padding: "18px 16px",
        display: "flex", flexDirection: "column",
        background: "rgba(255,255,255,0.4)",
      }}
      aria-label="日历"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={goPrev} className="navBtn" style={nb} aria-label="上个月">
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "0.02em" }}>
          {year}年 {monthName}
        </span>
        <button onClick={goNext} className="navBtn" style={nb} aria-label="下个月">
          <ChevronRight size={14} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px 0", textAlign: "center" }}>
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
    </section>
  );
}
