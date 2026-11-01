import { useDroppable } from '@dnd-kit/core'
import { useId, type PropsWithChildren, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface KanbanGroupProps extends PropsWithChildren {
  id: number | string
  title: string
  count: number
  status?: 'neutral' | 'active' | 'complete'
  action: ReactNode
}

const statusColors = {
  neutral: 'bg-neutral-400 ring-neutral-400/15',
  active: 'bg-blue-500 ring-blue-500/15',
  complete: 'bg-emerald-500 ring-emerald-500/15',
}

export const KanbanGroup = (props: KanbanGroupProps) => {
  const titleId = useId()
  const { setNodeRef, isOver } = useDroppable({
    id: `group:${typeof props.id}:${props.id}`,
    data: { groupId: props.id, type: 'group', count: props.count },
  })

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'flex min-h-96 min-w-0 flex-col rounded-2xl border border-border/70 bg-muted/60 p-3',
        isOver && 'border-blue-400 bg-blue-50/50',
      )}
      ref={setNodeRef}
    >
      <header className="flex items-center gap-3 px-2 pt-2 pb-5">
        <span
          aria-hidden="true"
          className={cn('size-2 rounded-full ring-4', statusColors[props.status ?? 'neutral'])}
        />
        <h2 className="min-w-0 text-sm font-semibold wrap-break-word" id={titleId}>
          {props.title}
        </h2>
        <span className="ml-auto grid size-6 shrink-0 place-items-center rounded-md border border-border/70 bg-background/80 text-xs font-medium text-muted-foreground tabular-nums">
          {props.count}
        </span>
      </header>
      <div className="flex-1 space-y-3">{props.children}</div>
      <footer className="mt-5 border-t border-border/60 pt-3">{props.action}</footer>
    </section>
  )
}
