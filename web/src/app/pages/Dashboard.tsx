import Layout from '@/app/components/layout'
import { PieChart } from '@mui/x-charts/PieChart'

export default function Dashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 60, label: 'Necessary', color: 'red' },
              { id: 1, value: 20, label: 'Savings', color: 'blue' },
              { id: 2, value: 20, label: 'Investments', color: 'green' }
            ],
            arcLabel: 'value',
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 4,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150
          }
        ]}
        width={400}
        height={400}
      />
    </Layout>
  )
}
