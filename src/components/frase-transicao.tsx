import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** data-sanity do Presentation (campo da frase no documento home-frases) */
  "data-sanity"?: string;
};

export function FraseTransicao({ children, "data-sanity": dataSanity }: Props) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#232323" }}
    >
      <p
        data-sanity={dataSanity}
        className="mx-auto px-5 text-center font-display text-lg font-bold tracking-tight text-white md:text-2xl"
      >
        {children}
      </p>
    </div>
  );
}
