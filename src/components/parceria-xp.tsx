import { useEffect, useRef, useState } from "react";
import logoConvivencia from "@/assets/logo-convivencia.png.asset.json";

const numerosXp = [
  "25 anos de mercado",
  "R$ 2,14 trilhões de reais de ativos sob gestão",
  "Maior rede de Assessoria de Investimentos do Brasil e também Banco Internacional",
];

const diferenciais = [
  { titulo: "Renda Fixa", texto: "Diversas opções com segurança, liquidez e taxa zero na XP." },
  { titulo: "Ações", texto: "Invista em empresas e acompanhe seu desempenho na bolsa." },
  { titulo: "Fundos de Investimento", texto: "Diversifique sua carteira com gestão profissional." },
  { titulo: "Previdência Privada", texto: "Planeje seu futuro com previdência, PGBL ou VGBL." },
  { titulo: "Fundos Imobiliários", texto: "Invista em imóveis pela bolsa e receba rendimentos sem burocracia." },
  { titulo: "Ofertas Públicas", texto: "Invista em empresas que estão entrando na bolsa por meio de ofertas públicas." },
];

const modelos: Array<{ n: string; titulo: string; texto: string; destaque: boolean }> = [
  {
    n: "01",
    titulo: "Comissão por Produto",
    texto: "Remuneração vinculada aos produtos contratados. Custódia XP.",
    destaque: false,
  },
  {
    n: "02",
    titulo: "Fee Fixo",
    texto: "Percentual sobre o valor investido. Custódia XP.",
    destaque: true,
  },
  {
    n: "03",
    titulo: "Consultoria",
    texto:
      "Percentual sobre o valor investido, com possibilidade de multicustódia (patrimônios acima de R$ 3 milhões).",
    destaque: false,
  },
];

const tabelaFee = [
  { faixa: "Abaixo de R$ 300 mil", fee: "1,2% ao ano" },
  { faixa: "R$ 300 mil a R$ 3 milhões", fee: "1,0% ao ano" },
  { faixa: "R$ 3 milhões a R$ 5 milhões", fee: "0,9% ao ano" },
  { faixa: "R$ 5 milhões a R$ 10 milhões", fee: "0,8% ao ano" },
  { faixa: "R$ 10 milhões a R$ 30 milhões", fee: "0,7% ao ano" },
  { faixa: "R$ 30 milhões a R$ 100 milhões", fee: "0,6% ao ano" },
  { faixa: "R$ 100 milhões a R$ 250 milhões", fee: "0,5% ao ano" },
  { faixa: "R$ 250 milhões a R$ 500 milhões", fee: "0,4% ao ano" },
  { faixa: "Acima de R$ 500 milhões", fee: "0,3% ao ano" },
];

export function ParceriaXp() {
  const seloRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const el = seloRef.current;
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
      id="investimentos"
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

      {/* A.W.A + XP: apresentação e grandes números */}
      <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center px-5 text-center md:px-8">
        <div
          ref={seloRef}
          className="relative mb-14 h-[300px] w-full max-w-[420px] md:mb-16 md:h-[260px]"
        >
          <svg viewBox="0 0 420 260" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
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

        <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
          Orgulho em ser um escritório XP
        </span>
        <h2
          className="mt-5 font-display text-[1.6rem] leading-[1.18] font-bold tracking-tight md:text-[2.1rem]"
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

        <ul className="mt-8 flex flex-col gap-2 text-left">
          {numerosXp.map((n) => (
            <li key={n} className="flex items-start gap-2 font-sans text-sm text-ink-muted">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {n}
            </li>
          ))}
        </ul>
      </div>

      {/* diferenciais da plataforma XP */}
      <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
        <p className="text-center font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
          Diferenciais da plataforma
        </p>
        <h3 className="mx-auto mt-4 max-w-2xl text-center font-display text-xl font-bold text-ink md:text-2xl">
          Acesso a um ecossistema completo de investimentos.
        </h3>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="rounded-2xl border border-ink-hairline p-6">
              <h4 className="font-display text-base font-bold text-ink">{d.titulo}</h4>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{d.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* modelo de remuneração */}
      <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
        <p className="text-center font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
          Modelo de remuneração
        </p>
        <h3 className="mx-auto mt-4 max-w-2xl text-center font-display text-xl font-bold text-ink md:text-2xl">
          Na A.W.A, o cliente escolhe o seu modelo de remuneração.
        </h3>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {modelos.map((m) => (
            <div
              key={m.n}
              className="rounded-2xl border p-6"
              style={{
                borderColor: m.destaque ? "#FEB202" : "rgba(35,35,35,0.12)",
                background: m.destaque ? "rgba(254,178,2,0.06)" : "transparent",
              }}
            >
              <span className="font-display text-xs font-extrabold tracking-[0.2em] text-accent">
                {m.n}
              </span>
              <h4 className="mt-3 font-display text-base font-bold text-ink">
                {m.titulo} {m.destaque && "★"}
              </h4>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{m.texto}</p>
            </div>
          ))}
        </div>

        {/* tabela de fee fixo — HTML responsivo, sem imagem, para SEO/mobile */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-ink-hairline">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr style={{ background: "#FEB202" }}>
                <th className="px-5 py-3 font-display text-sm font-bold text-ink">
                  Patrimônio investido
                </th>
                <th className="px-5 py-3 font-display text-sm font-bold text-ink">Fee Fixo*</th>
              </tr>
            </thead>
            <tbody>
              {tabelaFee.map((row, i) => (
                <tr key={row.faixa} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F5F5F5" }}>
                  <td className="border-t border-ink-hairline px-5 py-3 font-sans text-sm text-ink">
                    {row.faixa}
                  </td>
                  <td className="border-t border-ink-hairline px-5 py-3 font-sans text-sm text-ink">
                    {row.fee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-sans text-xs text-ink-muted">
          *Valores de referência para custódia XP. Consulte um especialista para condições
          aplicáveis a multicustódia.
        </p>
      </div>
    </section>
  );
}
