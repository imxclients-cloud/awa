import { Reveal } from "@/components/reveal";
import { ArrowRight, Users, Handshake, Target } from "lucide-react";
import metodoLogo from "@/assets/metodo-edificar-logo.png";

const etapas = [
  {
    codigo: "E",
    linha1: "Escuta",
    linha2: "Ativa",
    top: 52,
    left: 37,
    labelTop: 60,
    labelLeft: "60%",
    labelAlign: "left" as const,
  },
  {
    codigo: "DI",
    linha1: "Diagnóstico",
    linha2: "Personalizado",
    top: 182,
    left: 50,
    labelTop: 190,
    labelLeft: "calc(50% + 125px)",
  },
  {
    codigo: "FI",
    linha1: "Finanças e",
    linha2: "Investimentos",
    top: 312,
    left: 53,
    labelTop: 330,
    labelLeft: "calc(53% + 146px)",
  },
  {
    codigo: "CA",
    linha1: "Consultoria e",
    linha2: "Acompanhamento",
    top: 442,
    left: 43,
    labelTop: 460,
    labelLeft: "calc(43% + 127px)",
  },
  {
    codigo: "R",
    linha1: "Resultados",
    linha2: "Consistentes",
    top: 548,
    left: 27,
    labelTop: 580,
    labelLeft: "50%",
  },
];

// versão simplificada, empilhada, para telas pequenas
const arcoOffsetMobile = [64, 32, 0, 32, 64];

const pilares = [
  {
    icone: Users,
    titulo: "Resultados garantidos",
    texto: "Negociadores na mediação com credores, fornecedores e fundos de investimento.",
  },
  {
    icone: Handshake,
    titulo: "Experiência comprovada",
    texto: "Executivos com histórico comprovado na recuperação de negócios complexos.",
  },
  {
    icone: Target,
    titulo: "Gestão estratégica",
    texto: "Estratégias formuladas por especialistas em finanças corporativas e governança.",
  },
];

export function MetodoEdificar() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-14 lg:py-16"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
            Nosso método
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Método Edificar
          </h2>
        </Reveal>

        {/* etapas do método (E-DI-FI-CA-R) — diagrama, seguindo a peça de referência, com as cores do site */}
        <div className="mt-8 md:mt-8 md:grid md:grid-cols-[minmax(220px,0.62fr)_minmax(0,1fr)] md:items-center md:gap-6">
          <Reveal className="hidden md:block">
            <img
              src={metodoLogo}
              alt="Método Edificar"
              className="w-[240px] lg:w-[280px]"
              loading="lazy"
              style={{ left: "160px", position: "relative" }}
            />
          </Reveal>

          {/* ---- desktop / tablet: diagrama fiel ao modelo de referência ---- */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] right-[160px] md:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 720 800"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="metodoPathGradient" x1="0" y1="0" x2="0.7" y2="1">
                  <stop offset="0" stopColor="#FEB202" stopOpacity="0.05" />
                  <stop offset="0.48" stopColor="#FEB202" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#FEB202" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <path
                d="M366 62 C570 104 585 186 448 267 C342 330 344 414 466 472 C578 526 578 623 385 734"
                fill="none"
                stroke="url(#metodoPathGradient)"
                strokeWidth="2"
                strokeDasharray="3 9"
              />
            </svg>

            {etapas.map((e, i) => (
              <Reveal
                key={e.codigo}
                delay={140 + i * 90}
                className="absolute"
                style={{
                  top: `${(e.top / 700) * 100}%`,
                  left: `${e.left}%`,
                }}
              >
                <div
                  className="grid h-[15%] w-[15%] min-h-[74px] min-w-[74px] place-items-center font-display font-extrabold text-white"
                  style={{
                    background: "linear-gradient(135deg, #ffcf52 0%, #FEB202 55%, #b87a00 100%)",
                    borderRadius: "23% 29% 27% 25%",
                    boxShadow:
                      "0 16px 24px rgba(184, 122, 0, 0.28), inset 6px 6px 14px rgba(255,223,150,0.35), inset -8px -10px 16px rgba(140,90,0,0.28)",
                    transform: "rotate(-7deg)",
                    fontSize: e.codigo.length > 1 ? "clamp(20px, 2.2vw, 30px)" : "clamp(26px, 3vw, 40px)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <span style={{ transform: "rotate(7deg)" }}>{e.codigo}</span>
                </div>
              </Reveal>
            ))}

            {etapas.map((e, i) => (
              <Reveal
                key={`label-${e.codigo}`}
                delay={200 + i * 90}
                className="absolute flex max-w-[190px] flex-col font-display text-[0.82rem] leading-[1.24] font-medium text-ink"
                style={{
                  top: `${(e.labelTop / 700) * 100}%`,
                  left: e.labelLeft,
                  textAlign: e.labelAlign ?? "left",
                  transform: e.labelAlign === "left" ? "translateX(-8px)" : undefined,
                }}
              >
                <span>{e.linha1}</span>
                <strong className="font-bold">{e.linha2}</strong>
              </Reveal>
            ))}
          </div>

          {/* ---- mobile: versão empilhada ---- */}
          <div className="flex flex-col items-center md:hidden">
            <Reveal className="mb-8">
              <img
                src={metodoLogo}
                alt="Método Edificar"
                className="w-[260px]"
                loading="lazy"
              />
            </Reveal>
            {etapas.map((e, i) => (
              <Reveal
                key={e.codigo}
                delay={140 + i * 90}
                className="relative -mt-3 first:mt-0"
                style={{ marginLeft: `${arcoOffsetMobile[i]}px` }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-16 w-16 shrink-0 place-items-center font-display text-2xl font-extrabold tracking-tight text-white shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #ffcf52 0%, #FEB202 55%, #b87a00 100%)",
                      borderRadius: "28% 28% 28% 4%",
                      transform: "rotate(-4deg)",
                    }}
                  >
                    {e.codigo}
                  </span>
                  <span className="max-w-[170px] font-sans text-sm leading-snug font-semibold text-ink">
                    {e.linha1} {e.linha2}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* planejamento como pilar */}
        <div className="mt-12 border-t border-ink-hairline pt-10 md:mt-14 md:pt-12">
          <Reveal>
            <div className="max-w-4xl">
              <p className="font-display text-[0.9rem] font-extrabold tracking-[0.34em] text-accent uppercase">
                Planejamento como pilar
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-snug text-ink">
                O planejamento patrimonial é o ponto de partida de tudo o que fazemos.
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            {/* texto à esquerda */}
            <Reveal className="flex shrink-0 flex-col gap-6 lg:w-[220px] lg:border-r lg:border-ink-hairline lg:pr-10">
              <h2 className="font-display text-3xl font-normal leading-snug text-ink">
                Gestão <span className="font-extrabold">completa</span> feita para você
              </h2>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-light text-accent">
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </span>
            </Reveal>

            {/* itens à direita, com ícone antes do título */}
            <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3 lg:pl-2">
              {pilares.map((p, i) => {
                const Icone = p.icone;
                return (
                  <Reveal key={p.titulo} delay={160 + i * 90}>
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-light text-accent">
                      <Icone className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h4 className="mb-2 font-display text-base font-bold leading-snug text-ink">
                      {p.titulo}
                    </h4>
                    <p className="font-sans text-sm leading-relaxed text-ink-muted">{p.texto}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
