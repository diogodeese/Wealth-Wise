interface EmergencyFundDisplayProps {
  emergencyFund: number
  averageTotalAmount: number
}

export function EmergencyFundDisplay({
  emergencyFund,
  averageTotalAmount
}: EmergencyFundDisplayProps) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-teal-500 bg-teal-700 p-4 text-center text-white shadow-lg">
      <div>
        <div className="mb-4 flex items-center justify-center">
          <span className="text-xl font-bold">{emergencyFund.toFixed(2)}€</span>
        </div>
        <p className="text-sm">
          You're spending{' '}
          <span className="font-semibold">
            {averageTotalAmount.toFixed(2)}€
          </span>{' '}
          per month on average.
        </p>
      </div>
    </div>
  )
}
