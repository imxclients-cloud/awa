import { Reveal } from "@/components/reveal";
import wealthBg from "@/assets/wealth-bg.jpg";
import iconePatrimonial from "@/assets/Ativo_32.png.asset.json";
import iconeSucessorio from "@/assets/Ativo_38.png.asset.json";
import iconeCustodia from "@/assets/Ativo_42.png.asset.json";
import iconeRiscos from "@/assets/Ativo_31.png.asset.json";
import iconeFamiliar from "@/assets/Ativo_45.png.asset.json";
import iconeLegado from "@/assets/Ativo_34.png.asset.json";

const itens = [
  { icone: iconePatrimonial.url, titulo: "Planejamento patrimonial" },
  { icone: iconeSucessorio.url, titulo: "Planejamento sucessório" },
  { icone: iconeCustodia.url, titulo: "Multi-custódia" },
  { icone: iconeRiscos.url, titulo: "Gestão de riscos" },
  { icone: iconeFamiliar.url, titulo: "Organização financeira familiar" },
  { icone: iconeLegado.url, titulo: "Estratégias para preservação e legado" },
];


export function WealthServices() {
  return (
    <section
      id="wealth-services"
      className="relative overflow-hidden bg-deep py-16 md:py-20 lg:py-28"
    >
      {/* textura de fundo quase imperceptível + parallax */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed opacity-30 [filter:grayscale(1)_contrast(0.8)]"
        style={{ backgroundImage: `url(${wealthBg})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(35,35,35,0.92) 0%, rgba(20,20,20,0.88) 50%, rgba(35,35,35,0.94) 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
        {/* painel institucional */}
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
              Para clientes Private
            </span>
          </Reveal>
          <Reveal delay={110}>
            <h2
              className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight md:text-4xl lg:text-[2.6rem]"
              style={{ color: "#E1DECD" }}
            >
              Patrimônio exige mais do que uma carteira de investimentos.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="mt-7 max-w-xl font-sans text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(225,222,205,0.8)" }}
            >
              O Wealth Services da A.W.A Capital oferece uma visão integrada para clientes que
              precisam organizar, proteger e perpetuar seu patrimônio.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p
              className="mt-5 max-w-xl font-sans text-base leading-relaxed"
              style={{ color: "rgba(225,222,205,0.5)" }}
            >
              A estratégia considera diferentes dimensões da vida financeira, familiar e
              empresarial, conectando investimentos, planejamento sucessório, gestão de riscos e
              soluções personalizadas.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <a
              href="#contato"
              className="mt-10 inline-flex items-center justify-center rounded-full border px-7 py-3.5 font-sans text-sm font-semibold transition-all duration-300 hover:text-deep"
              style={{ borderColor: "rgba(254,178,2,0.5)", color: "#FEB202" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FEB202";
                e.currentTarget.style.borderColor = "#FEB202";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(254,178,2,0.5)";
              }}
            >
              Conheça o Wealth Services!
            </a>
          </Reveal>
        </div>

        {/* lista de serviços */}
        <ul className="w-full">
          {itens.map((item, i) => (
            <Reveal key={item.titulo} delay={120 + i * 90}>
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
                    src={item.icone}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="size-6 md:size-7"
                  />
                </span>
                <h3
                  className="font-display text-base leading-snug font-bold transition-colors duration-300 group-hover:text-accent md:text-xl"
                  style={{ color: "#E1DECD" }}
                >
                  {item.titulo}
                </h3>
              </li>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  );
}
