import { C } from "../tokens/design";

interface StatusBadgeProps {
  status: "online" | "busy" | "away" | "developing";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const m = { online: ["#5cb89e", "在线"], busy: ["#e07070", "忙碌"], away: ["#d4b060", "离开"], developing: ["#6ebeaf", "开发中"] };
  const [color, label] = m[status] || m.online;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5,
      color: C.textSec, background: `${color}12`, padding: "3px 10px 3px 8px",
      borderRadius: 20, fontWeight: 500,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}40` }} />
      {label}
    </span>
  );
}
