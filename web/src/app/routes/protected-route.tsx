import { Loading } from '@/app/shared/components/loading'
import { isAuthenticated } from '@/utils/is-authenticated'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    if (!loading && !authStatus) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [loading, authStatus, navigate])

  if (loading) {
    return <Loading />
  }

  return <>{children}</>
}

export default ProtectedRoute
