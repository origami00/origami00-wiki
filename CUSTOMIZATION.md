# 个性化修改指南

本文档列出所有可自定义修改的部分，帮助你快速打造专属个人主页。

> **技术栈**：React 18 + TypeScript + Vite 5 + React Router 6 + Lucide React

---

## 📁 项目结构

```
src/
├── main.tsx                        ← 路由入口（嵌套路由 + 懒加载）
├── tokens/
│   └── design.ts                   ← ⭐ 设计令牌（色彩、卡片样式、图标映射）
├── data/
│   ├── siteData.ts                 ← ⭐ 集中数据层（个人信息、导航、音乐、照片）
│   ├── articlesData.ts             ← 文章数据
│   └── projectsData.ts             ← 项目数据
├── types/
│   └── index.ts                    ← TypeScript 类型定义
├── hooks/
│   ├── useClock.ts                 ← 时钟 + 问候语
│   ├── useCalendar.ts              ← 日历导航
│   └── useAudioPlayer.ts           ← 音频播放器
├── components/                     ← 13 个独立组件
├── layouts/
│   └── MainLayout.tsx              ← 主布局（CSS + sidebar + Outlet）
├── pages/                          ← 5 个页面组件
└── index.css                       ← 全局样式（字体、滚动条、瀑布流）
```

---

## 🥇 核心数据层：`src/data/siteData.ts`

一个文件搞定大部分个性化内容。

### 1. 个人信息

```ts
export const profile: Profile = {
  name: "小猫咪",                              // 名字
  bio: "全栈开发 · 插画爱好者 · 游戏设计探索中",   // 简介
  status: "developing",                         // 状态：online / busy / away / developing
  location: "中国",                             // 所在地
};
```

### 2. 社交链接

```ts
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",                      // 显示名称
    icon: "Github",                       // 图标名（对应 iconMap）
    href: "https://github.com/",          // 个人主页地址
    bg: "rgba(110,190,175,0.08)",        // 按钮背景色
    color: "#5a9e8f",                     // 图标颜色
  },
  // 可增删改条目
];
```

### 3. 导航菜单

```ts
export const navigation: NavItem[] = [
  { label: "首页", icon: "Home", href: "/" },
  { label: "我的文章", icon: "FileText", href: "/articles" },
  { label: "我的项目", icon: "Sparkles", href: "/projects" },
  { label: "关于网站", icon: "Info", href: "/about" },
  { label: "推荐分享", icon: "Heart", href: "/recommendations" },
];
```

### 4. 最新动态

```ts
export const latestContent: ContentItem[] = [
  {
    title: "用 Next.js 搭建个人主页",     // 标题
    date: "2026-04-12",                   // 日期
    tag: "技术",                           // 标签（技术 / AI / 游戏 / 前端）
    emoji: "⚡",                           // 前缀 emoji
    url: "https://nextjs.org/docs",       // 外部链接
  },
  // 可增删改条目
];
```

### 5. 音乐列表

```ts
export const musicList: MusicTrack[] = [
  { title: "春日散步", artist: "轻音乐集", duration: 198 },
  { title: "午后阳光", artist: "钢琴曲", duration: 243 },
  { title: "星空下", artist: "氛围音乐", duration: 312 },
];
```

音乐文件放置在 `public/Assets/音乐/` 目录下（mp3 格式），共 12 首。

### 6. 照片墙

```ts
export const photoWallItems: PhotoWallItem[] = [
  { title: "街头随拍", src: "/Assets/照片墙资产/photo1.jpg" },
  // 替换 src 为真实图片地址即可
];
```

### 7. 子页面内容

```ts
export const subPageContent: Record<string, SubPageData> = {
  "/about": {
    title: "关于网站",
    description: "这是一个基于 React 18+ 构建的个人站点，持续迭代中。",
    links: [
      { label: "技术栈说明", href: "https://vite.dev/" },
      { label: "界面图标库", href: "https://lucide.dev/" },
    ],
  },
  "/recommendations": { /* ... */ },
};
```

---

## 🥈 文章与项目数据

### 文章：`src/data/articlesData.ts`

```ts
export const articles: Article[] = [
  {
    id: "1",
    title: "React 18 新特性速览",
    summary: "简要概述",
    date: "2026-04-20",
    tag: "前端",
    emoji: "⚡",
    content: "文章完整内容（Markdown 或纯文本）",
    url: "https://react.dev/blog/2022/03/29/react-v18",  // 可选
  },
  // 可增删改条目
];
```

### 项目：`src/data/projectsData.ts`

```ts
export const projects: Project[] = [
  {
    id: "1",
    title: "origami00-wiki",
    description: "项目描述",
    date: "2026-04",
    tags: ["React", "Vite", "TypeScript"],
    emoji: "🐱",
    status: "进行中",    // 进行中 / 已完成 / 暂停
    url: "https://github.com/origami0/origami00-wiki",  // 可选
  },
  // 可增删改条目
];
```

---

## 🥉 设计令牌：`src/tokens/design.ts`

修改色彩主题只需改这个文件，所有组件自动联动。

### 色彩体系

```ts
export const C: DesignTokens = {
  accent: "#6ebeaf",              // 主色调（薄荷绿）
  accentDark: "#5a9e8f",          // hover 状态色
  accentBg: "rgba(110,190,175,0.08)",
  text: "#2d3a36",                // 主文字色
  textSec: "#6b8a80",             // 次级文字色
  textMuted: "#9db5ac",           // 辅助文字色
  card: "rgba(255,255,255,0.55)", // 卡片背景
  cardHover: "rgba(255,255,255,0.68)",
  shadow: "0 2px 16px rgba(100,160,145,0.06)",
  shadowHover: "0 8px 28px rgba(100,160,145,0.12)",
};
```

### 图标映射

```ts
export const iconMap: IconMap = {
  Github: Code2, Tv, Music2, Home, FileText, Sparkles, Info, Heart,
};
```

---

## 🔧 组件级自定义

### 头像：`src/components/Avatar.tsx`

```tsx
// 修改头像图片路径
const imgSrc = "/Assets/头像/youhuxiantiao.jpg";
```

将你的头像图片放入 `public/Assets/头像/` 目录，修改 `imgSrc` 路径即可。

### 页面标题：`src/layouts/MainLayout.tsx`

```ts
const pageTitleMap: PageTitleMap = {
  "/": "origami00-wiki",                      // 改成你的站点名
  "/photo-wall": "照片墙 - origami00-wiki",
  "/articles": "我的文章 - origami00-wiki",
  // ...
};
```

### 问候语：`src/hooks/useClock.ts`

```ts
const greeting = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
// 可改为中文：早上好 / 下午好 / 晚上好
```

### 时区设置：`src/hooks/useClock.ts`

```ts
// 480 = UTC+8（北京时间），改成你所在的时区偏移
const utc8 = new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
```

### 状态徽章：`src/components/StatusBadge.tsx`

```ts
const m: Record<string, [string, string]> = {
  online: ["#5cb89e", "在线"],
  busy: ["#e07070", "忙碌"],
  away: ["#d4b060", "离开"],
  developing: ["#6ebeaf", "开发中"],
};
```

### 标签颜色：`src/components/LatestContent.tsx`

```ts
const tagColors: Record<string, { bg: string; color: string }> = {
  技术: { bg: "rgba(110,190,175,0.1)", color: "#5a9e8f" },
  AI: { bg: "rgba(150,130,200,0.1)", color: "#8b7bb8" },
  游戏: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
  前端: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
};
```

### 猫咪插画：`src/components/CatSitting.tsx`

| 部位 | 颜色 |
|------|------|
| 身体 | `#ffecd2`（奶油色） |
| 头部 | `#fff5e6`（浅奶油色） |
| 耳朵内 | `#ffb6b9`（粉色） |
| 眼睛 | `#2d3436` |
| 鼻子 | `#ffb6b9` |
| 蝴蝶结 | `#ffd93d`（黄色）+ `#ff6b6b`（红色装饰） |

---

## 🔧 HTML 层：`index.html`

| 修改项 | 当前值 | 说明 |
|--------|--------|------|
| `<title>` | `origami00-wiki` | 站点名称，显示在浏览器标签页 |
| `<meta description>` | `origami00-wiki 个人站...` | 搜索引擎描述 |

---

## 🔧 全局样式：`src/index.css`

| 修改项 | 当前值 | 说明 |
|--------|--------|------|
| 字体 | Inter + Noto Sans SC | Google Fonts 在线字体，可替换 |
| 滚动条颜色 | `rgba(110, 190, 175, 0.35)` | 浏览器滚动条滑块色 |
| 瀑布流列数 | `column-count: 2` | 首页卡片瀑布流列数 |

---

## 📝 TypeScript 类型：`src/types/index.ts`

所有数据结构都有类型定义。新增数据字段时需同步更新：

| 类型名 | 用途 |
|--------|------|
| `Profile` | 个人信息（name, bio, status, location） |
| `SocialLink` | 社交链接（label, icon, href, bg, color） |
| `NavItem` | 导航菜单项（label, icon, href） |
| `ContentItem` | 最新动态条目（title, date, tag, emoji, url） |
| `MusicTrack` | 音乐曲目（title, artist, duration） |
| `PhotoWallItem` | 照片墙条目（title, src） |
| `Article` | 文章（id, title, summary, date, tag, emoji, content, url?） |
| `Project` | 项目（id, title, description, date, tags, emoji, status, url?） |
| `SubPageData` | 子页面数据（title, description, links） |
| `DesignTokens` | 色彩主题令牌 |
| `CardStyle` | 卡片样式 |

---

## 📌 修改优先级总结

| 优先级 | 文件 | 修改内容 |
|--------|------|----------|
| **最高** | `src/data/siteData.ts` | 名字、简介、社交链接、动态、照片、音乐、子页面 |
| **最高** | `src/data/articlesData.ts` | 文章内容 |
| **最高** | `src/data/projectsData.ts` | 项目内容 |
| **高** | `src/tokens/design.ts` | 色彩主题 |
| **高** | `src/types/index.ts` | 新增字段时同步类型定义 |
| **中** | `index.html` | 站点名、meta description |
| **中** | `src/index.css` | 字体、滚动条、布局列数 |
| **低** | `src/components/` | 头像图片、猫咪颜色、标签配色、问候语 |
