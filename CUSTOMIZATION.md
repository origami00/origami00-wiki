# 个性化修改指南

本文档列出所有可自定义修改的部分，帮助你快速打造专属个人主页。

---

## 🥇 核心数据层：`src/data/siteData.js`

这是最集中、最容易修改的文件，一个文件搞定大部分个性化。

### 1. 个人信息

```js
export const profile = {
  name: "小猫咪",                              // 名字
  bio: "全栈开发 · 插画爱好者 · 游戏设计探索中",   // 简介
  status: "developing",                         // 状态：online / busy / away / developing
  location: "中国",                             // 所在地
};
```

### 2. 社交链接

```js
export const socialLinks = [
  {
    label: "GitHub",                      // 显示名称
    icon: "Github",                       // 图标名（对应 iconMap）
    href: "https://github.com/",          // 个人主页地址
    bg: "rgba(110,190,175,0.08)",        // 按钮背景色
    color: "#5a9e8f",                     // 图标颜色
  },
  {
    label: "Bilibili",
    icon: "Tv",
    href: "https://space.bilibili.com/",  // B站空间地址
  },
  {
    label: "抖音",
    icon: "Music2",
    href: "https://www.douyin.com/",      // 抖音主页地址
  },
];
```

### 3. 导航菜单

```js
export const navigation = [
  { label: "首页", icon: "Home", href: "/" },
  { label: "我的文章", icon: "FileText", href: "/articles" },
  { label: "我的项目", icon: "Sparkles", href: "/projects" },
  { label: "关于网站", icon: "Info", href: "/about" },
  { label: "推荐分享", icon: "Heart", href: "/recommendations" },
];
```

### 4. 最新动态

```js
export const latestContent = [
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

### 5. 音乐列表（模拟播放器，无真实音频）

```js
export const musicList = [
  { title: "春日散步", artist: "轻音乐集", duration: 198 },
  { title: "午后阳光", artist: "钢琴曲", duration: 243 },
  { title: "星空下", artist: "氛围音乐", duration: 312 },
];
```

### 6. 照片墙

```js
export const photoWallItems = [
  { title: "街头随拍", src: "https://picsum.photos/seed/origami-wall-1/720/520" },
  { title: "晨间光影", src: "https://picsum.photos/seed/origami-wall-2/720/520" },
  { title: "旅行片段", src: "https://picsum.photos/seed/origami-wall-3/720/520" },
  { title: "城市色块", src: "https://picsum.photos/seed/origami-wall-4/720/520" },
  { title: "猫咪日常", src: "https://picsum.photos/seed/origami-wall-5/720/520" },
  { title: "自然风景", src: "https://picsum.photos/seed/origami-wall-6/720/520" },
];
// 替换 src 为真实图片地址即可
```

### 7. 子页面内容

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
  "/projects": {
    title: "我的项目",
    description: "展示当前正在推进的网页、工具和小游戏项目。",
    links: [
      { label: "浏览开源趋势", href: "https://github.com/trending" },
      { label: "Vite 项目模板", href: "https://vite.dev/guide/" },
    ],
  },
  "/about": {
    title: "关于网站",
    description: "这是一个基于 React 18+ 构建的个人站点，持续迭代中。",
    links: [
      { label: "技术栈说明", href: "https://vite.dev/" },
      { label: "界面图标库", href: "https://lucide.dev/" },
    ],
  },
  "/recommendations": {
    title: "推荐分享",
    description: "分享我常用的设计、开发与学习资源。",
    links: [
      { label: "Figma 社区", href: "https://www.figma.com/community" },
      { label: "Awwwards 灵感", href: "https://www.awwwards.com/" },
    ],
  },
};
```

---

## 🥈 样式和组件：`src/App.jsx`

### 1. 色彩主题（第 33-44 行）

```js
const C = {
  accent: "#6ebeaf",              // 主色调（薄荷绿）
  accentDark: "#5a9e8f",          // hover 状态色
  accentBg: "rgba(110,190,175,0.08)",
  text: "#2d3a36",                // 主文字色
  textSec: "#6b8a80",             // 次级文字色
  textMuted: "#9db5ac",           // 辅助文字色
  card: "rgba(255,255,255,0.55)", // 卡片背景（半透明毛玻璃）
  cardHover: "rgba(255,255,255,0.68)",
  shadow: "0 2px 16px rgba(100,160,145,0.06)",
  shadowHover: "0 8px 28px rgba(100,160,145,0.12)",
};
```

### 2. 头像（第 153-167 行）

```jsx
const Avatar = ({ size = 64 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(145deg, #b8e6d8, #8dd0bc, #6ebeaf)",
    // ...
  }}>
    😺   // 替换为你自己的头像 emoji 或图片
  </div>
);
```

### 3. 页面标题（第 560-567 行）

```js
const pageTitleMap = {
  "/": "origami00-wiki",                      // 改成你的站点名
  "/photo-wall": "照片墙 - origami00-wiki",
  "/articles": "我的文章 - origami00-wiki",
  "/projects": "我的项目 - origami00-wiki",
  "/about": "关于网站 - origami00-wiki",
  "/recommendations": "推荐分享 - origami00-wiki",
};
```

### 4. 问候语（第 76 行）

```js
const greeting = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
// 可改为中文：早上好 / 下午好 / 晚上好
```

### 5. 时区设置（第 59 行）

```js
return new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
// 480 = UTC+8（北京时间），改成你所在的时区偏移
```

### 6. 标签颜色映射（第 422-427 行）

```js
const tagColors = {
  技术: { bg: "rgba(110,190,175,0.1)", color: "#5a9e8f" },
  AI: { bg: "rgba(150,130,200,0.1)", color: "#8b7bb8" },
  游戏: { bg: "rgba(100,180,160,0.1)", color: "#5cb89e" },
  前端: { bg: "rgba(110,190,175,0.12)", color: "#6ebeaf" },
};
```

### 7. 状态徽章（第 139 行）

```js
const m = {
  online: ["#5cb89e", "在线"],
  busy: ["#e07070", "忙碌"],
  away: ["#d4b060", "离开"],
  developing: ["#6ebeaf", "开发中"],
};
```

### 8. 猫咪插画 SVG（第 169-200 行）

| 部位 | 颜色 |
|------|------|
| 身体 | `#ffecd2`（奶油色） |
| 头部 | `#fff5e6`（浅奶油色） |
| 耳朵内 | `#ffb6b9`（粉色） |
| 眼睛 | `#2d3436` |
| 鼻子 | `#ffb6b9` |
| 腮红 | `#ffb6b9` opacity 0.18 |
| 蝴蝶结 | `#ffd93d`（黄色）+ `#ff6b6b`（红色装饰） |

---

## 🥉 HTML 层：`index.html`

| 修改项 | 当前值 | 说明 |
|--------|--------|------|
| `<title>` | `origami00-wiki` | 站点名称，显示在浏览器标签页 |
| `<meta description>` | `origami00-wiki 个人站，包含文章、项目、照片墙与个人推荐内容。` | 搜索引擎描述 |

---

## 📌 修改优先级总结

| 优先级 | 文件 | 修改内容 |
|--------|------|----------|
| **最高** | `src/data/siteData.js` | 名字、简介、社交链接、动态、照片、音乐、子页面 |
| **高** | `src/App.jsx` | 色彩主题、头像、页面标题、问候语 |
| **中** | `index.html` | 站点名、meta description |
| **低** | `src/App.jsx` | 猫咪 SVG 颜色、时区偏移、标签配色 |
