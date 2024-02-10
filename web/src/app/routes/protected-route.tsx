import { isAuthenticated } from '@/utils/is-authenticated'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/loading'

interface Props {
  children: ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authStatus, setAuthStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    isAuthenticated().then((result: boolean) => {
      setAuthStatus(result)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!authStatus) {
    navigate('/login', { replace: true })
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
