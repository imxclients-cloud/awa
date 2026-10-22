import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import {
  ArrowLeftRight,
  Building2,
  Coins,
  CreditCard,
  HandCoins,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Umbrella,
  Wallet,
  Zap,
  Car,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";

type Modulo = { icone: LucideIcon; titulo: string };

const modulos: Modulo[] = [
  { icone: HandCoins, titulo: "Crédito" },
  { icone: ArrowLeftRight, titulo: "Câmbio" },
  { icone: Umbrella, titulo: "Seguro Vida em Grupo" },
  { icone: ShieldCheck, titulo: "Seguros Corporativos" },
  { icone: Coins, titulo: "Restituição Tributária" },
  { icone: Zap, titulo: "Mercado Livre de Energia" },
  { icone: Car, titulo: "Consórcios para compra planejada de bens" },
  { icone: CreditCard, titulo: "Conta Digital e Cartão de Crédito XP" },
  { icone: Landmark, titulo: "Antecipação de precatórios" },
  { icone: Wallet, titulo: "Gestão de Fluxo de Caixa" },
  { icone: Building2, titulo: "Holding Patrimonial" },
];

export function Empresas() {
  return (
    <section id="empresas" className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35,35,35,0.05) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(35,35,35,0.05) 0.5px, transparent 0.5px), linear-gradient(rgba(35,35,35,0.03) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(35,35,35,0.03) 0.5px, transparent 0.5px)",
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
          maskImage: "radial-gradient(120% 90% at 50% 50%, transparent 30%, black 100%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 50%, transparent 30%, black 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge>Soluções Financeiras para Empresas</SectionBadge>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {modulos.map((m, i) => {
            const Icone = m.icone;
            return (
              <Reveal key={m.titulo} delay={100 + (i % 4) * 70} className="h-full">
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
                    {m.titulo}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 md:mt-14">
            <a
              href={WHATSAPP_ESPECIALISTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "#FEB202", color: "#232323" }}
            >
              Fale com um especialista em empresas!
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
