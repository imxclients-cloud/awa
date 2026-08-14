import { useEffect, useRef, useState } from "react";
import ctaBg from "@/assets/cta-skyline.jpg";

export function CtaFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = 1 - (r.top + r.height) / (window.innerHeight + r.height);
      setOffset(Math.max(-1, Math.min(1, p)) * 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative isolate flex min-h-[620px] items-center overflow-hidden py-28 md:min-h-[720px] md:py-36"
      style={{ background: "#232323" }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1088}
          className="animate-ken-burns h-full w-full object-cover object-center grayscale"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(rgba(35,35,35,0.88), rgba(35,35,35,0.92)), radial-gradient(60% 50% at 50% 50%, rgba(254,178,2,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div
          className="mx-auto max-w-[680px] rounded-[24px] border p-8 text-center transition-all duration-1000 ease-out sm:p-12 md:p-16"
          style={{
            background: "rgba(225,222,205,0.06)",
            backdropFilter: "blur(22px)",
            borderColor: "rgba(254,178,2,0.3)",
            opacity: visivel ? 1 : 0,
            transform: visivel ? "scale(1)" : "scale(0.96)",
          }}
        >
          <h2
            className="font-display text-[1.85rem] leading-[1.1] font-extrabold tracking-tight md:text-[2.6rem] lg:text-[3rem]"
            style={{ color: "#E1DECD" }}
          >
            O próximo passo começa com uma conversa.
          </h2>
          <p
            className="mx-auto mt-7 max-w-[560px] font-sans text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(225,222,205,0.8)" }}
          >
            Conte para nosso time quais são seus objetivos. Vamos ajudá-lo a encontrar soluções
            financeiras alinhadas ao seu momento, ao seu patrimônio e ao futuro que deseja
            construir.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-opacity duration-300 hover:opacity-90"
              style={{ background: "#FEB202", color: "#232323" }}
            >
              Fale com um especialista
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 font-sans text-sm font-semibold transition-colors duration-300"
              style={{ borderColor: "rgba(225,222,205,0.5)", color: "#E1DECD" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(225,222,205,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Conheça nossas soluções
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
