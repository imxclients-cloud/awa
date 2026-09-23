import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { diretoria, type Profissional } from "@/lib/diretoria";

export function Equipe() {
  const [selecionado, setSelecionado] = useState<Profissional | null>(null);
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
                    {p.responsabilidades ? (
                      <button
                        type="button"
                        onClick={() => setSelecionado(p)}
                        className="group mt-auto inline-flex cursor-pointer items-center gap-2 self-start pt-4 font-display text-[0.65rem] font-extrabold tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:text-accent"
                      >
                        Ver responsabilidades
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>
                    ) : null}
                  </div>
                </article>
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

      {/* Modal com as responsabilidades de cada profissional da diretoria */}
      <Dialog
        open={Boolean(selecionado)}
        onOpenChange={(aberto) => {
          if (!aberto) setSelecionado(null);
        }}
      >
        <DialogContent
          className="z-[80] flex max-h-[85vh] w-[calc(100vw-2rem)] max-w-[640px] flex-col gap-0 overflow-hidden rounded-2xl border p-0 sm:rounded-2xl"
          style={{ background: "#151515", borderColor: "rgba(225,222,205,0.14)" }}
        >
          <DialogTitle
            className="font-display border-b py-5 pr-14 pl-6 text-lg font-extrabold tracking-tight"
            style={{ borderColor: "rgba(225,222,205,0.14)" }}
          >
            {selecionado?.nome ?? ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Responsabilidades de {selecionado?.nome ?? "profissional da diretoria"} na A.W.A
            Capital.
          </DialogDescription>
          <p
            className="font-display text-accent border-b px-6 pt-4 pb-5 text-[0.65rem] font-extrabold tracking-[0.16em] uppercase"
            style={{ borderColor: "rgba(225,222,205,0.14)" }}
          >
            {selecionado?.cargo ?? ""} · Responsabilidades
          </p>
          <ol className="max-h-[58vh] overflow-y-auto px-6 py-4">
            {(selecionado?.responsabilidades ?? []).map((r, i) => (
              <li
                key={r}
                className="flex gap-4 border-b py-4 last:border-0"
                style={{ borderColor: "rgba(225,222,205,0.1)" }}
              >
                <span className="font-display text-accent pt-[2px] text-[0.65rem] font-extrabold tracking-[0.16em] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex-1 font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(225,222,205,0.78)" }}
                >
                  {r}
                </span>
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </section>
  );
}
