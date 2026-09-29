import type { ReactNode } from "react";

export function LegalContent({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-[820px] flex-col gap-11 px-5 py-14 text-[16.5px] leading-[1.7] text-[#243140] md:px-10 md:py-24">{children}</div>;
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-heading">{title}</h2>
      {children}
    </section>
  );
}
