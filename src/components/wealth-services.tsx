import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { CenaFamilias } from "@/components/cenas-fundo";
import {
  ArrowLeftRight,
  Building2,
  CreditCard,
  Globe,
  HandCoins,
  Landmark,
  Car,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Homepage } from "@/lib/sanity";

type Props = { data?: Homepage["wealthServices"] | null };

type Item = { icone: LucideIcon; titulo: string };

const FALLBACK: Item[] = [
  { icone: Shield, titulo: "Seguros — proteção, sucessão patrimonial e gestão de risco" },
  { icone: Car, titulo: "Consórcios — compra planejada de bens" },
  { icone: ArrowLeftRight, titulo: "Câmbio" },
  { icone: CreditCard, titulo: "Conta Digital e Cartão de Crédito XP" },
  { icone: HandCoins, titulo: "Crédito e Financiamento" },
  { icone: Landmark, titulo: "Antecipação de precatórios" },
  { icone: Building2, titulo: "Holding Patrimonial" },
  { icone: Globe, titulo: "Offshore" },
];

const ICONS = [Shield, Car, ArrowLeftRight, CreditCard, HandCoins, Landmark, Building2, Globe];

export function WealthServices({ data }: Props) {
  const sectionId = data?.sectionId || "familias";
  const badge = data?.badge?.trim() || "Soluções Financeiras para Famílias";
  const subtitle =
    data?.subtitle?.trim() ||
    "Proteção, sucessão e crescimento do patrimônio de quem você mais ama.";

  const itens: Item[] =
    data?.services && data.services.length > 0
      ? data.services.map((s, i) => ({
          icone: ICONS[i % ICONS.length],
          titulo: s.title || "",
        }))
      : FALLBACK;

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden pt-10 pb-36 md:pt-10 md:pb-44 lg:pt-20 lg:pb-52"
      style={{ background: "linear-gradient(180deg, #F9F9FA 0%, #F1EEE1 45%, #E1DECD 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 100%, rgba(254,178,2,0.22), rgba(254,178,2,0) 70%)",
        }}
      />
      <CenaFamilias />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge>{badge}</SectionBadge>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {itens.map((item, i) => {
            const Icone = item.icone;
            return (
              <Reveal key={item.titulo} delay={100 + i * 70} className="h-full">
                <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-ink-hairline bg-white/80 px-5 py-8 text-center backdrop-blur-sm transition-shadow hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icone className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="font-display text-sm font-bold leading-snug text-ink md:text-[0.95rem]">
                    {item.titulo}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
