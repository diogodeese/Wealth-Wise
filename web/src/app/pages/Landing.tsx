import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-green-600">Wealth Wise</h1>
        <p className="mt-2 text-xl ">
          💰 Empower your financial journey and build wealth.
        </p>
        <p className="mt-4 text-lg text-gray-400">
          Wealth Wise helps you keep track of your expenses and guides you on
          your path to financial growth. Start your journey to financial freedom
          today!
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to={'/auth/sign-in'}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Sign In
          </Link>
          <Link
            to={'/auth/register'}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
