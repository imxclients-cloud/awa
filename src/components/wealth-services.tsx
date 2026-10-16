import { Reveal } from "@/components/reveal";
import iconePatrimonial from "@/assets/Ativo_32.png.asset.json";
import iconeSucessorio from "@/assets/Ativo_38.png.asset.json";
import iconeCustodia from "@/assets/Ativo_42.png.asset.json";
import iconeRiscos from "@/assets/Ativo_31.png.asset.json";
import iconeFamiliar from "@/assets/Ativo_45.png.asset.json";
import iconeLegado from "@/assets/Ativo_34.png.asset.json";

const itens = [
  { icone: iconePatrimonial.url, titulo: "Seguros — proteção, sucessão patrimonial e gestão de risco" },
  { icone: iconeSucessorio.url, titulo: "Consórcios — compra planejada de bens" },
  { icone: iconeCustodia.url, titulo: "Câmbio" },
  { icone: iconeRiscos.url, titulo: "Conta Digital e Cartão de Crédito XP" },
  { icone: iconeFamiliar.url, titulo: "Crédito e Financiamento" },
  { icone: iconeLegado.url, titulo: "Antecipação de precatórios" },
  { icone: iconePatrimonial.url, titulo: "Holding Patrimonial" },
  { icone: iconeSucessorio.url, titulo: "Offshore" },
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
          <Reveal>
            <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
              Soluções Financeiras para Famílias
            </span>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="mt-6 font-display text-[2rem] leading-[1.08] font-extrabold tracking-tight text-ink md:text-5xl lg:text-[3.4rem]">
              Patrimônio exige mais do que uma carteira de investimentos.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {itens.map((item, i) => (
            <Reveal key={item.titulo} delay={100 + i * 70} className="h-full">
              <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-ink-hairline bg-white px-5 py-8 text-center transition-transform duration-300 hover:-translate-y-1">
                <span
                  className="grid size-16 shrink-0 place-items-center rounded-2xl"
                  style={{
                    background: "rgba(254,178,2,0.1)",
                    border: "1px solid rgba(254,178,2,0.3)",
                  }}
                >
                  <img src={item.icone} alt="" aria-hidden loading="lazy" className="size-9" />
                </span>
                <h3 className="font-display text-sm leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-accent md:text-base">
                  {item.titulo}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
