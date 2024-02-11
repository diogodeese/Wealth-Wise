import { isAuthenticated } from '@/utils/is-authenticated'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/loading'

interface Props {
  children: ReactNode
}

const UnprotectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authStatus, setAuthStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    isAuthenticated().then((result: boolean) => {
      setAuthStatus(result)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!loading && authStatus) {
      navigate('/dashboard', { replace: true })
    }
  }, [loading, authStatus, navigate])

  if (loading) {
    return <Loading />
  }

  return <>{children}</>
}

export default UnprotectedRoute
