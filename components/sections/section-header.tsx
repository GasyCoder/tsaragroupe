import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "text-sm font-semibold",
        tone === "dark" ? "text-navy-accent" : "text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  id?: string;
  description?: ReactNode;
  action?: ReactNode;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, id, description, action, align = "start", className }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", centered && "justify-center text-center", className)}>
      <div className={cn("flex max-w-2xl flex-col gap-3.5", centered && "items-center")}> 
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-h2 font-semibold text-heading">
          {title}
        </h2>
        {description && <div className="text-[17px] leading-relaxed text-muted-foreground">{description}</div>}
      </div>
      {action && <div className="flex flex-wrap items-center gap-3">{action}</div>}
    </div>
  );
}
