import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold no-underline transition-colors duration-150 disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(16,24,40,0.12)] hover:bg-primary-hover hover:text-primary-foreground active:translate-y-px",
        outline: "border border-border-strong bg-card text-primary hover:border-primary hover:text-primary",
        light: "bg-white font-semibold text-navy shadow-[0_1px_2px_rgba(3,15,31,0.12)] hover:bg-[#f1f5f9] hover:text-navy active:translate-y-px",
        "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/5 hover:text-white",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-5 text-[15px]",
        lg: "h-[54px] px-6.5 text-base",
        sm: "h-9 px-3 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button };
