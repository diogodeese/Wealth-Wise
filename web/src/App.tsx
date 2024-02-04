import { ThemeToggle } from "./components/theme-toggle";
import DemoPage from "./app/expenses/page";
import { Combobox } from "./components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "./api/get-expense-categories";
import { Nav } from "./components/nav";
import { Snowflake } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { cn } from "./lib/utils";
import { useState } from "react";

const App = () => {
  const { data } = useQuery({
    queryKey: ["expense-categories"],
    queryFn: getExpenseCategories,
  });

  const comboboxData = data?.map((expenseCategory) => ({
    id: expenseCategory.id,
    text: expenseCategory.name,
  }));

  // Define default, minimum, and maximum sizes for sidebar and main content panels
  const defaultLayout = [15, 85];
  const minSizes = [10, 70];
  const maxSizes = [30, 95];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          localStorage.setItem(
            "react-resizable-panels:layout",
            JSON.stringify(sizes)
          );
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={minSizes[0]}
          maxSize={maxSizes[0]}
          collapsedSize={5} // Define a collapsed size for the sidebar
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
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="w-full flex justify-center items-center pb-4 pt-6">
            Diogo Santos
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Expenses",
                // label: "128",
                icon: Snowflake,
                variant: "ghost",
              },
            ]}
          />
          <Separator />

          <ThemeToggle />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={minSizes[1]}
          maxSize={maxSizes[1]}
        >
          <div>
            <DemoPage />
            <Combobox
              label="Select Expense Category"
              data={comboboxData || []}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default App;
