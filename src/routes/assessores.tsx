import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { assessores } from "@/lib/assessores";

export const Route = createFileRoute("/assessores")({
  head: () => ({
    meta: [
      { title: "Assessores de Investimentos — A.W.A Capital" },
      {
        name: "description",
        content:
          "Listagem completa dos profissionais do time de Assessores de Investimentos da A.W.A Capital, com código de assessor e e-mail de contato.",
      },
      { property: "og:title", content: "Assessores de Investimentos — A.W.A Capital" },
      {
        property: "og:description",
        content: "Conheça o time de Assessores de Investimentos da A.W.A Capital.",
      },
    ],
  }),
  component: Assessores,
});

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

function Assessores() {
  return (
    <main className="min-h-screen bg-surface-light">
      <SiteHeader variant="light" />

      <article className="relative overflow-hidden py-16 pt-32 md:py-20 md:pt-40 lg:py-28">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
          <Reveal>
            <p className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] text-accent uppercase">
              Nossa equipe
            </p>
            <h1 className="font-display mt-4 text-[1.9rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-[2.4rem]">
              Assessores de Investimentos
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
              Listagem completa dos profissionais do time de Assessores de Investimentos da A.W.A
              Capital, em conformidade com as exigências regulatórias.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {assessores.map((a, i) => (
              <Reveal key={a.codigo} delay={(i % 3) * 60}>
                <article
                  data-slot={`assessor-pagina-${i + 1}`}
                  className="flex h-full items-center gap-3 rounded-xl border border-ink-hairline bg-white px-4 py-3"
                >
                  {a.foto ? (
                    <img
                      src={encodeURI(a.foto)}
                      alt={`Foto de ${a.nome}, assessor de investimentos da A.W.A Capital`}
                      loading="lazy"
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full object-cover object-top"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-glass-on-light font-display text-[0.7rem] font-extrabold text-ink-muted"
                    >
                      {iniciais(a.nome)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-sm leading-snug font-bold text-ink">{a.nome}</p>
                    <p className="mt-0.5 font-display text-[0.6rem] font-extrabold tracking-[0.16em] text-accent uppercase">
                      Assessor de Investimentos · {a.codigo}
                    </p>
                    <a
                      href={`mailto:${a.email}`}
                      className="mt-1 block truncate font-sans text-xs text-ink-muted transition-colors duration-300 hover:text-accent"
                    >
                      {a.email}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 border-t border-ink-hairline pt-8">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-sans text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
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
