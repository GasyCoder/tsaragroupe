import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-36 w-full resize-y rounded-lg border border-input bg-card px-3.5 py-3 text-base leading-relaxed text-foreground transition-colors duration-150 placeholder:text-subtle-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
