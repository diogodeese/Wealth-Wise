import Layout from '@/app/shared/components/layout'
import { useState } from 'react'
import { Button } from '../shared/components/ui/button'
import { Combobox } from '../shared/components/ui/combobox'
import { Input } from '../shared/components/ui/input'

function calculateLoanDetails(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: string
) {
  const frequencyMap: { [key: string]: number } = {
    Monthly: 12,
    Quarterly: 4,
    Annually: 1
  }
  const n = frequencyMap[compoundingFrequency] || 12
  const monthlyRate = annualRate / 100 / n
  const numberOfPayments = years * n
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - principal

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2)
  }
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<number | null>(null)
  const [annualRate, setAnnualRate] = useState<number | null>(null)
  const [years, setYears] = useState<number | null>(null)
  const [compoundingFrequency, setCompoundingFrequency] = useState<
    string | null
  >(null)
  const [loanDetails, setLoanDetails] = useState({
    monthlyPayment: '0.00',
    totalPayment: '0.00',
    totalInterest: '0.00'
  })

  const handleCalculate = () => {
    if (
      principal !== null &&
      annualRate !== null &&
      years !== null &&
      compoundingFrequency !== null
    ) {
      setLoanDetails(
        calculateLoanDetails(principal, annualRate, years, compoundingFrequency)
      )
    } else {
      alert('Please fill out all fields')
    }
  }

  const frequencyOptions = [
    { id: 'Monthly', text: 'Monthly' },
    { id: 'Quarterly', text: 'Quarterly' },
    { id: 'Annually', text: 'Annually' }
  ]

  return (
    <Layout>
      <div className="flex h-[94vh] flex-col justify-between">
        <h1 className="mb-4 text-2xl font-bold">Loan Calculator</h1>
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Principal ($)
            </label>
            <Input
              type="number"
              value={principal !== null ? principal : ''}
              onChange={(e) =>
                setPrincipal(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Annual Rate (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={annualRate !== null ? annualRate : ''}
              onChange={(e) =>
                setAnnualRate(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Loan Term (Years)
            </label>
            <Input
              type="number"
              value={years !== null ? years : ''}
              onChange={(e) =>
                setYears(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Compounding Frequency
            </label>
            <Combobox
              label="Select Frequency"
              data={frequencyOptions}
              onSelect={(value) => setCompoundingFrequency(value)}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleCalculate}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Calculate
          </Button>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold">Loan Details</h2>
          <p>Monthly Payment: ${loanDetails.monthlyPayment}</p>
          <p>Total Payment: ${loanDetails.totalPayment}</p>
          <p>Total Interest: ${loanDetails.totalInterest}</p>
        </div>
      </div>
    </Layout>
  )
}
