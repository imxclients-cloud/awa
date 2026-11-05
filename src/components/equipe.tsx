import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { diretoria, especialistas } from "@/lib/diretoria";

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export function Equipe() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge>Nossa equipe</SectionBadge>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Diretoria, especialistas e assessores de investimentos.
          </h2>
        </Reveal>

        {/* Bloco 1 — Diretoria */}
        <div className="mt-12 text-left">
          <Reveal delay={140}>
            <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              Diretoria
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diretoria.map((p, i) => (
              <Reveal key={p.nome} delay={180 + i * 90} className="h-full">
                <article
                  data-slot={`profissional-diretoria-${i + 1}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-hairline bg-white"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-glass-on-light">
                    <img
                      src={p.foto}
                      alt={`Foto de ${p.nome}, ${p.cargo} da A.W.A Capital`}
                      loading="lazy"
                      width={713}
                      height={713}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-sm leading-snug font-bold text-ink">{p.nome}</p>
                    <p className="mt-1 font-display text-[0.65rem] font-extrabold tracking-[0.16em] text-accent uppercase">
                      {p.cargo}
                    </p>
                    <p className="mt-3 font-sans text-xs leading-relaxed text-ink-muted">{p.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bloco 2 — Especialistas (4 por linha, apenas nome e função) */}
        <div className="mt-16 text-left">
          <Reveal delay={140}>
            <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              Especialistas
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {especialistas.map((e, i) => (
              <Reveal key={e.nome} delay={180 + (i % 4) * 80} className="h-full">
                <article
                  data-slot={`especialista-${i + 1}`}
                  className="flex h-full flex-col items-center rounded-2xl border border-ink-hairline bg-white px-5 py-7 text-center"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-glass-on-light">
                    {e.foto ? (
                      <img
                        src={encodeURI(e.foto)}
                        alt={`Foto de ${e.nome}, ${e.funcao} da A.W.A Capital`}
                        loading="lazy"
                        width={96}
                        height={96}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-full w-full items-center justify-center font-display text-lg font-extrabold text-ink-muted"
                      >
                        {iniciais(e.nome)}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="font-display text-sm leading-snug font-bold text-ink">{e.nome}</p>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink-muted">
                      {e.funcao}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
