import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";

type Item = {
  prefixo: string;
  valor?: number;
  sufixo?: string;
};

const itens: Item[] = [
  { prefixo: "Unidades em São Luís (MA), Fortaleza (CE) e Recife (PE);" },
  { prefixo: "+ R$ ", valor: 850, sufixo: " milhões sob custódia;" },
  { prefixo: "+ ", valor: 1300, sufixo: " clientes;" },
  { prefixo: "+ ", valor: 40, sufixo: " profissionais." },
];

function NumeroAnimado({ valor, ativo }: { valor: number; ativo: boolean }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    let raf = 0;
    const inicio = performance.now();
    const duracao = 2200;
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

const CIDADES = ["São Luís", "Fortaleza", "Recife"];
const regexCidades = new RegExp(`(${CIDADES.join("|")})`, "g");

function TextoComCidades({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(regexCidades).map((parte, i) =>
        CIDADES.includes(parte) ? (
          <strong key={i} className="font-extrabold text-accent">
            {parte}
          </strong>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </>
  );
}

function ItemResumo({ item, ativo, indice }: { item: Item; ativo: boolean; indice: number }) {
  const anim = {
    opacity: ativo ? 1 : 0,
    transform: ativo ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 1000ms ease-out ${indice * 180}ms, transform 1000ms ease-out ${indice * 180}ms`,
  };

  return (
    <li className="flex items-start gap-4" style={anim}>
      <span
        aria-hidden
        className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full md:size-7"
        style={{ background: "#FEB202" }}
      >
        <Check className="size-3.5 md:size-4" strokeWidth={3.5} color="#FFFFFF" />
      </span>
      <p
        className="font-sans text-[1.05rem] leading-relaxed font-medium md:text-lg"
        style={{ color: "#232323" }}
      >
        <TextoComCidades texto={item.prefixo} />
        {item.valor !== undefined && (
          <strong
            className="font-display font-extrabold tracking-tight tabular-nums text-accent"
            style={{ fontSize: "1.4em", lineHeight: 1 }}
          >
            <NumeroAnimado valor={item.valor} ativo={ativo} />
          </strong>
        )}
        {item.sufixo !== undefined && <span>{item.sufixo}</span>}
      </p>
    </li>
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
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trajetoria"
      ref={ref}
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge>Trajetória</SectionBadge>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mx-auto mt-5 max-w-2xl font-display text-[1.7rem] leading-[1.14] font-bold tracking-tight md:text-4xl lg:text-[2.4rem]"
            style={{ color: "#232323" }}
          >
            Um resumo da A.W.A Capital
          </h2>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 text-left md:gap-12 lg:mt-14 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <img
              src="/brazil-map.png"
              alt="Mapa do Brasil com destaque para as unidades em São Luís (MA), Fortaleza (CE) e Recife (PE)"
              className="h-auto w-full max-w-[620px] select-none"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <ul className="flex flex-col gap-6 md:gap-8">
            {itens.map((item, i) => (
              <ItemResumo key={item.prefixo} item={item} ativo={ativo} indice={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
