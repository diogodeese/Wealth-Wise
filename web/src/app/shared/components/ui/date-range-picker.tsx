'use client'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, subMonths } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { Button } from '@/app/shared/components/ui/button'
import { Calendar } from '@/app/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/shared/components/ui/popover'
import { cn } from '@/lib/utils'
import React from 'react'

export function DatePickerWithRange({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  const lastMonthDate = subMonths(new Date(), 1)

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
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={lastMonthDate}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) => date >= new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
