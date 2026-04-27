import type { Article } from "../types";

export const articles: Article[] = [
  {
    id: "react-18-new-features",
    title: "React 18 新特性实践笔记",
    summary: "Concurrent Mode、Suspense 和 useTransition 在实际项目中的应用心得，以及从 React 17 迁移的注意事项。",
    date: "2026-04-15",
    tag: "前端",
    emoji: "⚛️",
    content: `React 18 带来了许多令人兴奋的新特性。在这篇文章中，我将分享在实际项目中使用 Concurrent Mode、Suspense 和 useTransition 的经验。

## Concurrent Mode

Concurrent Mode 是 React 18 最重要的底层变化。它允许 React 同时准备多个版本的 UI，使得界面能够响应用户的输入而不被阻塞。

## useTransition

useTransition hook 让你可以将某些状态更新标记为"过渡"，React 会优先处理紧急更新（如用户输入），然后再处理过渡更新。

## Suspense 改进

React 18 中的 Suspense 支持 SSR 场景下的流式渲染，这对首屏性能有很大帮助。`,
    url: "https://react.dev/blog/2022/03/29/react-v18",
  },
  {
    id: "comfyui-workflow-guide",
    title: "ComfyUI 工作流入门指南",
    summary: "从零开始搭建 ComfyUI 工作流，涵盖模型加载、提示词编写、图像后处理等核心节点的使用方法。",
    date: "2026-04-10",
    tag: "AI",
    emoji: "🤖",
    content: `ComfyUI 是一个基于节点的 Stable Diffusion GUI，它提供了极大的灵活性和可定制性。

## 安装与配置

首先需要安装 Python 3.10+ 和 CUDA 环境。ComfyUI 支持 Windows、Linux 和 macOS。

## 核心节点

- **Load Checkpoint** — 加载 Stable Diffusion 模型
- **CLIP Text Encode** — 编写正向和负向提示词
- **KSampler** — 设置采样器参数
- **VAE Decode** — 将潜空间图像解码为像素图像

## 工作流设计

一个好的工作流应该模块化、可复用。建议将常用组合封装为组（Group），方便后续调用。`,
    url: "https://github.com/comfyanonymous/ComfyUI",
  },
  {
    id: "pixel-game-design",
    title: "像素风独立游戏设计思路",
    summary: "探索像素艺术的美学原则，以及如何用有限的色彩和分辨率创造出有表现力的游戏画面。",
    date: "2026-04-05",
    tag: "游戏",
    emoji: "🎮",
    content: `像素艺术是一种在有限分辨率和色彩下追求表现力的艺术形式。在独立游戏开发中，像素风格不仅是一种美学选择，更是一种实用的开发策略。

## 色彩限制

使用有限的调色板（如 16 色或 32 色）可以让画面更加统一和谐。推荐参考 Lospec 上的调色板集合。

## 动画技巧

像素动画的关键在于关键帧的选取。通常 4-8 帧就能表现出流畅的动作，关键是把握好节奏和缓动。

## 工具推荐

- **Aseprite** — 专业像素动画编辑器
- **Piskel** — 免费在线像素编辑器
- **Tiled** — 地图编辑器`,
    url: "https://itch.io/",
  },
];
