import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom'
import App from '@/App'
import { BoardPage } from '@/pages/BoardPage'
import { HomePage } from '@/pages/HomePage'

const createRouter = import.meta.env.BASE_URL === '/' ? createBrowserRouter : createHashRouter

export const router = createRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'board', Component: BoardPage },
      { path: '*', element: <Navigate replace to="/" /> },
    ],
  },
])
