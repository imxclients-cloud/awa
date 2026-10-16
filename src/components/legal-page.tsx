import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";

export type LegalBlock = { kind: "p"; text: string } | { kind: "list"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

const num = (i: number) => String(i + 1).padStart(2, "0");

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2.5 pl-5 marker:text-accent">
        {block.items.map((item) => (
          <li
            key={item}
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
    <p
      className="font-sans text-[0.95rem] leading-relaxed"
      style={{ color: "rgba(225,222,205,0.72)" }}
    >
      {block.text}
    </p>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updatedAt,
  sections,
  footnote,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
  footnote?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <article className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(254,178,2,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[900px] px-5 md:px-8">
          <Reveal>
            <p className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] text-accent uppercase">
              {eyebrow}
            </p>
            <h1 className="font-display mt-4 text-[1.9rem] leading-[1.1] font-extrabold tracking-tight md:text-[2.4rem]">
              {title}
            </h1>
            <p className="mt-4 font-sans text-xs" style={{ color: "rgba(225,222,205,0.5)" }}>
              Última atualização: {updatedAt}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p
              className="mt-8 font-sans text-base leading-relaxed"
              style={{ color: "rgba(225,222,205,0.78)" }}
            >
              {intro}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <nav aria-label="Sumário" className="mt-10 flex flex-wrap gap-2">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors duration-300 hover:border-accent hover:text-accent"
                  style={{ borderColor: "rgba(225,222,205,0.18)", color: "rgba(225,222,205,0.65)" }}
                >
                  <span className="font-display text-[0.6rem] font-extrabold tracking-[0.16em] tabular-nums">
                    {num(i)}
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 60}>
                <section id={s.id} className="scroll-mt-28">
                  <h2 className="font-display flex items-baseline gap-3 text-lg leading-snug font-bold tracking-tight md:text-xl">
                    <span className="text-[0.7rem] font-extrabold tracking-[0.16em] text-accent tabular-nums">
                      {num(i)}
                    </span>
                    {s.title}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {s.blocks.map((b, bi) => (
                      <Block key={`${s.id}-${bi}`} block={b} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {footnote ? (
            <div
              className="mt-16 border-t pt-8 font-sans text-[0.7rem] leading-relaxed"
              style={{ borderColor: "rgba(225,222,205,0.1)", color: "rgba(225,222,205,0.45)" }}
            >
              {footnote}
            </div>
          ) : null}

          <div className="mt-10 border-t pt-8" style={{ borderColor: "rgba(225,222,205,0.1)" }}>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300 hover:text-accent"
              style={{ color: "rgba(225,222,205,0.7)" }}
            >
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              Voltar ao site
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
      <WhatsappFloat />
    </main>
  );
}
