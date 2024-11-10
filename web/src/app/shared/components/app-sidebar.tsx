import { logout } from '@/api/auth/logout'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/app/shared/components/ui/sidebar'
import WealthWiseSimpleBlack from '@/assets/wealth-wise-simple-black/wealth-wise-simple-black'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
import {
  Banknote,
  ChevronDown,
  ChevronUp,
  HandCoins,
  Hourglass,
  LayoutGrid,
  Siren,
  User2,
  WalletCards
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './theme-toggle'
import { Collapsible, CollapsibleTrigger } from './ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const items = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: LayoutGrid,
    variant: 'ghost'
  },
  {
    title: 'Expenses',
    to: '/expenses',
    icon: WalletCards,
    variant: 'ghost'
  },
  {
    title: 'Income',
    to: '/dashboard',
    icon: WalletCards,
    variant: 'ghost'
  },
  {
    title: 'Dividends',
    to: '/dividends',
    icon: HandCoins,
    variant: 'ghost'
  },

  {
    title: 'Loan Calculator',
    to: '/loan-calculator',
    icon: Banknote,
    variant: 'ghost'
  }
]

const planningSavingsItems = [
  {
    title: 'Emergency Fund',
    to: '/emergency-fund',
    icon: Siren,
    variant: 'ghost'
  }
]

const administrationItems = [
  {
    title: 'Categories',
    to: '/administration/expense-categories',
    icon: Banknote,
    variant: 'ghost'
  },
  {
    title: 'Recurring Expenses',
    to: '/administration/recurring-expenses',
    icon: Hourglass,
    variant: 'ghost'
  }
]

function useLocalStorageState(key: string, defaultValue: boolean) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
export const AppSidebar = () => {
  return (
    <Sidebar collapsible="none" className="h-screen">
      <SidebarHeader>
        <Link to={'/dashboard'}>
          <div className="flex items-end gap-4">
            <WealthWiseSimpleBlack />
            <h1 className="flex h-full select-none text-pretty">Wealth Wise</h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <MainMenu />
        <PlanningSavingsMenu />
        <AdministrationMenu />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <ThemeToggle isCollapsed={false} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={logout}>
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-400">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

const MainMenu = () => {
  const [isMainOpen, setIsMainOpen] = useLocalStorageState('mainMenuOpen', true)

  return (
    <Collapsible
      open={isMainOpen}
      onOpenChange={setIsMainOpen}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Main
            <ChevronDown
              className={`ml-auto transition-transform ${isMainOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const PlanningSavingsMenu = () => {
  const [isPlanningOpen, setIsPlanningOpen] = useLocalStorageState(
    'planningMenuOpen',
    true
  )

  return (
    <Collapsible
      open={isPlanningOpen}
      onOpenChange={setIsPlanningOpen}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Planning & Savings
            <ChevronDown
              className={`ml-auto transition-transform ${isPlanningOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {planningSavingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const AdministrationMenu = () => {
  const [isAdminOpen, setIsAdminOpen] = useLocalStorageState(
    'adminMenuOpen',
    true
  )

  return (
    <Collapsible
      open={isAdminOpen}
      onOpenChange={setIsAdminOpen}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Administration
            <ChevronDown
              className={`ml-auto transition-transform ${isAdminOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {administrationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
