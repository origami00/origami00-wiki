# origami00-wiki 项目注解文档

> Soft Minimalism 风格的 React 个人主页，包含主页（瀑布流布局）与照片墙页面。

---

## 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [设计系统](#设计系统)
- [路由架构](#路由架构)
- [核心入口文件](#核心入口文件)
- [App.jsx 逐段解析](#appjsx-逐段解析)
- [自定义 Hooks](#自定义-hooks)
- [组件详解](#组件详解)
- [页面组件](#页面组件)
- [数据层 siteData.js](#数据层-sitedatajs)
- [全局样式 index.css](#全局样式-indexcss)
- [响应式设计](#响应式设计)
- [样式方案说明](#样式方案说明)
- [扩展指南](#扩展指南)

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| React DOM | 18.3.1 | DOM 渲染 |
| React Router DOM | 6.30.3 | 客户端路由 |
| Lucide React | 1.8.0 | 线性图标库 |
| Vite | 5.4.21 | 构建工具 |
| @vitejs/plugin-react | 4.7.0 | React 快速刷新 |

**零 CSS 框架** — 没有使用 Tailwind、SCSS、styled-components 或任何组件库。所有样式通过 **内联 style + 注入 `<style>` 标签 + 全局 CSS** 三种方式实现。

---

## 项目结构

```
origami00-wiki/
├── index.html                  # Vite 入口 HTML，lang="zh-CN"
├── package.json                # 依赖与脚本
├── vite.config.js              # Vite 配置（仅启用 React 插件）
├── PROJECT.md                  # 本文档
│
└── src/
    ├── main.jsx                # React 根节点 + BrowserRouter + 路由表
    ├── App.jsx                 # 主文件（~760 行），包含所有组件、hooks、样式
    ├── index.css               # 全局样式：字体引入、滚动条、工具类
    │
    ├── data/
    │   └── siteData.js         # 集中数据层：个人信息、导航、文章、音乐、照片
    │
    └── pages/
        ├── PhotoWallPage.jsx   # 照片墙页面组件
        └── SubPage.jsx         # 通用子页面组件（文章/项目/关于/推荐）
```

**架构特点**：所有路由都渲染同一个 `<App />` 组件，App 内部根据 `location.pathname` 切换视图。没有嵌套路由或布局路由。

---

## 设计系统

### 色彩体系

采用 **Soft Minimalism（极简清新）** 风格，以低饱和薄荷绿为主色调：

```js
const C = {
  // 主色调
  accent:     "#6ebeaf",              // 薄荷绿 — 按钮、高亮、图标
  accentDark: "#5a9e8f",              // 深薄荷 — hover 状态
  accentBg:   "rgba(110,190,175,0.08)", // 薄荷底色 — 标签、徽章背景

  // 文字层级
  text:       "#2d3a36",              // 主文字 — 深灰绿
  textSec:    "#6b8a80",              // 次级文字 — 中灰绿
  textMuted:  "#9db5ac",              // 辅助文字 — 浅灰绿

  // 卡片系统
  card:       "rgba(255,255,255,0.55)", // 默认卡片 — 半透明白
  cardHover:  "rgba(255,255,255,0.68)", // hover 卡片 — 略深

  // 阴影系统
  shadow:      "0 2px 16px rgba(100,160,145,0.06)",   // 默认 — 极淡薄荷阴影
  shadowHover: "0 8px 28px rgba(100,160,145,0.12)",    // hover — 加深
};
```

### 页面背景

```css
/* 从左上到右下的薄荷渐变，营造通透轻盈氛围 */
background: linear-gradient(160deg, #f5fffe 0%, #eafff7 30%, #edfff4 60%, #f4fffa 100%);
```

### 卡片基础样式

```js
const card = {
  background: C.card,                    // rgba(255,255,255,0.55) 半透明白
  backdropFilter: "blur(18px)",          // 毛玻璃模糊
  WebkitBackdropFilter: "blur(18px)",    // Safari 兼容
  borderRadius: 20,                      // 大圆角
  boxShadow: C.shadow,                   // 薄荷色柔和阴影
  overflow: "hidden",
  transition: "box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease",
};
```

**设计原则**：
- 无边框 — 所有卡片不使用 `border`
- 毛玻璃 — `backdrop-filter: blur(18px)` + 半透明背景
- 柔和阴影 — 薄荷色调的低 opacity 阴影
- hover 上浮 — `translateY(-2px)` + 阴影加深

### 字体

```css
font-family: "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif;
```

- **Inter** — 主要拉丁文字体，轻盈现代
- **Noto Sans SC** — 中文回退字体
- 字重使用：标题 600、正文 400-500、辅助 300（时钟）
- 开启字体平滑：`-webkit-font-smoothing: antialiased`

---

## 路由架构

### 路由表（main.jsx）

```
/              → <App />    首页（瀑布流主页）
/photo-wall    → <App />    照片墙
/articles      → <App />    我的文章（SubPage）
/projects      → <App />    我的项目（SubPage）
/about         → <App />    关于网站（SubPage）
/recommendations → <App />  推荐分享（SubPage）
*              → <Navigate to="/" replace />  兜底重定向
```

### 视图切换逻辑（App.jsx）

```jsx
const page = location.pathname;
const home = page === "/";
const photoWall = page === "/photo-wall";

// 渲染时根据变量切换
{home ? (
  <瀑布流主页>
) : photoWall ? (
  <PhotoWallPage />
) : (
  <SubPage />
)}
```

所有路由共享同一个 `<App />` 组件，通过 `useLocation().pathname` 判断当前页面。这种扁平路由结构适合小型个人站点，避免了嵌套路由的复杂性。

---

## 核心入口文件

### index.html

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="origami00-wiki 个人站，包含文章、项目、照片墙与个人推荐内容。" />
    <title>origami00-wiki</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- `lang="zh-CN"` — 中文语言声明
- `<div id="root">` — React 挂载点
- `<script type="module">` — Vite 的 ES Module 入口

### main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/photo-wall" element={<App />} />
        <Route path="/articles" element={<App />} />
        <Route path="/projects" element={<App />} />
        <Route path="/about" element={<App />} />
        <Route path="/recommendations" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

**要点**：
- `React.StrictMode` — 开发模式下的额外检查
- `BrowserRouter` — HTML5 History API 路由
- 所有路由都渲染 `<App />`，App 内部自行判断视图
- `Navigate to="/"` — 未知路径兜底重定向

---

## App.jsx 逐段解析

### 第 1-30 行：导入与图标映射

```jsx
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Code2, FileText, Heart, ... } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { latestContent, musicList, navigation, profile, socialLinks } from "./data/siteData";
import PhotoWallPage from "./pages/PhotoWallPage";
import SubPage from "./pages/SubPage";

const iconMap = { Github: Code2, Tv, Music2, Home, FileText, Sparkles, Info, Heart };
```

- 从 `lucide-react` 导入所有需要的线性图标
- `iconMap` 将字符串名称映射到组件，用于 `siteData.js` 中通过字符串引用图标
- `Github: Code2` — lucide-react 没有 Github 图标，用 Code2 替代

### 第 32-54 行：设计令牌

```js
const C = { /* 色彩体系 */ };
const card = { /* 卡片基础样式 */ };
```

整个应用的设计令牌，所有组件引用这两个对象保持风格统一。

### 第 56-136 行：自定义 Hooks

三个核心 Hook（详见 [自定义 Hooks](#自定义-hooks) 章节）：
- `useClock()` — 实时时钟 + 问候语
- `useCalendar()` — 月历导航
- `useAudioPlayer()` — 模拟音乐播放器

### 第 138-200 行：原子组件

小型可复用组件：
- `StatusBadge` — 状态徽章（在线/忙碌/离开/开发中）
- `Avatar` — 渐变圆形头像
- `CatSitting` — 猫咪坐姿 SVG 插画

### 第 202-551 行：功能卡片组件

七个功能卡片（详见 [组件详解](#组件详解) 章节）：
- `UserSidebar` — 侧边导航栏
- `ProfileCard` — 个人信息卡
- `ClockCard` — 时钟卡
- `CatCard` — 猫咪插画卡（通往照片墙）
- `SocialLinks` — 社交链接卡
- `CalendarCard` — 日历卡
- `LatestContent` — 最新动态列表
- `MusicPlayer` — 音乐播放器

### 第 553-567 行：路由映射表

```js
const subPageIcons = {
  "/articles": FileText,
  "/projects": Sparkles,
  "/about": Info,
  "/recommendations": Heart,
};

const pageTitleMap = {
  "/": "origami00-wiki",
  "/photo-wall": "照片墙 - origami00-wiki",
  // ...
};
```

- `subPageIcons` — 每个子页面对应的图标组件
- `pageTitleMap` — 每个路由对应的 `document.title`

### 第 569-760 行：App 主组件

```jsx
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
    <div style={{ /* 全页面背景渐变 */ }}>
      <style>{`/* 所有 CSS 类和动画 */`}</style>
      <main className={`layoutGrid ${home ? "layoutHome" : ...}`}>
        <h1 className="srOnly">origami00-wiki 个人站</h1>
        <UserSidebar />
        {home ? <瀑布流主页 /> : photoWall ? <照片墙 /> : <子页面 />}
      </main>
    </div>
  );
}
```

**渲染结构**：

```
<div>                          ← 全屏渐变背景
  <style>                      ← 注入的 CSS（动画、布局、响应式）
  <main>                       ← 网格容器
    <h1 srOnly>                ← 无障碍标题
    <aside> UserSidebar        ← 侧边导航
    <div> masonryColumns       ← 主页瀑布流
      ProfileCard
      CatCard
      CalendarCard
      SocialLinks
      ClockCard
      LatestContent
      MusicPlayer
    </div>
  </main>
</div>
```

---

## 自定义 Hooks

### useClock()

```jsx
function useClock() {
  const [time, setTime] = useState(/* 北京时间 */);

  useEffect(() => {
    const id = setInterval(() => { /* 每秒更新 */ }, 1000);
    return () => clearInterval(id);
  }, []);

  return { hours, minutes, seconds, dateStr, greeting };
}
```

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `hours` | string | 两位小时，如 `"09"` |
| `minutes` | string | 两位分钟，如 `"05"` |
| `seconds` | string | 两位秒数，如 `"30"` |
| `dateStr` | string | 如 `"4月24日 星期四"` |
| `greeting` | string | 根据时段返回 `Good Morning` / `Good Afternoon` / `Good Evening` |

**时区处理**：通过 `getTimezoneOffset() + 480` 强制 UTC+8（北京时间），不依赖系统时区。

**问候语逻辑**：
- 0:00 - 11:59 → `Good Morning`
- 12:00 - 17:59 → `Good Afternoon`
- 18:00 - 23:59 → `Good Evening`

### useCalendar()

```jsx
function useCalendar() {
  const [offset, setOffset] = useState(0);
  // 根据 offset 计算当前查看的月份
  return { days, year, monthName, goNext, goPrev };
}
```

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `days` | array | 日历格子数组，`null` 表示空格，`{ day, isToday }` 表示日期 |
| `year` | number | 当前查看年份 |
| `monthName` | string | 中文月份，如 `"四月"` |
| `goNext` | function | 切换到下个月 |
| `goPrev` | function | 切换到上个月 |

**日历算法**：
1. `firstDay = (new Date(year, month, 1).getDay() + 6) % 7` — 将周日=0 转换为周一=0 的周起始
2. 前面填充 `null` 对齐第一天的星期
3. 后面填入 1 到 `daysInMonth`，标记 `isToday`

### useAudioPlayer()

```jsx
function useAudioPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // setInterval 模拟播放进度
  return { track, playing, progress, toggle, next, prev, seek, elapsedStr, totalStr };
}
```

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `track` | object | 当前曲目 `{ title, artist, duration }` |
| `playing` | boolean | 是否正在播放 |
| `progress` | number | 0-100 的播放进度 |
| `toggle` | function | 切换播放/暂停 |
| `next` | function | 下一首 |
| `prev` | function | 上一首 |
| `seek` | function | 跳转到指定进度 |
| `elapsedStr` | string | 已播放时间，如 `"01:23"` |
| `totalStr` | string | 总时长，如 `"03:18"` |

**注意**：这是模拟播放器，没有真实音频。进度通过 `setInterval` 每秒递增，递增量为 `100 / track.duration`。

---

## 组件详解

### UserSidebar — 侧边导航栏

```
┌─────────────────┐
│     😺 头像      │
│    小猫咪        │
│   ● 开发中       │
│ ─────────────── │
│ 🏠 首页         │
│ 📄 我的文章      │
│ ✨ 我的项目      │
│ ℹ️ 关于网站      │
│ ❤️ 推荐分享      │
└─────────────────┘
```

- 背景：`rgba(255,255,255,0.4)` — 比卡片更透明，与页面背景融合
- 头像尺寸：48px（桌面端）
- 导航项使用 `NavLink`，自动添加 `.active` 类
- 分割线：`linear-gradient(90deg, transparent, rgba(110,190,175,0.2), transparent)` — 渐变淡入淡出

**移动端变形**（≤860px）：
- 变为水平滚动条
- 头像和名称隐藏
- 导航项横向排列，可左右滚动

### ProfileCard — 个人信息卡

```
┌─────────────────────────────┐
│ Good Afternoon,             │
│ Nice to meet you!           │
│                             │
│  😺  小猫咪 ● 开发中         │
│      全栈开发 · 插画爱好者    │
│      📍 中国                │
└─────────────────────────────┘
```

- 接收 `greeting` prop，由 `useClock()` 提供
- 头像 72px，带薄荷渐变和白色边框
- hover 效果：`translateY(-2px)` 上浮 + 阴影加深 + 背景变亮

### ClockCard — 时钟卡

```
┌─────────────────┐
│     14:30       │  ← 等宽字体，font-weight: 300
│       45        │  ← 秒数，半透明
│  4月24日 星期四   │
│     UTC+8       │
└─────────────────┘
```

- 字体：`SF Mono` / `Fira Code` / `JetBrains Mono` / `Inter` monospace
- 冒号闪烁动画：`@keyframes blink`
- 秒数单独显示，opacity 0.7
- 整体轻量化，无图标装饰

### CatCard — 猫咪插画卡

```
┌─────────────────────────┐
│ 进入照片墙               │  ← 浮动标签
│                         │
│      🐱 (SVG 猫咪)       │  ← 手绘风格坐姿猫
│                         │
└─────────────────────────┘
```

- 点击跳转到 `/photo-wall`
- 使用内联 SVG（`CatSitting` 组件）绘制猫咪
- 标签使用 `backdrop-filter: blur(4px)` 毛玻璃效果
- hover：`translateY(-3px)` 上浮 + 阴影加深

**SVG 猫咪结构**：
- 椭圆身体（`#ffecd2` 奶油色）
- 圆形头部（`#fff5e6` 浅奶油色）
- 三角形耳朵（带粉色内耳）
- 椭圆眼睛 + 高光
- 粉色鼻子和嘴巴
- 腮红（半透明粉色椭圆）
- 举起的爪子
- 地面阴影（径向渐变）

### SocialLinks — 社交链接卡

```
┌─────────────────────────┐
│    [Git]  [B站]  [抖音]   │
└─────────────────────────┘
```

- 三个 48×48 的圆角图标按钮
- 每个图标使用 `siteData.js` 中定义的背景色和图标色
- hover：`translateY(-3px) scale(1.06)` 上浮放大 + 阴影加深
- 图标映射：`Github → Code2`, `Bilibili → Tv`, `抖音 → Music2`

### CalendarCard — 日历卡

```
┌─────────────────────────┐
│  ◀   2026年 四月    ▶    │
│  一 二 三 四 五 六 日     │
│  .. .. .. .. 1  2  3     │
│  4  5  6  7  8  9  10    │
│  ...          [24] ...   │  ← 今天高亮
└─────────────────────────┘
```

- 月份导航按钮：无边框，薄荷底色 `rgba(110,190,175,0.08)`
- 周末文字使用 `C.accent` 薄荷绿
- 今天日期：实心薄荷绿背景 + 白色文字 + 阴影
- 使用 `Intl.DateTimeFormat` 获取中文月份名

### LatestContent — 最新动态列表

```
┌─────────────────────────────┐
│ ✨ 最新动态                   │
│                             │
│ ⚡ 用 Next.js 搭建个人主页    │
│    2026-04-12       [技术]   │
│                             │
│ 🤖 ComfyUI 工作流参考        │
│    2026-04-10       [AI]    │
│                             │
│ 🎮 像素风小游戏灵感           │
│    2026-04-08       [游戏]   │
│                             │
│ ✨ Framer Motion 动画实践    │
│    2026-04-05       [前端]   │
└─────────────────────────────┘
```

- 列表项使用 `<a>` 标签，可点击跳转外部链接
- 标签颜色系统：
  - 技术 → 薄荷绿 `rgba(110,190,175,0.1)`
  - AI → 淡紫 `rgba(150,130,200,0.1)`
  - 游戏 → 浅绿 `rgba(100,180,160,0.1)`
  - 前端 → 薄荷 `rgba(110,190,175,0.12)`
- hover：背景变亮 + `translateX(2px)` 右滑

### MusicPlayer — 音乐播放器

```
┌─────────────────────────┐
│  🎵  春日散步             │
│       轻音乐集            │
│  ━━━━━━●━━━━━━━━━━━━    │
│  01:23        03:18      │
│    [⏮]  [▶]  [⏭]       │
└─────────────────────────┘
```

- 唱片旋转动画：`conic-gradient` 渐变圆盘 + `@keyframes spin`
- 进度条：自定义 `<input type="range">` 样式（薄荷绿滑块，4px 轨道）
- 控制按钮：32px 圆角方块，播放键 40px 薄荷实心
- hover 整卡上浮 `translateY(-2px)`

---

## 页面组件

### PhotoWallPage — 照片墙

```jsx
// src/pages/PhotoWallPage.jsx
export default function PhotoWallPage({ cardStyle, colors, onBack }) { ... }
```

**Props**：
- `cardStyle` — 从 App 传入的卡片基础样式对象
- `colors` — 色彩体系 `C` 对象
- `onBack` — 返回首页的回调函数

**布局**：
- 外层：毛玻璃大卡片，`rgba(255,255,255,0.45)` 背景
- 顶部：标题 + 描述 + "返回首页" 按钮
- 内容区：3 列 CSS Grid 照片网格（`.photoWallGrid`）

**照片卡片**（`.photoWallItem`）：
- 圆角 16px，半透明白背景
- 图片 170px 高度，`object-fit: cover`
- 标题在下方，12.5px 灰绿色文字
- hover：`translateY(-3px)` + 阴影加深

**响应式**：
- ≤860px → 2 列
- ≤520px → 1 列，图片高度 190px

### SubPage — 通用子页面

```jsx
// src/pages/SubPage.jsx
export default function SubPage({ page, cardStyle, colors, iconMap, onBack }) { ... }
```

**Props**：
- `page` — 当前路由路径，如 `"/articles"`
- `cardStyle` — 卡片基础样式
- `colors` — 色彩体系
- `iconMap` — 路径到图标的映射
- `onBack` — 返回首页回调

**布局**：
- 居中单卡片设计
- 顶部：64px 圆角图标框（薄荷底色）
- 标题 + 描述文字
- 外部链接按钮（薄荷底色 + hover 变深）
- "返回首页" 按钮

**数据来源**：从 `siteData.js` 的 `subPageContent[page]` 读取内容。

---

## 数据层 siteData.js

所有站点内容集中在一个文件中，便于维护和修改。

### profile — 个人信息

```js
export const profile = {
  name: "小猫咪",                           // 显示名称
  bio: "全栈开发 · 插画爱好者 · 游戏设计探索中",  // 个人简介
  status: "developing",                      // 状态：online/busy/away/developing
  location: "中国",                          // 所在地
};
```

### socialLinks — 社交链接

```js
export const socialLinks = [
  {
    label: "GitHub",                         // 显示名称
    icon: "Github",                          // iconMap 中的键名
    href: "https://github.com/",             // 跳转链接
    bg: "rgba(110,190,175,0.08)",            // 按钮背景色
    color: "#5a9e8f",                        // 图标颜色
  },
  // Bilibili, 抖音...
];
```

### navigation — 导航菜单

```js
export const navigation = [
  { label: "首页", icon: "Home", href: "/" },
  { label: "我的文章", icon: "FileText", href: "/articles" },
  { label: "我的项目", icon: "Sparkles", href: "/projects" },
  { label: "关于网站", icon: "Info", href: "/about" },
  { label: "推荐分享", icon: "Heart", href: "/recommendations" },
];
```

`icon` 字段对应 `iconMap` 中的键名，运行时解析为 Lucide 图标组件。

### latestContent — 最新动态

```js
export const latestContent = [
  {
    title: "用 Next.js 搭建个人主页",   // 标题
    date: "2026-04-12",               // 日期
    tag: "技术",                       // 分类标签
    emoji: "⚡",                       // 前缀 emoji
    url: "https://nextjs.org/docs",   // 外部链接
  },
  // ...
];
```

### musicList — 音乐列表

```js
export const musicList = [
  { title: "春日散步", artist: "轻音乐集", duration: 198 },  // duration 单位：秒
  { title: "午后阳光", artist: "钢琴曲", duration: 243 },
  { title: "星空下", artist: "氛围音乐", duration: 312 },
];
```

### photoWallItems — 照片墙

```js
export const photoWallItems = [
  { title: "街头随拍", src: "https://picsum.photos/seed/origami-wall-1/720/520" },
  // ...
];
```

使用 `picsum.photos` 占位图服务。`seed` 参数确保同 seed 始终返回同一张图片。替换为真实图片时只需修改 `src` 字段。

### subPageContent — 子页面内容

```js
export const subPageContent = {
  "/articles": {
    title: "我的文章",
    description: "这里收录前端开发、AI 工具链与创作实践的文章目录。",
    links: [
      { label: "前端学习路线", href: "https://developer.mozilla.org/zh-CN/docs/Web" },
      { label: "React 官方文档", href: "https://react.dev/" },
    ],
  },
  // /projects, /about, /recommendations...
};
```

键名为路由路径，与 React Router 的 `path` 一一对应。

---

## 全局样式 index.css

### 字体引入

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap");
```

引入 Inter（拉丁文）和 Noto Sans SC（中文），覆盖 300-700 字重。

### 全局重置

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { min-height: 100%; }
body {
  font-family: "Inter", "Noto Sans SC", ...;
  -webkit-font-smoothing: antialiased;
}
```

### 自定义滚动条

```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb {
  background: rgba(110, 190, 175, 0.35);  /* 薄荷绿半透明 */
  border-radius: 4px;
}
```

### 瀑布流布局

```css
.masonryColumns {
  column-count: 2;        /* 两列瀑布流 */
  column-gap: 16px;       /* 列间距 */
}
.masonryColumns > * {
  break-inside: avoid;    /* 防止卡片被列分割 */
  margin-bottom: 16px;    /* 卡片底部间距 */
}
```

CSS `columns` 属性实现瀑布流：卡片按 DOM 顺序先填满左列，再填右列。`break-inside: avoid` 确保每个卡片不会被拆分到两列。

### 卡片入场动画

```css
.cardStagger {
  opacity: 0;
  animation: cardFadeIn 0.5s ease forwards;
}
```

配合 JSX 中的 `animationDelay`（0s, 0.06s, 0.12s, ...）实现逐张淡入效果。

### 音乐播放器进度条

```css
input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  border-radius: 4px;
  background: rgba(110, 190, 175, 0.2);  /* 薄荷轨道 */
}
input[type="range"]::-webkit-slider-thumb {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #6ebeaf;                    /* 薄荷滑块 */
  border: 2px solid rgba(255,255,255,0.8);
}
```

需要同时写 `-webkit-slider-thumb`（Chrome/Safari）和 `-moz-range-thumb`（Firefox）两套伪元素。

---

## 响应式设计

### 断点系统

| 断点 | 适用场景 | 布局变化 |
|------|----------|----------|
| >1100px | 桌面端 | 180px 侧边栏 + 瀑布流 |
| 860-1100px | 平板/小桌面 | 170px 侧边栏 + 瀑布流 |
| ≤860px | 手机/小平板 | 单列堆叠，侧边栏变水平导航条 |
| ≤520px | 小手机 | 更紧凑间距，照片墙单列 |

### 桌面端（>860px）

```
┌────────┬────────────────────────┐
│ 侧边栏  │     瀑布流卡片区域       │
│ 180px  │     columns: 2         │
│        │     自动分列排列         │
└────────┴────────────────────────┘
```

### 移动端（≤860px）

```
┌────────────────────────────────┐
│ [头像] 首页 文章 项目 关于 推荐   │  ← 水平滚动导航
├────────────────────────────────┤
│         卡片 1                  │
│         卡片 2                  │  ← 单列瀑布流
│         卡片 3                  │
│         ...                    │
└────────────────────────────────┘
```

**侧边栏变形要点**：
- `flex-direction: row` — 导航项横向排列
- `overflow-x: auto` — 允许水平滚动
- `white-space: nowrap` — 防止导航文字换行
- 头像和名称区域通过 `.sideProfile` 的 margin 缩小

---

## 样式方案说明

本项目采用三层样式方案：

### 1. 全局 CSS（index.css）

负责全局重置、字体引入、滚动条、工具类、瀑布流布局、响应式媒体查询。

### 2. 注入 `<style>` 标签（App.jsx render 内）

```jsx
<style>{`
  @keyframes blink { ... }
  .layoutHome { ... }
  .sideNavBtn { ... }
  @media (max-width: 860px) { ... }
`}</style>
```

**为什么用注入而不是 CSS 文件**：
- 可以引用 JS 变量（如 `${C.textSec}`），实现设计令牌与样式联动
- 样式与组件在同一文件，便于维护
- Vite 会正确处理作用域

**注意**：`<style>` 标签在 React render 中会被注入到 DOM 里，浏览器正常解析。

### 3. 内联 style（JSX style={{}}）

所有组件的视觉属性通过内联样式实现：

```jsx
<section style={{
  ...card,                              // 展开基础卡片样式
  padding: "28px 26px",                 // 组件特有间距
  background: hov ? C.cardHover : C.card, // 动态背景
  transform: hov ? "translateY(-2px)" : "none",
  boxShadow: hov ? C.shadowHover : C.shadow,
}}>
```

**hover 效果实现**：通过 `useState` 追踪 hover 状态，动态切换 style 值：

```jsx
const [hov, setHov] = useState(false);
// ...
onMouseEnter={() => setHov(true)}
onMouseLeave={() => setHov(false)}
```

**为什么不统一用 CSS 类**：
- 内联样式可以引用 JS 常量（`C.accent`, `card` 等），保持设计令牌单一来源
- 避免 CSS 类名冲突
- 组件自包含，不依赖外部样式文件

---

## 扩展指南

### 添加新的导航页面

1. 在 `siteData.js` 的 `navigation` 数组中添加条目
2. 在 `siteData.js` 的 `subPageContent` 中添加页面内容
3. 在 `main.jsx` 的 `<Routes>` 中添加路由
4. 在 `App.jsx` 的 `subPageIcons` 和 `pageTitleMap` 中添加映射

```js
// siteData.js
navigation.push({ label: "新页面", icon: "Star", href: "/new-page" });
subPageContent["/new-page"] = { title: "新页面", description: "...", links: [...] };

// main.jsx
<Route path="/new-page" element={<App />} />

// App.jsx
subPageIcons["/new-page"] = Star;
pageTitleMap["/new-page"] = "新页面 - origami00-wiki";
```

### 替换照片墙图片

修改 `siteData.js` 中 `photoWallItems` 的 `src` 字段：

```js
{ title: "我的照片", src: "/images/my-photo.jpg" }  // 本地图片
{ title: "我的照片", src: "https://example.com/photo.jpg" }  // 远程图片
```

### 修改色彩主题

只需修改 `App.jsx` 中的 `C` 常量：

```js
const C = {
  accent: "#your-color",     // 主色调
  text: "#your-text-color",  // 主文字色
  card: "rgba(...)",         // 卡片背景
  // ...
};
```

`<style>` 标签中引用了 `C.textSec` 和 `C.accent`，会自动联动。

### 添加真实音频播放

当前 `useAudioPlayer()` 是模拟播放器。要接入真实音频：

1. 创建 `Audio` 对象或使用 Howler.js
2. 在 `toggle` 中调用 `audio.play()` / `audio.pause()`
3. 监听 `timeupdate` 事件更新 `progress`
4. 监听 `ended` 事件自动切歌

### 调整瀑布流列数

修改 `index.css` 中的 `.masonryColumns`：

```css
.masonryColumns {
  column-count: 3;  /* 改为 3 列 */
  column-gap: 16px;
}
```

或通过媒体查询动态调整：

```css
@media (min-width: 1400px) {
  .masonryColumns { column-count: 3; }
}
```

---

## 关键设计决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| CSS 方案 | 内联 style + 注入 `<style>` | 可引用 JS 变量，设计令牌单一来源 |
| 瀑布流实现 | CSS `columns` | 零依赖，纯 CSS，兼容性好 |
| 路由结构 | 扁平路由 + 单组件切换 | 简单直接，适合小型站点 |
| 图标库 | Lucide React | 线性风格统一，体积小 |
| 数据管理 | 集中 siteData.js | 单文件修改，无需多处改动 |
| 音乐播放 | 模拟播放器 | 展示用途，避免音频文件依赖 |
| 图片源 | picsum.photos | 占位图，seed 保证一致性 |
| 字体 | Inter + Noto Sans SC | 轻盈现代 + 中文覆盖 |
| hover 实现 | useState + 内联 style | 可引用设计令牌，无需 CSS 变量 |
