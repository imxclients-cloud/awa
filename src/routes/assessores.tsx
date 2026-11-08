import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { ModalFoto } from "@/components/modal-foto";
import { sanityImageUrl } from "@/lib/sanity";
import { clean, editAttr } from "@/lib/sanity-attr";
import { loadAssessores, type AssessorDoc, type PageAssessores } from "@/lib/page-data.server";

export const Route = createFileRoute("/assessores")({
  loader: () => loadAssessores(),
  head: ({ loaderData }) => {
    const page = loaderData?.page as PageAssessores;
    const title = page?.seoTitle ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: page?.seoDescription ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: page?.seoDescription ?? "" },
      ],
    };
  },
  component: Assessores,
});

const DOC_PAGE = { id: "page-assessores", type: "pageAssessores" };

/** Região do assessor (campo unidade no CMS). Fallback: trecho após "—" no cargo. */
const unidadeDe = (a: { unidade?: string; role?: string }) => {
  const u = clean(a.unidade);
  if (u) return u;
  const parte = clean(a.role).split("—").pop()?.trim();
  return parte || "Sem unidade";
};

const iniciais = (nome: string) =>
  nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

function Assessores() {
  const { assessores, page, settings } = Route.useLoaderData();
  const [fotoAberta, setFotoAberta] = useState<{ nome: string; cargo: string; src: string } | null>(null);

  const porUnidade = new Map<string, AssessorDoc[]>();
  for (const a of assessores as AssessorDoc[]) {
    const u = unidadeDe(a);
    porUnidade.set(u, [...(porUnidade.get(u) ?? []), a]);
  }
  // Dentro de cada região: A–Z por nome
  for (const [u, list] of porUnidade) {
    list.sort((a, b) => clean(a.name).localeCompare(clean(b.name), "pt-BR"));
    porUnidade.set(u, list);
  }
  const unidades = [...porUnidade.keys()].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const at = (path: string) => editAttr(DOC_PAGE, path);

  return (
    <main className="min-h-screen bg-surface-light">
      <SiteHeader variant="light" settings={settings} />
      <article className="relative overflow-hidden py-10 pt-32 md:py-10 md:pt-40 lg:py-20">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
          <Reveal className="flex justify-center">
            <SectionBadge data-sanity={at("badge")}>{page?.badge}</SectionBadge>
          </Reveal>

          {unidades.map((unidade, bloco) => {
            const membros = porUnidade.get(unidade) ?? [];
            return (
              <div key={unidade} className="mt-12">
                <Reveal delay={bloco * 80}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-hairline pb-3">
                    <h2 className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl">{unidade}</h2>
                  </div>
                </Reveal>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {membros.map((a, i) => {
                    const doc = { id: a._id, type: "teamMember" };
                    const fotoThumb = sanityImageUrl(a.photo as Parameters<typeof sanityImageUrl>[0], 80);
                    const fotoGrande = sanityImageUrl(a.photo as Parameters<typeof sanityImageUrl>[0], 800);
                    const nome = clean(a.name);
                    const email = clean(a.email);
                    return (
                      <Reveal key={a._id} delay={(i % 3) * 60}>
                        <article
                          data-slot={`assessor-pagina-${a.codigo ?? i}`}
                          className="flex h-full cursor-pointer items-center gap-3 rounded-xl border border-ink-hairline bg-white px-4 py-3"
                          onClick={() =>
                            fotoGrande &&
                            setFotoAberta({
                              nome,
                              cargo: clean(a.role) || clean(a.bio) || "",
                              src: fotoGrande,
                            })
                          }
                        >
                          <div className="shrink-0" data-sanity={editAttr(doc, "photo")}>
                            {fotoThumb ? (
                              <img
                                src={fotoThumb}
                                alt={clean((a.photo as { alt?: string } | undefined)?.alt) || `Foto de ${nome}`}
                                loading="lazy"
                                width={40}
                                height={40}
                                className="size-10 rounded-full object-cover object-top"
                              />
                            ) : (
                              <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-glass-on-light font-display text-[0.7rem] font-extrabold">
                                {iniciais(nome)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p data-sanity={editAttr(doc, "name")} className="font-display text-sm leading-snug font-bold text-ink">
                              {a.name}
                            </p>
                            <p data-sanity={editAttr(doc, "role")} className="mt-0.5 font-display text-[0.6rem] font-extrabold tracking-[0.16em] text-accent uppercase">
                              {clean(a.role) || (a.codigo ? `Código de registro: ${a.codigo}` : "")}
                            </p>
                            {a.codigo ? (
                              <p data-sanity={editAttr(doc, "codigo")} className="mt-0.5 font-sans text-[0.65rem] text-ink-muted">
                                Código: {a.codigo}
                              </p>
                            ) : null}
                            <a
                              href={`mailto:${email}`}
                              data-sanity={editAttr(doc, "email")}
                              className="mt-1 block truncate font-sans text-xs text-ink-muted transition-colors duration-300 hover:text-accent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {a.email}
                            </a>
                          </div>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mt-12 border-t border-ink-hairline pt-8">
            <Link to="/" className="group inline-flex items-center gap-2 font-sans text-sm text-ink-muted transition-colors duration-300 hover:text-accent">
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span data-sanity={at("backLabel")}>{page?.backLabel}</span>
            </Link>
          </div>
        </div>
      </article>

      <ModalFoto foto={fotoAberta} onClose={() => setFotoAberta(null)} />
      <SiteFooter settings={settings} />
      <WhatsappFloat settings={settings} />
    </main>
  );
}
