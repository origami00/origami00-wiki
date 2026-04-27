import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Heart,
  Home,
  Info,
  MapPin,
  Music,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Tv,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  latestContent,
  musicList,
  navigation,
  profile,
  socialLinks,
} from "./data/siteData";
import PhotoWallPage from "./pages/PhotoWallPage";
import SubPage from "./pages/SubPage";
import type { DesignTokens, CardStyle, IconMap, PageTitleMap, SubPageIcons } from "./types";

const iconMap: IconMap = { Github: Code2, Tv, Music2, Home, FileText, Sparkles, Info, Heart };

const C: DesignTokens = {
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

const card: CardStyle = {
  background: C.card,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 20,
  boxShadow: C.shadow,
  overflow: "hidden",
  transition: "box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease",
};

interface ClockResult {
  hours: string;
  minutes: string;
  seconds: string;
  dateStr: string;
  greeting: string;
}

function useClock(): ClockResult {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours();
  const hours = String(h).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const dateStr = `${time.getMonth() + 1}月${time.getDate()}日 ${weekdays[time.getDay()]}`;
  const greeting = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  return { hours, minutes, seconds, dateStr, greeting };
}

interface CalendarDay {
  day: number;
  isToday: boolean;
}

interface CalendarResult {
  days: (CalendarDay | null)[];
  year: number;
  monthName: string;
  goNext: () => void;
  goPrev: () => void;
}

function useCalendar(): CalendarResult {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i += 1) days.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    days.push({ day: d, isToday: d === today.getDate() && month === today.getMonth() && year === today.getFullYear() });
  }

  const monthName = new Intl.DateTimeFormat("zh-CN", { month: "long" }).format(viewDate);
  return {
    days, year, monthName,
    goNext: () => setOffset((old) => old + 1),
    goPrev: () => setOffset((old) => old - 1),
  };
}

interface AudioPlayerResult {
  track: { title: string; artist: string; duration: number };
  playing: boolean;
  progress: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (pct: number) => void;
  elapsedStr: string;
  totalStr: string;
}

function useAudioPlayer(): AudioPlayerResult {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      ref.current = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) { setPlaying(false); return 0; }
          return old + 100 / (musicList[trackIdx]?.duration ?? 198);
        });
      }, 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [playing, trackIdx]);

  const track = musicList[trackIdx] ?? musicList[0]!;
  const elapsed = Math.floor((progress / 100) * track.duration);
  const fmt = (s: number): string => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return {
    track, playing, progress,
    toggle: () => setPlaying((old) => !old),
    next: () => { setTrackIdx((i) => (i + 1) % musicList.length); setProgress(0); setPlaying(false); },
    prev: () => { setTrackIdx((i) => (i - 1 + musicList.length) % musicList.length); setProgress(0); setPlaying(false); },
    seek: (pct: number) => setProgress(pct),
    elapsedStr: fmt(elapsed),
    totalStr: fmt(track.duration),
  };
}

interface StatusBadgeProps {
  status: "online" | "busy" | "away" | "developing";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
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
};

interface AvatarProps {
  size?: number;
  className?: string;
}

const Avatar = ({ size = 64, className }: AvatarProps) => (
  <div
    className={className}
    style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(145deg, #b8e6d8, #8dd0bc, #6ebeaf)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.42, border: "3px solid rgba(255,255,255,0.8)",
      boxShadow: "0 4px 16px rgba(110,190,175,0.25)",
      flexShrink: 0,
    }}
    aria-hidden="true"
  >
    😺
  </div>
);

const CatSitting = () => (
  <svg viewBox="0 0 200 210" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.05))" }}>
    <defs>
      <radialGradient id="gc" cx="50%" cy="95%">
        <stop offset="0%" stopColor="#a8e6cf" stopOpacity=".5" />
        <stop offset="100%" stopColor="#a8e6cf" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="190" rx="60" ry="10" fill="url(#gc)" />
    <ellipse cx="100" cy="148" rx="38" ry="36" fill="#ffecd2" />
    <circle cx="100" cy="95" r="32" fill="#fff5e6" />
    <polygon points="74,78 80,50 90,74" fill="#fff5e6" />
    <polygon points="110,74 120,50 126,78" fill="#fff5e6" />
    <polygon points="76,76 81,55 88,73" fill="#ffb6b9" opacity=".3" />
    <polygon points="112,73 119,55 124,76" fill="#ffb6b9" opacity=".3" />
    <ellipse cx="88" cy="92" rx="3.5" ry="4" fill="#2d3436" />
    <ellipse cx="112" cy="92" rx="3.5" ry="4" fill="#2d3436" />
    <ellipse cx="89" cy="91" rx="1.3" ry="1.6" fill="#fff" />
    <ellipse cx="113" cy="91" rx="1.3" ry="1.6" fill="#fff" />
    <ellipse cx="100" cy="100" rx="2.5" ry="1.8" fill="#ffb6b9" />
    <path d="M95,103 Q100,107 105,103" fill="none" stroke="#d4c5b0" strokeWidth=".8" />
    <ellipse cx="78" cy="98" rx="6" ry="3.5" fill="#ffb6b9" opacity=".18" />
    <ellipse cx="122" cy="98" rx="6" ry="3.5" fill="#ffb6b9" opacity=".18" />
    <circle cx="108" cy="68" r="4.5" fill="#ffd93d" />
    <circle cx="105" cy="65" r="2.5" fill="#ff6b6b" opacity=".45" />
    <circle cx="111" cy="65" r="2.5" fill="#ff6b6b" opacity=".45" />
    <circle cx="108" cy="62" r="2.5" fill="#ff6b6b" opacity=".45" />
    <path d="M136,145 Q155,125 148,105 Q144,95 152,88" fill="none" stroke="#ffecd2" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="80" cy="174" rx="12" ry="7" fill="#fff5e6" />
    <ellipse cx="120" cy="174" rx="12" ry="7" fill="#fff5e6" />
  </svg>
);

function UserSidebar() {
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

interface ProfileCardProps {
  greeting: string;
}

function ProfileCard({ greeting }: ProfileCardProps) {
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

function ClockCard() {
  const { hours, minutes, seconds, dateStr } = useClock();
  return (
    <section
      className="clockCard"
      style={{
        ...card, padding: "26px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.45)",
      }}
      aria-label="时钟卡片"
    >
      <div className="clockTime" style={{
        fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', 'Inter', monospace",
        fontSize: 44, fontWeight: 300, color: C.text,
        letterSpacing: 4, lineHeight: 1,
      }}>
        {hours}
        <span style={{ color: C.accent, animation: "blink 1s step-end infinite", fontWeight: 300 }}>:</span>
        {minutes}
      </div>
      <div className="clockSeconds" style={{ fontFamily: "'SF Mono', monospace", fontSize: 16, color: C.textMuted, marginTop: 6, fontWeight: 400, letterSpacing: 3, opacity: 0.7 }}>{seconds}</div>
      <div style={{ fontSize: 12.5, color: C.textSec, marginTop: 10, fontWeight: 400 }}>{dateStr}</div>
      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, background: "rgba(110,190,175,0.08)", padding: "2px 10px", borderRadius: 8 }}>
        UTC+8
      </div>
    </section>
  );
}

interface CatCardProps {
  onOpen: () => void;
}

function CatCard({ onOpen }: CatCardProps) {
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

function SocialLinks() {
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
            <Icon size={19} />
          </a>
        );
      })}
    </section>
  );
}

function CalendarCard() {
  const { days, year, monthName, goNext, goPrev } = useCalendar();
  const wd = ["一", "二", "三", "四", "五", "六", "日"];
  const nb = {
    width: 28, height: 28, borderRadius: 10,
    border: "none", background: "rgba(110,190,175,0.08)",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: C.accent, transition: "all 0.2s",
  };
  return (
    <section
      className="calendarCard"
      style={{
        ...card, padding: "18px 16px",
        display: "flex", flexDirection: "column",
        background: "rgba(255,255,255,0.4)",
      }}
      aria-label="日历"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={goPrev} className="navBtn" style={nb} aria-label="上个月">
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "0.02em" }}>
          {year}年 {monthName}
        </span>
        <button onClick={goNext} className="navBtn" style={nb} aria-label="下个月">
          <ChevronRight size={14} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px 0", textAlign: "center" }}>
        {wd.map((w, i) => (
          <div key={w} style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 0", color: i >= 5 ? C.accent : C.textMuted }}>
            {w}
          </div>
        ))}
        {days.map((d, i) => (
          <div
            key={`day-${i}`}
            className="dayCell"
            style={{
              fontSize: 12.5, borderRadius: 10, width: 30, height: 30,
              margin: "2px auto", display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: d?.isToday ? 600 : 400,
              background: d?.isToday ? C.accent : "transparent",
              color: d?.isToday ? "#fff" : d ? C.text : "transparent",
              boxShadow: d?.isToday ? "0 2px 8px rgba(110,190,175,0.3)" : "none",
              transition: "all 0.2s",
            }}
          >
            {d ? d.day : ""}
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestContent() {
  const tagColors: Record<string, { bg: string; color: string }> = {
    技术: { bg: "rgba(110,190,175,0.1)", color: "#5a9e8f" },
    AI: { bg: "rgba(150,130,200,0.1)", color: "#8b7bb8" },
    游戏: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
    前端: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
  };
  return (
    <section
      style={{
        ...card, padding: "20px",
        display: "flex", flexDirection: "column",
        background: "rgba(255,255,255,0.4)",
      }}
      aria-label="最新动态"
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.02em" }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(110,190,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={13} color={C.accent} />
        </div>
        最新动态
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "auto" }}>
        {latestContent.map((item, i) => {
          const tc = tagColors[item.tag] || { bg: "rgba(110,190,175,0.08)", color: "#6b8a80" };
          return (
            <a
              key={`${item.title}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 14,
                background: "rgba(255,255,255,0.4)",
                transition: "all 0.25s ease", textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateX(2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: tc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{item.date}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 7, background: tc.bg, color: tc.color, flexShrink: 0 }}>{item.tag}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function MusicPlayer() {
  const { track, playing, progress, toggle, next, prev, seek, elapsedStr, totalStr } = useAudioPlayer();
  const [hov, setHov] = useState(false);
  return (
    <section
      className="musicPlayer"
      style={{
        ...card, padding: "22px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.4)",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? C.shadowHover : C.shadow,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="音乐播放器"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div
          className="disc"
          style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0, position: "relative",
            background: `conic-gradient(from 0deg, ${C.accent}40, ${C.accent}80, ${C.accent}, ${C.accent}80, ${C.accent}40)`,
            animation: playing ? "spin 3s linear infinite" : "none",
            boxShadow: playing ? `0 4px 16px ${C.accent}30` : "0 2px 8px rgba(0,0,0,0.04)",
          }}
          aria-hidden="true"
        >
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 18, height: 18, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Music size={8} color={C.accent} />
          </div>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
          <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 2 }}>{track.artist}</div>
        </div>
      </div>
      <input
        type="range" min={0} max={100} step={0.1} value={progress}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="播放进度"
        style={{ width: "100%", marginBottom: 6 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, marginBottom: 12 }}>
        <span>{elapsedStr}</span>
        <span>{totalStr}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <button onClick={prev} className="ctrlBtn" style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "rgba(110,190,175,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.accent, transition: "all 0.2s",
        }} aria-label="上一首">
          <SkipBack size={13} />
        </button>
        <button onClick={toggle} className="ctrlBtn ctrlBtnMain" style={{
          width: 40, height: 40, borderRadius: 14, border: "none",
          background: C.accent, color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 14px ${C.accent}40`,
          transition: "all 0.2s",
        }} aria-label={playing ? "暂停播放" : "开始播放"}>
          {playing ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>
        <button onClick={next} className="ctrlBtn" style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "rgba(110,190,175,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.accent, transition: "all 0.2s",
        }} aria-label="下一首">
          <SkipForward size={13} />
        </button>
      </div>
    </section>
  );
}

const subPageIcons: SubPageIcons = {
  "/articles": FileText,
  "/projects": Sparkles,
  "/about": Info,
  "/recommendations": Heart,
};

const pageTitleMap: PageTitleMap = {
  "/": "origami00-wiki",
  "/photo-wall": "照片墙 - origami00-wiki",
  "/articles": "我的文章 - origami00-wiki",
  "/projects": "我的项目 - origami00-wiki",
  "/about": "关于网站 - origami00-wiki",
  "/recommendations": "推荐分享 - origami00-wiki",
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  const home = page === "/";
  const photoWall = page === "/photo-wall";
  const { greeting } = useClock();

  useEffect(() => {
    document.title = pageTitleMap[page] || "origami00-wiki";
  }, [page]);

  return (
    <div
      className="appRoot"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5fffe 0%, #eafff7 30%, #edfff4 60%, #f4fffa 100%)",
        padding: "24px 20px",
        display: "flex", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeSwitch { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes cardFadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }

        .layoutGrid {
          width: 100%;
          max-width: 1040px;
          animation: fadeSwitch .4s ease;
        }
        .layoutHome {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }
        .layoutSub {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }
        .layoutPhoto {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }

        .sideNavBtn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 11px;
          border-radius: 11px;
          cursor: pointer;
          color: ${C.textSec};
          font-size: 13px;
          text-align: left;
          width: 100%;
          text-decoration: none;
          transition: all 0.25s ease;
          font-weight: 400;
        }
        .sideNavBtn:hover {
          background: rgba(110,190,175,0.08);
          color: ${C.accent};
        }
        .sideNavBtn.active {
          background: rgba(110,190,175,0.12);
          color: ${C.accent};
          font-weight: 500;
        }

        .catCard { transition: transform .28s ease, box-shadow .28s ease; }

        .photoWallGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .photoWallItem {
          margin: 0;
          overflow: hidden;
          border-radius: 16px;
          background: rgba(255,255,255,0.5);
          box-shadow: 0 2px 12px rgba(100,160,145,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .photoWallItem:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(100,160,145,0.12);
        }
        .photoWallItem img {
          width: 100%;
          height: 170px;
          object-fit: cover;
          display: block;
        }
        .photoWallItem figcaption {
          padding: 10px 12px;
          font-size: 12.5px;
          color: ${C.textSec};
          font-weight: 400;
        }

        @media (max-width: 1100px) {
          .layoutHome { grid-template-columns: 170px 1fr; }
          .layoutSub { grid-template-columns: 170px 1fr; }
          .layoutPhoto { grid-template-columns: 170px 1fr; }
        }

        @media (max-width: 860px) {
          .layoutGrid { max-width: 560px; }
          .layoutHome {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .layoutSub {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .layoutPhoto {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .userSidebar { padding: 12px 10px !important; }
          .sideProfile { margin-bottom: 8px !important; }
          .sideNavList {
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 6px !important;
            padding-bottom: 2px;
          }
          .sideNavBtn {
            width: auto !important;
            white-space: nowrap;
            min-width: fit-content;
            padding: 7px 11px !important;
            font-size: 12.5px !important;
          }
          .masonryColumns { column-count: 1 !important; }
          .photoWallGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 520px) {
          .layoutGrid { gap: 10px; }
          .masonryColumns { column-gap: 10px; }
          .masonryColumns > * { margin-bottom: 10px; }
          .photoWallGrid { grid-template-columns: 1fr; }
          .photoWallItem img { height: 190px; }
        }

        @media (max-width: 480px) {
          .appRoot { padding: 14px 10px !important; }
          .profileCard { padding: 20px 16px !important; }
          .profileCard .profileInfo { flex-direction: column; align-items: flex-start; gap: 14px; }
          .profileCard .avatar { width: 56px !important; height: 56px !important; min-width: 56px !important; }
          .clockCard { padding: 20px 14px !important; }
          .clockCard .clockTime { font-size: 32px !important; letter-spacing: 2px !important; }
          .clockCard .clockSeconds { font-size: 13px !important; }
          .socialLinks { flex-wrap: wrap !important; gap: 10px !important; padding: 12px 14px !important; }
          .socialLinks a { width: 42px !important; height: 42px !important; border-radius: 12px !important; }
          .calendarCard { padding: 14px 12px !important; }
          .calendarCard .dayCell { width: 26px !important; height: 26px !important; font-size: 11.5px !important; }
          .calendarCard .navBtn { width: 24px !important; height: 24px !important; }
          .musicPlayer { padding: 16px !important; }
          .musicPlayer .disc { width: 40px !important; height: 40px !important; }
          .musicPlayer .ctrlBtn { width: 30px !important; height: 30px !important; }
          .musicPlayer .ctrlBtnMain { width: 36px !important; height: 36px !important; }
          .sideNavBtn { font-size: 12px !important; padding: 6px 9px !important; }
          .sideNavBtn svg { width: 14px !important; height: 14px !important; }
        }
      `}</style>

      <main className={`layoutGrid ${home ? "layoutHome" : photoWall ? "layoutPhoto" : "layoutSub"}`}>
        <h1 className="srOnly">origami00-wiki 个人站</h1>
        <div style={{ ...(home || photoWall ? {} : { minHeight: 500 }) }}>
          <UserSidebar />
        </div>
        {home ? (
          <div className="masonryColumns">
            <div className="cardStagger" style={{ animationDelay: "0s" }}>
              <ProfileCard greeting={greeting} />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.06s" }}>
              <CatCard onOpen={() => navigate("/photo-wall")} />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.12s" }}>
              <CalendarCard />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.18s" }}>
              <SocialLinks />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.24s" }}>
              <ClockCard />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.3s" }}>
              <LatestContent />
            </div>
            <div className="cardStagger" style={{ animationDelay: "0.36s" }}>
              <MusicPlayer />
            </div>
          </div>
        ) : photoWall ? (
          <PhotoWallPage cardStyle={card} colors={C} onBack={() => navigate("/")} />
        ) : (
          <SubPage page={page} cardStyle={card} colors={C} iconMap={subPageIcons} onBack={() => navigate("/")} />
        )}
      </main>
    </div>
  );
}
