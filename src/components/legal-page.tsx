import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import type { SiteSettings } from "@/lib/sanity";
import type { LegalDoc, LegalSection, LegalBlock } from "@/lib/page-data.server";
import { clean, editAttr } from "@/lib/sanity-attr";

const num = (i: number) => String(i + 1).padStart(2, "0");

const DOC_TYPE = "legalPage";

function Block({ block, docId, sectionKey }: { block: LegalBlock; docId: string; sectionKey: string }) {
  const at = (path: string) =>
    editAttr({ id: docId, type: DOC_TYPE }, `sections[_key=="${sectionKey}"].blocks[_key=="${block._key}"].${path}`);

  if (block.kind === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2.5 pl-5 marker:text-accent">
        {(block.items ?? []).map((item, i) => (
          <li
            key={i}
            data-sanity={at(`items[${i}]`)}
            className="font-sans text-[0.95rem] leading-relaxed"
            style={{ color: "rgba(225,222,205,0.72)" }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p data-sanity={at("text")} className="font-sans text-[0.95rem] leading-relaxed" style={{ color: "rgba(225,222,205,0.72)" }}>
      {block.text}
    </p>
  );
}

export function LegalPage({ doc, settings }: { doc: LegalDoc | null; settings?: SiteSettings | null }) {
  const id = doc?._id ?? "";
  const at = (path: string) => editAttr({ id, type: DOC_TYPE }, path);
  const sections: LegalSection[] = doc?.sections ?? [];

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />

      {doc && (
        <article className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
            style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(254,178,2,0.1) 0%, transparent 70%)" }}
          />

          <div className="relative mx-auto w-full max-w-[900px] px-5 md:px-8">
            <Reveal>
              <p data-sanity={at("eyebrow")} className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] text-accent uppercase">
                {doc.eyebrow}
              </p>
              <h1 data-sanity={at("title")} className="font-display mt-4 text-[1.9rem] leading-[1.1] font-extrabold tracking-tight md:text-[2.4rem]">
                {doc.title}
              </h1>
              <p className="mt-4 font-sans text-xs" style={{ color: "rgba(225,222,205,0.5)" }}>
                <span data-sanity={at("updatedLabel")}>{doc.updatedLabel}</span>{" "}
                <span data-sanity={at("updatedAt")}>{doc.updatedAt}</span>
              </p>
            </Reveal>

            {doc.intro ? (
              <Reveal delay={80}>
                <p data-sanity={at("intro")} className="mt-8 font-sans text-base leading-relaxed" style={{ color: "rgba(225,222,205,0.78)" }}>
                  {doc.intro}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={140}>
              <nav aria-label="Sumário" className="mt-10 flex flex-wrap gap-2">
                {sections.map((s, i) => (
                  <a
                    key={s._key}
                    href={`#${clean(s.id)}`}
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors duration-300 hover:border-accent hover:text-accent"
                    style={{ borderColor: "rgba(225,222,205,0.18)", color: "rgba(225,222,205,0.65)" }}
                  >
                    <span className="font-display text-[0.6rem] font-extrabold tracking-[0.16em] tabular-nums">{num(i)}</span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </Reveal>

            <div className="mt-14 flex flex-col gap-12">
              {sections.map((s, i) => (
                <Reveal key={s._key} delay={(i % 3) * 60}>
                  <section id={clean(s.id) || undefined} className="scroll-mt-28">
                    <h2
                      data-sanity={editAttr({ id, type: DOC_TYPE }, `sections[_key=="${s._key}"].title`)}
                      className="font-display flex items-baseline gap-3 text-lg leading-snug font-bold tracking-tight md:text-xl"
                    >
                      <span className="text-[0.7rem] font-extrabold tracking-[0.16em] text-accent tabular-nums">{num(i)}</span>
                      {s.title}
                    </h2>
                    <div className="mt-5 flex flex-col gap-4">
                      {(s.blocks ?? []).map((b) => (
                        <Block key={b._key} block={b} docId={id} sectionKey={s._key} />
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            {doc.footnote ? (
              <div
                data-sanity={at("footnote")}
                className="mt-16 border-t pt-8 font-sans text-[0.7rem] leading-relaxed"
                style={{ borderColor: "rgba(225,222,205,0.1)", color: "rgba(225,222,205,0.45)" }}
              >
                {doc.footnote}
              </div>
            ) : null}

            <div className="mt-10 border-t pt-8" style={{ borderColor: "rgba(225,222,205,0.1)" }}>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300 hover:text-accent"
                style={{ color: "rgba(225,222,205,0.7)" }}
              >
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                <span data-sanity={at("backLabel")}>{doc.backLabel}</span>
              </Link>
            </div>
          </div>
        </article>
      )}

      <SiteFooter settings={settings} />
      <WhatsappFloat settings={settings} />
    </main>
  );
}
