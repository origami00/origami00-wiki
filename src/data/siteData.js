export const profile = {
  name: "小猫咪",
  bio: "全栈开发 · 插画爱好者 · 游戏设计探索中",
  status: "developing",
  location: "中国",
};

export const socialLinks = [
  {
    label: "GitHub",
    icon: "Github",
    href: "https://github.com/",
    bg: "rgba(110,190,175,0.08)",
    color: "#5a9e8f",
  },
  {
    label: "Bilibili",
    icon: "Tv",
    href: "https://space.bilibili.com/",
    bg: "rgba(110,190,175,0.06)",
    color: "#6ebeaf",
  },
  {
    label: "抖音",
    icon: "Music2",
    href: "https://www.douyin.com/",
    bg: "rgba(110,190,175,0.08)",
    color: "#5a9e8f",
  },
];

export const navigation = [
  { label: "首页", icon: "Home", href: "/" },
  { label: "我的文章", icon: "FileText", href: "/articles" },
  { label: "我的项目", icon: "Sparkles", href: "/projects" },
  { label: "关于网站", icon: "Info", href: "/about" },
  { label: "推荐分享", icon: "Heart", href: "/recommendations" },
];

export const latestContent = [
  {
    title: "用 Next.js 搭建个人主页",
    date: "2026-04-12",
    tag: "技术",
    emoji: "⚡",
    url: "https://nextjs.org/docs",
  },
  {
    title: "ComfyUI 工作流参考",
    date: "2026-04-10",
    tag: "AI",
    emoji: "🤖",
    url: "https://github.com/comfyanonymous/ComfyUI",
  },
  {
    title: "像素风小游戏灵感",
    date: "2026-04-08",
    tag: "游戏",
    emoji: "🎮",
    url: "https://itch.io/",
  },
  {
    title: "Framer Motion 动画实践",
    date: "2026-04-05",
    tag: "前端",
    emoji: "✨",
    url: "https://www.framer.com/motion/",
  },
];

export const musicList = [
  { title: "春日散步", artist: "轻音乐集", duration: 198 },
  { title: "午后阳光", artist: "钢琴曲", duration: 243 },
  { title: "星空下", artist: "氛围音乐", duration: 312 },
];

export const photoWallItems = [
  { title: "街头随拍", src: "https://picsum.photos/seed/origami-wall-1/720/520" },
  { title: "晨间光影", src: "https://picsum.photos/seed/origami-wall-2/720/520" },
  { title: "旅行片段", src: "https://picsum.photos/seed/origami-wall-3/720/520" },
  { title: "城市色块", src: "https://picsum.photos/seed/origami-wall-4/720/520" },
  { title: "猫咪日常", src: "https://picsum.photos/seed/origami-wall-5/720/520" },
  { title: "自然风景", src: "https://picsum.photos/seed/origami-wall-6/720/520" },
];

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
