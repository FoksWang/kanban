# Kanban

A portfolio-ready, Trello/Jira-inspired project-management board. The application is built from scratch with React 19 and TypeScript, progressing through authentication, workspaces, boards, card details, and drag-and-drop ordering.

## Technology stack

- React 19, TypeScript, and Vite
- React Router, Zustand, and TanStack Query
- Tailwind CSS, shadcn/ui, and Lucide icons
- React Hook Form and Zod
- dnd-kit
- Jest + React Testing Library and Playwright
- GitHub Actions; deployment target: Vercel or Netlify

See [docs/architecture.md](docs/architecture.md) for architecture boundaries and [docs/roadmap.md](docs/roadmap.md) for the delivery plan.

## Local development

```bash
npm install
npm run dev
```

Run checks and create a production build:

```bash
npm run lint
npm run build
```

ESLint checks JavaScript and TypeScript, React Hooks, and Vite Fast Refresh conventions. Its flat configuration is defined in `eslint.config.js`. Run `npm run lint:fix` to apply available automatic fixes.

Prettier formats the repository and sorts Tailwind CSS classes. Run `npm run format` to apply formatting or `npm run format:check` to verify it without changing files.

## Git workflow

- `main` must always be buildable and deployable.
- Build features in `feature/<scope>` branches, for example `feature/board-dnd`.
- Merge completed features into `main` through pull requests.
- Use SourceTree for commits, branches, and pushes; use VS Code for development and debugging.

## License

No license has been selected yet. Choose MIT, Apache-2.0, or an appropriate proprietary license before promoting the project publicly.
