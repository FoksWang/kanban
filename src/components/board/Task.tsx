import { useDraggable, useDroppable } from '@dnd-kit/core'
import { GripVertical, SquareCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface TaskProps {
  id: number | string
  listId: string
  title: string
}

export const Task = (props: TaskProps) => {
  const data = { type: 'task', taskId: props.id, listId: props.listId }
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    data,
  })
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `task:${typeof props.id}:${props.id}`,
    data,
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div ref={setDropRef}>
      <Card
        {...attributes}
        {...listeners}
        aria-label={props.title}
        className={cn(
          'min-h-44 cursor-grab touch-none gap-3 rounded-lg border border-border/80 shadow-xs ring-0 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400 active:cursor-grabbing',
          isDragging && 'opacity-30',
          isOver && !isDragging && 'border-blue-400',
        )}
        ref={setNodeRef}
        role="article"
        style={style}
      >
        <CardHeader>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <SquareCheck aria-hidden="true" className="size-3.5 text-blue-500" />
            Task
            <GripVertical aria-hidden="true" className="ml-auto size-4" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <h3 className="text-sm leading-6 font-semibold wrap-break-word text-card-foreground">
            {props.title}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}
