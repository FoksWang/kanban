import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
} from '@dnd-kit/core'
import { Columns3, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKanban } from '@/stores/useKanban'
import { KanbanGroup } from './kanban-group'
import { Task } from './Task'
import { keyboardCoordinates } from './drag-coordinates'

const detectCollision: CollisionDetection = (args) => {
  if (!args.pointerCoordinates) {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container) =>
          container.data.current?.type === 'task' || container.data.current?.count === 0,
      ),
    })
  }
  const collisions = pointerWithin(args)
  const tasks = collisions.filter(
    (collision) =>
      args.droppableContainers.find((container) => container.id === collision.id)?.data.current
        ?.type === 'task',
  )
  return tasks.length ? tasks : collisions
}

function CreateDialog({ label, onCreate }: { label: string; onCreate: (title: string) => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const titleId = useId()
  const formId = useId()
  const item = label.toLowerCase()

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) setTitle('')
      }}
    >
      <DialogTrigger asChild>
        <Button variant={label === 'List' ? 'default' : 'ghost'}>
          <Plus /> {label === 'List' ? 'New list' : 'Add card'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create {item}</DialogTitle>
          <DialogDescription>Give your new {item} a short, descriptive title.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3 py-2"
          id={formId}
          onSubmit={(event) => {
            event.preventDefault()
            if (!title.trim()) return
            onCreate(title.trim())
            setOpen(false)
            setTitle('')
          }}
        >
          <Label htmlFor={titleId}>{label} title</Label>
          <Input
            id={titleId}
            maxLength={120}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={`Enter a ${item} title`}
            required
            value={title}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!title.trim()} form={formId} type="submit">
            Create {item}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Board() {
  const lists = useKanban((state) => state.lists)
  const addList = useKanban((state) => state.addList)
  const addCard = useKanban((state) => state.addCard)
  const moveCard = useKanban((state) => state.moveCard)
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeCard = lists.flatMap((list) => list.cards).find((card) => card.id === activeId)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: keyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    if (!over || active.data.current?.type !== 'task') return
    const dropType = over.data.current?.type
    if (dropType !== 'task' && dropType !== 'group') return
    if (dropType === 'task' && active.id === over.data.current?.taskId) return
    const target = lists.find((list) => list.id === over.data.current?.listId)
    if (!target) return
    const index = target.cards.findIndex((card) => card.id === over.data.current?.taskId)
    moveCard(String(active.id), target.id, index < 0 ? target.cards.length : index)
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground">
            Workspace / Product development
          </p>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border bg-background shadow-xs">
              <Columns3 aria-hidden="true" className="size-5 text-muted-foreground" />
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">Project board</h1>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A clear space for the work that moves your project forward.
          </p>
        </div>
        <CreateDialog label="List" onCreate={addList} />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Columns3 aria-hidden="true" className="size-4 text-muted-foreground" />
          Board overview
        </div>
        <p className="text-xs text-muted-foreground tabular-nums">
          {lists.length} lists · {lists.reduce((total, list) => total + list.cards.length, 0)} cards
        </p>
      </div>

      <p className="mb-3 text-xs text-muted-foreground">
        Drag a card to move a task. With a keyboard, press Space, use arrow keys, then Space to drop
        or Escape to cancel.
      </p>
      <DndContext
        collisionDetection={detectCollision}
        onDragCancel={() => setActiveId(null)}
        onDragEnd={handleDragEnd}
        onDragStart={({ active }) => setActiveId(String(active.id))}
        sensors={sensors}
      >
        <div
          aria-label="Kanban groups"
          className="grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-5 overflow-x-auto rounded-2xl pb-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          role="region"
          tabIndex={0}
        >
          {lists.map((list) => (
            <KanbanGroup
              action={<CreateDialog label="Card" onCreate={(title) => addCard(list.id, title)} />}
              count={list.cards.length}
              id={list.id}
              key={list.id}
              status={
                list.id === 'done' ? 'complete' : list.id === 'in-progress' ? 'active' : 'neutral'
              }
              title={list.title}
            >
              {list.cards.map((card) => (
                <Task id={card.id} key={card.id} listId={list.id} title={card.title} />
              ))}
              {list.cards.length === 0 && (
                <p className="rounded-xl border border-dashed px-4 py-10 text-center text-sm leading-6 text-muted-foreground">
                  No cards yet. Add your first task.
                </p>
              )}
            </KanbanGroup>
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <Card className="min-h-44 rounded-lg border border-blue-300 shadow-lg ring-0">
              <CardContent>
                <p className="mb-3 text-xs text-muted-foreground">Task</p>
                <h3 className="text-sm leading-6 font-semibold wrap-break-word">
                  {activeCard.title}
                </h3>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  )
}
