# 实战路线图

## 阶段 0：工程基础

- [x] Vite + React 19 + TypeScript 初始化
- [x] 定义业务范围、架构边界和 Git 工作流
- [ ] 安装核心依赖并配置 Tailwind / shadcn/ui
- [ ] 建立路由、QueryClient、全局错误边界与目录约定
- [ ] 配置 ESLint/Prettier、Jest + RTL、Playwright 与 GitHub Actions

## 阶段 1：可交互静态看板

- [ ] 建立应用 Shell、工作空间选择与看板页
- [ ] 使用 mock 数据渲染列表和卡片
- [ ] 完成卡片创建、编辑与删除
- [ ] 完成列表内与跨列表拖拽排序

## 阶段 2：数据与认证

- [ ] 确定后端（建议 Supabase / 自建 REST API）和数据模型
- [ ] 完成注册、登录、会话恢复与路由守卫
- [ ] 用 TanStack Query 接入 workspace / board / list / card API
- [ ] 支持乐观更新、错误反馈与重试

## 阶段 3：完整业务体验

- [ ] 卡片详情：描述、标签、截止日期、评论、附件
- [ ] 看板成员与权限
- [ ] 搜索、筛选与活动记录

## 阶段 4：质量与发布

- [ ] 核心逻辑单元测试和组件测试
- [ ] 登录、创建卡片、拖拽排序的端到端测试
- [ ] GitHub Actions：lint、test、build
- [ ] 部署至 Vercel 或 Netlify，并补齐作品集 README 和截图
