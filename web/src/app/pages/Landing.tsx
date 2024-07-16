import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      Landing
      <Link to={'/auth/sign-in'}>Auth</Link>
    </div>
  )
}
