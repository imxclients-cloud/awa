import { Reveal } from "@/components/reveal";
import heroImage from "@/assets/hero-banner.png.asset.json";
import mandalaHero from "@/assets/selos/planejamento-patrimonial-hero.svg";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";
import { Doc, sanityAttr } from "@/lib/sanity-attr";

type Props = {
  data?: Homepage["hero"] | null;
};

const FALLBACK_HEADLINE =
  "Soluções completas de planejamento e gestão patrimonial para famílias e empresas.";

export function Hero({ data }: Props) {
  // Preferir sempre o CMS quando existir (stega vem no string)
  const headline = data?.headline?.trim() ? data.headline : FALLBACK_HEADLINE;
  const bgSrc = sanityImageUrl(data?.backgroundImage, 1920) || heroImage.url;
  const sideSrc = sanityImageUrl(data?.sideImage, 966) || mandalaHero;
  const sideAlt =
    (data?.sideImage as { alt?: string } | undefined)?.alt ||
    "Mandala das seis frentes do Planejamento Patrimonial";

  const bgAttr = data?.backgroundImage
    ? sanityAttr(Doc.hero.id, Doc.hero.type, "backgroundImage")
    : undefined;
  const sideAttr = data?.sideImage
    ? sanityAttr(Doc.hero.id, Doc.hero.type, "sideImage")
    : undefined;
  const headlineAttr = data?.headline
    ? sanityAttr(Doc.hero.id, Doc.hero.type, "headline")
    : undefined;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-background">
      <img
        src={bgSrc}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        {...(bgAttr ? { "data-sanity": bgAttr } : {})}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 pt-32 md:px-8 md:pb-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="max-w-xl lg:max-w-2xl">
            <h1
              className="font-display text-[1.6rem] leading-[1.12] font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              {...(headlineAttr ? { "data-sanity": headlineAttr } : {})}
            >
              {headline}
            </h1>
          </div>

          <Reveal delay={160} className="justify-self-center lg:justify-self-end">
            <img
              src={sideSrc}
              alt={sideAlt}
              width={966}
              height={966}
              className="w-full max-w-[300px] drop-shadow-[0_18px_60px_rgba(0,0,0,0.55)] lg:max-w-[clamp(340px,36vw,560px)]"
              loading="lazy"
              decoding="async"
              {...(sideAttr ? { "data-sanity": sideAttr } : {})}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
