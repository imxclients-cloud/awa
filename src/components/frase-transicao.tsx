import type { ReactNode } from "react";

export function FraseTransicao({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden py-10 md:py-14"
      style={{ background: "#232323" }}
    >
      <p className="mx-auto px-5 text-center font-display text-lg font-bold tracking-tight text-white md:text-2xl">
        {children}
      </p>
    </div>
  );
}
