import { Plus } from 'lucide-react'
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Workspace / Product development
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Project board</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lists.length} lists · {lists.reduce((total, list) => total + list.cards.length, 0)}{' '}
            cards
          </p>
        </div>
        <CreateDialog label="List" onCreate={addList} />
      </div>

      <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lists.map((list) => (
          <section className="rounded-xl border bg-muted/50 p-4" key={list.id}>
            <div className="mb-4 flex items-center justify-between gap-3 px-1">
              <h2 className="min-w-0 text-sm font-semibold wrap-break-word">{list.title}</h2>
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-background text-xs text-muted-foreground">
                {list.cards.length}
              </span>
            </div>
            <div className="space-y-3">
              {list.cards.map((card) => (
                <article className="rounded-lg border bg-card p-4 shadow-sm" key={card.id}>
                  <p className="text-sm leading-6 font-medium wrap-break-word text-card-foreground">
                    {card.title}
                  </p>
                </article>
              ))}
              {list.cards.length === 0 && (
                <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                  No cards yet. Add your first task.
                </p>
              )}
            </div>
            <div className="mt-4">
              <CreateDialog label="Card" onCreate={(title) => addCard(list.id, title)} />
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
