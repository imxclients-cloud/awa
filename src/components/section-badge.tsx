import type { ReactNode } from "react";

/**
 * Selo padrão dos títulos de seção — outline laranja (referência: "Sobre nós").
 * Aceita props extras (ex.: data-sanity) para o Visual Editing.
 */
export function SectionBadge({
  children,
  ...rest
}: { children?: ReactNode } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className="inline-flex items-center rounded-full border border-accent px-[1.4rem] py-[0.6rem] font-display text-[0.8rem] font-extrabold tracking-[0.06em] text-accent uppercase md:text-[0.85rem]"
    >
      {children}
    </span>
  );
}
