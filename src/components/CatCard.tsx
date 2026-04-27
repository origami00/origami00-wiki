import { useState } from "react";
import { C, card } from "../tokens/design";
import CatSitting from "./CatSitting";

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
        cursor: "pointer", padding: 14,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? C.shadowHover : C.shadow,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="进入照片墙"
    >
      <div style={{
        position: "absolute", top: 14, left: 16,
        fontSize: 11, fontWeight: 500, color: C.textMuted,
        background: "rgba(255,255,255,0.7)", borderRadius: 999, padding: "4px 12px",
        backdropFilter: "blur(4px)",
      }}>
        进入照片墙
      </div>
      <div style={{ height: "100%", width: "100%", borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.4)" }}>
        <CatSitting />
      </div>
    </button>
  );
}
