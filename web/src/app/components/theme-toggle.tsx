import { Moon, Sun } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useTheme } from "@/utils/use-theme";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ThemeToggleProps {
  isCollapsed: boolean;
}

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <div
      data-collapsed={isCollapsed}
      className="px-2 flex items-center justify-center group flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <DropdownMenu>
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              asChild
              className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
            >
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    "flex items-center h-9 w-9 justify-center px-2 outline-none"
                  }
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />{" "}
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{" "}
                  <span className="sr-only">Theme</span>
                </Button>
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
              className="justify-start w-full outline-none flex items-center p-3"
            >
              <Sun className="h-5 w-5 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="text-sm">Theme</span>
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
