import type { LucideIcon } from "lucide-react";

export interface Profile {
  name: string;
  bio: string;
  status: "online" | "busy" | "away" | "developing";
  location: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
  bg: string;
  color: string;
  iconSrc?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export interface ContentItem {
  title: string;
  date: string;
  tag: string;
  emoji: string;
  url: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  duration: number;
  src: string;
}

export interface PhotoWallItem {
  title: string;
  src: string;
}

export interface SubPageLink {
  label: string;
  href: string;
}

export interface SubPageData {
  title: string;
  description: string;
  links: SubPageLink[];
}

export interface DesignTokens {
  accent: string;
  accentDark: string;
  accentBg: string;
  text: string;
  textSec: string;
  textMuted: string;
  card: string;
  cardHover: string;
  shadow: string;
  shadowHover: string;
}

export interface CardStyle {
  background: string;
  backdropFilter: string;
  WebkitBackdropFilter: string;
  borderRadius: number;
  boxShadow: string;
  overflow: string;
  transition: string;
}

export type IconMap = Record<string, LucideIcon>;

export type PageTitleMap = Record<string, string>;

export type SubPageIcons = Record<string, LucideIcon>;

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  emoji: string;
  content: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  emoji: string;
  status: "进行中" | "已完成" | "暂停";
  url?: string;
}
