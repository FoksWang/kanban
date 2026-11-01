import { useDraggable, useDroppable } from '@dnd-kit/core'
import { GripVertical, SquareCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Task as TaskData } from '@/stores/useKanban'

export interface TaskProps extends TaskData {
  groupId: string
  onDelete: (taskId: TaskData['id']) => void
}

export const Task = (props: TaskProps) => {
  const data = { type: 'task', taskId: props.id, groupId: props.groupId }
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
            <div
              className="ml-auto flex items-center gap-1"
              onPointerDown={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    aria-label={`Delete ${props.title}`}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <Trash2 />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete task?</DialogTitle>
                    <DialogDescription>
                      This will permanently delete “{props.title}” from this browser's board. This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={() => props.onDelete(props.id)}>
                        Delete task
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <GripVertical aria-hidden="true" className="size-4" />
            </div>
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
