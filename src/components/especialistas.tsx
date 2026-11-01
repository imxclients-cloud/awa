import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { ModalFoto } from "@/components/modal-foto";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";

type Props = { data?: Homepage["especialistas"] | null };

const iniciais = (nome: string) =>
  nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

export function Especialistas({ data }: Props) {
  const [fotoAberta, setFotoAberta] = useState<{ nome: string; cargo: string; src: string } | null>(null);

  // Só membros da categoria "especialista" vindos do CMS (assessor e diretoria são ignorados).
  const lista = (data?.members ?? []).filter((m) => {
    const cat = (m.category || "").toLowerCase();
    return Boolean(m.name) && cat !== "assessor" && cat !== "diretoria";
  });

  return (
    <>
      <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div className="text-left">
            <Reveal delay={140}>
              <h3 data-sanity={editAttr(Doc.especialistas, "title")} className="font-display text-sm font-bold tracking-wide text-ink uppercase">
                {data?.title}
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {lista.map((m, i) => {
                const doc = { id: m._id, type: "teamMember" };
                const foto = sanityImageUrl(m.photo, 800);
                const alt = clean((m.photo as { alt?: string } | undefined)?.alt) || `Foto de ${m.name ?? ""}`;
                return (
                  <Reveal key={m._id} delay={180 + (i % 4) * 80} className="h-full">
                    <article
                      data-slot={`especialista-${i + 1}`}
                      className="flex h-full cursor-pointer flex-col items-center rounded-2xl border border-ink-hairline bg-white px-5 py-7 text-center"
                      onClick={() =>
                        foto && setFotoAberta({ nome: m.name ?? "", cargo: m.role ?? "", src: foto })
                      }
                    >
                      <div
                        className="relative size-28 shrink-0 overflow-hidden rounded-full bg-glass-on-light"
                        data-sanity={editAttr(doc, "photo")}
                      >
                        {foto ? (
                          <img src={foto} alt={alt} loading="lazy" width={112} height={112} className="absolute inset-0 h-full w-full object-cover object-top" />
                        ) : (
                          <span aria-hidden className="flex h-full w-full items-center justify-center font-display text-xl font-extrabold text-ink-muted">
                            {iniciais(m.name ?? "")}
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex flex-1 flex-col">
                        <p data-sanity={editAttr(doc, "name")} className="font-display text-base leading-snug font-bold text-ink">
                          {m.name}
                        </p>
                        <p data-sanity={editAttr(doc, "role")} className="mt-1.5 font-sans text-sm leading-relaxed text-ink-muted">
                          {m.role}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ModalFoto foto={fotoAberta} onClose={() => setFotoAberta(null)} />
    </>
  );
}
