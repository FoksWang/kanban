import { Plus } from 'lucide-react'

const starterLists = [
  { title: 'To do', cards: ['Define domain models', 'Configure application routes'] },
  { title: 'In progress', cards: ['Build the engineering foundation'] },
  { title: 'Done', cards: ['Initialize Vite, React, and TypeScript'] },
]

export function BoardPage() {
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
          type="button"
        >
          <Plus size={18} /> New list
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {starterLists.map((list) => (
          <section className="rounded-xl bg-slate-100 p-4" key={list.title}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="m-0 text-sm font-semibold">{list.title}</h2>
              <span className="text-xs text-slate-500">{list.cards.length}</span>
            </div>
            <div className="space-y-3">
              {list.cards.map((card) => (
                <article
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  key={card}
                >
                  <p className="m-0 text-sm font-medium">{card}</p>
                </article>
              ))}
            </div>
            <button
              className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-600"
              type="button"
            >
              <Plus size={16} /> Add card
            </button>
          </section>
        ))}
      </div>
    </section>
  )
}
