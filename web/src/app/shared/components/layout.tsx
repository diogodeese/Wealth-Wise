import WealthWiseSimpleBlack from '@/assets/wealth-wise-simple-black/wealth-wise-simple-black'
import WealthWiseSimpleWhite from '@/assets/wealth-wise-simple-white/wealth-wise-simple-white'
import { cn } from '@/lib/utils'
import { useTheme } from '@/utils/use-theme'
import { Banknote, HandCoins, LayoutGrid, WalletCards } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './nav'
import { ThemeToggle } from './theme-toggle'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from './ui/resizable'
import { Separator } from './ui/separator'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const themeMode = useTheme()

  const defaultLayout = [15, 85]
  const minSizes = [12, 70]
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
                {themeMode === 'light' ? (
                  <WealthWiseSimpleWhite />
                ) : (
                  <WealthWiseSimpleBlack />
                )}
              </>
            ) : (
              <>
                {themeMode === 'light' ? (
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
              title: 'Savings',
              to: '/dashboard',
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
            }
          ]}
        />
        <Separator />
        <ThemeToggle isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={layout[1]}
        minSize={minSizes[1]}
        maxSize={maxSizes[1]}
      >
        <div className="container py-8">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Layout
