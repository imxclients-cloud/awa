import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { diretoria } from "@/lib/diretoria";

export function Diretores() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge>Nossa equipe</SectionBadge>
        </Reveal>

        {/* Bloco — Diretoria */}
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
                    <p className="font-display text-base leading-snug font-bold text-ink">{p.nome}</p>
                    <p className="mt-1 font-display text-sm font-extrabold tracking-[0.1em] text-accent uppercase">
                      {p.cargo}
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">{p.bio}</p>
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
