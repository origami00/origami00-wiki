import { Sparkles } from "lucide-react";
import { C, card } from "../tokens/design";
import { useContentManager } from "../hooks/useContentManager";

export default function LatestContent() {
  const { latest } = useContentManager();
  const tagColors: Record<string, { bg: string; color: string }> = {
    技术: { bg: "rgba(110,190,175,0.1)", color: "#5a9e8f" },
    AI: { bg: "rgba(150,130,200,0.1)", color: "#8b7bb8" },
    游戏: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
    前端: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
  };
  return (
    <section
      style={{
        ...card, padding: "20px",
        display: "flex", flexDirection: "column",
        background: "rgba(255,255,255,0.4)",
      }}
      aria-label="最新动态"
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.02em" }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(110,190,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={13} color={C.accent} />
        </div>
        最新动态
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "auto" }}>
        {latest.map((item, i) => {
          const tc = tagColors[item.tag] || { bg: "rgba(110,190,175,0.08)", color: "#6b8a80" };
          return (
            <a
              key={`${item.id ?? item.title}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 14,
                background: "rgba(255,255,255,0.4)",
                transition: "all 0.25s ease", textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateX(2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: tc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{item.date}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 7, background: tc.bg, color: tc.color, flexShrink: 0 }}>{item.tag}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
