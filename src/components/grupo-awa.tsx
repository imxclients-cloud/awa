import { Reveal } from "@/components/reveal";

export function GrupoAwa() {
  return (
    <section className="relative overflow-hidden bg-surface-light py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
            Estrutura
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Grupo A.W.A Capital: um grupo financeiro com três verticais de negócio.
          </h2>
        </Reveal>

        {/* representação visual das três verticais, seguindo a peça de referência */}
        <div className="relative mt-16 md:mt-20">
          {/* ---- desktop / tablet ---- */}
          <div className="relative hidden min-h-[480px] md:block">
            {/* Wealth Services — topo, centralizado */}
            <Reveal delay={140}>
              <div className="absolute top-0 left-1/2 max-w-[320px] -translate-x-1/2 text-center">
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

            {/* A.W.A Investimentos — lado esquerdo */}
            <Reveal delay={210}>
              <div className="absolute top-[190px] left-0 max-w-[270px] text-left">
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

            {/* A.W.A Empresas — lado direito, um pouco acima do ponto */}
            <Reveal delay={280}>
              <div className="absolute bottom-[90px] top-[190px] right-0 max-w-[270px] text-left lg:right-4">
                <h3 className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                  A.W.A Empresas
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                  Soluções financeiras para pessoas jurídicas
                </p>
              </div>
            </Reveal>

            {/* as três lâminas em diagonal + ponto */}
            <Reveal delay={180}>
              <div className="pointer-events-none absolute top-[150px] left-1/2 flex -translate-x-1/2 items-end gap-6 lg:gap-8">
                <span
                  aria-hidden
                  className="block w-[70px] -skew-x-[20deg] rounded-sm bg-accent lg:w-[86px]"
                  style={{ height: "170px" }}
                />
                <span
                  aria-hidden
                  className="mt-16 block w-[70px] -skew-x-[20deg] rounded-sm bg-accent lg:w-[86px]"
                  style={{ height: "170px" }}
                />
                <span
                  aria-hidden
                  className="mt-28 block w-[70px] -skew-x-[20deg] rounded-sm bg-accent lg:w-[86px]"
                  style={{ height: "170px" }}
                />
                <span aria-hidden className="mb-1 block size-3 rounded-full bg-accent" />
              </div>
            </Reveal>
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
