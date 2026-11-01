import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { CenaFamilias } from "@/components/cenas-fundo";
import type { Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";
import { iconeDoServico } from "@/components/service-icons";

type Props = { data?: Homepage["wealthServices"] | null };



export function WealthServices({ data }: Props) {
  const sectionId = clean(data?.sectionId);
  const services = (data?.services ?? []).filter(Boolean);
  const at = (i: number, field: string) => editAttr(Doc.solucoes, `wealthServices.services[${i}].${field}`);

  return (
    <section
      id={sectionId || undefined}
      className="relative overflow-hidden pt-10 pb-36 md:pt-10 md:pb-44 lg:pt-20 lg:pb-52"
      style={{ background: "linear-gradient(180deg, #F9F9FA 0%, #F1EEE1 45%, #E1DECD 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 55% at 50% 100%, rgba(254,178,2,0.22), rgba(254,178,2,0) 70%)" }} />
      <CenaFamilias />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge data-sanity={editAttr(Doc.solucoes, "wealthServices.badge")}>{data?.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={100}>
            <p data-sanity={editAttr(Doc.solucoes, "wealthServices.subtitle")} className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              {data?.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {services.map((item, i) => {
            const Icone = iconeDoServico(item.icone);
            return (
              <Reveal key={item._key ?? i} delay={100 + i * 70} className="h-full">
                <div className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-ink-hairline bg-white/80 px-5 py-8 text-center backdrop-blur-sm transition-shadow hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icone className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p data-sanity={at(i, "title")} className="font-display text-sm font-bold leading-snug text-ink md:text-[0.95rem]">
                    {item.title}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
