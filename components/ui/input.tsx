import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[50px] w-full min-w-0 rounded-lg border border-input bg-card px-3.5 text-base text-foreground transition-colors duration-150 placeholder:text-subtle-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
