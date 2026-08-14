import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";


const etapas = [
  {
    n: "01",
    nome: "Conhecer",
    texto:
      "Entendemos seus objetivos, seu patrimônio, sua empresa e o momento que você está vivendo.",
  },
  {
    n: "02",
    nome: "Planejar",
    texto:
      "Estruturamos uma estratégia personalizada e conectada às suas prioridades.",
  },
  {
    n: "03",
    nome: "Implementar",
    texto:
      "Selecionamos e organizamos as soluções mais adequadas para o seu planejamento.",
  },
  {
    n: "04",
    nome: "Acompanhar",
    texto:
      "Monitoramos a estratégia e realizamos ajustes de acordo com a evolução dos seus objetivos.",
  },
];

/** deslocamentos em degraus (desktop) — cada etapa avança e sobe em relação à anterior */
const degraus = [
  "lg:ml-0 lg:w-[54%]",
  "lg:ml-[14%] lg:w-[50%] lg:-mt-6",
  "lg:ml-[30%] lg:w-[52%] lg:-mt-6",
  "lg:ml-[46%] lg:w-[54%] lg:-mt-6",
];

/** progresso do percurso conforme o scroll (0 → 1) */
function useProgressoScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calcular = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const alvo = window.innerHeight * 0.75;
      const bruto = (alvo - r.top) / Math.max(r.height * 0.85, 1);
      setP(Math.min(1, Math.max(0, bruto)));
    };
    const agendar = () => {
      if (!raf) raf = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  return { ref, p };
}

export function ComoFunciona() {
  const { ref, p } = useProgressoScroll();
  const ativo = Math.min(etapas.length, Math.floor(p * (etapas.length + 0.6)));

  return (
    <section
      id="como-funciona"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(35,35,35,0.05) 0.6px, transparent 0.6px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8 md:py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <p
            className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em]"
            style={{ color: "#FEB202" }}
          >
            Como funciona
          </p>
          <h2
            className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.25rem]"
            style={{ color: "#232323" }}
          >
            Uma jornada construída ao seu lado
          </h2>
        </Reveal>

        {/* percurso */}
        <div ref={ref} className="relative mt-16 md:mt-20 lg:mt-24">
          {/* trilha dourada: vertical no mobile/tablet, diagonal em degraus no desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[13px] top-0 w-px lg:left-[calc(13px+2%)]"
            style={{ backgroundColor: "rgba(35,35,35,0.12)" }}
          >
            <div
              className="w-px transition-[height] duration-700 ease-out motion-reduce:transition-none"
              style={{
                height: `${p * 100}%`,
                background:
                  "linear-gradient(180deg, rgba(254,178,2,0.9) 0%, rgba(254,178,2,0.45) 100%)",
              }}
            />
          </div>

          <ol className="space-y-10 md:space-y-12 lg:space-y-0">
            {etapas.map((e, i) => {
              const percorrida = i <= ativo;
              return (
                <li key={e.n} className={`relative pl-12 md:pl-16 ${degraus[i]}`}>
                  {/* nó do percurso */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 grid h-[27px] w-[27px] place-items-center rounded-full transition-all duration-500 lg:left-[2%]"
                    style={{
                      border: `1px solid ${percorrida ? "rgba(254,178,2,0.55)" : "rgba(35,35,35,0.18)"}`,
                      backgroundColor: percorrida
                        ? "rgba(254,178,2,0.12)"
                        : "rgba(35,35,35,0.03)",
                      boxShadow: percorrida
                        ? "0 0 0 6px rgba(254,178,2,0.08)"
                        : "none",
                    }}
                  >
                    <span
                      className="h-[7px] w-[7px] rounded-full transition-colors duration-500"
                      style={{
                        backgroundColor: percorrida
                          ? "#FEB202"
                          : "rgba(35,35,35,0.25)",
                      }}
                    />
                  </span>

                  <Reveal delay={i * 90}>
                    <article
                      className="group rounded-[20px] p-6 transition-all duration-500 hover:-translate-y-1 md:p-8"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.03)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        border: `1px solid ${percorrida ? "rgba(254,178,2,0.3)" : "rgba(35,35,35,0.1)"}`,
                        opacity: percorrida ? 1 : 0.72,
                      }}
                    >
                      <div className="flex items-start gap-5 md:gap-7">
                        <span
                          className="font-display text-4xl font-extrabold leading-none tracking-tight transition-transform duration-500 group-hover:scale-105 md:text-5xl lg:text-6xl"
                          style={{
                            color: "#FEB202",
                            opacity: percorrida ? 1 : 0.5,
                          }}
                        >
                          {e.n}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight md:text-xl"
                            style={{ color: "#232323" }}
                          >
                            <span data-slot={`icon-etapa-${e.n}`} />
                            {e.nome}
                          </h3>
                          <p
                            className="mt-2 max-w-prose font-sans text-[0.95rem] leading-relaxed md:text-base"
                            style={{ color: "rgba(35,35,35,0.75)" }}
                          >
                            {e.texto}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}

            {/* quinto ponto da jornada: o próximo passo */}
            <li className="relative pl-12 md:pl-16 lg:ml-[46%] lg:w-[54%] lg:pt-4">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 grid h-[27px] w-[27px] place-items-center rounded-full lg:left-[2%] lg:top-6"
                style={{
                  border: "1px solid rgba(254,178,2,0.55)",
                  backgroundColor: "#FEB202",
                }}
              >
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ backgroundColor: "#232323" }}
                />
              </span>
              <Reveal delay={120}>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#FEB202", color: "#232323" }}
                >
                  Fale com nosso time!
                </a>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
