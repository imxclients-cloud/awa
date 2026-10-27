/**
 * Geometria das cenas de fundo das seções "Famílias" e "Empresas".
 * Tudo é determinístico (sem Math.random) para o HTML do servidor e do
 * cliente serem idênticos.
 */

export const OURO = "#FEB202";

/** Gerador pseudo-aleatório com semente fixa. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ret = (x: number, y: number, w: number, h: number) =>
  `M${x.toFixed(1)} ${y.toFixed(1)}h${w}v${h}h${-w}z`;

/* ------------------------------------------------------------------ */
/* EMPRESAS — skyline com andares que acendem                          */
/* ------------------------------------------------------------------ */

export type Andar = { d: string; delay: number; dur: number; cor: string; opacidade: number };
export type Retangulo = { x: number; y: number; w: number; h: number };
export type Predio = {
  corpo: Retangulo;
  coroa: Retangulo[];
  apagadas: string;
  andares: Andar[];
};

export const SKYLINE_LARGURA = 1440;
export const SKYLINE_ALTURA = 420;

type Camada = "frente" | "fundo";

function gerarPredio(
  rng: () => number,
  x: number,
  w: number,
  h: number,
  camada: Camada,
): Predio {
  const base = SKYLINE_ALTURA;
  const topo = base - h;
  const celulaX = camada === "frente" ? 17 : 14;
  const celulaY = camada === "frente" ? 21 : 18;
  const jw = camada === "frente" ? 8 : 6;
  const jh = camada === "frente" ? 11 : 9;
  const probAcesa = camada === "frente" ? 0.4 : 0.26;

  const colunas = Math.max(2, Math.floor((w - 18) / celulaX));
  const linhas = Math.max(2, Math.floor((h - 34) / celulaY));
  const x0 = x + (w - colunas * celulaX) / 2 + (celulaX - jw) / 2;

  let apagadas = "";
  const andares: Andar[] = [];

  for (let r = 0; r < linhas; r++) {
    const y = topo + 20 + r * celulaY;
    let acesas = "";
    for (let c = 0; c < colunas; c++) {
      const wx = x0 + c * celulaX;
      if (rng() < probAcesa) acesas += ret(wx, y, jw, jh);
      else apagadas += ret(wx, y, jw, jh);
    }
    if (acesas) {
      andares.push({
        d: acesas,
        // acende da esquerda para a direita, com um pouco de acaso
        delay: 0.4 + (x / SKYLINE_LARGURA) * 3.6 + rng() * 1.8,
        dur: 48 + rng() * 44,
        cor: rng() < 0.82 ? OURO : "#FFE29A",
        opacidade: camada === "frente" ? 0.5 + rng() * 0.3 : 0.2 + rng() * 0.14,
      });
    }
  }

  const coroa: Retangulo[] = [];
  const sorteio = rng();
  if (sorteio < 0.4) {
    // antena
    coroa.push({ x: x + w / 2 - 1, y: topo - 30, w: 2, h: 30 });
  } else if (sorteio < 0.75) {
    // topo escalonado
    coroa.push({ x: x + w * 0.2, y: topo - 14, w: w * 0.6, h: 14 });
  }

  return { corpo: { x, y: topo, w, h }, coroa, apagadas, andares };
}

function gerarCamada(lista: Array<[number, number, number]>, seed: number, camada: Camada) {
  const rng = mulberry32(seed);
  return lista.map(([x, w, h]) => gerarPredio(rng, x, w, h, camada));
}

export function gerarSkyline() {
  const fundo = gerarCamada(
    [
      [60, 100, 300],
      [250, 82, 250],
      [400, 110, 380],
      [560, 90, 280],
      [700, 110, 350],
      [860, 90, 300],
      [1020, 100, 330],
      [1160, 90, 270],
      [1300, 110, 320],
    ],
    7,
    "fundo",
  );
  const frente = gerarCamada(
    [
      [-20, 110, 210],
      [100, 86, 150],
      [196, 120, 285],
      [326, 90, 190],
      [426, 140, 340],
      [576, 96, 230],
      [682, 120, 300],
      [812, 100, 200],
      [922, 150, 360],
      [1082, 92, 240],
      [1184, 116, 310],
      [1310, 90, 190],
      [1410, 80, 250],
    ],
    21,
    "frente",
  );
  return { fundo, frente };
}

/* ------------------------------------------------------------------ */
/* FAMÍLIAS — casas, árvores e uma família com janelas que acendem     */
/* ------------------------------------------------------------------ */

export const CASAS_LARGURA = 1440;
export const CASAS_ALTURA = 320;
export const CHAO = 296;

export type JanelaCasa = Retangulo & { delay: number; dur: number };

export type CasaFundo = {
  corpo: Retangulo;
  telhado: string;
  janelas: JanelaCasa[];
};

function casaFundo(x: number, w: number, h: number, janelas: Array<[number, number]>, i: number): CasaFundo {
  const topo = CHAO - h;
  const beiral = 12;
  const altura = Math.round(w * 0.42);
  return {
    corpo: { x, y: topo, w, h },
    telhado: `${x - beiral},${topo + 4} ${x + w / 2},${topo - altura} ${x + w + beiral},${topo + 4}`,
    janelas: janelas.map(([jx, jy], k) => ({
      x: x + jx,
      y: topo + jy,
      w: 22,
      h: 22,
      delay: 0.8 + i * 1.1 + k * 0.9,
      dur: 36 + ((i * 7 + k * 5) % 14),
    })),
  };
}

export const CASAS_FUNDO: CasaFundo[] = [
  casaFundo(90, 96, 58, [[36, 18]], 0),
  casaFundo(250, 110, 70, [[22, 22], [66, 22]], 1),
  casaFundo(1060, 120, 76, [[24, 24], [74, 24]], 2),
  casaFundo(1236, 100, 62, [[39, 20]], 3),
];

/** Casa principal, no centro da cena. */
export const CASA = {
  corpo: { x: 630, y: 196, w: 180, h: 100 },
  telhado: "612,202 720,128 828,202",
  chamine: { x: 772, y: 142, w: 18, h: 40 },
  porta: { x: 703, y: 244, w: 34, h: 52 },
  janelas: [
    { x: 654, y: 226, w: 34, h: 34, delay: 1.2, dur: 40 },
    { x: 752, y: 226, w: 34, h: 34, delay: 2.4, dur: 46 },
  ] as JanelaCasa[],
  sotao: { cx: 720, cy: 170, r: 13, delay: 3.4, dur: 52 },
};

export const ARVORES: Array<{ x: number; s: number }> = [
  { x: 170, s: 0.9 },
  { x: 430, s: 1 },
  { x: 960, s: 1.05 },
  { x: 1385, s: 0.85 },
];

/** Família: dois adultos e duas crianças (largura, altura, x). */
export const FAMILIA: Array<{ x: number; w: number; h: number; r: number }> = [
  { x: 516, w: 24, h: 62, r: 10 },
  { x: 552, w: 16, h: 40, r: 8 },
  { x: 578, w: 16, h: 34, r: 7 },
  { x: 610, w: 24, h: 58, r: 10 },
];


/** Estrelas que aparecem quando anoitece (cena de famílias). */
export const ESTRELAS: Array<{
  x: number;
  y: number;
  r: number;
  th: number;
  max: number;
}> = (() => {
  const rng = mulberry32(99);
  const lista: Array<{
    x: number;
    y: number;
    r: number;
    th: number;
    max: number;
  }> = [];

  for (let i = 0; i < 30; i++) {
    lista.push({
      x: Math.round(rng() * 1440),
      y: Math.round(10 + rng() * 105),
      r: 0.8 + rng() * 1.2,
      th: 0.55 + rng() * 0.35,
      max: 0.45 + rng() * 0.45,
    });
  }

  return lista;
})();
