import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Dividends from '../pages/Dividends'
import EmergencyFund from '../pages/EmergencyFund'
import Categories from '../pages/ExpenseCategories'
import Expenses from '../pages/Expenses'
import Landing from '../pages/Landing'
import LoanCalculator from '../pages/LoanCalculator'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import RecurringExpenses from '../pages/RecurringExpenses'
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
    path: '/administration/recurring-expenses',
    element: (
      <ProtectedRoute>
        <RecurringExpenses />
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
    path: '/loan-calculator',
    element: (
      <ProtectedRoute>
        <LoanCalculator />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])
