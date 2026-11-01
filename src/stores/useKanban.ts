import { create } from 'zustand'

export type Task = {
  id: number | string
  title: string
}

export interface KanbanGroup {
  groupId: string
  groupName: string
  tasks: Task[]
}

export interface KanbanState {
  groups: KanbanGroup[]
  addGroup: (groupName: string) => void
  addTask: (groupId: string, title: string) => void
  moveTask: (taskId: Task['id'], targetGroupId: string, targetIndex: number) => void
}

export const useKanban = create<KanbanState>((set) => ({
  groups: [
    {
      groupId: 'to-do',
      groupName: 'To do',
      tasks: [
        { id: 'domain-models', title: 'Define domain models' },
        { id: 'routes', title: 'Configure application routes' },
      ],
    },
    {
      groupId: 'in-progress',
      groupName: 'In progress',
      tasks: [{ id: 'foundation', title: 'Build the engineering foundation' }],
    },
    {
      groupId: 'done',
      groupName: 'Done',
      tasks: [{ id: 'initialize', title: 'Initialize Vite, React, and TypeScript' }],
    },
  ],
  addGroup: (groupName) => {
    const name = groupName.trim()
    if (!name) return
    set((state) => ({
      groups: [...state.groups, { groupId: crypto.randomUUID(), groupName: name, tasks: [] }],
    }))
  },
  addTask: (groupId, title) => {
    const name = title.trim()
    if (!name) return
    set((state) => ({
      groups: state.groups.map((group) =>
        group.groupId === groupId
          ? { ...group, tasks: [...group.tasks, { id: crypto.randomUUID(), title: name }] }
          : group,
      ),
    }))
  },
  moveTask: (taskId, targetGroupId, targetIndex) => {
    set((state) => {
      const source = state.groups.find((group) => group.tasks.some((task) => task.id === taskId))
      const target = state.groups.find((group) => group.groupId === targetGroupId)
      const task = source?.tasks.find((item) => item.id === taskId)
      if (!source || !target || !task) return state

      const tasks = target.tasks.filter((item) => item.id !== taskId)
      tasks.splice(Math.max(0, Math.min(targetIndex, tasks.length)), 0, task)

      return {
        groups: state.groups.map((group) => {
          if (group.groupId === targetGroupId) return { ...group, tasks }
          if (group.groupId === source.groupId) {
            return { ...group, tasks: group.tasks.filter((item) => item.id !== taskId) }
          }
          return group
        }),
      }
    })
  },
}))
