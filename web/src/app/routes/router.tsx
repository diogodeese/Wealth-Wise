import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Dividends from '../pages/Dividends'
import Expenses from '../pages/Expenses'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import ProtectedRoute from './protected-route'
import UnprotectedRoute from './unprotected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UnprotectedRoute>
        <Landing />
      </UnprotectedRoute>
    )
  },
  {
    path: 'auth/register',
    element: (
      <UnprotectedRoute>
        <Register />
      </UnprotectedRoute>
    )
  },
  {
    path: 'auth/sign-in',
    element: (
      <UnprotectedRoute>
        <Login />
      </UnprotectedRoute>
    )
  },
  {
    path: '/dashboard',
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
    path: '/dividends',
    element: (
      <ProtectedRoute>
        <Dividends />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])
