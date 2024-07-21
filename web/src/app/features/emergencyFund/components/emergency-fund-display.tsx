interface EmergencyFundDisplayProps {
  emergencyFund: number
}

export function EmergencyFundDisplay({
  emergencyFund
}: EmergencyFundDisplayProps) {
  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-zinc-300 bg-gray-100 text-lg font-semibold text-gray-800">
      {emergencyFund.toFixed(2)}€
    </div>
  )
}
