import { ExternalLink } from "lucide-react";
import { C, card } from "../tokens/design";
import { useContentManager } from "../hooks/useContentManager";

const statusColors: Record<string, { bg: string; color: string }> = {
  进行中: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
  已完成: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
  暂停: { bg: "rgba(200,180,140,0.1)", color: "#b8a070" },
};

export default function ProjectsPage() {
  const { projects } = useContentManager();
  return (
    <section
      style={{
        ...card, padding: "28px 24px",
        background: "rgba(255,255,255,0.45)",
        display: "flex", flexDirection: "column", gap: 16,
      }}
      aria-label="项目列表"
    >
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 4 }}>我的项目</h2>
        <p style={{ fontSize: 13, color: C.textMuted }}>展示当前正在推进的网页、工具和小游戏项目。</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((project) => {
          const sc = statusColors[project.status] ?? { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" };
          return (
            <div
              key={project.id}
              style={{
                padding: "20px 20px", borderRadius: 16,
                background: "rgba(255,255,255,0.45)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = C.shadowHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.45)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(110,190,175,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{project.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{project.title}</span>
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 7, background: sc.bg, color: sc.color }}>{project.status}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{project.description}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 6, background: "rgba(110,190,175,0.06)", color: C.textMuted }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{project.date}</span>
                  {project.url && (
                    <a
                      href={project.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        fontSize: 11, color: C.accent, textDecoration: "none",
                        padding: "4px 8px", borderRadius: 6,
                        background: "rgba(110,190,175,0.06)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.06)"; }}
                    >
                      链接
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
