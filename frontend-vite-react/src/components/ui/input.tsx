import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-2xl border-2 border-white/5 bg-background/50 px-5 py-2 text-sm font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-black placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner",
        className
      )}
      {...props}
    />
  )
}

export { Input }
