import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme-toggle";
import { Nav } from "./nav";
import { useState } from "react";
import { Snowflake } from "lucide-react";
import { cn } from "../../lib/utils";
import { ReactNode } from "react";
import WealthWiseSimpleBlack from "@/assets/wealth-wise-simple-black/wealth-wise-simple-black";
import { Link } from "react-router-dom";
import WealthWiseSimpleWhite from "@/assets/wealth-wise-simple-white/wealth-wise-simple-white";
import { useTheme } from "@/utils/use-theme";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const themeMode = useTheme().theme;

  const defaultLayout = [15, 85];
  const minSizes = [10, 70];
  const maxSizes = [20, 95];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        localStorage.setItem(
          "react-resizable-panels:layout",
          JSON.stringify(sizes)
        );
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        minSize={minSizes[0]}
        maxSize={maxSizes[0]}
        collapsedSize={5}
        collapsible={true}
        onCollapse={() => {
          setIsCollapsed(true);
          localStorage.setItem(
            "react-resizable-panels:collapsed",
            JSON.stringify(true)
          );
        }}
        onExpand={() => {
          setIsCollapsed(false);
          localStorage.setItem(
            "react-resizable-panels:collapsed",
            JSON.stringify(false)
          );
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="w-full ">
          <Link
            to="/"
            className="flex justify-center items-center pb-4 pt-6 gap-4"
          >
            {themeMode === "light" ? (
              <>
                <WealthWiseSimpleWhite />
                <span className="text-xl">Wealth Wise</span>
              </>
            ) : (
              <>
                <WealthWiseSimpleBlack />
                <span className="text-xl">Wealth Wise</span>
              </>
            )}
          </Link>
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Expenses",
              icon: Snowflake,
              variant: "ghost",
            },
            {
              title: "Teste",
              icon: Snowflake,
              variant: "ghost",
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
  );
};

export default Layout;
