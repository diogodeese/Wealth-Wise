import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './app/pages/App'
import Expenses from './app/pages/Expenses'
import NotFound from './app/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/expenses',
    element: <Expenses />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
