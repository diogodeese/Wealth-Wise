import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Expenses from '../pages/Expenses'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './protected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/expenses',
    element: (
      <ProtectedRoute>
        <Expenses />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])
