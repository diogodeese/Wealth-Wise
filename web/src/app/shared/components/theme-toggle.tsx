import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { useTheme } from '@/utils/use-theme'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface ThemeToggleProps {
  isCollapsed: boolean
}

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
  const { setTheme } = useTheme()

  return (
    <div data-collapsed={isCollapsed} className="flex w-full justify-center">
      <DropdownMenu>
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild className="w-full">
              <DropdownMenuTrigger>
                <a
                  className={
                    'flex h-9 w-full items-center justify-center px-2 outline-none'
                  }
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />{' '}
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{' '}
                  <span className="sr-only">Theme</span>
                </a>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Theme
            </TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="default"
              className="flex w-full select-none items-center justify-start p-3 outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="text-sm">Theme</span>
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          align="end"
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
