"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Bouton « retour en haut » avec progression de lecture en % */
export function ScrollToTop() {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
      setVisible(y > 400);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={`Revenir en haut de la page (${pct} % lu)`}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--border) 0)` }}
      className={cn(
        "fixed right-4 bottom-[calc(80px+env(safe-area-inset-bottom))] z-50 size-14 cursor-pointer rounded-full p-0.75 shadow-[0_10px_28px_rgba(11,36,71,0.18)] transition-[opacity,transform,box-shadow] duration-200 hover:shadow-[0_14px_34px_rgba(11,36,71,0.26)] md:right-7 md:bottom-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span className="flex size-full flex-col items-center justify-center gap-px rounded-full bg-white text-primary">
        <ArrowUp className="size-3.75" aria-hidden />
        <span className="text-[10.5px] leading-none font-semibold tabular-nums">{pct}%</span>
      </span>
    </button>
  );
}
