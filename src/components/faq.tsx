import { useState } from "react";
import { Reveal } from "@/components/reveal";

const perguntas = [
  "O que mudou com a nova A.W.A Capital?",
  "A A.W.A Capital continua sendo credenciada à XP?",
  "Quais soluções a A.W.A oferece?",
  "Quem pode ser cliente da A.W.A Capital?",
  "Como funciona a assessoria personalizada?",
  "O que é o Wealth Services?",
  "A A.W.A atende empresas?",
  "Como funciona o modelo de remuneração?",
  "Posso manter investimentos em diferentes instituições?",
  "Como começo meu planejamento?",
];

const num = (i: number) => String(i + 1).padStart(2, "0");

export function Faq() {
  const [ativo, setAtivo] = useState(0);
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ background: "#232323" }}
    >
      {/* vinheta radial sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(254,178,2,0.07) 0%, transparent 70%), radial-gradient(90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-8">
        {/* desktop: sumário interativo */}
        <div className="hidden gap-14 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2
                  className="font-display text-[1.9rem] leading-[1.1] font-extrabold tracking-tight lg:text-[2.4rem]"
                  style={{ color: "#E1DECD" }}
                >
                  Perguntas frequentes
                </h2>
              </Reveal>
              <ul className="mt-10 flex flex-col">
                {perguntas.map((p, i) => {
                  const on = i === ativo;
                  return (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => setAtivo(i)}
                        className="group relative flex w-full items-start gap-4 py-3 pl-5 text-left transition-colors duration-300"
                      >
                        <span
                          aria-hidden
                          className="absolute top-3 bottom-3 left-0 w-[2px] origin-top transition-transform duration-500"
                          style={{
                            background: "#FEB202",
                            transform: on ? "scaleY(1)" : "scaleY(0)",
                          }}
                        />
                        <span
                          className="font-display pt-[3px] text-[0.7rem] font-extrabold tracking-[0.16em] tabular-nums"
                          style={{ color: on ? "#FEB202" : "rgba(254,178,2,0.5)" }}
                        >
                          {num(i)}
                        </span>
                        <span
                          className="font-sans text-[0.95rem] leading-snug transition-all duration-300"
                          style={{
                            color: on ? "#E1DECD" : "rgba(225,222,205,0.6)",
                            fontWeight: on ? 600 : 400,
                          }}
                        >
                          {p}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div
                key={ativo}
                className="animate-fade-in rounded-[20px] border p-10"
                style={{
                  background: "rgba(225,222,205,0.05)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(254,178,2,0.28)",
                }}
              >
                <span
                  className="font-display text-[0.7rem] font-extrabold tracking-[0.3em] uppercase"
                  style={{ color: "#FEB202" }}
                >
                  {num(ativo)}
                </span>
                <h3
                  className="font-display mt-5 text-xl leading-snug font-bold tracking-tight lg:text-2xl"
                  style={{ color: "#E1DECD" }}
                >
                  {perguntas[ativo]}
                </h3>
                <p
                  className="mt-6 font-sans text-base leading-relaxed"
                  style={{ color: "rgba(225,222,205,0.85)" }}
                >
                  [resposta a definir]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* mobile / tablet: accordion numerado */}
        <div className="lg:hidden">
          <Reveal>
            <h2
              className="font-display text-[1.7rem] leading-[1.1] font-extrabold tracking-tight md:text-[2.1rem]"
              style={{ color: "#E1DECD" }}
            >
              Perguntas frequentes
            </h2>
          </Reveal>
          <ul className="mt-10 flex flex-col">
            {perguntas.map((p, i) => {
              const on = aberto === i;
              return (
                <li
                  key={p}
                  className="border-b"
                  style={{ borderColor: "rgba(225,222,205,0.12)" }}
                >
                  <button
                    type="button"
                    onClick={() => setAberto(on ? null : i)}
                    className="flex w-full items-start gap-4 py-5 text-left"
                    aria-expanded={on}
                  >
                    <span
                      className="font-display pt-[2px] text-[0.7rem] font-extrabold tracking-[0.16em] tabular-nums"
                      style={{ color: "#FEB202" }}
                    >
                      {num(i)}
                    </span>
                    <span
                      className="flex-1 font-sans text-[0.95rem] leading-snug"
                      style={{ color: "#E1DECD", fontWeight: on ? 600 : 400 }}
                    >
                      {p}
                    </span>
                    <span
                      data-slot="icon-toggle"
                      aria-hidden
                      className="font-display pt-[2px] text-sm"
                      style={{ color: "#FEB202" }}
                    >
                      {on ? "–" : "+"}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: on ? 200 : 0,
                      opacity: on ? 1 : 0,
                    }}
                  >
                    <p
                      className="pb-6 pl-9 font-sans text-sm leading-relaxed"
                      style={{ color: "rgba(225,222,205,0.85)" }}
                    >
                      [resposta a definir]
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
