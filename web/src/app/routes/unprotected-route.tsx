import { Loading } from '@/app/shared/components/loading'
import { isAuthenticated } from '@/utils/is-authenticated'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const UnprotectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authStatus, setAuthStatus] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await isAuthenticated()
        setAuthStatus(result)
      } catch (error) {
        console.error('Authentication check failed:', error)
        setAuthStatus(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
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
