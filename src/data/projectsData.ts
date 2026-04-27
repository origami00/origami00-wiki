import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "origami00-wiki",
    title: "origami00-wiki 个人主页",
    description: "基于 React 18 + Vite 的 Soft Minimalism 风格个人主页，包含瀑布流卡片布局、照片墙、音乐播放器等功能。",
    date: "2026-04-27",
    tags: ["React", "TypeScript", "Vite"],
    emoji: "🏠",
    status: "进行中",
    url: "https://github.com/origami00",
  },
  {
    id: "pixel-adventure",
    title: "像素冒险小游戏",
    description: "使用 HTML5 Canvas 开发的像素风格平台跳跃游戏，支持键盘和触屏操作，包含 3 个关卡。",
    date: "2026-03-20",
    tags: ["Canvas", "JavaScript", "Game"],
    emoji: "🎮",
    status: "已完成",
    url: "https://itch.io/",
  },
  {
    id: "ai-art-pipeline",
    title: "AI 绘画工作流工具",
    description: "ComfyUI 自定义节点集合，提供批量图片处理、风格迁移和提示词管理功能。",
    date: "2026-04-01",
    tags: ["Python", "AI", "ComfyUI"],
    emoji: "🎨",
    status: "进行中",
    url: "https://github.com/comfyanonymous/ComfyUI",
  },
];
