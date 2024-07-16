import { Button } from '@/app/shared/components/ui/button'
import { Calendar } from '@/app/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/shared/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, subMonths } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'

interface DatePickerWithRangeProps {
  className?: string
  onChange?: (dateRange: DateRange) => void
  selected?: DateRange | undefined
}

export function DatePickerWithRange({
  className,
  onChange
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined
  })

  const [searchParams] = useSearchParams()

  // Effect to initialize date range from URL params
  useEffect(() => {
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')

    if (fromParam && toParam) {
      const fromDate = new Date(fromParam)
      const toDate = new Date(toParam)
      setDate({ from: fromDate, to: toDate })
    }
  }, [searchParams])

  const lastMonthDate = subMonths(new Date(), 1)

  const handleDateChange: SelectRangeEventHandler = (newDate) => {
    if (newDate) {
      setDate(newDate)
      if (onChange) {
        onChange(newDate)
      }
    }
  }

  // Calculate default month based on the selected date range
  const defaultMonth = date.from ? date.from : lastMonthDate

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            size={'sm'}
            className={cn('h-8 w-fit justify-start border-dashed')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from && date.to ? (
              <>
                {format(date.from, 'MMM dd, yyyy')} -{' '}
                {format(date.to, 'MMM dd, yyyy')}
              </>
            ) : (
              <span>Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={defaultMonth}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={(date) => date >= new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
