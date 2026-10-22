import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useKanban } from '@/stores/useKanban'

function CreateForm({
  label,
  onCreate,
  onCancel,
}: {
  label: string
  onCreate: (title: string) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')

  return (
    <form
      className="space-y-3 rounded-xl border border-indigo-200 bg-white p-4 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        if (!title.trim()) return
        onCreate(title.trim())
        onCancel()
      }}
    >
      <label className="block text-sm font-medium text-slate-700">
        {label} title
        <input
          autoFocus
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder={`Enter a ${label.toLowerCase()} title`}
          maxLength={120}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onCancel()
          }}
          required
          value={title}
        />
      </label>
      <div className="flex gap-2">
        <button
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!title.trim()}
          type="submit"
        >
          Create {label.toLowerCase()}
        </button>
        <button
          className="rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function BoardPage() {
  const lists = useKanban((state) => state.lists)
  const addList = useKanban((state) => state.addList)
  const addCard = useKanban((state) => state.addCard)
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [activeListId, setActiveListId] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-indigo-600 uppercase">
            Workspace / Product development
          </p>
          <h1 className="m-0 text-3xl font-bold tracking-tight">Project board</h1>
          <p className="mt-2 text-sm text-slate-500">
            {lists.length} lists · {lists.reduce((total, list) => total + list.cards.length, 0)}{' '}
            cards
          </p>
        </div>
        <button
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={() => setIsCreatingList(true)}
          type="button"
        >
          <Plus size={18} /> New list
        </button>
      </div>

      {isCreatingList && (
        <div className="mb-5 max-w-sm">
          <CreateForm label="List" onCancel={() => setIsCreatingList(false)} onCreate={addList} />
        </div>
      )}

      <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lists.map((list) => (
          <section
            className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4"
            key={list.id}
          >
            <div className="mb-4 flex items-center justify-between gap-3 px-1">
              <h2 className="m-0 min-w-0 text-sm font-semibold wrap-break-word">{list.title}</h2>
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-medium text-slate-500">
                {list.cards.length}
              </span>
            </div>
            <div className="space-y-3">
              {list.cards.map((card) => (
                <article
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  key={card.id}
                >
                  <p className="m-0 text-sm leading-6 font-medium wrap-break-word text-slate-700">
                    {card.title}
                  </p>
                </article>
              ))}
              {list.cards.length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">
                  No cards yet. Add your first task.
                </p>
              )}
            </div>
            <div className="mt-4">
              {activeListId === list.id ? (
                <CreateForm
                  label="Card"
                  onCancel={() => setActiveListId(null)}
                  onCreate={(title) => addCard(list.id, title)}
                />
              ) : (
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500"
                  onClick={() => setActiveListId(list.id)}
                  type="button"
                >
                  <Plus size={16} /> Add card
                </button>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
