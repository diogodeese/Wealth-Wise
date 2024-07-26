import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../shared/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent
} from '../../../shared/components/ui/chart'

const chartData = [
  { month: 'January', amount: 200 },
  { month: 'February', amount: 350 },
  { month: 'March', amount: 425 },
  { month: 'April', amount: 175 },
  { month: 'May', amount: 500 },
  { month: 'June', amount: 350 },
  { month: 'July', amount: 400 },
  { month: 'August', amount: 150 },
  { month: 'September', amount: 225 },
  { month: 'October', amount: 275 },
  { month: 'November', amount: 250 },
  { month: 'December', amount: 475 }
]

const chartConfig = {
  amount: {
    label: 'Expenses',
    color: '#4a90e2' // Changed color to a blue shade, adjust as needed
  }
} satisfies ChartConfig

export function ExpensesChart() {
  return (
    <Card className="h-[425px] w-[500px]">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Monthly expenses for 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              right: 20,
              top: 20,
              bottom: 20
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              domain={['auto', 'auto']}
              tickCount={6}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={{ stroke: '#ccc', strokeWidth: 1 }}
            />
            <Line
              dataKey="amount"
              type="monotone"
              stroke={chartConfig.amount.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total expenses for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
