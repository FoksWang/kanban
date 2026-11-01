import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, SquareCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface TaskProps {
  id: string
  listId: string
  title: string
}

export const Task = (props: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id, data: { listId: props.listId, type: 'task' } })

  return (
    <Card
      aria-label={props.title}
      className={cn(
        'min-h-44 gap-3 rounded-lg border border-border/80 shadow-xs ring-0 hover:shadow-sm',
        isDragging && 'opacity-30',
      )}
      ref={setNodeRef}
      role="article"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <SquareCheck aria-hidden="true" className="size-3.5 text-blue-500" />
          Task
          <Button
            {...attributes}
            {...listeners}
            aria-label={`Drag ${props.title}`}
            className="ml-auto cursor-grab touch-none active:cursor-grabbing"
            ref={setActivatorNodeRef}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <GripVertical />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="text-sm leading-6 font-semibold wrap-break-word text-card-foreground">
          {props.title}
        </h3>
      </CardContent>
    </Card>
  )
}
