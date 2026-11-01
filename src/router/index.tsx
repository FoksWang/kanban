import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/App'
import { BoardPage } from '@/pages/BoardPage'
import { HomePage } from '@/pages/HomePage'

export const router = createBrowserRouter([
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
