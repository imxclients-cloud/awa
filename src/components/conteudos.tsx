import { Reveal } from "@/components/reveal";
import iconeCenario from "@/assets/Ativo_43.png.asset.json";
import iconePatrimonio from "@/assets/Ativo_47.png.asset.json";
import iconeSucessorio from "@/assets/Ativo_31.png.asset.json";
import iconeEmpresarial from "@/assets/Ativo_37.png.asset.json";
import iconeEstudos from "@/assets/Ativo_32.png.asset.json";

const itens = [
  { titulo: "Cenário econômico", icone: iconeCenario.url },
  { titulo: "Estratégias patrimoniais", icone: iconePatrimonio.url },
  { titulo: "Planejamento sucessório", icone: iconeSucessorio.url },
  { titulo: "Gestão financeira empresarial", icone: iconeEmpresarial.url },
  { titulo: "Estudos e insights", icone: iconeEstudos.url },
];

const categorias = itens.map((i) => i.titulo);

export function Conteudos() {
  return (
    <section
      id="conteudos"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ background: "#232323" }}
    >
      {/* malha de terminal: linhas horizontais irregulares em diagonal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(254,178,2,0.10) 0 1px, transparent 1px 7px)",
          maskImage:
            "linear-gradient(115deg, transparent 0%, black 38%, black 58%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(115deg, transparent 0%, black 38%, black 58%, transparent 92%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(254,178,2,0.06) 0 1px, transparent 1px 22px)",
          maskImage: "radial-gradient(70% 60% at 30% 40%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 30% 40%, black 0%, transparent 80%)",
        }}
      />

      {/* ticker superior */}
      <div
        aria-hidden
        className="relative hidden overflow-hidden border-y py-2.5 md:block"
        style={{ borderColor: "rgba(254,178,2,0.12)" }}
      >
        <div className="animate-ticker flex w-max whitespace-nowrap">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex">
              {categorias.map((c) => (
                <span
                  key={`${rep}-${c}`}
                  className="font-display px-6 text-[0.62rem] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "rgba(254,178,2,0.4)" }}
                >
                  {c} <span className="pl-6">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="max-w-[720px]">
          <Reveal>
            <h2
              className="font-display text-[1.75rem] leading-[1.12] font-extrabold tracking-tight md:text-4xl lg:text-[2.6rem]"
              style={{ color: "#E1DECD" }}
            >
              Conhecimento para decisões mais conscientes
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p
              className="mt-6 font-sans text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(225,222,205,0.7)" }}
            >
              Análises, estudos de mercado e conteúdos para ajudar você a compreender movimentos
              econômicos, oportunidades e temas que impactam seu patrimônio e seus negócios.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 max-w-[860px] md:mt-16">
          {itens.map((c, i) => (
            <Reveal key={c.titulo} delay={160 + i * 90}>
              <li
                className="group flex items-center gap-5 border-b py-5 transition-colors duration-300 md:gap-6 md:py-6"
                style={{ borderColor: "rgba(225,222,205,0.12)" }}
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-xl md:size-14"
                  style={{
                    background: "rgba(254,178,2,0.1)",
                    border: "1px solid rgba(254,178,2,0.25)",
                  }}
                >
                  <img
                    src={c.icone}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="size-6 md:size-7"
                  />
                </span>
                <h3
                  className="font-display flex-1 text-base leading-snug font-bold transition-colors duration-300 group-hover:text-accent md:text-xl"
                  style={{ color: "#E1DECD" }}
                >
                  {c.titulo}
                </h3>
                <span
                  aria-hidden
                  className="text-lg transition-transform duration-500 group-hover:translate-x-1.5"
                  style={{ color: "rgba(254,178,2,0.85)" }}
                >
                  →
                </span>
              </li>
            </Reveal>
          ))}
        </ul>


        <Reveal delay={620}>
          <a
            href="#conteudos"
            className="mt-14 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-sans text-sm font-semibold transition-colors duration-300 md:mt-16"
            style={{ borderColor: "rgba(254,178,2,0.6)", color: "#FEB202" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(254,178,2,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Acesse nossos conteúdos.
          </a>
        </Reveal>
      </div>
    </section>
  );
}
