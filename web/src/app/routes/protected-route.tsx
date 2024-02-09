import { isAuthenticated } from '@/utils/is-authenticated'
import { ReactNode, useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color={'white'} height={50} width={50} />
      </div>
    )
  }

  if (!authStatus) {
    navigate('/landing', { replace: true })
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
