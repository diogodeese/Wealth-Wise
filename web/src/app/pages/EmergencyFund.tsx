import { useEmergencyFund } from '@/api/get-emergency-fund'
import Layout from '@/app/shared/components/layout'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../components/ui/accordion'
import { Checkbox } from '../components/ui/checkbox'
import { EmergencyFundDisplay } from '../features/emergencyFund/components/emergency-fund-display'
import { Combobox } from '../shared/components/ui/combobox'

export default function EmergencyFund() {
  const [fundMonths, setFundMonths] = useState<number | null>(6)
  const [essentialsOnly, setEssentialsOnly] = useState<boolean>(true)
  const [averageMonths, setAverageMonths] = useState<number | null>(12)

  const { data } = useEmergencyFund({
    fundMonths,
    essentialsOnly,
    averageMonths
  })

  const handleFundMonthsComboboxChange = (value: string) => {
    setFundMonths(Number(value))
  }

  const handleAverageMonthsComboboxChange = (value: string) => {
    setAverageMonths(Number(value))
  }

  return (
    <Layout>
      <div className="flex h-[94vh] flex-col justify-between">
        <h1 className="mb-4 text-2xl font-bold">Emergency Fund Calculator</h1>
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Fund Months
            </label>
            <Combobox
              label="Select Fund Duration"
              data={[
                { id: '3', text: '3 Months' },
                { id: '6', text: '6 Months' },
                { id: '9', text: '9 Months' },
                { id: '12', text: '12 Months' }
              ]}
              onSelect={handleFundMonthsComboboxChange}
            />
            <p className="mt-2 text-sm text-gray-500">
              Select the number of months you want your emergency fund to cover.
            </p>
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <Checkbox
                checked={essentialsOnly}
                onClick={() => setEssentialsOnly(!essentialsOnly)}
              />
              <span className="ml-2">Essentials only</span>
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Toggle this option if you want the calculation to cover only
              essential expenses.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Average Months
            </label>
            <Combobox
              label="Select Average Period"
              data={[
                { id: '4', text: '4 Months' },
                { id: '6', text: '6 Months' },
                { id: '12', text: '12 Months' },
                { id: '24', text: '24 Months' }
              ]}
              onSelect={handleAverageMonthsComboboxChange}
            />
            <p className="mt-2 text-sm text-gray-500">
              Choose the period over which your average expenses should be
              calculated.
            </p>
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-center">
          <div className="mt-8 flex justify-center">
            <EmergencyFundDisplay
              emergencyFund={data?.emergencyFund ?? 0}
              averageTotalAmount={data?.averageTotalAmount ?? 0}
            />
          </div>
        </div>
        <div className="mb-4 ">
          <h2 className="text-base font-bold">Emergency Fund FAQ</h2>

          <Accordion type="single" collapsible>
            <AccordionItem value="what-is">
              <AccordionTrigger>What is an Emergency Fund?</AccordionTrigger>
              <AccordionContent>
                An emergency fund is a savings account set aside to cover
                unexpected expenses, such as medical emergencies, car repairs,
                or sudden job loss. It helps maintain financial stability during
                unforeseen events.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why-important">
              <AccordionTrigger>Why is it Important?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>Provides financial security and peace of mind.</li>
                  <li>Prevents debt accumulation in emergencies.</li>
                  <li>
                    Helps you stay on track with your long-term financial goals.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-much-save">
              <AccordionTrigger>How much should I save?</AccordionTrigger>
              <AccordionContent>
                Aim to save at least three to six months' worth of living
                expenses. Adjust your savings based on personal circumstances
                and risk tolerance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  )
}
