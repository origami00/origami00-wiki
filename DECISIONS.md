# DECISIONS — 关键决策记录

> 最后更新：2026-04-27 v2

---

## D001 — 技术栈选型

- **日期**：项目初始阶段
- **决策**：使用 React 18 + Vite + React Router 6，不引入 CSS 框架、组件库、状态管理库
- **备选方案**：
  - Next.js（SSG/SSR）— 过于重量级，个人主页不需要
  - Tailwind CSS — 增加学习成本，与 inline style 策略冲突
  - styled-components — 增加依赖，与项目轻量定位不符
- **理由**：个人主页规模小，需要最小依赖、最快构建速度。React + Vite 提供了最佳的开发体验和构建性能平衡
- **影响**：无框架锁定，技术栈简单透明

---

## D002 — 样式策略：三层混合

- **日期**：项目初始阶段
- **决策**：采用三层样式方案：
  1. 全局 CSS（index.css）— 重置、字体、滚动条、masonry 布局
  2. JSX 内 `<style>` 标签 — 动画、媒体查询、响应式
  3. `style={{}}` 内联样式 — 所有组件视觉属性
- **备选方案**：
  - 全局 CSS 文件 — 无法引用 JS 变量（如设计 token）
  - CSS Modules — 增加文件数量，对小型项目过度
  - Tailwind CSS — 与项目极简定位不符
- **理由**：设计 token（`C` 和 `card` 对象）需要在 JS 中定义并直接引用，内联样式是唯一能直接绑定 JS 变量的方式。`<style>` 标签弥补了内联样式无法使用伪类和媒体查询的缺陷
- **已知代价**：`:hover`/`:focus` 效果受限，媒体查询需要 `!important` 覆盖，无法使用 CSS 变量
- **影响**：样式与组件高度耦合，迁移成本高

---

## D003 — 单文件组件架构 → 已废弃

- **日期**：项目初始阶段（已重构 2026-04-27）
- **决策**：初始阶段所有组件集中在 App.jsx，后拆分为独立模块
- **重构结果**：App.tsx 893 行 → 21 个独立模块，最大文件 MainLayout.tsx ~160 行
- **影响**：已解决，参见 D018

---

## D004 — 中文优先界面

- **日期**：项目初始阶段
- **决策**：网站语言设为 `zh-CN`，所有 UI 文本使用中文
- **理由**：目标用户为中文用户，小猫咪（Little Kitty）为中文昵称
- **影响**：字体加载 Noto Sans SC（中文无衬线字体），增加约 100KB 字体体积

---

## D005 — 瀑布流布局

- **日期**：项目初始阶段
- **决策**：首页采用 CSS columns 实现的瀑布流（masonry）布局
- **备选方案**：
  - Flexbox 网格 — 卡片高度不一致时底部不对齐
  - CSS Grid — 需要显式指定行数，不够灵活
  - Masonry 库 — 增加依赖
- **理由**：CSS columns 原生支持瀑布流，无需额外依赖，自动适应卡片高度差异
- **影响**：桌面端 2 列，移动端 1 列；列数在 CSS 中固定

---

## D006 — 磨砂玻璃（Glassmorphism）卡片设计

- **日期**：项目初始阶段
- **决策**：所有卡片采用 `backdrop-filter: blur(18px)` + 半透明白色背景
- **理由**：「Soft Minimalism」设计风格的核心视觉特征，营造轻盈、现代感
- **影响**：不支持 Safari 旧版本（<15.4），部分浏览器兼容性受限

---

## D007 — UTC+8 时区强制

- **日期**：项目初始阶段
- **决策**：时钟组件使用 `getTimezoneOffset() + 480` 强制 UTC+8，而非依赖浏览器本地时区
- **理由**：网站所有者在北京时区，无论访问者在哪都需要显示北京时间
- **影响**：需要额外的时区转换逻辑

---

## D008 — 真实音频播放器

- **日期**：2026-04-27（Phase 3）
- **决策**：音乐播放器使用 `<audio>` 元素播放真实 mp3 文件
- **理由**：20 首 mp3 文件已放置在 `public/static/音乐/`，HTML5 Audio API 直接支持
- **影响**：进度条拖拽、自动切歌、播放/暂停均已实现

---

## D009 — 嵌套路由架构

- **日期**：2026-04-27（Phase 2 重构）
- **决策**：从扁平路由 + 单组件切换重构为嵌套路由 + MainLayout + Outlet
- **重构前**：所有路由渲染同一个 `<App />`，内部通过 `useLocation().pathname` 判断
- **重构后**：`MainLayout` 包含侧边栏 + `<Outlet />`，每个页面独立组件
- **理由**：React Router 的设计初衷是嵌套路由，重构后页面切换只更新内容区域，性能更优
- **影响**：`App.tsx` 精简为空壳，`main.tsx` 配置嵌套路由表

---

## D010 — 迁移至 TypeScript

- **日期**：2026-04-27（Phase 1.2）
- **决策**：将所有 `.jsx`/`.js` 文件迁移为 `.tsx`/`.ts`，启用 strict 模式
- **理由**：Phase 2 需要大规模组件拆分，TypeScript 类型系统能在拆分过程中捕获错误
- **影响**：`tsc --noEmit` 无报错，IDE 智能提示完整

---

## D011 — 配置 ESLint + Prettier

- **日期**：2026-04-27（Phase 1.3）
- **决策**：使用 ESLint flat config + Prettier，与 TypeScript 集成
- **影响**：`npm run lint` 无报错，代码格式统一

---

## D012 — 音频数据源：本地 mp3 文件

- **日期**：2026-04-27
- **决策**：音乐播放器使用本地 mp3 文件，不对接网易云 API
- **理由**：个人主页项目无后端服务，本地 mp3 是最简单可靠的方案
- **影响**：在 `public/static/音乐/` 放置 20 个 mp3 文件

---

## D013 — 跳过后端 API 接入

- **日期**：2026-04-27
- **决策**：暂不实现动态数据拉取，保持 `siteData.ts` 静态数据
- **理由**：无已部署的后端服务，前端先实现 UI 和交互
- **影响**：所有数据组件保持静态数据

---

## D014 — 文章/项目内容用示例数据填充

- **日期**：2026-04-27
- **决策**：文章/项目展示页先用示例数据搭建，后续替换为真实内容
- **影响**：创建 `articlesData.ts`（3 篇文章）和 `projectsData.ts`（3 个项目）

---

## D015 — 静态资产目录迁移至 public/

- **日期**：2026-04-27
- **决策**：将 `Assets/` 从项目根目录移动到 `public/static/`，通过 `/static/...` 路径直接访问（后经 D028 从 `public/Assets/` 重命名为 `public/static/`）
- **理由**：`public/` 目录下的文件由 Vite 直接提供静态服务，适合大型媒体文件
- **影响**：所有资产路径以 `/static/` 开头

---

## D016 — 社交链接使用自定义图标

- **日期**：2026-04-27
- **决策**：社交链接图标从 Lucide 通用图标改为自定义 PNG 图片
- **影响**：`SocialLink` 类型新增 `iconSrc?: string` 字段

---

## D017 — 音乐播放器仅使用 mp3 格式

- **日期**：2026-04-27
- **决策**：排除 `.flac` 和 `.aac` 格式，仅保留 `.mp3`（共 20 首）
- **理由**：HTML5 `<audio>` 对 FLAC/AAC 的浏览器兼容性不佳

---

## D018 — 组件拆分架构

- **日期**：2026-04-27（Phase 2）
- **决策**：将 App.tsx 893 行拆分为 21 个独立模块
- **拆分方案**：
  - `tokens/design.ts` — 设计令牌 `C`、`card`、`iconMap`
  - `hooks/` — `useClock`、`useCalendar`、`useAudioPlayer`
  - `components/` — 13 个组件（含 PageTransition + LoadingFallback）
  - `layouts/MainLayout.tsx` — 布局壳 + `<Outlet />` + 全部 CSS
  - `pages/HomePage.tsx` — 首页瀑布流组合
- **理由**：单文件 893 行维护困难，拆分后每个模块 ≤160 行，便于定位和修改
- **影响**：所有组件从 tokens 和 hooks 导入依赖，不再通过 props 传递设计令牌

---

## D019 — 页面过渡动画方案

- **日期**：2026-04-27（Phase 4）
- **决策**：使用纯 CSS @keyframes + `useLocation().key` 触发，不引入动画库
- **备选方案**：
  - Framer Motion — 增加依赖，与项目轻量定位不符
  - react-transition-group — 增加依赖
  - GSAP — 过于重量级
- **实现**：`PageTransition` 组件检测 `location.key` 变化，先播放 exit 动画（200ms），再播放 enter 动画（300ms）
- **影响**：页面切换有淡入/淡出效果，无额外依赖

---

## D020 — 测试框架选型

- **日期**：2026-04-27（Phase 5）
- **决策**：使用 Vitest + React Testing Library + jsdom
- **备选方案**：
  - Jest — 需要额外配置 ESM 支持，与 Vite 集成不如 Vitest
  - Cypress — E2E 测试框架，对当前项目过于重量级
- **理由**：Vitest 与 Vite 原生集成，零配置支持 TypeScript/ESM/JSX；React Testing Library 鼓励测试用户行为而非实现细节
- **实施**：
  - 安装 `vitest`、`@testing-library/react`、`@testing-library/jest-dom`、`@testing-library/user-event`、`jsdom`
  - `vite.config.ts` 添加 `test` 配置
  - `src/test/setup.ts` 初始化 jest-dom matchers
  - `src/test/renderWithRouter.tsx` 路由测试辅助函数
- **影响**：26 个测试文件，138 个测试用例，`npm run test` 全部通过

---

## D021 — 懒加载策略

- **日期**：2026-04-27（Phase 2/4）
- **决策**：使用 `React.lazy()` + `Suspense` 对所有页面组件进行路由级懒加载
- **理由**：Vite 原生支持 `import()` 动态导入，React.lazy 无需额外依赖
- **影响**：构建产物从单个 205KB 文件拆分为 11 个 chunk，首屏只加载 MainLayout + HomePage

---

## D022 — 内容管理面板

- **日期**：2026-04-27
- **决策**：创建 AdminPage 管理面板，通过网页界面管理文章、项目和照片
- **备选方案**：
  - 直接修改代码文件 — 每次都需要重新构建
  - 接入 Headless CMS（如 Strapi）— 需要后端服务
  - GitHub API 直接操作 — 需要 token，安全性差
- **理由**：个人站点无后端，localStorage 是最简单的数据持久化方案。AdminPage 提供友好的 CRUD 界面
- **影响**：创建 `useContentManager` hook + `AdminPage` 组件，文章/项目/照片页改用 hook 获取数据

---

## D023 — 管理面板认证系统

- **日期**：2026-04-27
- **决策**：AdminPage 使用 localStorage flag + 硬编码凭据的登录系统
- **备选方案**：
  - 无认证直接访问 — 安全性差
  - JWT + 后端认证 — 需要部署后端
  - OAuth（GitHub/Google）— 需要配置第三方服务
- **理由**：个人站点仅站长一人使用，硬编码凭据是最轻量的方案。登录状态存储在 localStorage
- **影响**：`AdminPage.tsx` 包含 `useAuth()` hook 和 `LoginForm` 组件

---

## D024 — 照片墙管理

- **日期**：2026-04-27
- **决策**：管理面板新增照片管理 Tab，支持增删改和排序
- **理由**：照片墙内容需要动态更新，与文章/项目管理统一入口
- **影响**：`useContentManager` 新增 `addPhoto`/`updatePhoto`/`deletePhoto`/`movePhoto` 方法，`PhotoWallPage` 改用 hook 获取数据

---

## D025 — localStorage 数据持久化

- **日期**：2026-04-27
- **决策**：使用 localStorage 存储用户自定义的文章、项目和照片数据
- **备选方案**：
  - IndexedDB — API 复杂，对当前规模过度
  - 服务端数据库 — 需要后端
  - 文件系统（Electron）— 限制为桌面端
- **理由**：localStorage API 简单，浏览器原生支持，数据持久化到浏览器关闭后仍保留
- **影响**：`useContentManager` hook 负责读写 localStorage，与静态默认数据合并。重置功能清空 localStorage 恢复默认

---

## D026 — 移动端适配策略

- **日期**：2026-04-27
- **决策**：新增 ≤640px 断点，为管理面板、文章页、项目页、照片墙添加移动端适配 CSS
- **理由**：管理面板等新组件在小屏幕上需要调整布局（如表单堆叠、列表紧凑）
- **影响**：MainLayout.tsx 新增 `@media (max-width: 640px)` 媒体查询，覆盖管理面板/文章/项目/照片/音乐播放器

---

## D027 — 最新动态管理

- **日期**：2026-04-27
- **决策**：将 `latestContent` 纳入 `useContentManager` 的 localStorage 持久化体系，管理面板新增「动态管理」Tab
- **备选方案**：
  - 保持静态数据，每次修改需手动编辑代码
  - 使用独立的 localStorage 键和管理逻辑
- **理由**：最新动态需要频繁更新，与文章/项目/照片管理统一入口，用户体验一致
- **影响**：
  - `useContentManager` 新增 `latest` 状态和 CRUD 方法
  - `AdminPage` 新增「动态管理」Tab（Bell 图标）
  - `LatestContent` 组件从静态 import 改为 `useContentManager()` 动态读取
  - `ContentItem` 接口新增可选 `id` 字段
  - localStorage 新增 `origami00-latest` 键

---

## D028 — 静态资源路径迁移

- **日期**：2026-04-27
- **决策**：将 `public/Assets/` 重命名为 `public/static/`，所有资源路径从 `/Assets/...` 改为 `/static/...`
- **备选方案**：
  - 保持 `public/Assets/` 不变 — Windows 大小写不敏感导致本地正常，Linux 部署后 404
  - 使用 Vite alias 重写路径 — 增加配置复杂度
- **理由**：Vite 构建输出目录为 `dist/assets/`（小写），与 `public/Assets/`（大写）在 Linux 文件系统上产生路径冲突。重命名为 `public/static/` 彻底避免歧义
- **影响**：所有组件和数据文件中的资源路径统一更新，nginx.conf 配置 `/static/` 缓存策略

---

## D029 — 推荐分享管理

- **日期**：2026-04-27
- **决策**：管理面板新增「推荐分享」Tab，通过 `useContentManager` 管理推荐链接数据
- **备选方案**：
  - 保持静态数据，每次修改需手动编辑代码 — 效率低
  - 独立管理逻辑 — 与其他管理 Tab 模式不一致
- **理由**：推荐分享页面（`/recommendations`）原使用硬编码数据，无法通过后台编辑。纳入统一管理体系后，与其他内容（文章/项目/照片/动态/音乐）管理体验一致
- **影响**：
  - `siteData.ts` 新增 `defaultRecommendations` 导出
  - `useContentManager` 新增 `recommendations` 状态和 5 个 CRUD 方法
  - `AdminPage` 新增 `RecommendationsTab` 组件
  - `SubPage` 的 `/recommendations` 路由改用 `useContentManager` 数据
  - localStorage 新增 `origami00-recommendations` 键

---

## D030 — 数据版本控制

- **日期**：2026-04-27
- **决策**：在 `useContentManager` 中引入 `DATA_VERSION` 常量和 `migrateData()` 函数，当默认数据变更时自动清除 localStorage 缓存
- **备选方案**：
  - 手动清除 localStorage — 用户需知道操作方法，体验差
  - 逐字段迁移 — 实现复杂，当前规模不需要
  - 不做迁移 — 旧数据与新代码不兼容（如 12 首歌 vs 20 首歌）
- **理由**：默认数据变更（如音乐列表从 12 首扩展到 20 首、资源路径迁移）后，localStorage 中的旧数据会导致功能异常。版本控制机制确保用户始终看到正确的数据
- **影响**：
  - `useContentManager` 新增 `DATA_VERSION_KEY`、`DATA_VERSION`、`migrateData()`
  - 每次默认数据变更时只需 bump `DATA_VERSION` 值
  - 所有 localStorage 缓存在版本不匹配时自动清除并回退到新默认数据

---

## 决策模板

新增决策时使用以下格式：

```markdown
## DXXX — 决策标题

- **日期**：YYYY-MM-DD
- **决策**：最终决定
- **备选方案**：列出考虑过的替代方案
- **理由**：选择该方案的原因
- **影响**：该决策对项目的正面/负面影响
```
