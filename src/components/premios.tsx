import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import bgMural from "@/assets/background-mural-conquista.png";
import type { Homepage } from "@/lib/sanity";

const selos = [
  { titulo: "S20", texto: "2020: 20 melhores escritórios XP do Brasil com até 2 anos de vida" },
  { titulo: "Melhor do Nordeste", texto: "2021: Selo de melhor escritório do Nordeste" },
  { titulo: "Mesa de RV", texto: "2022: Mesa de Renda Variável entre as 15 melhores do Brasil" },
  { titulo: "Expansão", texto: "2023: 13º escritório XP que mais cresce no Brasil" },
  { titulo: "Governança", texto: "2024 e 2025: Conquista do Selo de Governança e Integridade XP" },
  { titulo: "Satisfação", texto: "2025: Conquista do Selo NPS XP" },
];

/** Separa "2020: texto" em ano e descrição. */
const separar = (texto: string) => {
  const idx = texto.indexOf(":");
  return { ano: texto.slice(0, idx).trim(), corpo: texto.slice(idx + 1).trim() };
};

/** Marca `true` uma vez quando o elemento entra na tela (usado no desktop). */
function useVisivelUmaVez<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visivel };
}

/**
 * Mobile: a seção fica fixa (pin) enquanto a imagem de fundo rola por dentro dela.
 * O progresso do scroll (0 a 1) é devolvido para revelar a linha do tempo.
 * Desktop: sem pin e sem progresso.
 */
function usePinMobile<S extends Element, L extends HTMLElement>() {
  const sectionRef = useRef<S>(null);
  const layerRef = useRef<L>(null);
  const [mobile, setMobile] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    const mq = window.matchMedia("(max-width: 1023px)");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const atualizar = () => {
      frame = 0;
      const ehMobile = mq.matches;
      setMobile(ehMobile);
      if (!ehMobile) {
        layer.style.transform = "";
        setProgresso(1);
        return;
      }
      const vh = window.innerHeight;
      const distancia = section.offsetHeight - vh;
      const rolado = Math.min(distancia, Math.max(0, -section.getBoundingClientRect().top));
      const p = distancia > 0 ? rolado / distancia : 0;
      setProgresso(reduzir.matches ? 1 : p);
      layer.style.transform = reduzir.matches ? "" : `translate3d(0, ${-p * vh * 0.6}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { sectionRef, layerRef, mobile, progresso };
}

type Props = { data?: Homepage["premios"] | null };

export function Premios({ data }: Props) {
  const badge = data?.badge?.trim() || "Mural de conquistas";
  const title = data?.title?.trim() || "Mural de conquistas";
  const awards =
    data?.awards && data.awards.length > 0
      ? data.awards.map((a) => ({
          titulo: a.title || "",
          texto: `${a.year || ""}: ${a.description || ""}`.replace(/^: /, ""),
        }))
      : selos;

  const { ref: timelineRef, visivel } = useVisivelUmaVez<HTMLOListElement>();
  const { sectionRef, layerRef, mobile, progresso } = usePinMobile<HTMLElement, HTMLDivElement>();
  const total = awards.length;

  return (
    // mobile: 220vh de altura para o pin; desktop: altura natural
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-ink [overflow-x:clip] lg:h-auto lg:overflow-hidden lg:py-20"
    >
      {/* área fixa na tela no mobile; no desktop vira bloco normal */}
      <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-6 pb-4 lg:static lg:h-auto lg:overflow-visible lg:py-0">
        <div
          ref={layerRef}
          aria-hidden
          className="absolute inset-x-0 top-0 h-[160vh] bg-cover bg-center bg-no-repeat will-change-transform lg:inset-0 lg:h-full"
          style={{ backgroundImage: `url(${bgMural})` }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/30" />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 text-center md:px-8">
          <Reveal className="flex justify-center">
            <SectionBadge>{title}</SectionBadge>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[1.3rem] leading-[1.14] font-extrabold tracking-tight text-white md:mt-5 md:text-3xl lg:text-[2.2rem]">
              Selos e prêmios que marcam nossa trajetória.
            </h2>
          </Reveal>

          {/* Mobile: vertical, revelada conforme o scroll. Desktop (lg+): horizontal. */}
          <ol
            ref={timelineRef}
            className="relative mx-auto mt-5 max-w-md text-left md:mt-10 lg:mt-14 lg:grid lg:max-w-none lg:grid-cols-6 lg:text-center"
          >
            {/* linha amarela: cresce com o scroll no mobile, desenha no desktop */}
            <span
              aria-hidden
              className="absolute top-[12px] bottom-0 left-[7px] w-[2px] origin-top bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden"
              style={{ transform: `scaleY(${mobile ? progresso : 0})` }}
            />
            <span
              aria-hidden
              className="absolute top-[7px] right-0 left-0 hidden h-[2px] origin-left bg-accent transition-transform duration-[1400ms] ease-out motion-reduce:transition-none lg:block"
              style={{ transform: visivel ? "scaleX(1)" : "scaleX(0)" }}
            />

            {awards.map((s, i) => {
              const { ano, corpo } = separar(s.texto);
              // mobile: cada item aparece quando o scroll passa do seu ponto; desktop: ao entrar na tela
              const limiar = 0.1 + i * (0.8 / (total - 1));
              const aparece = mobile ? progresso >= limiar : visivel;
              return (
                <li
                  key={s.titulo}
                  className="relative pb-3 pl-9 last:pb-0 lg:flex lg:flex-col lg:items-center lg:px-2 lg:pb-0 lg:pl-2"
                >
                  {/* ponto amarelo */}
                  <span
                    aria-hidden
                    className="absolute top-1 left-0 z-10 size-4 rounded-full bg-accent ring-4 ring-black/60 transition-transform duration-500 ease-out motion-reduce:transition-none lg:static lg:mx-auto"
                    style={{
                      transform: aparece ? "scale(1)" : "scale(0)",
                      transitionDelay: mobile ? "0ms" : `${250 + i * 230}ms`,
                    }}
                  />

                  <div
                    className={`w-full transition-all duration-700 ease-out motion-reduce:transition-none lg:mt-6 ${
                      aparece ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: mobile ? "0ms" : `${450 + i * 230}ms` }}
                  >
                    <div className="rounded-xl border border-white/10 bg-glass-dark p-3 backdrop-blur-glass lg:rounded-2xl lg:p-5">
                      <p className="font-sans text-[0.8125rem] leading-snug text-white/85 lg:text-sm lg:leading-relaxed">
                        <span className="mr-1.5 font-display text-[0.9375rem] font-extrabold tracking-tight text-accent lg:mr-0 lg:mb-2 lg:block lg:text-xl">
                          {ano}
                        </span>
                        {corpo}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
