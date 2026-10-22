import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { ModalFoto } from "@/components/modal-foto";
import { especialistas } from "@/lib/diretoria";

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export function Especialistas() {
  const [fotoAberta, setFotoAberta] = useState<{
    nome: string;
    cargo: string;
    src: string;
  } | null>(null);

  return (
    <>
      <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
          {/* Bloco — Especialistas (4 por linha, apenas nome e função) */}
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
                    className="flex h-full flex-col items-center rounded-2xl border border-ink-hairline bg-white px-5 py-7 text-center cursor-pointer"
                    onClick={() =>
                      e.foto &&
                      setFotoAberta({ nome: e.nome, cargo: e.funcao, src: e.foto })
                    }
                  >
                    <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-glass-on-light">
                      {e.foto ? (
                        <img
                          src={encodeURI(e.foto)}
                          alt={`Foto de ${e.nome}, ${e.funcao} da A.W.A Capital`}
                          loading="lazy"
                          width={112}
                          height={112}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex h-full w-full items-center justify-center font-display text-xl font-extrabold text-ink-muted"
                        >
                          {iniciais(e.nome)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-1 flex-col">
                      <p className="font-display text-base leading-snug font-bold text-ink">{e.nome}</p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-muted">
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

      {/* Modal para ampliar foto — mesmo padrão visual do diálogo "Gerenciar Cookies" */}
      <ModalFoto foto={fotoAberta} onClose={() => setFotoAberta(null)} />
    </>
  );
}
