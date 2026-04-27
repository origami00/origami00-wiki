import { Info } from "lucide-react";
import { card, iconMap } from "../tokens/design";
import { socialLinks } from "../data/siteData";

export default function SocialLinks() {
  return (
    <section className="socialLinks" style={{ ...card, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "14px 20px", background: "rgba(255,255,255,0.4)" }} aria-label="社交链接">
      {socialLinks.map((s) => {
        const Icon = iconMap[s.icon] ?? Info;
        return (
          <a
            key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            title={s.label} aria-label={`打开${s.label}主页`}
            style={{
              width: 48, height: 48, borderRadius: 14,
              background: s.bg, display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color, textDecoration: "none",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              boxShadow: "0 2px 8px rgba(100,160,145,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.06)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(100,160,145,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(100,160,145,0.04)";
            }}
          >
            {s.iconSrc ? (
              <img src={s.iconSrc} alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
            ) : (
              <Icon size={19} />
            )}
          </a>
        );
      })}
    </section>
  );
}
