import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_34px_-10px_rgba(255,69,0,0.65)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_44px_-8px_rgba(255,69,0,0.75)]",
        secondary:
          "border border-white/10 bg-secondary text-secondary-foreground hover:bg-white/[0.07]",
        outline:
          "border border-white/15 bg-transparent text-foreground hover:border-white/30 hover:bg-white/[0.05]",
        ghost: "text-foreground/80 hover:bg-white/[0.06] hover:text-foreground",
        link: "text-signal underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.8rem]",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-[0.95rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
