# Architecture

## Current release

Kanban is a client-only React application. `BoardPage` selects the board data and actions from Zustand and passes them into `Board`. `Board` coordinates creation dialogs and drag-and-drop events; `KanbanGroup` defines a named drop target; `Task` renders a draggable card and its delete confirmation.

## Data model

```ts
type Task = { id: number | string; title: string }
interface KanbanGroup {
  groupId: string
  groupName: string
  tasks: Task[]
}
```

Groups are the single source of truth. Task IDs retain their original type, including during drag and drop. Drop-target IDs are namespaced to avoid confusing cards with groups.

## State transitions

`addGroup`, `addTask`, `deleteTask`, and `moveTask` update groups immutably. Invalid moves do not alter the board. A valid drop supplies a target group and insertion index; cancellation or a drop outside the board leaves data unchanged.

Zustand `persist` serializes only groups to localStorage using `kanban-storage`. A new store hydrates the saved groups while retaining executable actions. Persistence is local to the current browser origin and is not a server-side database or a cross-device backup.

## Presentation and interactions

Tailwind v4 and shadcn/ui provide theme tokens and accessible primitives. Drag interaction uses dnd-kit core with pointer and keyboard sensors. Delete buttons stop propagation to the card's drag listeners. A confirmation dialog protects against accidental deletion.

## Delivery

Vite builds static assets. The root development build uses browser routes. A non-root base path selects hash routing for static hosting. CI tests the production build with `/kanban/`, then deploys that tested artifact through GitHub Pages after all checks pass.

## Verification

Vitest with jsdom verifies board transitions and localStorage hydration. Playwright tests creation, deletion/cancellation, pointer movement, keyboard sorting/cancellation, refresh restoration, and static-hosting navigation in isolated Chromium contexts.

## Future boundaries

Authentication, workspaces, collaboration, and an API are outside this release. If a backend is added, TanStack Query should own server state and the local-only persistence model should be revisited rather than maintaining two independent sources of truth.
