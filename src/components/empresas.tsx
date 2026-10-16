import { Reveal } from "@/components/reveal";
import iconeCaixa from "@/assets/Ativo_37.png.asset.json";
import iconeInvest from "@/assets/Ativo_47.png.asset.json";
import iconePlanejamento from "@/assets/Ativo_41.png.asset.json";
import iconeProtecao from "@/assets/Ativo_31.png.asset.json";
import iconeCredito from "@/assets/Ativo_43.png.asset.json";
import iconeBeneficios from "@/assets/Ativo_45.png.asset.json";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";

const modulos = [
  { icone: iconeCredito.url, titulo: "Crédito" },
  { icone: iconeCaixa.url, titulo: "Câmbio" },
  { icone: iconeProtecao.url, titulo: "Seguro Vida em Grupo" },
  { icone: iconeProtecao.url, titulo: "Seguros Corporativos" },
  { icone: iconeInvest.url, titulo: "Restituição Tributária" },
  { icone: iconePlanejamento.url, titulo: "Mercado Livre de Energia" },
  { icone: iconeBeneficios.url, titulo: "Consórcios para compra planejada de bens" },
  { icone: iconeBeneficios.url, titulo: "Conta Digital e Cartão de Crédito XP" },
  { icone: iconeCredito.url, titulo: "Antecipação de precatórios" },
  { icone: iconeCaixa.url, titulo: "Gestão de Fluxo de Caixa" },
  { icone: iconeProtecao.url, titulo: "Holding Patrimonial" },
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
        <div className="max-w-3xl">
          <Reveal>
            <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
              Soluções Financeiras para Empresas
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {modulos.map((m, i) => (
            <Reveal key={m.titulo} delay={100 + (i % 4) * 70} className="h-full">
              <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-ink-hairline bg-white px-5 py-8 text-center transition-transform duration-300 hover:-translate-y-1">
                <span
                  className="grid size-16 shrink-0 place-items-center rounded-2xl"
                  style={{
                    background: "rgba(254,178,2,0.1)",
                    border: "1px solid rgba(254,178,2,0.3)",
                  }}
                >
                  <img src={m.icone} alt="" aria-hidden loading="lazy" className="size-9" />
                </span>
                <h3 className="font-display text-sm leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-accent md:text-base">
                  {m.titulo}
                </h3>
              </div>
            </Reveal>
          ))}
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
