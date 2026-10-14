import { Bell, Search } from 'lucide-react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { BoardPage } from './pages/BoardPage'
import { HomePage } from './pages/HomePage'

const navigationClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
  }`

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-6">
          <NavLink className="text-lg font-bold tracking-tight" to="/">
            Kanban
          </NavLink>
          <nav aria-label="Main navigation" className="flex items-center gap-1">
            <NavLink className={navigationClassName} end to="/">
              Home
            </NavLink>
            <NavLink className={navigationClassName} to="/board">
              Board
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <button aria-label="Search" type="button">
            <Search size={20} />
          </button>
          <button aria-label="Notifications" type="button">
            <Bell size={20} />
          </button>
          <span className="grid size-8 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            HW
          </span>
        </div>
      </header>

      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<BoardPage />} path="/board" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </main>
  )
}

export default App
