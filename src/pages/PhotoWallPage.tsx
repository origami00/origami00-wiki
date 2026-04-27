import { photoWallItems } from "../data/siteData";
import type { CardStyle, DesignTokens } from "../types";

interface PhotoWallPageProps {
  cardStyle: CardStyle;
  colors: DesignTokens;
  onBack: () => void;
}

export default function PhotoWallPage({ cardStyle, colors, onBack }: PhotoWallPageProps) {
  return (
    <section
      style={{
        ...cardStyle,
        minHeight: 500,
        padding: "24px 20px 18px",
        background: "rgba(255,255,255,0.45)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
      aria-label="照片墙页面"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.text, marginBottom: 4, letterSpacing: "0.01em" }}>照片墙</h2>
          <p style={{ fontSize: 12.5, color: colors.textMuted }}>收藏生活片段，点击可替换为你的真实图片地址。</p>
        </div>
        <button
          onClick={onBack}
          style={{
            padding: "9px 18px", borderRadius: 12, border: "none",
            background: colors.accent, color: "#fff",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            boxShadow: `0 4px 14px ${colors.accent}35`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${colors.accent}45`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 14px ${colors.accent}35`; }}
          aria-label="返回首页"
        >
          返回首页
        </button>
      </div>
      <div className="photoWallGrid">
        {photoWallItems.map((item, index) => (
          <figure key={item.title + index} className="photoWallItem">
            <img src={item.src} alt={item.title} loading="lazy" />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
