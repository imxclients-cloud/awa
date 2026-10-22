import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import {
  ArrowLeftRight,
  Building2,
  CreditCard,
  Globe,
  GraduationCap,
  HandCoins,
  Landmark,
  Receipt,
  Car,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = { icone: LucideIcon; titulo: string };

const itens: Item[] = [
  { icone: Shield, titulo: "Seguros — proteção, sucessão patrimonial e gestão de risco" },
  { icone: Car, titulo: "Consórcios — compra planejada de bens" },
  { icone: ArrowLeftRight, titulo: "Câmbio" },
  { icone: CreditCard, titulo: "Conta Digital e Cartão de Crédito XP" },
  { icone: HandCoins, titulo: "Crédito e Financiamento" },
  { icone: Landmark, titulo: "Antecipação de precatórios" },
  { icone: Building2, titulo: "Holding Patrimonial" },
  { icone: Globe, titulo: "Offshore" },
];

export function WealthServices() {
  return (
    <section
      id="familias"
      className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(35,35,35,0.05) 0.6px, transparent 0.6px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge>Soluções Financeiras para Famílias</SectionBadge>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {itens.map((item, i) => {
            const Icone = item.icone;
            return (
              <Reveal key={item.titulo} delay={100 + i * 70} className="h-full">
                <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-ink-hairline bg-white px-5 py-8 text-center transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className="grid size-16 shrink-0 place-items-center rounded-2xl text-accent"
                    style={{
                      background: "rgba(254,178,2,0.1)",
                      border: "1px solid rgba(254,178,2,0.3)",
                    }}
                  >
                    <Icone className="size-8" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-display text-sm leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-accent md:text-base">
                    {item.titulo}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
