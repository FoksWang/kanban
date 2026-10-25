import { Columns3, Plus } from 'lucide-react'
import { useId, useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKanban } from '@/stores/useKanban'
import { KanbanGroup } from './kanban-group'

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
            key={list.id}
            status={
              list.id === 'done' ? 'complete' : list.id === 'in-progress' ? 'active' : 'neutral'
            }
            title={list.title}
          >
            {list.cards.map((card) => (
              <article
                className="rounded-xl border border-border/80 bg-card p-4 shadow-xs transition-shadow hover:shadow-sm"
                key={card.id}
              >
                <p className="text-sm leading-6 font-medium wrap-break-word text-card-foreground">
                  {card.title}
                </p>
              </article>
            ))}
            {list.cards.length === 0 && (
              <p className="rounded-xl border border-dashed px-4 py-10 text-center text-sm leading-6 text-muted-foreground">
                No cards yet. Add your first task.
              </p>
            )}
          </KanbanGroup>
        ))}
      </div>
    </section>
  )
}
