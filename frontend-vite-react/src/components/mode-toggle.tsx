import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-xl w-11 h-11 border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all group relative overflow-hidden"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-primary group-hover:scale-110" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-primary group-hover:scale-110" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0c0c0c] border-white/10 rounded-xl p-2 min-w-[120px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer">
          Light Ops
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer">
          Dark Ops
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer">
          System Sync
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}