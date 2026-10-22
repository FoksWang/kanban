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
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
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
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
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
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={!title.trim()}
          type="submit"
        >
          Create {label.toLowerCase()}
        </button>
        <button
          className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
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
    <section className="px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-indigo-600">
            Workspace / Product development
          </p>
          <h1 className="m-0 text-3xl font-bold tracking-tight">Project board</h1>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lists.map((list) => (
          <section className="rounded-xl bg-slate-100 p-4" key={list.id}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="m-0 text-sm font-semibold">{list.title}</h2>
              <span className="text-xs text-slate-500">{list.cards.length}</span>
            </div>
            <div className="space-y-3">
              {list.cards.map((card) => (
                <article
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  key={card.id}
                >
                  <p className="m-0 text-sm font-medium">{card.title}</p>
                </article>
              ))}
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
                  className="flex items-center gap-1 text-sm font-medium text-slate-600"
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
