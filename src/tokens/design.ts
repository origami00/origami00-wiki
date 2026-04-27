import { Code2, FileText, Heart, Home, Info, Music2, Settings, Sparkles, Tv } from "lucide-react";
import type { CardStyle, DesignTokens, IconMap } from "../types";

export const C: DesignTokens = {
  accent: "#6ebeaf",
  accentDark: "#5a9e8f",
  accentBg: "rgba(110,190,175,0.08)",
  text: "#2d3a36",
  textSec: "#6b8a80",
  textMuted: "#9db5ac",
  card: "rgba(255,255,255,0.55)",
  cardHover: "rgba(255,255,255,0.68)",
  shadow: "0 2px 16px rgba(100,160,145,0.06)",
  shadowHover: "0 8px 28px rgba(100,160,145,0.12)",
};

export const card: CardStyle = {
  background: C.card,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 20,
  boxShadow: C.shadow,
  overflow: "hidden",
  transition: "box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease",
};

export const iconMap: IconMap = {
  Github: Code2,
  Tv,
  Music2,
  Home,
  FileText,
  Sparkles,
  Info,
  Heart,
  Settings,
};
