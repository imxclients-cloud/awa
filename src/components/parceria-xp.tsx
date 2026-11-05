import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";

type Props = { data?: Homepage["parceriaXp"] | null };


export function ParceriaXp({ data }: Props) {
  const p = "parceriaXp.";
  const attr = (path: string) => editAttr(Doc.investimentos, p + path);
  const sectionId = clean(data?.sectionId);

  const numeros = (data?.numerosXp ?? []).filter(Boolean) as string[];
  const modelos = (data?.modelos ?? []).filter(Boolean) as Array<{
    _key?: string;
    titulo?: string;
    texto?: string;
    destaque?: boolean;
    destaqueLabel?: string;
  }>;
  const highlights = (data?.highlights ?? []).filter(Boolean) as Array<{
    _key?: string;
    title?: string;
    text?: string;
  }>;

  const logoSrc = sanityImageUrl(data?.logo, 320);
  const logoAlt = clean((data?.logo as { alt?: string } | undefined)?.alt);

  return (
    <section
      id={sectionId || undefined}
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative mx-auto mb-10 w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionBadge data-sanity={attr("badge")}>{data?.badge}</SectionBadge>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid overflow-hidden rounded-3xl lg:grid-cols-2" style={{ background: "#F1F0ED" }}>
          <div className="flex flex-col justify-center px-7 py-10 md:px-12 md:py-14">
            {logoSrc && <img
              src={logoSrc}
              alt={logoAlt}
              className="h-16 w-16 rounded-2xl md:h-[76px] md:w-[76px]"
              width={1600}
              height={1600}
              loading="lazy"
              data-sanity={attr("logo")}
            />}
            <h2
              data-sanity={attr("title")}
              className="mt-8 font-display text-[1.55rem] leading-[1.16] font-bold tracking-tight md:text-[2rem]"
              style={{ color: "#232323" }}
            >
              {data?.title}
            </h2>
            {numeros.length > 0 && (
              <ul className="mt-8 list-disc space-y-3 pl-5 font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                {numeros.map((n, i) => (
                  <li key={i} data-sanity={attr(`numerosXp[${i}]`)}>
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative min-h-[300px] lg:min-h-[540px]">
            <img
              src={sanityImageUrl(data?.nasdaqImage, 1200)}
              alt={clean((data?.nasdaqImage as { alt?: string } | undefined)?.alt)}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              data-sanity={attr("nasdaqImage")}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
        <h3
          data-sanity={attr("subtitle")}
          className="mx-auto mt-4 max-w-2xl text-center font-display text-xl font-bold text-ink md:text-2xl"
        >
          {data?.subtitle}
        </h3>
        {highlights.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((d, i) => (
              <div key={d._key ?? i} className="rounded-2xl p-6" style={{ background: "#F1F0ED" }}>
                <span aria-hidden="true" className="block h-1.5 w-6 rounded-full" style={{ background: "#FEB202" }} />
                <h4
                  data-sanity={attr(`highlights[_key=="${d._key}"].title`)}
                  className="mt-4 font-display text-base font-bold text-ink"
                >
                  {d.title}
                </h4>
                <p
                  data-sanity={attr(`highlights[_key=="${d._key}"].text`)}
                  className="mt-2 font-sans text-sm leading-relaxed text-ink-muted"
                >
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {modelos.length > 0 && (
        <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
          <h3
            data-sanity={attr("modelosTitle")}
            className="mx-auto mt-4 max-w-3xl text-center font-display text-xl font-extrabold tracking-[0.06em] text-accent uppercase md:text-2xl"
          >
            {data?.modelosTitle}
          </h3>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {modelos.map((m, i) => {
              const k = m._key ?? String(i);
              return (
                <div
                  key={k}
                  className="relative flex flex-col rounded-[28px] rounded-tl-none p-7 md:p-8"
                  style={{
                    background: m.destaque ? "#FEB202" : "#232323",
                    color: m.destaque ? "#111111" : "#FFFFFF",
                  }}
                >
                  {m.destaque && m.destaqueLabel && (
                    <span
                      data-sanity={attr(`modelos[_key=="${k}"].destaqueLabel`)}
                      className="mb-4 w-fit rounded-full px-3 py-1 font-display text-xs font-bold"
                      style={{ background: "#111111", color: "#FEB202" }}
                    >
                      {m.destaqueLabel}
                    </span>
                  )}
                  <h4 data-sanity={attr(`modelos[_key=="${k}"].titulo`)} className="font-display text-xl font-bold md:text-[1.4rem]">
                    {m.titulo}
                  </h4>
                  <p
                    data-sanity={attr(`modelos[_key=="${k}"].texto`)}
                    className="mt-3 font-sans text-sm leading-relaxed md:text-[0.95rem]"
                    style={{ color: m.destaque ? "rgba(17,17,17,0.82)" : "rgba(255,255,255,0.72)" }}
                  >
                    {m.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
