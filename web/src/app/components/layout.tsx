import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable'
import { Separator } from './ui/separator'
import { ThemeToggle } from './theme-toggle'
import { Nav } from './nav'
import { useState } from 'react'
import {
  ArrowUpDown,
  Banknote,
  Bitcoin,
  CreditCard,
  History,
  LayoutGrid,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { ReactNode } from 'react'
import WealthWiseSimpleBlack from '@/assets/wealth-wise-simple-black/wealth-wise-simple-black'
import WealthWiseSimpleWhite from '@/assets/wealth-wise-simple-white/wealth-wise-simple-white'
import { Link } from 'react-router-dom'
import { useTheme } from '@/utils/use-theme'
import WealthWiseComplexBlack from '@/assets/weath-wise-complex-black/wealth-wise-complex-black'
import WealthWiseComplexWhite from '@/assets/wealth-wise-complex-white/wealth-wise-complex-white'
import { Button } from './ui/button'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const themeMode = useTheme().theme

  const defaultLayout = [15, 85]
  const minSizes = [12, 70]
  const maxSizes = [20, 95]
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        localStorage.setItem(
          'react-resizable-panels:layout',
          JSON.stringify(sizes)
        )
      }}
      className='min-h-screen items-stretch'
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        minSize={minSizes[0]}
        maxSize={maxSizes[0]}
        collapsedSize={6}
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
          isCollapsed && 'min-w-[50px]  transition-all duration-300 ease-in-out'
        )}
      >
        <div className='w-full'>
          <Link
            to='/'
            className='flex justify-center items-center pb-4 pt-6 gap-4'
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
                    <span className='text-base'>Wealth Wise</span>
                  </>
                ) : (
                  <>
                    <WealthWiseSimpleBlack />
                    <span className='text-base'>Wealth Wise</span>
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
              icon: LayoutGrid,
              variant: 'ghost',
            },
            {
              title: 'Expenses',
              icon: WalletCards,
              variant: 'ghost',
            },
            {
              title: 'Analytics',
              icon: TrendingUp,
              variant: 'ghost',
            },
            {
              title: 'Transactions',
              icon: ArrowUpDown,
              variant: 'ghost',
            },
            {
              title: 'History',
              icon: History,
              variant: 'ghost',
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: 'Savings',
              icon: Banknote,
              variant: 'ghost',
            },
            {
              title: 'Cards',
              icon: CreditCard,
              variant: 'ghost',
            },
            {
              title: 'Crypto',
              icon: Bitcoin,
              variant: 'ghost',
            },
          ]}
        />
        <Separator />
        <ThemeToggle isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={minSizes[1]}
        maxSize={maxSizes[1]}
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Layout
