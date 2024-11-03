import { ReactNode } from 'react'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from './ui/sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}

/*const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme()

  const defaultLayout = [15, 85]
  const minSizes = [13, 70]
  const maxSizes = [15, 95]

  const localStorageLayout = localStorage.getItem(
    'react-resizable-panels:layout'
  )
  const localStorageIsCollapsed = localStorage.getItem(
    'react-resizable-panels:collapsed'
  )

  const parsedLayout = localStorageLayout
    ? JSON.parse(localStorageLayout)
    : defaultLayout
  const parsedIsCollapsed = localStorageIsCollapsed
    ? JSON.parse(localStorageIsCollapsed)
    : false

  const [layout, setLayout] = useState(parsedLayout)
  const [isCollapsed, setIsCollapsed] = useState(parsedIsCollapsed)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        setLayout(sizes)
        localStorage.setItem(
          'react-resizable-panels:layout',
          JSON.stringify(sizes)
        )
      }}
      className="min-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={layout[0]}
        minSize={minSizes[0]}
        maxSize={maxSizes[0]}
        collapsedSize={5}
        collapsible={true}
        onCollapse={() => {
          setIsCollapsed(true)
          localStorage.setItem(
            'react-resizable-panels:collapsed',
            JSON.stringify(true)
          )
        }}
        onExpand={() => {
          setIsCollapsed(false)
          localStorage.setItem(
            'react-resizable-panels:collapsed',
            JSON.stringify(false)
          )
        }}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
        )}
      >
        <div className="h-20 w-full">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-4 pb-4 pt-6"
          >
            {isCollapsed ? (
              <>
                {theme === 'light' ? (
                  <WealthWiseSimpleWhite />
                ) : (
                  <WealthWiseSimpleBlack />
                )}
              </>
            ) : (
              <>
                {theme === 'light' ? (
                  <>
                    <WealthWiseSimpleWhite />
                    <span className="text-base">Wealth Wise</span>
                  </>
                ) : (
                  <>
                    <WealthWiseSimpleBlack />
                    <span className="text-base">Wealth Wise</span>
                  </>
                )}
              </>
            )}
          </Link>
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
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
            }
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: 'Emergency Fund',
              to: '/emergency-fund',
              icon: Siren,
              variant: 'ghost'
            },
            {
              title: 'Loan Calculator',
              to: '/loan-calculator',
              icon: Banknote,
              variant: 'ghost'
            }
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
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
          ]}
        />
        <Separator />
        <ThemeToggle isCollapsed={isCollapsed} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuItem onClick={logout}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={layout[1]}
        minSize={minSizes[1]}
        maxSize={maxSizes[1]}
      >
        <div className="container min-h-screen py-8">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}*/

export default Layout
