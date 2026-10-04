# Kanban

一个面向作品集的 Trello/Jira 风格项目管理看板。项目从零实现，以 React 19 与 TypeScript 为核心，逐步覆盖认证、工作空间、看板、卡片详情和拖拽排序等完整业务流程。

## 已选技术栈

- React 19、TypeScript、Vite
- React Router、Zustand、TanStack Query
- Tailwind CSS、shadcn/ui、Lucide 图标
- React Hook Form、Zod
- dnd-kit
- Jest + React Testing Library、Playwright
- GitHub Actions；部署目标为 Vercel 或 Netlify

详细的架构边界与交付顺序见 [docs/architecture.md](docs/architecture.md) 与 [docs/roadmap.md](docs/roadmap.md)。

## 本地开发

```bash
npm install
npm run dev
```

运行检查与生产构建：

```bash
npm run lint
npm run build
```

## Git 工作流

- `main`：始终可构建、可部署。
- 功能从 `feature/<scope>` 分支开发，例如 `feature/board-dnd`。
- 每个功能完成后，通过 Pull Request 合并至 `main`。
- 使用 SourceTree 进行提交、分支与推送；使用 VS Code 编写与调试代码。

## 许可证

尚未添加许可证。在公开发布前请根据开源意图选择 MIT、Apache-2.0 或保留所有权利。
