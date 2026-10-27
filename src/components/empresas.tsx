import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { CenaEmpresas } from "@/components/cenas-fundo";
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
    <section
      id="empresas"
      className="relative overflow-hidden pt-10 pb-44 md:pt-10 md:pb-60 lg:pt-20 lg:pb-0"
      style={{ background: "linear-gradient(180deg, #111111 0%, #161616 50%, #232323 100%)" }}
    >
      <CenaEmpresas />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge>Soluções Financeiras para Empresas</SectionBadge>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
              Crédito, caixa, seguros e energia para a sua empresa crescer com segurança.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {modulos.map((m, i) => {
            const Icone = m.icone;
            return (
              <Reveal key={m.titulo} delay={100 + (i % 4) * 70} className="h-full">
                <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-lg border border-white/10 bg-glass-dark px-5 py-8 text-center backdrop-blur-glass transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className="grid size-16 shrink-0 place-items-center rounded-lg text-accent"
                    style={{
                      background: "rgba(254,178,2,0.12)",
                      border: "1px solid rgba(254,178,2,0.35)",
                    }}
                  >
                    <Icone className="size-8" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-display text-sm leading-snug font-bold text-white transition-colors duration-300 group-hover:text-accent md:text-base">
                    {m.titulo}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex justify-center md:mt-14">
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
