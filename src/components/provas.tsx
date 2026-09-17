import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

type Dado = {
  prefixo: string;
  valor?: number;
  sufixo?: string;
};

const dados: Dado[] = [
  { prefixo: "Unidades em São Luís (MA), Fortaleza (CE) e Recife (PE)" },
  { prefixo: "+ de R$ ", valor: 850, sufixo: " milhões sob custódia" },
  { prefixo: "+ ", valor: 1300, sufixo: " clientes" },
  { prefixo: "+ ", valor: 40, sufixo: " profissionais" },
];

function NumeroAnimado({ valor, ativo }: { valor: number; ativo: boolean }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    let raf = 0;
    const inicio = performance.now();
    const duracao = 1600;
    const tick = (agora: number) => {
      const t = Math.min((agora - inicio) / duracao, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico
      setAtual(Math.round(valor * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ativo, valor]);

  return <>{atual.toLocaleString("pt-BR")}</>;
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
          backgroundImage: "radial-gradient(rgba(35,35,35,0.07) 0.6px, transparent 0.6px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2
            className="font-display mx-auto max-w-[360px] text-center text-[1.7rem] leading-[1.14] font-bold tracking-tight md:text-4xl lg:text-[2.4rem]"
            style={{ color: "#232323" }}
          >
            Nossas unidades 
            e grandes números
          </h2>
        </Reveal>

        {/* desktop / tablet */}
        <div className="relative mt-20 hidden md:grid md:grid-cols-4 md:gap-6 lg:gap-8">
          {dados.map((d, i) => (
            <div key={d.prefixo} className="px-1 text-center">
              <p
                className="font-display text-lg leading-snug font-extrabold tracking-tight md:text-xl"
                style={{
                  color: "#FEB202",
                  opacity: ativo ? 1 : 0,
                  filter: ativo ? "blur(0px)" : "blur(6px)",
                  transition: `opacity 700ms ease-out ${i * 140}ms, filter 700ms ease-out ${i * 140}ms`,
                }}
              >
                {d.prefixo}
                {d.valor !== undefined && <NumeroAnimado valor={d.valor} ativo={ativo} />}
                {d.sufixo}
              </p>
            </div>
          ))}

          {/* régua dourada */}
          <div
            className="relative col-span-4 mt-10 h-px w-full"
            style={{ background: "rgba(35,35,35,0.1)" }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                background: "#FEB202",
                width: ativo ? "100%" : "0%",
                transition: "width 1600ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <div className="absolute inset-x-0 -top-[3px] grid grid-cols-4">
              {dados.map((d, i) => (
                <div key={d.prefixo} className="flex justify-center">
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
          <div className="flex flex-col gap-8">
            {dados.map((d, i) => (
              <div key={d.prefixo} className="relative">
                <span
                  className="absolute top-2 -left-8 block h-[7px] w-[7px] rounded-full"
                  style={{
                    background: "#FEB202",
                    opacity: ativo ? 1 : 0,
                    transition: `opacity 500ms ease-out ${200 + i * 240}ms`,
                  }}
                />
                <p
                  className="font-display text-base leading-snug font-extrabold tracking-tight"
                  style={{
                    color: "#FEB202",
                    opacity: ativo ? 1 : 0,
                    filter: ativo ? "blur(0px)" : "blur(6px)",
                    transition: `opacity 700ms ease-out ${i * 140}ms, filter 700ms ease-out ${i * 140}ms`,
                  }}
                >
                  {d.prefixo}
                  {d.valor !== undefined && <NumeroAnimado valor={d.valor} ativo={ativo} />}
                  {d.sufixo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
