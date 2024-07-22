import { Button } from '@/app/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/app/shared/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/shared/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { z } from 'zod'
import { ScrollArea } from './scroll-area'

const ComboboxPropsSchema = z.object({
  label: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  ),
  onSelect: z.function(z.tuple([z.string()])).optional(),
  defaultValue: z.string().optional()
})

type ComboboxProps = z.input<typeof ComboboxPropsSchema>

export function Combobox({
  label,
  data,
  onSelect,
  defaultValue
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue ?? '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? data.find((item) => item.id === value)?.text : label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={label} className="h-9" />
          <ScrollArea className="h-fit">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    if (onSelect) {
                      onSelect(currentValue)
                    }
                    setOpen(false)
                  }}
                >
                  {item.text}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === item.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
