import { SectionBadge } from "@/components/section-badge";

const numerosXp = [
  "25 anos de mercado;",
  "2,2 trilhões de reais de ativos sob gestão;",
  "Maior rede de Assessoria de Investimentos do Brasil e também Banco Internacional;",
  "A melhor experiência do mercado em investimentos e soluções financeiras.",
];

const diferenciais = [
  { titulo: "Renda Fixa", texto: "Diversas opções com segurança, liquidez e taxa zero na XP." },
  { titulo: "Ações", texto: "Invista em empresas e acompanhe seu desempenho na bolsa." },
  { titulo: "Fundos de Investimento", texto: "Diversifique sua carteira com gestão profissional." },
  { titulo: "Previdência Privada", texto: "Planeje seu futuro com previdência, PGBL ou VGBL." },
  {
    titulo: "Fundos Imobiliários",
    texto: "Invista em imóveis pela bolsa e receba rendimentos sem burocracia.",
  },
  {
    titulo: "Ofertas Públicas",
    texto: "Invista em empresas que estão entrando na bolsa por meio de ofertas públicas.",
  },
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

export function ParceriaXp() {
  return (
    <section
      id="investimentos"
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      {/* Orgulho em sermos um escritório XP */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div
          className="grid overflow-hidden rounded-3xl lg:grid-cols-2"
          style={{ background: "#F1F0ED" }}
        >
          <div className="flex flex-col justify-center px-7 py-10 md:px-12 md:py-14">
            <img
              src="/logo-xp-investimentos-icon-4096.png"
              alt="XP Investimentos"
              className="h-16 w-16 rounded-2xl md:h-[76px] md:w-[76px]"
              width={1600}
              height={1600}
              loading="lazy"
            />
            <h2
              className="mt-8 font-display text-[1.55rem] leading-[1.16] font-bold tracking-tight md:text-[2rem]"
              style={{ color: "#232323" }}
            >
              Orgulho em sermos um escritório XP
            </h2>
            <ul className="mt-8 list-disc space-y-3 pl-5 font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              {numerosXp.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[540px]">
            <img
              src="/nasdaq.png"
              alt="Equipe XP reunida na Nasdaq, em Nova York"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* diferenciais da plataforma XP */}
      <div className="relative mx-auto mt-20 w-full max-w-[1280px] px-5 md:px-8 lg:mt-24">
        <div className="flex justify-center">
          <SectionBadge>Diferenciais da plataforma</SectionBadge>
        </div>
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
        <h3 className="mx-auto mt-4 max-w-3xl text-center font-display text-xl font-extrabold tracking-[0.06em] text-accent uppercase md:text-2xl">
          Na A.W.A, o cliente escolhe o nosso modelo de remuneração
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
                {m.titulo} {m.destaque && "★ (mais recomendado)"}
              </h4>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{m.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
