import { useEmergencyFund } from '@/api/get-emergency-fund'
import Layout from '@/app/shared/components/layout'
import { EmergencyFundDisplay } from '../features/emergencyFund/components/emergency-fund-display'

export default function EmergencyFund() {
  const { data } = useEmergencyFund({
    fundMonths: null, // Pass null to use default values from the backend
    essentialsOnly: null,
    averageMonths: null
  })

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center justify-center">
          <EmergencyFundDisplay emergencyFund={data?.emergencyFund ?? 0} />
        </div>
      </div>
    </Layout>
  )
}
