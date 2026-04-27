import type { ContentItem, MusicTrack, NavItem, PhotoWallItem, Profile, SocialLink, SubPageData } from "../types";

export const profile: Profile = {
  name: "Origami00",
  bio: "ai短片 · 绘画 · 游戏开发探索中",
  status: "developing",
  location: "中国",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    icon: "Github",
    href: "https://github.com/origami00",
    bg: "rgba(110,190,175,0.08)",
    color: "#5a9e8f",
    iconSrc: "/Assets/icon/github-fill.png",
  },
  {
    label: "Bilibili",
    icon: "Tv",
    href: "https://space.bilibili.com/366074182",
    bg: "rgba(110,190,175,0.06)",
    color: "#6ebeaf",
    iconSrc: "/Assets/icon/BILIBILI_LOGO.png",
  },
  {
    label: "抖音",
    icon: "Music2",
    href: "https://v.douyin.com/9Nhu7qm9-q8/",
    bg: "rgba(110,190,175,0.08)",
    color: "#5a9e8f",
    iconSrc: "/Assets/icon/抖音视频.png",
  },
];

export const navigation: NavItem[] = [
  { label: "首页", icon: "Home", href: "/" },
  { label: "我的文章", icon: "FileText", href: "/articles" },
  { label: "我的项目", icon: "Sparkles", href: "/projects" },
  { label: "关于网站", icon: "Info", href: "/about" },
  { label: "推荐分享", icon: "Heart", href: "/recommendations" },
];

export const latestContent: ContentItem[] = [
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

export const musicList: MusicTrack[] = [
  { title: "Banger Machine", artist: "Castion", duration: 0, src: "/Assets/音乐/Castion - Banger Machine.mp3" },
  { title: "Arabian Adventure", artist: "Eugene Star", duration: 0, src: "/Assets/音乐/Eugene Star - Arabian Adventure(New Mix1).mp3" },
  { title: "先说谎的人", artist: "h3R3", duration: 0, src: "/Assets/音乐/h3R3 - 先说谎的人.mp3" },
  { title: "We Never", artist: "Hi Noise", duration: 0, src: "/Assets/音乐/Hi Noise - We Never(Radio edit).mp3" },
  { title: "The Process", artist: "LAKEY INSPIRED", duration: 0, src: "/Assets/音乐/LAKEY INSPIRED - The Process.mp3" },
  { title: "恋爱频率", artist: "Sasablue", duration: 0, src: "/Assets/音乐/Sasablue - 恋爱频率(伴奏).mp3" },
  { title: "一样的月光", artist: "徐佳莹", duration: 0, src: "/Assets/音乐/徐佳莹 - 一样的月光.mp3" },
  { title: "it begins", artist: "牛尾憲輔", duration: 0, src: "/Assets/音乐/牛尾憲輔 - it begins.mp3" },
  { title: "鸳鸯戏", artist: "耳土", duration: 0, src: "/Assets/音乐/耳土 - 鸳鸯戏.mp3" },
  { title: "小孩", artist: "蒋孜怡", duration: 0, src: "/Assets/音乐/蒋孜怡 - 小孩.mp3" },
  { title: "怪獣登場", artist: "高梨康治", duration: 0, src: "/Assets/音乐/高梨康治 - 怪獣 登場進撃2 (UT_M-48).mp3" },
  { title: "纸飞机", artist: "飞行雪绒", duration: 0, src: "/Assets/音乐/鸣潮先约电台,飞行雪绒 - 纸飞机.mp3" },
];

export const photoWallItems: PhotoWallItem[] = [
  { title: "封面", src: "/Assets/照片墙资产/23417_86777360146.jpg" },
  { title: "插画1", src: "/Assets/照片墙资产/baimaomeimo.jpg" },
  { title: "风格参考", src: "/Assets/照片墙资产/fenggecankao.jpg" },
  { title: "房间布局", src: "/Assets/照片墙资产/beijin.jpg" },
  { title: "背景", src: "/Assets/照片墙资产/beijin2.jpg" },
  { title: "花卉", src: "/Assets/照片墙资产/flower-9294773_1280.webp" },
  { title: "随拍", src: "/Assets/照片墙资产/12342_22260975244.jpg" },
  { title: "插画2", src: "/Assets/照片墙资产/280518dc-3ccf-485e-aa44-52e6a7c54f99.webp" },
  { title: "线稿", src: "/Assets/照片墙资产/youhuxiantiao.jpg" },
];

export const subPageContent: Record<string, SubPageData> = {
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
