import { useState } from "react";
import { MapPin } from "lucide-react";
import { C, card } from "../tokens/design";
import { profile } from "../data/siteData";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

interface ProfileCardProps {
  greeting: string;
}

export default function ProfileCard({ greeting }: ProfileCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <section
      className="profileCard"
      style={{
        ...card, padding: "28px 26px",
        background: hov ? C.cardHover : C.card,
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? C.shadowHover : C.shadow,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="个人信息"
    >
      <div style={{ fontSize: 13, color: C.accent, fontWeight: 500, marginBottom: 14, letterSpacing: "0.03em" }}>
        {greeting}, Nice to meet you!
      </div>
      <div className="profileInfo" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Avatar size={72} className="avatar" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: C.text, letterSpacing: "0.01em" }}>{profile.name}</span>
            <StatusBadge status={profile.status} />
          </div>
          <p style={{ fontSize: 13.5, color: C.textSec, margin: "0 0 10px", lineHeight: 1.6 }}>{profile.bio}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.textMuted, background: "rgba(110,190,175,0.08)", padding: "4px 12px", borderRadius: 8 }}>
            <MapPin size={12} />
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
