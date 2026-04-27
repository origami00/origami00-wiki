# origami00-wiki 项目注解文档

> Soft Minimalism 风格的 React 个人主页，包含主页（瀑布流布局）、照片墙、文章/项目展示页面。

---

## 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [设计系统](#设计系统)
- [路由架构](#路由架构)
- [核心入口文件](#核心入口文件)
- [布局与页面](#布局与页面)
- [自定义 Hooks](#自定义-hooks)
- [组件详解](#组件详解)
- [数据层](#数据层)
- [全局样式 index.css](#全局样式-indexcss)
- [响应式设计](#响应式设计)
- [样式方案说明](#样式方案说明)
- [测试](#测试)
- [扩展指南](#扩展指南)

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| React DOM | 18.3.1 | DOM 渲染 |
| React Router DOM | 6.30.3 | 嵌套路由 + Outlet |
| Lucide React | 1.8.0 | 线性图标库 |
| TypeScript | 6.0.3 | 类型安全 |
| Vite | 5.4.21 | 构建工具 |
| Vitest | 4.1.5 | 测试框架 |
| @testing-library/react | 16.3.2 | 组件测试 |

**零 CSS 框架** — 没有使用 Tailwind、SCSS、styled-components 或任何组件库。所有样式通过 **内联 style + 注入 `<style>` 标签 + 全局 CSS** 三种方式实现。

---

## 项目结构

```
src/
├── main.tsx                # 入口 + 嵌套路由 + React.lazy
├── App.tsx                 # 空壳（组件已拆分）
├── index.css               # 全局样式
├── vite-env.d.ts           # Vite 类型声明
├── tokens/
│   └── design.ts           # 设计令牌 C, card, iconMap
├── hooks/
│   ├── useClock.ts         # 实时时钟 hook
│   ├── useCalendar.ts      # 日历导航 hook
│   ├── useAudioPlayer.ts   # 音频播放器 hook
│   └── useContentManager.ts # 内容管理 hook（localStorage CRUD）
├── components/
│   ├── StatusBadge.tsx      # 状态徽章
│   ├── Avatar.tsx           # 头像
│   ├── CatSitting.tsx       # 猫咪 SVG
│   ├── ProfileCard.tsx      # 个人信息卡
│   ├── ClockCard.tsx        # 时钟卡
│   ├── CatCard.tsx          # 猫咪卡片
│   ├── SocialLinks.tsx      # 社交链接
│   ├── CalendarCard.tsx     # 日历卡
│   ├── LatestContent.tsx    # 最新动态
│   ├── MusicPlayer.tsx      # 音乐播放器
│   ├── UserSidebar.tsx      # 侧边导航
│   ├── PageTransition.tsx   # 页面过渡动画
│   └── LoadingFallback.tsx  # 加载占位
├── layouts/
│   └── MainLayout.tsx       # 主布局（grid + sidebar + Outlet + CSS）
├── pages/
│   ├── HomePage.tsx         # 首页（瀑布流卡片组合）
│   ├── PhotoWallPage.tsx    # 照片墙
│   ├── ArticlesPage.tsx     # 文章列表+详情
│   ├── ProjectsPage.tsx     # 项目展示
│   ├── AdminPage.tsx        # 管理面板（登录 + 文章/项目/照片/动态/推荐 CRUD）
│   └── SubPage.tsx          # 通用子页面（关于/推荐）
├── data/
│   ├── siteData.ts          # 站点数据
│   ├── articlesData.ts      # 文章数据
│   └── projectsData.ts      # 项目数据
├── types/
│   └── index.ts             # 所有 TypeScript 接口
├── test/
│   ├── setup.ts             # 测试初始化
│   └── renderWithRouter.tsx # 路由测试辅助
└── *.test.ts(x)             # 测试文件（与源文件同目录）

public/
└── static/              # 静态资产（Vite 直接提供服务）
    ├── 头像/             # 头像图片
    ├── 照片墙资产/        # 照片墙图片
    ├── 音乐/             # 音频文件（mp3，共 20 首）
    ├── icon/             # 社交链接自定义图标
    └── 社交链接/          # 社交链接说明
```

**架构特点**：
- 嵌套路由：`MainLayout` 包含侧边栏 + `<Outlet />`，每个页面独立组件
- 懒加载：所有页面组件通过 `React.lazy()` 按需加载
- 模块化：21 个独立模块，单文件 ≤160 行
- 内容管理：`useContentManager` hook + `AdminPage` 提供 localStorage CRUD

---

## 设计系统

### 色彩体系

采用 **Soft Minimalism（极简清新）** 风格，以低饱和薄荷绿为主色调。定义在 `src/tokens/design.ts`：

```ts
export const C: DesignTokens = {
  accent:     "#6ebeaf",              // 薄荷绿 — 按钮、高亮、图标
  accentDark: "#5a9e8f",              // 深薄荷 — hover 状态
  accentBg:   "rgba(110,190,175,0.08)", // 薄荷底色 — 标签、徽章背景

  text:       "#2d3a36",              // 主文字 — 深灰绿
  textSec:    "#6b8a80",              // 次级文字 — 中灰绿
  textMuted:  "#9db5ac",              // 辅助文字 — 浅灰绿

  card:       "rgba(255,255,255,0.55)", // 默认卡片 — 半透明白
  cardHover:  "rgba(255,255,255,0.68)", // hover 卡片 — 略深

  shadow:      "0 2px 16px rgba(100,160,145,0.06)",   // 默认阴影
  shadowHover: "0 8px 28px rgba(100,160,145,0.12)",    // hover 阴影
};
```

### 页面背景

```css
background: linear-gradient(160deg, #f5fffe 0%, #eafff7 30%, #edfff4 60%, #f4fffa 100%);
```

### 卡片基础样式

```ts
export const card: CardStyle = {
  background: C.card,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 20,
  boxShadow: C.shadow,
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

---

## 路由架构

### 嵌套路由（main.tsx）

```tsx
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PhotoWallPage = lazy(() => import("./pages/PhotoWallPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SubPage = lazy(() => import("./pages/SubPage"));

<Route element={<MainLayout />}>
  <Route index element={<HomePage />} />
  <Route path="photo-wall" element={<PhotoWallPage />} />
  <Route path="articles" element={<ArticlesPage />} />
  <Route path="projects" element={<ProjectsPage />} />
  <Route path="admin" element={<AdminPage />} />
  <Route path="about" element={<SubPage />} />
  <Route path="recommendations" element={<SubPage />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Route>
```

**路由表**：

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomePage | 瀑布流主页 |
| `/photo-wall` | PhotoWallPage | 照片墙 |
| `/articles` | ArticlesPage | 文章列表+详情 |
| `/projects` | ProjectsPage | 项目展示 |
| `/admin` | AdminPage | 管理面板（需登录） |
| `/about` | SubPage | 关于网站 |
| `/recommendations` | SubPage | 推荐分享 |
| `*` | Navigate | 兜底重定向 |

**要点**：
- `MainLayout` 作为父路由，包含侧边栏 + `<Outlet />`
- 所有页面通过 `React.lazy()` 懒加载
- `PageTransition` 组件包裹 `<Outlet />`，实现页面切换动画
- `App.tsx` 已精简为空壳

---

## 核心入口文件

### main.tsx

```tsx
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
// ... 其他 lazy import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* ... 其他路由 */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
```

### design.ts — 设计令牌

所有组件导入设计令牌，不再通过 props 传递：

```ts
import { C, card, iconMap } from "../tokens/design";
```

---

## 布局与页面

### MainLayout — 主布局

`src/layouts/MainLayout.tsx` 是整个应用的布局壳：

```
<div>                          ← 全屏渐变背景
  <style>                      ← 注入的 CSS（动画、布局、响应式）
  <main className="layoutGrid">
    <h1 className="srOnly">    ← 无障碍标题
    <aside> UserSidebar        ← 侧边导航
    <PageTransition>
      <Outlet />               ← 页面内容
    </PageTransition>
  </main>
</div>
```

**职责**：
- 全部 CSS（keyframes、响应式媒体查询、布局类）
- `document.title` 根据路由变化
- 三种布局模式：`layoutHome`（首页）、`layoutSub`（子页面）、`layoutPhoto`（照片墙）

### HomePage — 首页

`src/pages/HomePage.tsx` 组合 7 个卡片，使用 CSS columns 瀑布流布局：

```tsx
<div className="masonryColumns">
  <ProfileCard delay={0} />
  <CatCard delay={1} />
  <CalendarCard delay={2} />
  <SocialLinks delay={3} />
  <ClockCard delay={4} />
  <LatestContent delay={5} />
  <MusicPlayer delay={6} />
</div>
```

### ArticlesPage — 文章页

`src/pages/ArticlesPage.tsx` 包含文章列表和详情视图：
- 列表模式：显示所有文章，点击切换到详情
- 详情模式：显示文章完整内容，返回按钮恢复列表
- 标签颜色系统

### ProjectsPage — 项目页

`src/pages/ProjectsPage.tsx` 展示项目卡片：
- 状态标签：进行中（薄荷绿）、已完成（绿色）、暂停（灰色）
- 技术标签
- 可选外部链接

### SubPage — 通用子页面

`src/pages/SubPage.tsx` 通过 `useLocation().pathname` 判断当前页面（`/about` 或 `/recommendations`），无需 props。

### PhotoWallPage — 照片墙

`src/pages/PhotoWallPage.tsx` 使用拍立得散落布局展示照片：
- 封面大图 + 拍立得网格（随机旋转角度）
- 点击打开灯箱（lightbox），支持左右切换、键盘导航
- 照片数据通过 `useContentManager` 获取，支持管理面板动态修改

### AdminPage — 管理面板

`src/pages/AdminPage.tsx` 是内容管理后台：
- **登录系统**：localStorage 存储登录状态，支持邮箱+密码登录
- **Tab 切换**：文章管理 / 项目管理 / 照片管理 / 动态管理 / 音乐管理 / 推荐分享管理
- **CRUD 操作**：新增、编辑、删除条目，表单内联展开
- **重置功能**：清空 localStorage 恢复默认数据
- **照片管理**：缩略图预览、标题修改、上下移动排序
- **动态管理**：最新动态的增删改，数据同步到首页 LatestContent 卡片
- **音乐管理**：音乐列表的增删改和排序，数据同步到 MusicPlayer 组件
- **推荐分享管理**：推荐链接的增删改和排序，数据同步到 /recommendations 页面

---

## 自定义 Hooks

### useClock()

`src/hooks/useClock.ts` — 实时时钟 + 问候语

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `hours` | string | 两位小时，如 `"09"` |
| `minutes` | string | 两位分钟，如 `"05"` |
| `seconds` | string | 两位秒数，如 `"30"` |
| `dateStr` | string | 如 `"4月24日 星期四"` |
| `greeting` | string | `Morning` / `Afternoon` / `Evening` |

**时区处理**：`getTimezoneOffset() + 480` 强制 UTC+8。

### useCalendar()

`src/hooks/useCalendar.ts` — 月历导航

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `days` | array | 日历格子，`null` 或 `{ day, isToday }` |
| `year` | number | 当前查看年份 |
| `monthName` | string | 中文月份 |
| `goNext` | function | 下个月 |
| `goPrev` | function | 上个月 |

**日历算法**：周一为一周起始，offset 机制实现月份切换。

### useAudioPlayer()

`src/hooks/useAudioPlayer.ts` — 真实音频播放器

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `track` | object | 当前曲目 `{ title, artist, src }` |
| `playing` | boolean | 是否正在播放 |
| `progress` | number | 0-100 播放进度 |
| `volume` | number | 0-1 音量 |
| `playMode` | PlayMode | 当前播放模式 `"list"` / `"shuffle"` / `"loop"` |
| `toggle` | function | 播放/暂停 |
| `next` | function | 下一首 |
| `prev` | function | 上一首 |
| `seek` | function | 跳转进度 |
| `setVolume` | function | 设置音量 |
| `cycleMode` | function | 循环切换播放模式 |
| `elapsedStr` | string | 已播放时间 `"01:23"` |
| `totalStr` | string | 总时长 `"03:18"` |

使用 `<audio>` 元素播放真实 mp3，监听 `timeupdate` 和 `ended` 事件。20 首 mp3 文件在 `public/static/音乐/`。

### useContentManager()

`src/hooks/useContentManager.ts` — localStorage 内容管理

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `articles` | Article[] | 文章列表（localStorage 优先，回退静态数据） |
| `projects` | Project[] | 项目列表 |
| `photos` | PhotoWallItem[] | 照片列表 |
| `latest` | ContentItem[] | 最新动态列表 |
| `addArticle` | function | 新增文章 |
| `updateArticle` | function | 更新文章 |
| `deleteArticle` | function | 删除文章 |
| `addProject` | function | 新增项目 |
| `updateProject` | function | 更新项目 |
| `deleteProject` | function | 删除项目 |
| `addPhoto` | function | 新增照片 |
| `updatePhoto` | function | 更新照片 |
| `deletePhoto` | function | 删除照片 |
| `movePhoto` | function | 移动照片位置 |
| `addLatest` | function | 新增最新动态 |
| `updateLatest` | function | 更新最新动态 |
| `deleteLatest` | function | 删除最新动态 |
| `moveLatest` | function | 移动最新动态位置 |
| `addMusic` | function | 新增音乐 |
| `updateMusic` | function | 更新音乐 |
| `deleteMusic` | function | 删除音乐 |
| `moveMusic` | function | 移动音乐位置 |
| `addRecommendation` | function | 新增推荐链接 |
| `updateRecommendation` | function | 更新推荐链接 |
| `deleteRecommendation` | function | 删除推荐链接 |
| `moveRecommendation` | function | 移动推荐链接位置 |
| `resetArticles` | function | 重置文章为默认数据 |
| `resetProjects` | function | 重置项目为默认数据 |
| `resetPhotos` | function | 重置照片为默认数据 |
| `resetLatest` | function | 重置最新动态为默认数据 |
| `resetMusic` | function | 重置音乐为默认数据 |
| `resetRecommendations` | function | 重置推荐链接为默认数据 |

localStorage key：`origami00-articles` / `origami00-projects` / `origami00-photos` / `origami00-latest` / `origami00-music` / `origami00-recommendations`

合并策略：localStorage 中有数据时使用 localStorage，为空时使用静态默认数据。AdminPage 和展示页面共用此 hook，数据自动同步。

数据版本控制：`DATA_VERSION` 常量 + `migrateData()` 函数，当默认数据变更时自动清除 localStorage 缓存并回退到新默认数据，避免旧数据与新代码不兼容。

---

## 组件详解

### UserSidebar — 侧边导航栏

```
┌─────────────────┐
│     😺 头像      │
│   Origami00      │
│   ● 开发中       │
│ ─────────────── │
│ 🏠 首页         │
│ 📄 我的文章      │
│ ✨ 我的项目      │
│ ℹ️ 关于网站      │
│ ❤️ 推荐分享      │
│ ⚙️ 管理         │
└─────────────────┘
```

- 使用 `NavLink`，自动添加 `.active` 类
- 移动端（≤860px）变为水平滚动导航条

### ProfileCard — 个人信息卡

- 显示问候语（由 `useClock()` 提供）、头像、名称、状态、简介、位置
- hover 效果：上浮 + 阴影加深

### ClockCard — 时钟卡

- 等宽字体，冒号 `blink` 动画
- UTC+8 标识
- 秒数半透明显示

### CatCard — 猫咪插画卡

- 手绘 SVG 猫咪（`CatSitting` 组件）
- 点击跳转 `/photo-wall`

### SocialLinks — 社交链接卡

- 3 个图标按钮，使用自定义 PNG 图标
- hover 上浮放大

### CalendarCard — 日历卡

- 月份切换（prev/next）
- 今天日期高亮（薄荷绿实心）
- 周末文字使用 `C.accent`

### LatestContent — 最新动态

- 4 条内容卡片，含标签颜色系统
- 可点击跳转外部链接

### MusicPlayer — 音乐播放器

- 旋转唱片（`spin` 动画）
- 进度条支持拖拽
- 播放/暂停/上下首控制
- 音量滑块 + 静音切换
- 播放模式切换（列表/随机/单曲循环）
- 可折叠播放列表面板，支持拖拽排序

### PageTransition — 页面过渡

- 检测 `useLocation().key` 变化
- exit 动画 200ms → enter 动画 300ms
- 纯 CSS @keyframes

### LoadingFallback — 加载占位

- 旋转圆圈，用于 `Suspense` fallback

---

## 数据层

所有可配置数据集中在 `src/data/` 目录下，组件内禁止硬编码。

### siteData.ts

导出对象/数组：`profile`、`socialLinks`、`navigation`、`latestContent`、`musicList`、`photoWallItems`、`subPageContent`、`defaultRecommendations`。

### articlesData.ts

```ts
export const articles: Article[] = [
  { id: "1", title: "...", summary: "...", date: "...", tag: "...", emoji: "...", content: "...", url?: "..." },
  // ...
];
```

### projectsData.ts

```ts
export const projects: Project[] = [
  { id: "1", title: "...", description: "...", date: "...", tags: [...], emoji: "...", status: "进行中", url?: "..." },
  // ...
];
```

### types/index.ts

定义所有 TypeScript 接口：`DesignTokens`、`CardStyle`、`IconMap`、`NavItem`、`SocialLink`、`Profile`、`ContentItem`、`MusicTrack`、`PhotoWallItem`、`SubPageInfo`、`Article`、`Project`。

---

## 全局样式 index.css

### 字体引入

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap");
```

### 全局重置

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { min-height: 100%; }
```

### 自定义滚动条

```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb {
  background: rgba(110, 190, 175, 0.35);
  border-radius: 4px;
}
```

### 瀑布流布局

```css
.masonryColumns {
  column-count: 2;
  column-gap: 16px;
}
.masonryColumns > * {
  break-inside: avoid;
  margin-bottom: 16px;
}
```

---

## 响应式设计

### 断点系统

| 断点 | 适用场景 | 布局变化 |
|------|----------|----------|
| >1100px | 桌面端 | 180px 侧边栏 + 2 列瀑布流 |
| 860-1100px | 平板/小桌面 | 170px 侧边栏 + 2 列瀑布流 |
| ≤860px | 手机/小平板 | 单列堆叠，侧边栏变水平导航条 |
| ≤640px | 手机 | 管理面板/文章/项目/照片墙移动端适配 |
| ≤520px | 小手机 | 更紧凑间距 |
| ≤480px | 超小手机 | 进一步紧凑 |

---

## 样式方案说明

三层样式方案：

### 1. 全局 CSS（index.css）

全局重置、字体引入、滚动条、瀑布流布局。

### 2. 注入 `<style>` 标签（MainLayout.tsx）

```tsx
<style>{`
  @keyframes blink { ... }
  .layoutHome { ... }
  @media (max-width: 860px) { ... }
`}</style>
```

所有 CSS 类、动画、响应式媒体查询集中在 MainLayout 的 `<style>` 标签中。

### 3. 内联 style（style={{}}）

```tsx
<section style={{
  ...card,
  padding: "28px 26px",
  background: hov ? C.cardHover : C.card,
  transform: hov ? "translateY(-2px)" : "none",
}}>
```

hover 效果通过 `useState` 追踪状态，动态切换 style 值。

---

## 测试

### 框架

- **Vitest** — 测试运行器，与 Vite 原生集成
- **React Testing Library** — 组件测试，测试用户行为
- **jsdom** — 浏览器环境模拟

### 配置

`vite.config.ts` 添加 test 配置，`src/test/setup.ts` 初始化 jest-dom matchers。

### 测试文件

测试文件与源文件同目录，命名为 `*.test.ts(x)`。

```
26 个测试文件，138 个测试用例
├── tokens/design.test.ts        — 8 个用例
├── data/siteData.test.ts        — 21 个用例
├── data/articlesData.test.ts    — 4 个用例
├── data/projectsData.test.ts    — 4 个用例
├── hooks/useClock.test.ts       — 6 个用例
├── hooks/useCalendar.test.ts    — 6 个用例
├── hooks/useAudioPlayer.test.ts — 6 个用例
├── components/*.test.tsx        — 55 个用例（13 个组件）
├── pages/*.test.tsx             — 29 个用例（5 个页面）
└── layouts/MainLayout.test.tsx  — 6 个用例
```

### 常用命令

```bash
npm run test          # 运行所有测试
npm run test:watch    # 监听模式
npm run test:coverage # 覆盖率报告
```

### 测试辅助

- `src/test/renderWithRouter.tsx` — 路由组件测试辅助函数
- `vi.useFakeTimers()` — 控制时间相关逻辑
- `class MockAudio` — 模拟 HTML5 Audio API

---

## 扩展指南

### 添加新页面

1. 在 `src/pages/` 下创建 `.tsx` 文件
2. 在 `main.tsx` 中添加 lazy import 和路由
3. 在 `MainLayout.tsx` 的 `pageTitleMap` 中添加标题映射
4. 如需侧边栏导航，在 `siteData.ts` 的 `navigation` 中添加条目

### 添加新卡片组件

1. 在 `src/components/` 下创建 `.tsx` 文件
2. 导入 `C`、`card` 设计令牌
3. 在 `HomePage.tsx` 中引入并添加到瀑布流

### 修改网站内容

只改 `src/data/` 下对应文件，不动组件代码。

### 修改设计令牌

在 `src/tokens/design.ts` 中修改 `C` 或 `card` 对象。所有组件自动联动。

### 替换照片墙图片

修改 `siteData.ts` 中 `photoWallItems` 的 `src` 字段。

### 添加真实音频

1. 将 mp3 文件放入 `public/static/音乐/`
2. 在 `siteData.ts` 的 `musicList` 中添加曲目信息

---

## 关键设计决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| CSS 方案 | 内联 style + 注入 `<style>` | 可引用 JS 变量，设计令牌单一来源 |
| 瀑布流实现 | CSS `columns` | 零依赖，纯 CSS |
| 路由结构 | 嵌套路由 + Outlet | React Router 原生模式，性能更优 |
| 组件架构 | 21 个独立模块 | 单文件 ≤160 行，便于维护 |
| 图标库 | Lucide React | 线性风格统一，体积小 |
| 数据管理 | 集中 `data/` 目录 + useContentManager | 静态数据 + localStorage 双层管理 |
| 音乐播放 | 真实 `<audio>` + mp3 | 20 首本地 mp3，进度条拖拽，音量/模式控制 |
| 代码拆分 | React.lazy + Suspense | 首屏只加载 MainLayout + HomePage |
| 测试框架 | Vitest + RTL | 与 Vite 原生集成，测试用户行为 |
| 类型系统 | TypeScript strict | 拆分过程中捕获错误 |
| 内容管理 | useContentManager + localStorage | 无后端方案，AdminPage 提供 CRUD 界面 |
| 管理认证 | localStorage flag + 硬编码凭据 | 轻量级单用户认证，无需后端 |
