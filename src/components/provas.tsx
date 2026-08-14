import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

const dados = [
  { valor: "+[xx] anos", legenda: "de experiência no mercado" },
  { valor: "+[xx] clientes", legenda: "atendidos" },
  { valor: "R$ [xx]", legenda: "sob custódia" },
  { valor: "+[xx] profissionais", legenda: "especializados" },
  { valor: "[xx] escritórios", legenda: "em diferentes regiões" },
];

/** Conta de 0 até o número presente no texto; quando o valor é um placeholder
 * como "[xx]", apenas revela suavemente mantendo o texto exato. */
function ValorAnimado({ valor, ativo }: { valor: string; ativo: boolean }) {
  const numero = valor.match(/\d+([.,]\d+)?/);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!ativo || !numero) return;
    const alvo = Number(numero[0].replace(",", "."));
    const inicio = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - inicio) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAtual(alvo * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ativo, numero]);

  const texto =
    numero && ativo
      ? valor.replace(
          numero[0],
          numero[0].includes(",") || numero[0].includes(".")
            ? atual.toFixed(1).replace(".", ",")
            : String(Math.round(atual)),
        )
      : valor;

  return (
    <span
      className="font-display block text-[1.5rem] leading-[1.1] font-extrabold tracking-tight tabular-nums break-words md:text-[1.15rem] lg:text-[1.5rem]"
      style={{
        color: "#FEB202",
        opacity: ativo ? 1 : 0,
        filter: ativo ? "blur(0px)" : "blur(6px)",
        transition: "opacity 900ms ease-out, filter 900ms ease-out",
      }}
    >
      {texto}
    </span>
  );
}

export function Provas() {
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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trajetoria"
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ background: "#FFFFFF" }}
    >
      {/* papel milimetrado sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(35,35,35,0.07) 0.6px, transparent 0.6px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2
            className="font-display mx-auto max-w-[680px] text-center text-[1.7rem] leading-[1.14] font-bold tracking-tight md:text-4xl lg:text-[2.4rem]"
            style={{ color: "#232323" }}
          >
            Uma trajetória construída com confiança
          </h2>
        </Reveal>

        {/* desktop / tablet: linha do tempo horizontal */}
        <div className="relative mt-20 hidden md:block">
          <div className="grid grid-cols-5 items-end gap-4">
            {dados.map((d) => (
              <div key={d.valor} className="px-1 text-center">
                <ValorAnimado valor={d.valor} ativo={ativo} />
                <p
                  className="mt-3 font-sans text-[0.8rem] leading-snug lg:text-sm"
                  style={{
                    color: "rgba(35,35,35,0.7)",
                    opacity: ativo ? 1 : 0,
                    transition: "opacity 900ms ease-out 200ms",
                  }}
                >
                  {d.legenda}
                </p>
              </div>
            ))}
          </div>

          {/* régua dourada */}
          <div className="relative mt-10 h-px w-full" style={{ background: "rgba(35,35,35,0.1)" }}>
            <div
              className="absolute inset-y-0 left-0"
              style={{
                background: "#FEB202",
                width: ativo ? "100%" : "0%",
                transition: "width 1600ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <div className="absolute inset-x-0 -top-[3px] grid grid-cols-5">
              {dados.map((d, i) => (
                <div key={d.valor} className="flex justify-center">
                  <span
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: "#FEB202",
                      opacity: ativo ? 1 : 0,
                      transform: ativo ? "scale(1)" : "scale(0.4)",
                      transition: `opacity 500ms ease-out ${300 + i * 260}ms, transform 500ms ease-out ${300 + i * 260}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* mobile: linha do tempo vertical */}
        <div className="relative mt-14 pl-8 md:hidden">
          <div
            className="absolute top-1 left-[3px] w-px"
            style={{
              background: "#FEB202",
              height: ativo ? "100%" : "0%",
              transition: "height 1600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          <div className="flex flex-col gap-10">
            {dados.map((d, i) => (
              <div key={d.valor} className="relative">
                <span
                  className="absolute top-2 -left-8 block h-[7px] w-[7px] rounded-full"
                  style={{
                    background: "#FEB202",
                    opacity: ativo ? 1 : 0,
                    transition: `opacity 500ms ease-out ${200 + i * 240}ms`,
                  }}
                />
                <ValorAnimado valor={d.valor} ativo={ativo} />
                <p
                  className="mt-2 font-sans text-sm"
                  style={{ color: "rgba(35,35,35,0.7)" }}
                >
                  {d.legenda}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
