# NEXT_ACTIONS — 下一步行动清单

> 最后更新：2026-04-27

---

## 立即执行（P0）

### 1. 初始化 Git 仓库
- 运行 `git init` 创建版本控制
- 创建 `.gitignore`（排除 `node_modules/`、`dist/`、`.claude/`）
- 首次提交：所有现有文件
- **为什么**：没有版本控制就无法安全地进行任何修改

### 2. 替换真实内容
- 更新 `siteData.js` 中的 `profile` 对象（真实昵称、签名、位置）
- 更新 `socialLinks` 中的 URL（真实 GitHub/Bilibili/抖音主页地址）
- 更新 `latestContent` 中的链接（指向真实文章或项目）
- 更新 `subPageContent` 中的子页面内容和外链
- **为什么**：当前所有数据均为占位符，网站无法对外展示

### 3. 替换照片墙图片
- 准备 6 张真实照片（建议尺寸 800x600 以上）
- 放入 `public/` 目录或使用真实 CDN 地址
- 更新 `siteData.js` 中的 `photoWallItems`
- **为什么**：占位图是用户可见的最大视觉问题

---

## 短期执行（P1）

### 4. 替换头像
- 准备真实头像图片（建议正方形，200x200 以上）
- 放入 `public/` 目录
- 修改 `ProfileCard` 组件，从 emoji 😺 切换为 `<img>` 标签
- **为什么**：emoji 头像显得不专业

### 5. 添加 Favicon
- 准备 `favicon.ico`（16x16 和 32x32）
- 准备 `apple-touch-icon.png`（180x180）
- 在 `index.html` 中添加 `<link rel="icon">`
- **为什么**：浏览器标签页无图标影响品牌感

### 6. 添加 SEO 元标签
- 在 `index.html` 中添加 `<title>`、`<meta description>`、`<meta keywords>`
- 添加 Open Graph 标签（og:title、og:description、og:image）
- 添加 Twitter Card 标签
- **为什么**：搜索引擎和社交媒体分享需要

---

## 中期执行（P2）

### 7. 修复时钟性能问题
- **问题**：`useClock()` 在 App 级调用，每秒触发全组件树重渲染
- **方案**：将 `useClock()` 下沉到 `ClockCard` 组件内部
- 或使用 `React.memo` 包裹不受时钟影响的子组件
- **为什么**：不必要的重渲染影响整体性能

### 8. 组件拆分
- 将 `App.jsx`（760 行）拆分为独立组件文件：
  ```
  src/
  ├── components/
  │   ├── ProfileCard.jsx
  │   ├── ClockCard.jsx
  │   ├── CalendarCard.jsx
  │   ├── CatCard.jsx
  │   ├── SocialLinks.jsx
  │   ├── MusicPlayer.jsx
  │   ├── LatestContent.jsx
  │   └── UserSidebar.jsx
  ├── hooks/
  │   ├── useClock.js
  │   ├── useCalendar.js
  │   └── useAudioPlayer.js
  └── App.jsx（仅保留路由和布局）
  ```
- **为什么**：单文件 760 行难以维护

### 9. 音乐播放器真实音频
- 准备 3 首音频文件（MP3 格式）放入 `public/audio/`
- 使用 Web Audio API 或 `<audio>` 元素替换 setInterval 模拟
- 更新 `siteData.js` 中的 `musicList` 路径
- **为什么**：模拟播放器功能不完整

---

## 长期执行（P3）

### 10. 添加 ESLint + Prettier
- 安装 `eslint`、`prettier` 及 React 相关插件
- 创建 `.eslintrc.cjs` 和 `.prettierrc` 配置文件
- 配置编辑器自动格式化
- **为什么**：代码质量一致性

### 11. 添加测试
- 安装 Vitest + React Testing Library
- 为关键组件编写单元测试
- 考虑 Playwright 端到端测试（权限已配置）
- **为什么**：防止回归 bug

### 12. 暗色模式
- 扩展设计系统，添加暗色配色方案
- 使用 CSS 变量 + `prefers-color-scheme` 媒体查询
- 在导航栏添加切换按钮
- **为什么**：用户偏好和可访问性

### 13. 部署配置
- 选择部署平台（推荐 Vercel 或 GitHub Pages）
- 创建部署配置文件
- 配置自定义域名（可选）
- **为什么**：网站需要上线才能被访问

### 14. 错误边界
- 添加 React Error Boundary 包裹根组件
- 为图片添加 onError 回退
- 添加加载状态（Skeleton 组件）
- **为什么**：提升健壮性和用户体验

### 15. 404 页面
- 创建 NotFound 组件
- 在路由中添加 `*` 路径指向 404 页面
- **为什么**：避免静默重定向

---

## 检查清单模板

每完成一项，更新对应状态：

```
- [ ] 1. 初始化 Git 仓库
- [ ] 2. 替换真实内容
- [ ] 3. 替换照片墙图片
- [ ] 4. 替换头像
- [ ] 5. 添加 Favicon
- [ ] 6. 添加 SEO 元标签
- [ ] 7. 修复时钟性能问题
- [ ] 8. 组件拆分
- [ ] 9. 音乐播放器真实音频
- [ ] 10. 添加 ESLint + Prettier
- [ ] 11. 添加测试
- [ ] 12. 暗色模式
- [ ] 13. 部署配置
- [ ] 14. 错误边界
- [ ] 15. 404 页面
```
