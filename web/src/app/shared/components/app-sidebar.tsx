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
import {
  Banknote,
  ChevronUp,
  HandCoins,
  Hourglass,
  LayoutGrid,
  Siren,
  User2,
  WalletCards
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
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

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Wealth Wise</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
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
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Planning & Savings</SidebarGroupLabel>
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
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
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
        </SidebarGroup>
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
