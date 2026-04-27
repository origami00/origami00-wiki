# AI_RULES — AI 协作固定规则

> 本文件定义 AI 助手在本项目中的协作规范，所有 AI 工具必须遵守。

---

## 1. 项目定位

- 这是一个**个人主页/维基网站**，不是企业级应用
- 设计风格：**Soft Minimalism**（磨砂玻璃 + 薄荷绿 + 瀑布流）
- 语言：**zh-CN**（中文优先）
- 规模：轻量级，追求最小依赖和最快构建

---

## 2. 代码风格

### 2.1 组件编写
- 使用 **函数组件 + Hooks**，禁止类组件
- 使用 **TypeScript**（`.tsx`/`.ts`），所有组件 props 和 hook 返回值必须有类型定义
- 类型定义集中在 `src/types/index.ts`，组件内接口定义在文件顶部
- 组件内同时包含：组件定义 + 内联样式 + `<style>` 标签（保持三层样式一致性）

### 2.2 样式规则
- **优先使用内联 `style={{}}`** — 引用设计 token `C` 和 `card` 对象
- **动画和媒体查询**使用 JSX 内 `<style>` 标签注入
- **全局重置和布局**使用 `index.css`
- **禁止**引入新的 CSS 方案（Tailwind、SCSS、CSS Modules 等）
- 颜色值必须使用设计系统定义的色值，不要随意新增颜色
- 响应式断点固定为 5 档：`>1100px` / `860-1100px` / `≤860px` / `≤640px` / `≤520px` / `≤480px`

### 2.3 设计 Token
- 颜色定义在 `src/tokens/design.ts` 的 `C` 对象中
- 卡片样式定义在 `card` 对象中
- 图标映射定义在 `iconMap` 对象中
- 新增设计元素时必须复用现有 token，不要硬编码新色值

---

## 3. 文件结构

### 3.1 目录规范
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
│   ├── AdminPage.tsx        # 管理面板（登录 + 文章/项目/照片/动态 CRUD）
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
└── Assets/              # 静态资产（Vite 直接提供服务）
    ├── 头像/             # 头像图片
    ├── 照片墙资产/        # 照片墙图片
    ├── 音乐/             # 音频文件（mp3）
    ├── icon/             # 社交链接自定义图标
    └── 社交链接/          # 社交链接说明
```

### 3.2 文件操作规则
- **新增页面**：在 `src/pages/` 下创建 `.tsx` 文件，在 `main.tsx` 的路由中注册
- **新增卡片组件**：在 `src/components/` 下创建 `.tsx` 文件
- **新增 hook**：在 `src/hooks/` 下创建 `.ts` 文件
- **修改数据**：只改 `src/data/` 下对应文件
- **新增类型**：在 `src/types/index.ts` 中添加接口
- **修改设计令牌**：在 `src/tokens/design.ts` 中修改
- **新增公共样式**：加到 `index.css`
- **组件级样式**：加到 `MainLayout.tsx` 内的 `<style>` 标签

---

## 4. 数据管理

- 所有可配置数据集中在 `src/data/` 目录下
- 组件内禁止硬编码文字、链接、图片路径
- 修改网站内容时，只改 `data/` 下的文件，不要动组件代码
- 数据结构保持现有格式，不要随意重构

---

## 5. 依赖管理

- **禁止**安装新的 npm 运行时依赖，除非明确必要且经过确认
- 测试依赖（vitest、@testing-library/*、jsdom）已安装，可自由使用
- 现有运行时依赖列表：
  - `react` + `react-dom` — UI 框架
  - `react-router-dom` — 路由
  - `lucide-react` — 图标
- 现有开发依赖：
  - `vite` + `@vitejs/plugin-react` — 构建工具
  - `typescript` + `@types/react` + `@types/react-dom` — 类型支持
  - `eslint` + `prettier` — 代码规范
  - `vitest` + `@testing-library/*` + `jsdom` — 测试
- 不要引入：CSS 框架、组件库、状态管理库、动画库、HTTP 客户端

---

## 6. 禁止事项

| # | 禁止操作 | 原因 |
|---|----------|------|
| 1 | 引入新的 CSS 方案 | 与三层样式策略冲突 |
| 2 | 引入新的 npm 运行时依赖 | 保持轻量 |
| 3 | 将组件合并回单文件 | 已完成拆分，保持模块化 |
| 4 | 删除现有组件或功能 | 除非用户明确要求 |
| 5 | 添加暗色模式 | 除非用户明确要求 |
| 6 | 修改 `vite.config.ts` | 除非用户明确要求 |
| 7 | 执行 `git push` 或破坏性 git 操作 | 除非用户明确要求 |

---

## 7. 构建与运行

- 开发服务器：`npm run dev`（Vite）
- 生产构建：`npm run build`（tsc + vite build）
- 代码检查：`npm run lint`（ESLint）
- 代码格式化：`npm run format`（Prettier）
- 运行测试：`npm run test`（Vitest）
- 监听测试：`npm run test:watch`（Vitest watch mode）
- 测试覆盖率：`npm run test:coverage`（Vitest + coverage）
- 构建产物在 `dist/` 目录
- 不要手动修改 `dist/` 下的文件

---

## 8. 提交规范

- 提交信息使用中文
- 格式：`[类型] 简要描述`
- 类型：`feat` / `fix` / `style` / `refactor` / `docs` / `chore` / `test`
- 示例：`[feat] 添加照片墙真实图片`、`[test] 添加 useClock hook 测试`

---

## 9. 交互原则

- **先读再改**：修改代码前必须先 `Read` 目标文件
- **最小改动**：只改必要的部分，不做无关清理
- **保持一致**：新代码风格必须与现有代码保持一致
- **不确定时问**：遇到设计决策时，询问用户而非自行决定
- **不要过度工程**：个人主页不需要企业级方案

---

## 10. 特殊组件规则

### 10.1 ClockCard
- 时钟每秒更新，注意性能影响
- 时区强制 UTC+8
- 冒号使用 `blink` 动画

### 10.2 CalendarCard
- 月份切换使用 offset 机制
- 今日日期高亮显示
- 星期标题固定为 `一 二 三 四 五 六 日`

### 10.3 MusicPlayer
- 使用 `<audio>` 元素播放真实 mp3
- 进度条支持拖拽定位
- 旋转唱片使用 `spin` 动画
- 音量滑块 + 静音切换
- 播放模式：列表 / 随机 / 单曲循环
- 可折叠播放列表面板

### 10.6 AdminPage
- 登录状态存储在 localStorage（`origami00-admin-auth`）
- 数据通过 `useContentManager` hook 管理
- 所有表单使用内联展开方式
- 照片管理支持缩略图预览和排序
- 动态管理支持最新动态的增删改，数据同步到首页 LatestContent 卡片

### 10.4 CatSitting (SVG 猫咪)
- 手绘 SVG，不要替换为图片
- 保持奶油色 + 薄荷色蝴蝶结的配色

### 10.5 PageTransition
- 使用 `useLocation().key` 检测路由变化
- exit 动画 200ms，enter 动画 300ms
- 纯 CSS @keyframes，不引入动画库

---

## 11. 测试规范

- 测试文件与源文件同目录，命名为 `*.test.ts(x)`
- 测试工具：Vitest + React Testing Library
- 路由相关组件使用 `renderWithRouter()` 辅助函数
- 音频相关测试使用 `class MockAudio` 替代全局 `Audio`
- 使用 `vi.useFakeTimers()` 控制时间相关逻辑
- 测试用户行为，不测试实现细节
- 新增组件/页面必须配套测试文件

---

## 12. 文档维护

- `PROJECT.md` 是完整开发手册，代码变更后应同步更新
- `PROJECT_STATUS.md` 记录进度，完成后更新状态
- `NEXT_ACTIONS.md` 记录下一步，完成后打勾并移动到「已完成」
- `DECISIONS.md` 记录关键决策，格式参考 DXXX 模板
- 本文件 `AI_RULES.md` 不应随意修改，除非用户明确要求

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-04-27 | v1.0 | 初始版本，11 条规则 |
| 2026-04-27 | v1.1 | 更新文件结构（.jsx→.tsx）、依赖列表、禁止事项，移除过时规则 |
| 2026-04-27 | v2.0 | 更新目录结构（拆分后）、设计令牌路径、新增测试规范、更新构建脚本、更新禁止事项 |
| 2026-04-27 | v2.1 | 新增 useContentManager hook、AdminPage、640px 断点、MusicPlayer 增强 |
