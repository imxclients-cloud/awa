import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";

type Props = { data?: Homepage["grupoAwa"] | null };

const ICON_DEFAULT = "/awa_icone.png";

export function GrupoAwa({ data }: Props) {
  const p = "grupoAwa.";
  const pillars = (data?.pillars ?? []).filter(Boolean) as Array<{
    _key?: string;
    name?: string;
    description?: string;
  }>;
  const at = (i: number) => (pillars[i]?._key ? `pillars[_key=="${pillars[i]._key}"]` : `pillars[${i}]`);
  const attr = (path: string) => editAttr(Doc.estrutura, p + path);

  const iconSrc = sanityImageUrl(data?.iconImage, 420) || ICON_DEFAULT;
  const iconAlt = clean((data?.iconImage as { alt?: string } | undefined)?.alt);

  const p0 = pillars[0];
  const p1 = pillars[1];
  const p2 = pillars[2];

  return (
    <section className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge data-sanity={attr("badge")}>{data?.badge}</SectionBadge>
        </Reveal>
        <Reveal delay={100}>
          <h2
            data-sanity={attr("title")}
            className="mx-auto mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]"
          >
            {data?.title}
          </h2>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          {/* desktop / tablet */}
          <div className="mx-auto hidden w-full max-w-[900px] md:block">
            <Reveal delay={140}>
              <div className="mx-auto max-w-[340px] text-center">
                <h3 data-sanity={p0 && attr(`${at(0)}.name`)} className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                  {p0?.name}
                </h3>
                <p data-sanity={p0 && attr(`${at(0)}.description`)} className="mt-2 font-sans text-sm leading-relaxed text-ink-muted whitespace-pre-line">
                  {p0?.description}
                </p>
              </div>
            </Reveal>

            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-5">
              <Reveal delay={210}>
                <div className="pb-2 text-left">
                  <h3 data-sanity={p1 && attr(`${at(1)}.name`)} className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                    {p1?.name}
                  </h3>
                  <p data-sanity={p1 && attr(`${at(1)}.description`)} className="mt-2 font-sans text-sm leading-relaxed text-ink-muted whitespace-pre-line">
                    {p1?.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                {/* clicar no ícone abre o objeto imageWithAlt, que contém o campo alt */}
                <img
                  src={iconSrc}
                  alt={iconAlt}
                  className="h-[210px] w-auto"
                  draggable={false}
                  data-sanity={attr("iconImage")}
                />
              </Reveal>

              <Reveal delay={280}>
                <div className="pb-14 text-left">
                  <h3 data-sanity={p2 && attr(`${at(2)}.name`)} className="font-display text-xl font-extrabold text-accent lg:text-2xl">
                    {p2?.name}
                  </h3>
                  <p data-sanity={p2 && attr(`${at(2)}.description`)} className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                    {p2?.description}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* mobile: mesma fonte de dados, sem repetir copy no código */}
          <div className="flex flex-col gap-8 md:hidden">
            {pillars.map((v, i) => (
              <Reveal key={v._key ?? i} delay={140 + i * 110}>
                <div className="flex items-start gap-4">
                  <span aria-hidden className="mt-1 block h-14 w-8 shrink-0 -skew-x-[20deg] rounded-sm bg-accent" />
                  <div>
                    <h3 data-sanity={attr(`${at(i)}.name`)} className="font-display text-lg font-extrabold text-accent">
                      {v.name}
                    </h3>
                    <p data-sanity={attr(`${at(i)}.description`)} className="mt-1 font-sans text-sm leading-relaxed text-ink-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
