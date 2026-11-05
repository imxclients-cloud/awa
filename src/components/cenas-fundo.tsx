import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import {
  ARVORES,
  CASA,
  CASAS_ALTURA,
  CASAS_FUNDO,
  CASAS_LARGURA,
  CHAO,
  FAMILIA,
  OURO,
  SKYLINE_ALTURA,
  SKYLINE_LARGURA,
  gerarSkyline,
  type Predio,
} from "@/lib/cenas-geometria";

/**
 * Cenas de fundo das seções "Famílias" e "Empresas".
 *
 * - Paralaxe: as camadas se deslocam em velocidades diferentes conforme o scroll.
 * - Famílias: o dia vira crepúsculo e noite conforme a cena sobe na tela, e as
 *   luzes das casas acendem.
 * - Empresas: as luzes dos prédios acendem e apagam aleatoriamente.
 *
 * Tudo é escrito direto no DOM (variáveis CSS e transform) dentro de um
 * requestAnimationFrame, sem re-renderizar o React a cada rolagem.
 */

const limitar = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (x: number) => {
  const k = limitar(x);
  return k * k * (3 - 2 * k);
};

/** Acompanha a passagem da cena pela tela: u = 0..1 (entra → sai), t = 0..1 (progresso do anoitecer). */
function usePassagem<T extends Element>(
  ref: RefObject<T | null>,
  aoQuadro: (u: number, t: number) => void,
) {
  const cb = useRef(aoQuadro);
  cb.current = aoQuadro;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const atualizar = () => {
      frame = 0;
      if (reduzir.matches) {
        cb.current(0.5, 0.85);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const u = limitar((vh - r.top) / (vh + r.height));
      const t = limitar((vh - r.top) / (vh * 0.62));
      cb.current(u, t);
    };
    const pedir = () => {
      if (!frame) frame = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

function useVisivel<T extends Element>() {
  const ref = useRef<T>(null);
  const aoVivo = useRef(false);
  const [jaVisivel, setJaVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        aoVivo.current = e.isIntersecting;
        if (e.isIntersecting) setJaVisivel(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, aoVivo, jaVisivel };
}

const mover = (el: SVGGElement | null, dx: number, dy: number) => {
  if (el) el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
};

/* ------------------------------ EMPRESAS ------------------------------ */

const SKYLINE = gerarSkyline();

function PredioSvg({ predio, cor, apagada }: { predio: Predio; cor: string; apagada: string }) {
  const { corpo, coroa, apagadas, andares } = predio;
  return (
    <g>
      <rect x={corpo.x} y={corpo.y} width={corpo.w} height={corpo.h + 90} fill={cor} />
      {coroa.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={c.h + 1} fill={cor} />
      ))}
      <path d={apagadas} fill={apagada} />
      {andares.map((a) => (
        <path
          key={a.d.slice(0, 24)}
          className="luz"
          data-on="1"
          d={a.d}
          fill={a.cor}
          fillOpacity={a.opacidade}
          style={{ transitionDelay: `${a.delay.toFixed(2)}s` }}
        />
      ))}
    </g>
  );
}

export function CenaEmpresas() {
  const { ref, aoVivo, jaVisivel } = useVisivel<HTMLDivElement>();
  const brilhoRef = useRef<SVGGElement>(null);
  const fundoRef = useRef<SVGGElement>(null);
  const frenteRef = useRef<SVGGElement>(null);

  // paralaxe: o fundo anda mais devagar que a página, a frente um pouco mais rápido
  usePassagem(ref, (u) => {
    const d = u - 0.5;
    mover(brilhoRef.current, 0, d * 90);
    mover(fundoRef.current, d * -44, d * 74);
    mover(frenteRef.current, 0, d * -26);
  });

  // Luzes dos prédios: looping contínuo de acender/apagar bem visível.
    // As luzes acendem e apagam em ondas, criando um efeito de "prédios vivos".
  useEffect(() => {
    if (!jaVisivel) return;
    const el = ref.current;
    if (!el) return;
    const luzes = Array.from(el.querySelectorAll<SVGPathElement>(".luz"));
    if (!luzes.length) return;

    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      luzes.forEach((l) => {
        l.style.transitionDelay = "0s";
        l.dataset["on"] = reduzirMovimento ? "1" : "0";
      });
      if (reduzirMovimento) return;

      let intervalo = 0;
      const totalLuzes = luzes.length;
      const minAcesas = Math.ceil(totalLuzes * 0.7); // mínimo 70% acesas
      const maxApagadas = Math.floor(totalLuzes * 0.2); // máximo 20% apagadas (80% acesas)
      const targetInicial = Math.ceil(totalLuzes * 0.6); // ~60% inicial

      // Inicializa: ~60% aleatórias acesas, resto apagadas
            const indices = Array.from({ length: totalLuzes }, (_, i) => i);
            // Embaralha usando sort aleatório (mais simples e sem erros TS)
            indices.sort(() => Math.random() - 0.5);
            // Usa um Set para os índices que devem ficar acesos (mais eficiente)
            const acesosSet = new Set(indices.slice(0, targetInicial));
            luzes.forEach((l, idx) => {
              l.dataset["on"] = acesosSet.has(idx) ? "1" : "0";
            });

      let fase = 0; // 0 = acendendo (hacia 80-100%), 1 = apagando (hacia 70%)

      // Loop principal: mantém entre 70% e 80-100% acesas
      intervalo = window.setInterval(() => {
        if (!aoVivo.current) return;

        const acesas = luzes.filter((l) => l.dataset["on"] === "1").length;
        const apagadas = totalLuzes - acesas;

        if (fase === 0) {
          // FASE ACENDER: acende luzes até chegar em ~80-100% (máx 20% apagadas)
          if (apagadas <= maxApagadas) {
                    // Chegou no limite superior - muda para apagar
                    fase = 1;
                    return;
          }
          // Acende 2-4 luzes aleatórias que estão apagadas
          const qtdAcender = Math.min(2 + Math.floor(Math.random() * 3), apagadas);
          const luzesApagadas = luzes.filter((l) => l.dataset["on"] === "0");
          for (let i = 0; i < qtdAcender; i++) {
                    const idx = Math.floor(Math.random() * luzesApagadas.length);
                    const luz = luzesApagadas[idx];
                    if (luz) luz.dataset["on"] = "1";
                    luzesApagadas.splice(idx, 1);
          }
        } else {
          // FASE APAGAR: apaga luzes até chegar em ~70% (mínimo 70% acesas)
          if (acesas <= minAcesas) {
                    // Chegou no limite inferior - muda para acender
                    fase = 0;
                    return;
          }
          // Apaga 1-3 luzes aleatórias que estão acesas (menos apagadas por vez)
          const qtdApagar = Math.min(1 + Math.floor(Math.random() * 3), acesas - minAcesas);
          const luzesAcesasArr = luzes.filter((l) => l.dataset["on"] === "1");
          for (let i = 0; i < qtdApagar; i++) {
                    const idx = Math.floor(Math.random() * luzesAcesasArr.length);
                    const luz = luzesAcesasArr[idx];
                    if (luz) luz.dataset["on"] = "0";
                    luzesAcesasArr.splice(idx, 1);
          }
        }

        // Pequena chance de inverter fase para variação natural (10%)
        if (Math.random() < 0.1) {
          fase = fase === 0 ? 1 : 0;
        }
      }, 500); // Intervalo para animação suave

      return () => {
        window.clearInterval(intervalo);
      };
    }, [jaVisivel, ref, aoVivo]);

  return (
    <div
      ref={ref}
      aria-hidden
      data-acesa={jaVisivel}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-60 md:h-80 lg:h-[26rem]"
    >
      <svg
        viewBox={`0 0 ${SKYLINE_LARGURA} ${SKYLINE_ALTURA}`}
        preserveAspectRatio="xMidYMax slice"
        className="block h-full w-full"
      >
        <defs>
          <radialGradient id="empresas-horizonte" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={OURO} stopOpacity="0.2" />
            <stop offset="100%" stopColor={OURO} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g ref={brilhoRef}>
          <rect
            x={-100}
            y={-120}
            width={SKYLINE_LARGURA + 200}
            height={SKYLINE_ALTURA + 240}
            fill="url(#empresas-horizonte)"
          />
        </g>
        <g ref={fundoRef}>
          {SKYLINE.fundo.map((p) => (
            <PredioSvg key={`f-${p.corpo.x}`} predio={p} cor="#1B1B1B" apagada="#222222" />
          ))}
        </g>
        <g ref={frenteRef}>
          {SKYLINE.frente.map((p) => (
            <PredioSvg key={`p-${p.corpo.x}`} predio={p} cor="#232323" apagada="#2C2C2C" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/*
 * Estrelas da cena de famílias.
 * Mantidas neste arquivo para evitar falha de compilação caso a versão de
 * src/lib/cenas-geometria.ts do projeto ainda não exporte ESTRELAS.
 */
const ESTRELAS: Array<{ x: number; y: number; r: number; th: number; max: number }> = [
  { x: 54, y: 32, r: 1.2, th: 0.66, max: 0.72 },
  { x: 112, y: 78, r: 1.6, th: 0.74, max: 0.61 },
  { x: 176, y: 24, r: 0.9, th: 0.63, max: 0.84 },
  { x: 224, y: 57, r: 1.4, th: 0.71, max: 0.58 },
  { x: 291, y: 15, r: 1.1, th: 0.81, max: 0.76 },
  { x: 338, y: 93, r: 1.7, th: 0.68, max: 0.64 },
  { x: 397, y: 42, r: 1.0, th: 0.77, max: 0.88 },
  { x: 451, y: 20, r: 1.5, th: 0.62, max: 0.57 },
  { x: 503, y: 71, r: 1.2, th: 0.79, max: 0.69 },
  { x: 559, y: 35, r: 1.8, th: 0.70, max: 0.82 },
  { x: 614, y: 101, r: 0.9, th: 0.64, max: 0.59 },
  { x: 672, y: 53, r: 1.4, th: 0.83, max: 0.73 },
  { x: 728, y: 18, r: 1.1, th: 0.69, max: 0.91 },
  { x: 781, y: 84, r: 1.7, th: 0.76, max: 0.62 },
  { x: 837, y: 39, r: 1.0, th: 0.61, max: 0.79 },
  { x: 892, y: 66, r: 1.5, th: 0.73, max: 0.66 },
  { x: 947, y: 22, r: 1.2, th: 0.82, max: 0.85 },
  { x: 1060, y: 54, r: 1.6, th: 0.67, max: 0.71 },
  { x: 1118, y: 17, r: 0.9, th: 0.75, max: 0.63 },
  { x: 1173, y: 89, r: 1.4, th: 0.65, max: 0.87 },
  { x: 1229, y: 37, r: 1.1, th: 0.80, max: 0.60 },
  { x: 1286, y: 68, r: 1.8, th: 0.72, max: 0.78 },
  { x: 1341, y: 25, r: 1.0, th: 0.64, max: 0.68 },
  { x: 1394, y: 95, r: 1.3, th: 0.78, max: 0.83 },
  { x: 82, y: 112, r: 0.8, th: 0.84, max: 0.56 },
  { x: 365, y: 119, r: 1.0, th: 0.70, max: 0.74 },
  { x: 646, y: 114, r: 1.2, th: 0.77, max: 0.65 },
  { x: 925, y: 108, r: 0.9, th: 0.68, max: 0.89 },
  { x: 1150, y: 116, r: 1.1, th: 0.81, max: 0.67 },
  { x: 1308, y: 109, r: 1.5, th: 0.63, max: 0.80 },
];

/* ------------------------------ FAMÍLIAS ------------------------------ */

// cores em três momentos: dia → crepúsculo → noite
const PALETA: Record<string, [string, string, string]> = {
  casa: ["#CEC8AB", "#B79B7A", "#3A3531"],
  telhado: ["#BDB696", "#9C7F62", "#2D2926"],
  "casa-fundo": ["#D8D3B9", "#C2A583", "#332F2B"],
  "telhado-fundo": ["#CBC5A8", "#AA8D6E", "#2A2623"],
  arvore: ["#CCCAA8", "#A7977A", "#2F302A"],
  pessoa: ["#B4AD90", "#8C7459", "#2E2924"],
  colina: ["#D6D1B6", "#BDA283", "#2B2825"],
  gramado: ["#C9C3A6", "#A88F70", "#1E1C1A"],
  vidro: ["#B9B393", "#8E7658", "#3A3530"],
};

const canais = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

function corNoMomento(trio: [string, string, string], t: number) {
  const [a, b] = t < 0.5 ? [trio[0], trio[1]] : [trio[1], trio[2]];
  const k = t < 0.5 ? t * 2 : (t - 0.5) * 2;
  const A = canais(a);
  const B = canais(b);
  return `rgb(${A.map((v, i) => Math.round(v + ((B[i] ?? v) - v) * k)).join(",")})`;
}

const estiloInicial = Object.fromEntries(
  Object.entries(PALETA).map(([nome, trio]) => [`--c-${nome}`, trio[0]]),
) as CSSProperties;

const cor = (nome: string) => ({ fill: `var(--c-${nome})` });

/** Cada janela acende num momento diferente do anoitecer. */
let contador = 0;
const proximoLimiar = () => 0.3 + (((contador++ * 37) % 100) / 100) * 0.45;

const CASAS = CASAS_FUNDO.map((c) => ({
  ...c,
  janelas: c.janelas.map((j) => ({ ...j, th: proximoLimiar() })),
}));
const JANELAS_CASA = CASA.janelas.map((j) => ({ ...j, th: proximoLimiar() }));
const TH_SOTAO = proximoLimiar();

function Vidraca({
  x,
  y,
  w,
  h,
  th,
  trave,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  th: number;
  trave: string;
}) {
  return (
    <g>
      <circle
        data-th={th}
        data-max={0.3}
        cx={x + w / 2}
        cy={y + h / 2}
        r={Math.max(w, h) * 1.3}
        fill="url(#familias-halo)"
        style={{ opacity: 0 }}
      />
      <rect x={x} y={y} width={w} height={h} rx={2} style={cor("vidro")} />
      <rect
        data-th={th}
        data-max={0.95}
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={OURO}
        style={{ opacity: 0 }}
      />
      <path
        d={`M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}`}
        strokeWidth={2}
        fill="none"
        style={{ stroke: `var(--c-${trave})` }}
      />
    </g>
  );
}

export function CenaFamilias() {
  const cenaRef = useRef<HTMLDivElement>(null);
  const noiteRef = useRef<HTMLDivElement>(null);
  const criptRef = useRef<HTMLDivElement>(null);
  const ceuRef = useRef<SVGGElement>(null);
  const solRef = useRef<SVGGElement>(null);
  const longeRef = useRef<SVGGElement>(null);
  const meioRef = useRef<SVGGElement>(null);
  const pertoRef = useRef<SVGGElement>(null);
  const luzes = useRef<SVGElement[] | null>(null);

  usePassagem(cenaRef, (u, t) => {
    const cena = cenaRef.current;
    if (!cena) return;
    const k = suave(t);

    // paralaxe em camadas
    const d = u - 0.5;
    mover(ceuRef.current, d * -20, d * 50);
    mover(longeRef.current, d * -34, d * 64);
    mover(meioRef.current, 0, d * 26);
    mover(pertoRef.current, 0, d * -16);

    // cores da cena e do céu
    for (const [nome, trio] of Object.entries(PALETA)) {
      cena.style.setProperty(`--c-${nome}`, corNoMomento(trio, k));
    }
    if (criptRef.current) criptRef.current.style.opacity = String(1 - Math.abs(2 * k - 1));
    if (noiteRef.current) noiteRef.current.style.opacity = String(suave((k - 0.4) / 0.6));

    // o sol se põe atrás da colina
    if (solRef.current) {
      solRef.current.style.transform = `translate3d(0, ${(k * 200).toFixed(1)}px, 0)`;
      solRef.current.style.opacity = String(1 - suave((k - 0.55) / 0.4));
    }

    // luzes das casas, estrelas e lua
    if (!luzes.current) {
      luzes.current = Array.from(cena.querySelectorAll<SVGElement>("[data-th]"));
    }
    for (const el of luzes.current) {
      const th = Number(el.dataset["th"]);
      const max = Number(el.dataset["max"] ?? 1);
      el.style.opacity = (suave((k - th) / 0.14) * max).toFixed(3);
    }
  });

  return (
    <>
      {/* céu: entardecer e noite sobrepostos ao fundo claro da seção */}
      <div
        ref={criptRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%]"
        style={{
          opacity: 0,
          background:
            "linear-gradient(180deg, rgba(254,178,2,0) 0%, rgba(254,178,2,0.3) 45%, rgba(224,122,40,0.5) 100%)",
        }}
      />
      <div
        ref={noiteRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%]"
        style={{
          opacity: 0,
          background: "linear-gradient(180deg, #232323 0%, #161616 55%, #111111 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 42%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 42%)",
        }}
      />

      <div
        ref={cenaRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 md:h-72 lg:h-80"
        style={estiloInicial}
      >
        <svg
          viewBox={`0 0 ${CASAS_LARGURA} ${CASAS_ALTURA}`}
          preserveAspectRatio="xMidYMax slice"
          className="block h-full w-full"
        >
          <defs>
            <radialGradient id="familias-halo">
              <stop offset="0%" stopColor={OURO} stopOpacity="0.9" />
              <stop offset="100%" stopColor={OURO} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* céu: estrelas e lua */}
          <g ref={ceuRef}>
            {ESTRELAS.map((s) => (
              <circle
                key={`${s.x}-${s.y}`}
                data-th={s.th}
                data-max={s.max}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#F3E9C6"
                style={{ opacity: 0 }}
              />
            ))}
            <g data-th={0.6} data-max={1} style={{ opacity: 0 }}>
              <circle cx={1004} cy={140} r={40} fill="#F3E9C6" fillOpacity={0.08} />
              <circle cx={1004} cy={140} r={15} fill="#F3E9C6" fillOpacity={0.92} />
            </g>
          </g>

          {/* sol baixo atrás da casa */}
          <g ref={solRef}>
            <circle cx={720} cy={214} r={190} fill={OURO} fillOpacity={0.07} />
            <circle cx={720} cy={214} r={120} fill={OURO} fillOpacity={0.09} />
          </g>

          {/* longe: colina e casas ao fundo */}
          <g ref={longeRef}>
            <path
              d={`M-60 262C240 236 480 250 720 258S1200 240 1500 256V400H-60Z`}
              style={cor("colina")}
            />
            {CASAS.map((c) => (
              <g key={c.corpo.x}>
                <polygon points={c.telhado} style={cor("telhado-fundo")} />
                <rect
                  x={c.corpo.x}
                  y={c.corpo.y}
                  width={c.corpo.w}
                  height={c.corpo.h + 70}
                  style={cor("casa-fundo")}
                />
                {c.janelas.map((j) => (
                  <Vidraca key={`${j.x}-${j.y}`} {...j} trave="casa-fundo" />
                ))}
              </g>
            ))}
          </g>

          {/* meio: árvores e casa principal */}
          <g ref={meioRef}>
            {ARVORES.map((a) => (
              <g key={a.x} transform={`translate(${a.x} ${CHAO}) scale(${a.s})`} style={cor("arvore")}>
                <rect x={-4} y={-52} width={8} height={60} />
                <circle cx={0} cy={-70} r={26} />
                <circle cx={-17} cy={-54} r={18} />
                <circle cx={17} cy={-54} r={18} />
              </g>
            ))}

            <rect
              x={CASA.chamine.x}
              y={CASA.chamine.y}
              width={CASA.chamine.w}
              height={CASA.chamine.h}
              style={cor("telhado")}
            />
            <polygon points={CASA.telhado} style={cor("telhado")} />
            <rect
              x={CASA.corpo.x}
              y={CASA.corpo.y}
              width={CASA.corpo.w}
              height={CASA.corpo.h + 60}
              style={cor("casa")}
            />
            <circle
              data-th={TH_SOTAO}
              data-max={0.3}
              cx={CASA.sotao.cx}
              cy={CASA.sotao.cy}
              r={CASA.sotao.r * 2.6}
              fill="url(#familias-halo)"
              style={{ opacity: 0 }}
            />
            <circle
              cx={CASA.sotao.cx}
              cy={CASA.sotao.cy}
              r={CASA.sotao.r}
              style={cor("vidro")}
            />
            <circle
              data-th={TH_SOTAO}
              data-max={0.95}
              cx={CASA.sotao.cx}
              cy={CASA.sotao.cy}
              r={CASA.sotao.r}
              fill={OURO}
              style={{ opacity: 0 }}
            />
            <path
              d={`M${CASA.sotao.cx - CASA.sotao.r} ${CASA.sotao.cy}h${CASA.sotao.r * 2}M${CASA.sotao.cx} ${
                CASA.sotao.cy - CASA.sotao.r
              }v${CASA.sotao.r * 2}`}
              strokeWidth={2}
              fill="none"
              style={{ stroke: "var(--c-casa)" }}
            />
            {JANELAS_CASA.map((j) => (
              <Vidraca key={j.x} {...j} trave="casa" />
            ))}
            <path
              d={`M${CASA.porta.x} ${CASA.porta.y + CASA.porta.h}V${CASA.porta.y + 14}a17 14 0 0 1 34 0V${
                CASA.porta.y + CASA.porta.h
              }z`}
              style={cor("telhado")}
            />
          </g>

          {/* perto: gramado e família */}
          <g ref={pertoRef}>
            <path
              d={`M-60 290C300 280 600 292 900 288S1300 284 1500 290V${CASAS_ALTURA + 60}H-60Z`}
              style={cor("gramado")}
            />
            {FAMILIA.map((p) => (
              <g key={p.x} style={cor("pessoa")}>
                <rect x={p.x - p.w / 2} y={CHAO + 4 - p.h} width={p.w} height={p.h + 20} rx={p.w / 2} />
                <circle cx={p.x} cy={CHAO + 4 - p.h - p.r - 3} r={p.r} />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}
