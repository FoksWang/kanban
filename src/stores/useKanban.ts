import { create } from 'zustand'

interface KanbanList {
  id: string
  title: string
  cards: { id: string; title: string }[]
}

interface KanbanState {
  lists: KanbanList[]
  addList: (title: string) => void
  addCard: (listId: string, title: string) => void
}

export const useKanban = create<KanbanState>((set) => ({
  lists: [
    {
      id: 'to-do',
      title: 'To do',
      cards: [
        { id: 'domain-models', title: 'Define domain models' },
        { id: 'routes', title: 'Configure application routes' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In progress',
      cards: [{ id: 'foundation', title: 'Build the engineering foundation' }],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [{ id: 'initialize', title: 'Initialize Vite, React, and TypeScript' }],
    },
  ],
  addList: (title) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    set((state) => ({
      lists: [...state.lists, { id: crypto.randomUUID(), title: trimmedTitle, cards: [] }],
    }))
  },
  addCard: (listId, title) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [...list.cards, { id: crypto.randomUUID(), title: trimmedTitle }],
            }
          : list,
      ),
    }))
  },
}))
