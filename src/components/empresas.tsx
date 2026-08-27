import { Reveal } from "@/components/reveal";
import iconeCaixa from "@/assets/Ativo_37.png.asset.json";
import iconeInvest from "@/assets/Ativo_47.png.asset.json";
import iconePlanejamento from "@/assets/Ativo_41.png.asset.json";
import iconeProtecao from "@/assets/Ativo_31.png.asset.json";
import iconeCredito from "@/assets/Ativo_43.png.asset.json";
import iconeBeneficios from "@/assets/Ativo_45.png.asset.json";

const modulos = [
  { icone: iconeCaixa.url, titulo: "Gestão de caixa" },
  { icone: iconeInvest.url, titulo: "Investimentos para pessoa jurídica" },
  { icone: iconePlanejamento.url, titulo: "Planejamento financeiro empresarial" },
  { icone: iconeProtecao.url, titulo: "Proteção patrimonial" },
  { icone: iconeCredito.url, titulo: "Soluções de crédito" },
  { icone: iconeBeneficios.url, titulo: "Benefícios e soluções financeiras corporativas" },
];

export function Empresas() {
  return (
    <section id="empresas" className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-28">
      {/* blueprint: malha fina */}
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
              A.W.A para empresas
            </span>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.6rem]">
              Estratégia financeira também faz parte do crescimento de uma empresa.
            </h2>
          </Reveal>
          <Reveal delay={190}>
            <p className="mt-7 font-sans text-base leading-relaxed text-ink md:text-lg">
              A A.W.A Capital apoia empresários e organizações na construção de soluções financeiras
              alinhadas à realidade do negócio.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 font-sans text-base leading-relaxed text-ink-muted">
              Nosso trabalho parte de uma análise individualizada para identificar oportunidades,
              organizar recursos e apoiar decisões com mais clareza e eficiência.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 max-w-[860px] md:mt-16">
          {modulos.map((m, i) => (
            <Reveal key={m.titulo} delay={120 + i * 90}>
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
                  <img src={m.icone} alt="" aria-hidden loading="lazy" className="size-4.5" />
                </span>
                <h3 className="font-display text-sm leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-accent md:text-base">
                  {m.titulo}
                </h3>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <div className="mt-12 md:mt-14">
            <a
              href="#contato"
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
