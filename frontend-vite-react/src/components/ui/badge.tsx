import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-all outline-none focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px]",
        secondary:
          "border-transparent bg-white/5 text-muted-foreground font-black uppercase tracking-widest text-[9px] hover:bg-white/10",
        destructive:
          "border-transparent bg-destructive/10 text-destructive font-black uppercase tracking-widest text-[9px]",
        outline: "text-foreground border-white/10 bg-white/5 backdrop-blur-sm font-black uppercase tracking-widest text-[9px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
