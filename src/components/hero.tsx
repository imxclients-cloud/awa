import heroImage from "@/assets/hero-banner.png.asset.json";

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
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="font-display text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Soluções financeiras para transformar patrimônio em possibilidades.
          </h1>

          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-foreground/70 md:text-lg">
            Mais do que investimentos, a A.W.A Capital conecta pessoas e empresas a estratégias
            financeiras construídas com conhecimento, proximidade e visão de longo prazo.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 font-sans text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover md:text-base"
            >
              Conheça nossas soluções
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full border border-accent-hairline bg-glass-light px-6 py-3.5 font-sans text-sm font-semibold text-foreground backdrop-blur-glass transition-colors hover:bg-white/10 md:text-base"
            >
              Fale com um especialista.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

