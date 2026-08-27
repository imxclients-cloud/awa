import { Reveal } from "@/components/reveal";

const itens = [
  { n: "01", titulo: "Atendimento próximo e personalizado" },
  { n: "02", titulo: "Visão integrada do patrimônio" },
  { n: "03", titulo: "Estratégias para pessoas e empresas" },
  { n: "04", titulo: "Acompanhamento contínuo" },
  { n: "05", titulo: "Soluções alinhadas a cada perfil" },
  { n: "06", titulo: "Parceria com a XP Investimentos" },
];

/* posições assimétricas da constelação (desktop) — % da área de composição */
const nos = [
  { x: 4, y: 2, escala: "grande" },
  { x: 56, y: 0, escala: "media" },
  { x: 30, y: 26, escala: "grande" },
  { x: 62, y: 42, escala: "grande" },
  { x: 2, y: 55, escala: "media" },
  { x: 38, y: 76, escala: "media" },
] as const;

const largura = { grande: "44%", media: "38%", pequena: "34%" } as const;

/* linhas conectoras entre os nós (índices) */
const ligacoes: Array<[number, number]> = [
  [0, 2],
  [2, 1],
  [1, 3],
  [2, 4],
  [4, 5],
  [5, 3],
];

function centro(i: number) {
  const n = nos[i]!;
  const w = parseFloat(largura[n.escala]);
  return { cx: n.x + w / 2, cy: n.y + 9 };
}

export function Diferencial() {
  return (
    <section
      id="diferencial"
      className="relative isolate overflow-hidden bg-surface-light"
    >
      {/* malha de pontos sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(35,35,35,0.05) 0.6px, transparent 0.6px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8 md:py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* coluna estreita: texto */}
          <div className="lg:col-span-5 lg:pr-6">
            <Reveal>
              <p className="font-display text-[0.7rem] font-bold tracking-[0.28em] text-accent uppercase md:text-xs">
                Direção para decisões que constroem o futuro
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-[1.8rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.6rem]">
                Estratégia começa por entender o que{" "}
                <span className="text-accent">realmente importa</span> para você.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                Antes de recomendar qualquer solução, buscamos compreender sua realidade, seus
                objetivos e a relação que deseja construir com o seu patrimônio.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-5 font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                A partir desse diagnóstico, conectamos conhecimento, planejamento e acompanhamento
                para transformar decisões financeiras em caminhos mais claros.
              </p>
            </Reveal>
          </div>

          {/* composição: constelação (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="relative h-[560px] w-full">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {ligacoes.map(([a, b]) => {
                  const A = centro(a);
                  const B = centro(b);
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={A.cx}
                      y1={A.cy}
                      x2={B.cx}
                      y2={B.cy}
                      stroke="rgba(180,125,0,0.35)"
                      strokeWidth="1"

                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {itens.map((item, i) => {
                const n = nos[i]!;
                return (
                  <Reveal
                    key={item.n}
                    delay={220 + i * 90}
                    className="absolute"
                    style={{ left: `${n.x}%`, top: `${n.y}%`, width: largura[n.escala] }}
                  >
                    <article
                      className={`group rounded-2xl border border-accent-hairline/60 bg-white/60 backdrop-blur-glass transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_50px_-24px_rgba(254,178,2,0.45)] ${
                        n.escala === "grande" ? "p-6" : n.escala === "media" ? "p-5" : "p-4"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xs font-extrabold tracking-[0.16em] text-accent">
                          {item.n}
                        </span>
                        <span
                          data-slot={`icon-diferencial-${item.n}`}
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 rounded-full border border-accent/50 transition-colors duration-500 group-hover:bg-accent/25"
                        />
                        <h3
                        className={`font-display leading-snug font-bold text-ink text-base`}
                        >
                          {item.titulo}
                        </h3>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* composição: espinha vertical (mobile / tablet) */}
          <div className="lg:hidden">
            <div className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[7px] w-px bg-[linear-gradient(to_bottom,rgba(254,178,2,0.5),rgba(254,178,2,0.15))]"
              />
              <ul className="space-y-4">
                {itens.map((item, i) => (
                  <li key={item.n}>
                    <Reveal delay={80 + i * 80}>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute top-6 -left-[26px] h-2.5 w-2.5 rounded-full border border-accent bg-surface-light"
                        />
                        <article
                          className="group rounded-2xl border border-accent-hairline/60 bg-white/60 backdrop-blur-glass transition-all duration-500 active:border-accent/60"
                          style={{
                            padding: i % 3 === 0 ? "1.4rem" : i % 3 === 1 ? "1.15rem" : "0.95rem",
                            marginLeft: `${(i % 3) * 6}px`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-display text-xs font-extrabold tracking-[0.16em] text-accent">
                              {item.n}
                            </span>
                            <span
                              data-slot={`icon-diferencial-${item.n}`}
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 rounded-full border border-accent/50"
                            />
                            <h3
                            className={`font-display leading-snug font-bold text-ink text-base`}
                            >
                              {item.titulo}
                            </h3>
                            </div>
                        </article>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
