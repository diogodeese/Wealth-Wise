import { createBrowserRouter } from 'react-router-dom'
import Categories from '../pages/Categories'
import Dashboard from '../pages/Dashboard'
import Dividends from '../pages/Dividends'
import EmergencyFund from '../pages/EmergencyFund'
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
    path: '/administration/expense-categories',
    element: (
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    )
  },
  {
    path: '/auth/register',
    element: (
      <UnprotectedRoute>
        <Register />
      </UnprotectedRoute>
    )
  },
  {
    path: '/auth/sign-in',
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
    path: '/dividends',
    element: (
      <ProtectedRoute>
        <Dividends />
      </ProtectedRoute>
    )
  },
  {
    path: '/emergency-fund',
    element: (
      <ProtectedRoute>
        <EmergencyFund />
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
