import { Button } from '@/app/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/app/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { z } from 'zod'

const ComboboxPropsSchema = z.object({
  label: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  ),
  onSelect: z.function(z.tuple([z.string()])).optional()
})

type ComboboxProps = z.input<typeof ComboboxPropsSchema>

export function Combobox({ label, data, onSelect }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {value ? data.find((item) => item.id === value)?.text : label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder={label} className="h-9" />
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
        </Command>
      </PopoverContent>
    </Popover>
  )
}
