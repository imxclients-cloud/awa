import { useEffect, useRef, useState } from "react";
import logoConvivencia from "@/assets/logo-convivencia.png.asset.json";

export function ParceriaXp() {
  const ref = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setAtivo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="parceria-xp"
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ background: "#FFFFFF" }}
    >
      {/* textura de certificado (guilhoché sutil) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(58deg, rgba(35,35,35,0.06) 0 0.5px, transparent 0.5px 9px), repeating-linear-gradient(-58deg, rgba(35,35,35,0.05) 0 0.5px, transparent 0.5px 9px)",
          maskImage: "radial-gradient(46% 52% at 50% 46%, black 0%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(46% 52% at 50% 46%, black 0%, transparent 78%)",
        }}
      />

      <style>{`
        @keyframes awa-selo-stroke { to { stroke-dashoffset: 0; } }
        @keyframes awa-selo-brilho { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center px-5 text-center md:px-8">
        {/* emblema */}
        <div className="relative mb-14 h-[300px] w-full max-w-[420px] md:mb-16 md:h-[260px]">
          <svg
            viewBox="0 0 420 260"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            <circle
              cx="210"
              cy="130"
              r="118"
              stroke="#FEB202"
              strokeWidth="1.2"
              strokeDasharray="742"
              strokeDashoffset={ativo ? undefined : 742}
              style={
                ativo
                  ? { strokeDashoffset: 742, animation: "awa-selo-stroke 1.6s ease-out forwards" }
                  : undefined
              }
            />
            <circle
              cx="210"
              cy="130"
              r="118"
              stroke="#FEB202"
              strokeWidth="2.5"
              strokeDasharray="60 682"
              opacity="0"
              style={ativo ? { animation: "awa-selo-brilho 2s 1.2s ease-out 1" } : undefined}
            />
          </svg>

          <div className="absolute inset-0 mx-auto flex items-center justify-center px-10">
            <img
              data-slot="logo-awa"
              src={logoConvivencia.url}
              alt="A.W.A Capital e XP Investimentos"
              className="h-auto w-full max-w-[180px] md:max-w-[200px]"
              loading="lazy"
            />
          </div>
        </div>

        <h2
          className="font-display text-[1.6rem] leading-[1.18] font-bold tracking-tight md:text-[2.1rem]"
          style={{ color: "#232323" }}
        >
          Estrutura, tecnologia e acesso a um ecossistema completo
        </h2>
        <p
          className="mt-7 max-w-[600px] font-sans text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(35,35,35,0.8)" }}
        >
          A A.W.A Capital é credenciada à XP Investimentos e combina a proximidade de uma assessoria
          personalizada com o acesso a uma das maiores plataformas financeiras do Brasil. Essa
          parceria amplia as possibilidades de construção de estratégias para pessoas, famílias e
          empresas.
        </p>
      </div>
    </section>
  );
}
