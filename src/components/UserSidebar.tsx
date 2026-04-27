import { Info } from "lucide-react";
import { NavLink } from "react-router-dom";
import { C, card, iconMap } from "../tokens/design";
import { navigation, profile } from "../data/siteData";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

export default function UserSidebar() {
  return (
    <aside
      className="userSidebar"
      style={{
        ...card, height: "100%",
        display: "flex", flexDirection: "column",
        padding: "20px 14px 14px",
        background: "rgba(255,255,255,0.4)",
      }}
    >
      <div className="sideProfile" style={{ textAlign: "center", marginBottom: 16 }}>
        <Avatar size={48} />
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginTop: 8, letterSpacing: "0.02em" }}>{profile.name}</div>
        <div style={{ marginTop: 5 }}>
          <StatusBadge status={profile.status} />
        </div>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(110,190,175,0.2), transparent)", marginBottom: 12 }} />
      <nav className="sideNavList" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, overflow: "auto" }} aria-label="主导航">
        {navigation.map((item) => {
          const Icon = iconMap[item.icon] ?? Info;
          return (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => `sideNavBtn ${isActive ? "active" : ""}`} aria-label={`进入${item.label}`}>
              <Icon size={15} style={{ opacity: 0.7 }} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
