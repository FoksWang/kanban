import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start px-6 py-20">
      <p className="mb-3 text-sm font-semibold text-indigo-600">Simple project management</p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        Keep your work visible and moving forward.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
        Organize tasks into clear lists and track progress from one focused board.
      </p>
      <Link
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
        to="/board"
      >
        Open board <ArrowRight size={18} />
      </Link>
    </section>
  )
}
