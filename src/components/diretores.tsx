import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";

type Props = { data?: Homepage["diretoria"] | null };

// Fotos e textos vêm 100% dos documentos teamMember no CMS.
// Cada campo aponta para o próprio documento, então o Presentation abre o membro certo.
export function Diretores({ data }: Props) {
  // Só categoria "diretoria". Trocar a categoria no cadastro remove daqui automaticamente.
  const members = (data?.members ?? []).filter((m) => {
    if (!m?.name) return false;
    const cat = (m.category || "").toLowerCase();
    // Esconde quem foi movido para outra equipe; mantém legados sem category.
    return !cat || cat === "diretoria";
  });

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge data-sanity={editAttr(Doc.diretoria, "badge")}>{data?.badge}</SectionBadge>
        </Reveal>

        <div className="mt-12 text-left">
          <Reveal delay={140}>
            <h3 data-sanity={editAttr(Doc.diretoria, "title")} className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              {data?.title}
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => {
              const doc = { id: m._id, type: "teamMember" };
              const foto = sanityImageUrl(m.photo, 713);
              const alt = clean((m.photo as { alt?: string } | undefined)?.alt) || `Foto de ${m.name ?? ""}`;
              return (
                <Reveal key={m._id} delay={180 + i * 90} className="h-full">
                  <article
                    data-slot={`profissional-diretoria-${i + 1}`}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-hairline bg-white"
                  >
                    <div
                      className="relative aspect-square w-full overflow-hidden bg-glass-on-light"
                      data-sanity={editAttr(doc, "photo")}
                    >
                      {foto ? (
                        <img src={foto} alt={alt} loading="lazy" width={713} height={713} className="absolute inset-0 h-full w-full object-cover object-top" />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p data-sanity={editAttr(doc, "name")} className="font-display text-base leading-snug font-bold text-ink">
                        {m.name}
                      </p>
                      <p data-sanity={editAttr(doc, "role")} className="mt-1 font-display text-sm font-extrabold tracking-[0.1em] text-accent uppercase">
                        {m.role}
                      </p>
                      {m.bio ? (
                        <p data-sanity={editAttr(doc, "bio")} className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">
                          {m.bio}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
