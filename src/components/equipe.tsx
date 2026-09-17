import { Reveal } from "@/components/reveal";

export function Equipe() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
            Nossa equipe
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Diretoria, especialistas e assessores de investimentos.
          </h2>
        </Reveal>

        {/* Bloco 1 — Diretoria e Especialistas */}
        <div className="mt-12">
          <Reveal delay={140}>
            <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              Diretoria e Especialistas
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Reveal key={i} delay={180 + i * 90}>
                <div className="rounded-2xl border border-ink-hairline p-5">
                  <div
                    className="aspect-square w-full rounded-xl bg-glass-on-light"
                    data-slot={`foto-diretoria-${i}`}
                    aria-label="Foto do profissional (a definir)"
                  />
                  <p className="mt-4 font-display text-sm font-bold text-ink">Nome do profissional</p>
                  <p className="font-sans text-xs text-ink-muted">Cargo</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-muted">
                    Minibio a ser fornecida pelo cliente.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bloco 2 — Assessores de Investimentos */}
        <div className="mt-16">
          <Reveal delay={140}>
            <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              Assessores de Investimentos
            </h3>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink-muted">
              Listagem completa dos profissionais do time de Assessores de Investimentos da A.W.A
              Capital, em conformidade com as exigências regulatórias.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-ink-hairline px-4 py-3"
                >
                  <span
                    aria-hidden
                    className="size-9 shrink-0 rounded-full bg-glass-on-light"
                    data-slot={`avatar-assessor-${i}`}
                  />
                  <span className="font-sans text-sm text-ink-muted">
                    Nome do assessor (lista a confirmar)
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
