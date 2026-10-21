import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";

export function GrupoAwa() {
  return (
    <section className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge>Estrutura</SectionBadge>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Grupo A.W.A Capital: um grupo financeiro com três verticais de negócio.
          </h2>
        </Reveal>

        {/* representação visual das três verticais, seguindo a peça de referência */}
        <div className="relative mt-16 md:mt-20">
          {/* ---- desktop / tablet ---- */}
          <div className="mx-auto hidden w-full max-w-[900px] md:block">
            {/* Wealth Services — topo, centralizado sobre as barras */}
            <Reveal delay={140}>
              <div className="mx-auto max-w-[340px] text-center">
                <h3 className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                  Wealth Services
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                  Consultoria com Atendimento Multi Custódia
                  <br />
                  Patrimônio 3MM+
                </p>
              </div>
            </Reveal>

            {/* Investimentos | barras | Empresas — textos encostados nas pontas do triângulo */}
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-5">
              <Reveal delay={210}>
                <div className="pb-2 text-left">
                  <h3 className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                    A.W.A Investimentos
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                    Assessoria em Investimentos XP
                    <br />
                    Patrimônio 100k – 3MM
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <img
                  src="/awa_icone.png"
                  alt="Símbolo das três verticais do Grupo A.W.A Capital"
                  className="h-[210px] w-auto"
                  draggable={false}
                />
              </Reveal>

              <Reveal delay={280}>
                <div className="pb-14 text-left">
                  <h3 className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                    A.W.A Empresas
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                    Soluções financeiras para pessoas jurídicas
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ---- mobile ---- */}
          <div className="flex flex-col gap-8 md:hidden">
            {[
              {
                nome: "Wealth Services",
                linha: "Consultoria com Atendimento Multi Custódia — Patrimônio 3MM+",
              },
              {
                nome: "A.W.A Investimentos",
                linha: "Assessoria em Investimentos XP — Patrimônio 100k a 3MM",
              },
              {
                nome: "A.W.A Empresas",
                linha: "Soluções Financeiras para Pessoas Jurídicas",
              },
            ].map((v, i) => (
              <Reveal key={v.nome} delay={140 + i * 110}>
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 block h-14 w-8 shrink-0 -skew-x-[20deg] rounded-sm bg-accent"
                  />
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-accent">{v.nome}</h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-ink-muted">
                      {v.linha}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
