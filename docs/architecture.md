# Architecture and scope

## Version-one capabilities

1. User sign-up, sign-in, and session restoration.
2. Workspace creation, switching, and a member-management entry point.
3. Board creation, board listing, and basic board settings.
4. List creation, editing, deletion, and ordering.
5. Card creation, editing, deletion, and cross-list drag-and-drop.
6. Card details: descriptions, due dates, labels, attachments, and comments, introduced incrementally.

## Frontend responsibilities

```
src/
  app/           Routes, providers, and application initialization
  features/      Business-domain pages, components, hooks, and requests
  components/    Shared UI components
  stores/        Zustand: client-side UI state only
  services/      API client, endpoint types, and request wrappers
  lib/           Shared utilities, validation schemas, and constants
  test/          Test setup and helpers
```

## State strategy

- Server data: TanStack Query owns caching, invalidation, and request state.
- Client UI state: Zustand handles short-lived state such as sidebar visibility and the selected workspace.
- Form state: React Hook Form + Zod. Successful submissions invalidate the relevant queries.
- Drag and drop: dnd-kit owns the interaction; a mutation persists the final position and handles rollback on failure.

## Design principles

- Feature-first organization prevents business code from being scattered by component type.
- A replaceable API layer supports a mock server first and a production backend later.
- Accessibility comes first: keyboard operation, focus management, and semantic markup are acceptance criteria.
- Never duplicate server data in Zustand; retain one source of truth.
