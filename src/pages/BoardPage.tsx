import { Board } from '@/components/board'
import { useKanban } from '@/stores/useKanban'

export function BoardPage() {
  const groups = useKanban((state) => state.groups)
  const addGroup = useKanban((state) => state.addGroup)
  const addTask = useKanban((state) => state.addTask)
  const moveTask = useKanban((state) => state.moveTask)

  return <Board groups={groups} addGroup={addGroup} addTask={addTask} moveTask={moveTask} />
}
