import { LucideIcon } from 'lucide-react'

import { buttonVariants } from '@/app/shared/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/app/shared/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    to: string
    icon: LucideIcon
    variant: 'default' | 'ghost'
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.to}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.to}
              className={cn(
                buttonVariants({ variant: link.variant, size: 'sm' }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />
              <span className="text-sm font-normal">{link.title}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
