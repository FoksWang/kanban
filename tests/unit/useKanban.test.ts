import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { KanbanGroup } from '../../src/stores/useKanban'

const loadStore = async () => (await import('../../src/stores/useKanban')).useKanban
const taskIds = (groups: KanbanGroup[]) =>
  groups.flatMap((group) => group.tasks.map((task) => task.id))

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

describe('Kanban state', () => {
  it('creates trimmed groups/tasks and rejects blank titles', async () => {
    const store = await loadStore()
    store.getState().addGroup('  Review  ')
    const group = store.getState().groups.at(-1)!
    expect(group.groupName).toBe('Review')
    store.getState().addTask(group.groupId, '  Review the changes  ')
    expect(store.getState().groups.at(-1)?.tasks[0].title).toBe('Review the changes')
    const before = store.getState().groups
    store.getState().addGroup(' ')
    store.getState().addTask(group.groupId, ' ')
    expect(store.getState().groups).toBe(before)
  })

  it('reorders tasks within a group without loss or duplication', async () => {
    const store = await loadStore()
    const before = taskIds(store.getState().groups).sort()
    store.getState().moveTask('domain-models', 'to-do', 1)
    expect(taskIds([store.getState().groups[0]])).toEqual(['routes', 'domain-models'])
    expect(taskIds(store.getState().groups).sort()).toEqual(before)
  })

  it('moves tasks across groups and into an empty group', async () => {
    const store = await loadStore()
    const before = taskIds(store.getState().groups).sort()
    store.getState().moveTask('domain-models', 'in-progress', 0)
    expect(taskIds([store.getState().groups[1]])).toEqual(['domain-models', 'foundation'])
    store.getState().addGroup('Review')
    const target = store.getState().groups.at(-1)!
    store.getState().moveTask('domain-models', target.groupId, 100)
    expect(store.getState().groups.at(-1)?.tasks[0].id).toBe('domain-models')
    expect(taskIds(store.getState().groups).sort()).toEqual(before)
  })

  it('ignores missing source tasks and target groups', async () => {
    const store = await loadStore()
    const before = store.getState()
    store.getState().moveTask('missing', 'to-do', 0)
    store.getState().moveTask('domain-models', 'missing', 0)
    expect(store.getState()).toBe(before)
  })

  it('deletes only the requested task and distinguishes numeric/string IDs', async () => {
    const store = await loadStore()
    store.setState({
      groups: [
        {
          groupId: 'test',
          groupName: 'Test',
          tasks: [
            { id: 1, title: 'Numeric' },
            { id: '1', title: 'String' },
          ],
        },
      ],
    })
    store.getState().deleteTask(1)
    expect(store.getState().groups[0].tasks).toEqual([{ id: '1', title: 'String' }])
  })
})

describe('localStorage persistence', () => {
  it('restores created groups, task order, moves and deletions after a fresh import', async () => {
    const store = await loadStore()
    store.getState().addGroup('Review')
    const group = store.getState().groups.at(-1)!
    store.getState().addTask(group.groupId, 'New task')
    store.getState().moveTask('domain-models', 'to-do', 1)
    store.getState().moveTask('foundation', group.groupId, 0)
    store.getState().deleteTask('initialize')
    const expected = structuredClone(store.getState().groups)
    vi.resetModules()
    const restored = await loadStore()
    expect(restored.getState().groups).toEqual(expected)
    restored.getState().addTask(group.groupId, 'After reload')
    expect(restored.getState().groups.at(-1)?.tasks.at(-1)?.title).toBe('After reload')
  })

  it('stores only groups, not actions or transient drag state', async () => {
    const store = await loadStore()
    store.getState().addGroup('Review')
    const saved = JSON.parse(localStorage.getItem('kanban-storage')!)
    expect(Object.keys(saved.state)).toEqual(['groups'])
    expect(saved.state.groups).toEqual(store.getState().groups)
  })
})
