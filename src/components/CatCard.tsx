import { useState } from "react";
import { C, card } from "../tokens/design";

interface CatCardProps {
  onOpen: () => void;
}

export default function CatCard({ onOpen }: CatCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onOpen}
      className="catCard"
      style={{
        ...card, width: "100%", position: "relative", border: "none",
        background: hov ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.4)",
        cursor: "pointer", padding: 0,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? C.shadowHover : C.shadow,
        overflow: "hidden",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="进入照片墙"
    >
      <div style={{
        position: "absolute", top: 14, left: 16, zIndex: 1,
        fontSize: 11, fontWeight: 500, color: C.textMuted,
        background: "rgba(255,255,255,0.7)", borderRadius: 999, padding: "4px 12px",
        backdropFilter: "blur(4px)",
      }}>
        进入照片墙
      </div>
      <img
        src="/Assets/照片墙资产/23417_86777360146.jpg"
        alt="照片墙封面"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 20 }}
      />
    </button>
  );
}
