import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { CenaEmpresas } from "@/components/cenas-fundo";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";
import type { Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";
import { iconeDoServico } from "@/components/service-icons";

type Props = { data?: Homepage["empresas"] | null };



export function Empresas({ data }: Props) {
  const sectionId = clean(data?.sectionId);
  const services = (data?.services ?? []).filter(Boolean);
  const at = (i: number, field: string) => editAttr(Doc.solucoes, `empresas.services[${i}].${field}`);

  return (
    <section
      id={sectionId || undefined}
      className="relative overflow-hidden pt-10 pb-44 md:pt-10 md:pb-60 lg:pt-20 lg:pb-0"
      style={{ background: "linear-gradient(180deg, #111111 0%, #161616 50%, #232323 100%)" }}
    >
      <CenaEmpresas />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge data-sanity={editAttr(Doc.solucoes, "empresas.badge")}>{data?.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={100}>
            <p data-sanity={editAttr(Doc.solucoes, "empresas.subtitle")} className="mx-auto mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              {data?.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {services.map((m, i) => {
            const Icone = iconeDoServico(m.icone, m.title);
            return (
              <Reveal key={m._key ?? i} delay={100 + (i % 4) * 70} className="h-full">
                <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-lg border border-white/10 bg-glass-dark px-5 py-8 text-center backdrop-blur-glass transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className="grid size-16 shrink-0 place-items-center rounded-lg text-accent"
                    style={{ background: "rgba(254,178,2,0.12)", border: "1px solid rgba(254,178,2,0.35)" }}
                  >
                    <Icone className="size-8" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 data-sanity={at(i, "title")} className="font-display text-sm leading-snug font-bold text-white transition-colors duration-300 group-hover:text-accent md:text-base">
                    {m.title}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>

        {data?.cta?.label && (
          <Reveal delay={200}>
            <div className="mt-12 flex justify-center md:mt-14">
              <a
                href={WHATSAPP_ESPECIALISTA}
                target="_blank"
                rel="noopener noreferrer"
                data-sanity={editAttr(Doc.solucoes, "empresas.cta.label")}
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: "#FEB202", color: "#232323" }}
              >
                {data.cta.label}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
