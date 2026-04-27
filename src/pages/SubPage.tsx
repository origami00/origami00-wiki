import { ExternalLink, Info } from "lucide-react";
import { subPageContent } from "../data/siteData";
import type { CardStyle, DesignTokens, SubPageIcons } from "../types";

interface SubPageProps {
  page: string;
  cardStyle: CardStyle;
  colors: DesignTokens;
  iconMap: SubPageIcons;
  onBack: () => void;
}

export default function SubPage({ page, cardStyle, colors, iconMap, onBack }: SubPageProps) {
  const content = subPageContent[page] ?? {
    title: "未知页面",
    description: "当前页面不存在，请返回首页继续浏览。",
    links: [],
  };
  const Icon = iconMap[page] ?? Info;

  return (
    <section
      style={{
        ...cardStyle,
        height: "100%",
        minHeight: 500,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.45)",
      }}
      aria-label={`${content.title}页面`}
    >
      <div
        style={{
          width: 64, height: 64, borderRadius: 20,
          background: "rgba(110,190,175,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18,
          boxShadow: "0 4px 16px rgba(110,190,175,0.1)",
        }}
      >
        <Icon size={28} color={colors.accent} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.text, marginBottom: 8, letterSpacing: "0.01em" }}>{content.title}</h2>
      <p style={{ fontSize: 13.5, color: colors.textSec, marginBottom: 20, textAlign: "center", maxWidth: 480, lineHeight: 1.6 }}>
        {content.description}
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 26 }}>
        {content.links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, textDecoration: "none",
              color: colors.accent,
              background: "rgba(110,190,175,0.08)",
              borderRadius: 10, padding: "8px 14px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(110,190,175,0.08)"; e.currentTarget.style.transform = ""; }}
          >
            {item.label}
            <ExternalLink size={12} />
          </a>
        ))}
      </div>
      <button
        onClick={onBack}
        style={{
          padding: "10px 26px", borderRadius: 14, border: "none",
          background: colors.accent, color: "#fff",
          fontWeight: 500, fontSize: 13.5, cursor: "pointer",
          boxShadow: `0 4px 14px ${colors.accent}35`,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${colors.accent}45`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 14px ${colors.accent}35`; }}
        aria-label="返回首页"
      >
        返回首页
      </button>
    </section>
  );
}
