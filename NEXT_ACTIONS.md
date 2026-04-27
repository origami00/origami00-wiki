# NEXT_ACTIONS — 下一步行动清单

> 最后更新：2026-04-27

---

## 已完成

- [x] **初始化 Git 仓库** — `git init` + `.gitignore`，首次提交已完成
- [x] **集成 TypeScript** — 所有文件迁移为 `.tsx`/`.ts`，`src/types/index.ts` 定义全部接口，`tsc --noEmit` 通过
- [x] **配置 ESLint + Prettier** — `eslint.config.js` + `.prettierrc`，`npm run lint` 通过
- [x] **更新 index.html** — 脚本引用从 `main.jsx` 改为 `main.tsx`

---

## Phase 2：组件拆分 + 路由重构 + 样式统一

**复杂度：XL | 风险：高 | 预估：4-5天**

### 1. 提取设计令牌和工具函数
- 创建 `src/tokens/design.ts` — 导出 `C`（颜色）和 `card`（基础卡片样式）
- 创建 `src/utils/format.ts` — 提取 `fmt()` 时间格式化函数
- 创建 `src/utils/icons.ts` — 提取 `iconMap` 映射
- **为什么**：为组件拆分提供共享依赖

### 2. 提取自定义 Hooks
- `src/hooks/useClock.ts`（~25行）
- `src/hooks/useCalendar.ts`（~25行）
- `src/hooks/useAudioPlayer.ts`（~40行，Phase 3 会重写）
- **为什么**：逻辑与 UI 分离，便于独立测试

### 3. 拆分组件（按依赖从少到多）
- 原子组件：StatusBadge, Avatar, CatSitting
- 卡片组件：ProfileCard, ClockCard, CatCard, SocialLinks, CalendarCard, LatestContent, MusicPlayer
- 布局组件：UserSidebar
- **为什么**：每个文件 ≤200 行，便于维护

### 4. 样式体系统一
- 从 App.tsx `<style>{}` 标签提取为独立 CSS 文件：
  - `src/styles/animations.css` — keyframe 动画
  - `src/styles/layout.css` — grid 布局
  - `src/styles/responsive.css` — 媒体查询
  - `src/styles/components.css` — sidebar、photo wall 等
- **为什么**：消除内联样式中的 `!important`，提升可维护性

### 5. 路由重构
- 创建 `src/layouts/MainLayout.tsx` — 抽象 grid + sidebar + `<Outlet />`
- 重构 `src/main.tsx`：使用嵌套路由 + `React.lazy` 懒加载
- 创建 `src/pages/HomePage.tsx` — 从 App.tsx 提取首页逻辑
- App.tsx 精简为路由壳（~30行）
- **为什么**：当前所有路由渲染同一组件，违背 React Router 设计初衷

---

## Phase 3：功能开发

**复杂度：XL | 风险：中 | 预估：5-7天**

### 6. 真实音频播放器
- 重写 `useAudioPlayer` hook：使用 `<audio>` 元素替代 `setInterval`
- MusicPlayer 组件更新：自定义进度条拖拽（onMouseDown/onTouchStart）
- 在 `public/audio/` 放置 3 个 mp3 文件
- **验证点**：播放控制可点击并产生音频输出，进度条拖拽定位误差 ≤1秒

### 7. 文章/项目展示页
- 创建 `src/data/articlesData.ts` — 至少 3 篇示例文章数据
- 创建 `src/data/projectsData.ts` — 至少 3 个示例项目数据
- 新增 `src/pages/ArticlesPage.tsx` 和 `src/pages/ProjectsPage.tsx`
- 新增组件：ArticleCard, ArticleDetail, ProjectCard, ProjectDetail, SkeletonCard, TagBadge
- **验证点**：页面加载后展示 ≥3 个卡片，点击可查看详情

---

## Phase 4：体验优化

**复杂度：L | 风险：中 | 预估：3-4天**

### 8. 移动端响应式增强
- 新增 `@media (max-width: 480px)` 断点
- 移除 SubPage 中硬编码的 `min-height: 500px`
- **验证点**：320px-768px 宽度下布局完整无溢出

### 9. 页面切换过渡动画
- MainLayout 中实现淡入/滑出效果，总时长 ≤300ms
- **验证点**：路由切换时出现动画效果

### 10. 组件懒加载
- 创建 `useIntersectionObserver` hook
- 非首屏卡片滚动靠近时才渲染
- **验证点**：首屏渲染时间 ≤2秒（3G 模拟）

---

## Phase 5：测试

**复杂度：M | 风险：低 | 预估：3-4天**

### 11. 添加单元测试
- 安装 Vitest + React Testing Library
- 覆盖：utils/format.ts、useClock、useCalendar、useAudioPlayer、MusicPlayer、LatestContent
- **验证点**：覆盖率 ≥80%，测试全部通过

---

## 检查清单

```
Phase 2:
- [ ] 提取设计令牌和工具函数
- [ ] 提取自定义 Hooks
- [ ] 拆分组件（11 个文件）
- [ ] 样式体系统一
- [ ] 路由重构

Phase 3:
- [ ] 真实音频播放器
- [ ] 文章/项目展示页

Phase 4:
- [ ] 移动端响应式增强
- [ ] 页面切换过渡动画
- [ ] 组件懒加载

Phase 5:
- [ ] 添加单元测试
```
