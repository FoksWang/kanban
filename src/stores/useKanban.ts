import { create } from 'zustand'

interface KanbanList {
  title: string
  cards: string[]
}

interface KanbanState {
  lists: KanbanList[]
}

export const useKanban = create<KanbanState>(() => ({
  lists: [
    { title: 'To do', cards: ['Define domain models', 'Configure application routes'] },
    { title: 'In progress', cards: ['Build the engineering foundation'] },
    { title: 'Done', cards: ['Initialize Vite, React, and TypeScript'] },
  ],
}))
