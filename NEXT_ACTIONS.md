# NEXT_ACTIONS — 下一步行动清单

> 最后更新：2026-04-27 v2

---

## 已完成

- [x] **初始化 Git 仓库** — `git init` + `.gitignore`，首次提交已完成
- [x] **集成 TypeScript** — 所有文件迁移为 `.tsx`/`.ts`，`src/types/index.ts` 定义全部接口，`tsc --noEmit` 通过
- [x] **配置 ESLint + Prettier** — `eslint.config.js` + `.prettierrc`，`npm run lint` 通过
- [x] **更新 index.html** — 脚本引用从 `main.jsx` 改为 `main.tsx`
- [x] **集成真实资产** — 迁移 Assets/ 到 public/，Avatar 使用真实头像，SocialLinks 使用自定义图标+真实 URL，PhotoWall 使用真实照片
- [x] **真实音频播放器** — useAudioPlayer 重写为 `<audio>` 元素，12 首 mp3 文件
- [x] **移动端响应式增强** — 新增 ≤480px 断点，覆盖 6 个组件的移动端适配
- [x] **组件拆分 + 路由重构** — App.tsx 893 行拆分为 21 个模块，嵌套路由 + MainLayout + Outlet
- [x] **文章/项目展示页** — ArticlesPage（列表+详情）、ProjectsPage（卡片+状态标签）
- [x] **页面切换过渡动画** — PageTransition 组件，淡入 0.3s / 淡出 0.2s
- [x] **组件懒加载** — React.lazy + Suspense，所有页面按需加载，构建产物拆分为 11 个 chunk
- [x] **单元测试** — Vitest + React Testing Library，26 个测试文件，136 个测试用例
- [x] **内容管理面板** — AdminPage 管理面板，支持文章/项目/照片的 CRUD 操作
- [x] **管理面板认证** — localStorage flag + 硬编码凭据登录系统
- [x] **照片墙管理** — 管理面板新增照片管理 Tab，支持增删改和排序
- [x] **移动端适配** — 新增 ≤640px 断点，管理面板/文章/项目/照片墙移动端优化

---

## Phase 5.1：测试覆盖率提升

**复杂度：M | 风险：低 | 预估：2-3天**

### 1. 增加边界用例
- useAudioPlayer：测试 `ended` 事件自动切歌、`play()` 拒绝时回退
- useCalendar：测试跨年（12月→1月）导航
- ArticlesPage：测试文章无 url 时的渲染
- SubPage：测试所有 4 个子路由路径

### 2. 增加集成测试
- MainLayout + 嵌套路由的端到端渲染
- 从首页点击猫咪卡片 → 照片墙页面的导航流程
- 从侧边栏导航到文章页 → 点击文章 → 查看详情 → 返回

### 3. 快照测试
- 关键组件的渲染快照（ProfileCard、MusicPlayer、CalendarCard）

---

## Phase 6：体验增强（可选）

**复杂度：L | 风险：低 | 预估：3-5天**

### 4. 暗色模式
- 创建暗色主题的 `C` 和 `card` 对象
- 使用 CSS `prefers-color-scheme` 媒体查询
- 添加主题切换按钮

### 5. Favicon + SEO
- 设置 favicon（猫咪 SVG 或 PNG）
- 添加 Open Graph meta 标签
- 添加结构化数据（JSON-LD）

### 6. 部署配置
- Vercel / Netlify / GitHub Pages 配置
- 自定义域名

---

## 检查清单

```
Phase 2: 组件拆分 + 路由重构
- [x] 提取设计令牌和工具函数
- [x] 提取自定义 Hooks
- [x] 拆分组件（13 个组件文件）
- [x] 创建 MainLayout + PageTransition
- [x] 路由重构（嵌套路由 + React.lazy）

Phase 3: 功能开发
- [x] 真实音频播放器
- [x] 文章/项目展示页
- [x] 内容管理面板（AdminPage + useContentManager）
- [x] 管理面板认证系统
- [x] 照片墙管理

Phase 4: 体验优化
- [x] 移动端响应式增强（5 个断点）
- [x] 页面切换过渡动画
- [x] 组件懒加载
- [x] 管理面板/文章/项目/照片墙移动端适配（≤640px）

Phase 5: 测试
- [x] 安装 Vitest + React Testing Library
- [x] 数据层测试（siteData, articlesData, projectsData）
- [x] 设计令牌测试（tokens/design）
- [x] Hook 测试（useClock, useCalendar, useAudioPlayer）
- [x] 组件测试（13 个组件）
- [x] 页面测试（5 个页面 + MainLayout）
- [ ] 覆盖率提升至 ≥90%

Phase 6: 体验增强（可选）
- [ ] 暗色模式
- [ ] Favicon + SEO
- [ ] 部署配置
```
