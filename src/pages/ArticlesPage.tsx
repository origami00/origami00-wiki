import { useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { C, card } from "../tokens/design";
import { useContentManager } from "../hooks/useContentManager";
import type { Article } from "../types";

function ArticleDetail({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <section
      className="articleDetail"
      style={{
        ...card, padding: "32px 28px",
        background: "rgba(255,255,255,0.45)",
        display: "flex", flexDirection: "column", gap: 18,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: C.accent, background: "rgba(110,190,175,0.08)",
          border: "none", borderRadius: 10, padding: "8px 14px",
          cursor: "pointer", transition: "all 0.2s", alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.15)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.08)"; }}
      >
        <ArrowLeft size={14} />
        返回列表
      </button>
      <div>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>{article.date}</div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 8 }}>{article.emoji} {article.title}</h2>
        <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 7, background: "rgba(110,190,175,0.1)", color: C.accent }}>{article.tag}</span>
      </div>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
        {article.content}
      </div>
      {article.url && (
        <a
          href={article.url} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, color: C.accent, background: "rgba(110,190,175,0.08)",
            borderRadius: 10, padding: "8px 14px", textDecoration: "none",
            transition: "all 0.2s", alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.08)"; e.currentTarget.style.transform = ""; }}
        >
          查看参考链接
          <ExternalLink size={12} />
        </a>
      )}
    </section>
  );
}

export default function ArticlesPage() {
  const { articles } = useContentManager();
  const [selected, setSelected] = useState<Article | null>(null);

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />;
  }

  const tagColors: Record<string, { bg: string; color: string }> = {
    前端: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
    AI: { bg: "rgba(150,130,200,0.1)", color: "#8b7bb8" },
    游戏: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
  };

  return (
    <section
      style={{
        ...card, padding: "28px 24px",
        background: "rgba(255,255,255,0.45)",
        display: "flex", flexDirection: "column", gap: 16,
      }}
      className="articlesPage"
      aria-label="文章列表"
    >
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 4 }}>我的文章</h2>
        <p style={{ fontSize: 13, color: C.textMuted }}>前端开发、AI 工具链与创作实践的文章目录。</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {articles.map((article) => {
          const tc = tagColors[article.tag] || { bg: "rgba(110,190,175,0.08)", color: "#6b8a80" };
          return (
            <button
              key={article.id}
              className="articleItem"
              onClick={() => setSelected(article)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", borderRadius: 16,
                background: "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", textAlign: "left",
                transition: "all 0.25s ease", width: "100%",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = C.shadowHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.45)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: tc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{article.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 3 }}>{article.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{article.summary}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 7, background: tc.bg, color: tc.color }}>{article.tag}</span>
                <span style={{ fontSize: 11, color: C.textMuted }}>{article.date}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
