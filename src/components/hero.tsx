import { Reveal } from "@/components/reveal";
import heroImage from "@/assets/hero-banner.png.asset.json";
import mandalaHero from "@/assets/selos/planejamento-patrimonial-hero.svg";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-background">
      <img
        src={heroImage.url}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 pt-32 md:px-8 md:pb-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-display text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Oferecemos soluções completas de planejamento e gestão patrimonial para famílias e empresas.
            </h1>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#investimentos"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 font-sans text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover md:text-base"
              >
                Conheça nossas soluções
              </a>
              <a
                href={WHATSAPP_ESPECIALISTA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-accent-hairline bg-glass-light px-6 py-3.5 font-sans text-sm font-semibold text-foreground backdrop-blur-glass transition-colors hover:bg-white/10 md:text-base"
              >
                Fale com um especialista
              </a>
            </div>
          </div>

          {/* mandala do Planejamento Patrimonial — à direita do texto */}
          <Reveal delay={160} className="justify-self-center lg:justify-self-end">
            <img
              src={mandalaHero}
              alt="Mandala das seis frentes do Planejamento Patrimonial: gestão financeira, investimentos, planejamento de aposentadoria, gestão de riscos, planejamento tributário e planejamento sucessório"
              width={966}
              height={966}
              className="w-full max-w-[300px] drop-shadow-[0_18px_60px_rgba(0,0,0,0.55)] lg:max-w-[clamp(340px,36vw,560px)]"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
