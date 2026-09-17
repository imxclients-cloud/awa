import { Reveal } from "@/components/reveal";
import iconePatrimonial from "@/assets/Ativo_32.png.asset.json";
import iconeSucessorio from "@/assets/Ativo_38.png.asset.json";
import iconeCustodia from "@/assets/Ativo_42.png.asset.json";
import iconeRiscos from "@/assets/Ativo_31.png.asset.json";
import iconeFamiliar from "@/assets/Ativo_45.png.asset.json";
import iconeLegado from "@/assets/Ativo_34.png.asset.json";

const pilares = [
  {
    icone: iconePatrimonial.url,
    titulo: "Planejamento Patrimonial",
    texto: "Organização e estruturação do patrimônio para protegê-lo e fazê-lo crescer com segurança.",
  },
  {
    icone: iconeSucessorio.url,
    titulo: "Planejamento Sucessório",
    texto: "Estratégias para garantir uma transição patrimonial tranquila entre gerações.",
  },
  {
    icone: iconeRiscos.url,
    titulo: "Gestão de Riscos",
    texto: "Proteção do patrimônio e da família diante de imprevistos, com seguros e diversificação.",
  },
  {
    icone: iconeFamiliar.url,
    titulo: "Organização Financeira Familiar",
    texto: "Clareza e planejamento das finanças da família para decisões mais seguras no dia a dia.",
  },
  {
    icone: iconeLegado.url,
    titulo: "Preservação de Legado",
    texto: "Construção de um legado duradouro, alinhado aos valores e à história da família.",
  },
];

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
      className="relative overflow-hidden bg-surface-light py-16 md:py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(35,35,35,0.05) 0.6px, transparent 0.6px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
              Soluções Financeiras para Famílias
            </span>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.6rem]">
              Patrimônio exige mais do que uma carteira de investimentos.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-ink md:text-lg">
              Além dos investimentos, a A.W.A Capital oferece um conjunto de soluções financeiras
              para organizar, proteger e perpetuar o patrimônio de pessoas e famílias.
            </p>
          </Reveal>
        </div>

        <ul className="w-full">
          {itens.map((item, i) => (
            <Reveal key={item.titulo} delay={120 + i * 70}>
              <li
                className="group flex items-center gap-4 border-b py-3.5 transition-colors duration-300 md:py-4"
                style={{ borderColor: "rgba(35,35,35,0.1)" }}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg"
                  style={{
                    background: "rgba(254,178,2,0.1)",
                    border: "1px solid rgba(254,178,2,0.3)",
                  }}
                >
                  <img src={item.icone} alt="" aria-hidden loading="lazy" className="size-4.5" />
                </span>
                <h3 className="font-display text-sm leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-accent md:text-base">
                  {item.titulo}
                </h3>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* pilares do planejamento patrimonial — conteúdo reestruturado em formato de cards */}
      <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
        <p className="text-center font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
          Planejamento patrimonial
        </p>
        <h3 className="mx-auto mt-4 max-w-2xl text-center font-display text-xl font-bold text-ink md:text-2xl">
          Cinco frentes que sustentam o cuidado com o patrimônio da família.
        </h3>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pilares.map((p) => (
            <Reveal key={p.titulo} delay={100}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-ink-hairline bg-white p-6 text-center">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full"
                  style={{
                    background: "rgba(254,178,2,0.1)",
                    border: "1px solid rgba(254,178,2,0.3)",
                  }}
                >
                  <img src={p.icone} alt="" aria-hidden loading="lazy" className="size-5" />
                </span>
                <h4 className="mt-4 font-display text-sm font-bold text-ink">{p.titulo}</h4>
                <p className="mt-2 font-sans text-xs leading-relaxed text-ink-muted">{p.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
