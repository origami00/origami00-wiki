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
      aria-label="照片墙"
    >

      <img
        src="/static/照片墙资产/23417_86777360146.jpg"
        alt="照片墙封面"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 20 }}
      />
    </button>
  );
}
