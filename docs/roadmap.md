# Project roadmap

## Phase 0: Engineering foundation

- [x] Initialize Vite, React 19, and TypeScript.
- [x] Define the product scope, architecture boundaries, and Git workflow.
- [x] Install the core dependencies and configure Tailwind CSS.
- [ ] Set up routes, QueryClient, a global error boundary, and the directory conventions.
- [x] Configure ESLint for TypeScript, React Hooks, and Fast Refresh.
- [ ] Configure Prettier, Jest + RTL, Playwright, and GitHub Actions.

## Phase 1: Interactive static board

- [x] Create the initial application shell and board layout.
- [ ] Render lists and cards from mock data.
- [ ] Create, edit, and delete cards.
- [ ] Drag cards within and across lists.

## Phase 2: Data and authentication

- [ ] Choose a backend (Supabase or a custom REST API are good candidates) and define the data model.
- [ ] Implement sign-up, sign-in, session restoration, and route guards.
- [ ] Connect workspace, board, list, and card APIs through TanStack Query.
- [ ] Add optimistic updates, error feedback, and retry behavior.

## Phase 3: Complete product experience

- [ ] Add descriptions, labels, due dates, comments, and attachments to card details.
- [ ] Add board members and permissions.
- [ ] Add search, filtering, and activity history.

## Phase 4: Quality and release

- [ ] Add unit tests and component tests for core behavior.
- [ ] Add end-to-end coverage for sign-in, card creation, and drag-and-drop ordering.
- [ ] Add GitHub Actions for linting, tests, and builds.
- [ ] Deploy to Vercel or Netlify and add portfolio screenshots to the README.
