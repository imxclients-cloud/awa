import { ArrowUpRight, Check, Linkedin, Instagram, MessageCircle } from "lucide-react";

const specialistWhatsApp =
  "https://wa.me/5598981145929?text=Olá%2C%20vim%20do%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20os%20serviços%20da%20A.W.A%20Capital.";
const expansionWhatsApp = "https://wa.me/5598999672335";

const familySolutions = [
  "Seguros",
  "Consórcios",
  "Câmbio",
  "Conta Digital e Cartão XP",
  "Crédito e Financiamento",
  "Antecipação de precatórios",
  "Holding Patrimonial",
  "Offshore",
];
const companySolutions = [
  "Crédito",
  "Câmbio",
  "Seguro Vida em Grupo",
  "Seguros Corporativos",
  "Restituição Tributária",
  "Mercado Livre de Energia",
  "Consórcios",
  "Conta Digital e Cartão XP",
  "Antecipação de precatórios",
  "Gestão de Fluxo de Caixa",
  "Holding Patrimonial",
];
const xpProducts = [
  "Renda Fixa",
  "Ações",
  "Fundos de Investimento",
  "Previdência Privada",
  "Fundos Imobiliários",
  "Futuros",
  "Ofertas Públicas",
  "COE",
  "Seguro de vida",
  "Cartões XP",
  "Assessoria exclusiva",
  "Carteiras recomendadas",
];
const fees = [
  ["Abaixo de R$ 300 mil", "1,2% ao ano"],
  ["R$ 300 mil a R$ 3 milhões", "1,0% ao ano"],
  ["R$ 3 milhões a R$ 5 milhões", "0,9% ao ano"],
  ["R$ 5 milhões a R$ 10 milhões", "0,8% ao ano"],
  ["R$ 10 milhões a R$ 30 milhões", "0,7% ao ano"],
  ["R$ 30 milhões a R$ 100 milhões", "0,6% ao ano"],
  ["R$ 100 milhões a R$ 250 milhões", "0,5% ao ano"],
  ["R$ 250 milhões a R$ 500 milhões", "0,4% ao ano"],
  ["Acima de R$ 500 milhões", "0,3% ao ano"],
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-5 text-lg leading-8 text-muted-foreground">{children}</p>}
    </div>
  );
}

function SolutionGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item}
          className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent/60"
        >
          <span className="text-sm text-accent">0{index + 1}</span>
          <h3 className="mt-8 text-lg font-semibold text-card-foreground">{item}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Soluções desenhadas para proteger e ampliar suas possibilidades.
          </p>
          <ArrowUpRight
            className="mt-6 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1"
            size={20}
          />
        </div>
      ))}
    </div>
  );
}

export function AwaHome() {
  return (
    <>
      <section className="relative flex min-h-[720px] items-end overflow-hidden bg-deep px-5 pb-20 pt-32 md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,.95),rgba(17,17,17,.48),rgba(17,17,17,.8)),url('/__l5e/assets-v1/157e2b54-2e44-47ef-8418-a2a8552b587d/hero-banner.png')] bg-cover bg-center" />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <p className="mb-6 text-sm font-bold uppercase tracking-[.3em] text-accent">
            A.W.A Capital
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
            Soluções financeiras para transformar patrimônio em possibilidades.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Assessoria de investimentos, planejamento patrimonial e soluções financeiras para
            pessoas, famílias e empresários.
          </p>
          <a
            href={specialistWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            Falar com um Especialista <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section id="sobre" className="bg-surface-light px-5 py-24 text-ink md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow="Sobre nós"
            title="Uma assessoria para decisões que atravessam gerações."
          >
            Somos uma assessoria em investimentos e planejamento patrimonial para pessoas, famílias
            e empresários que querem proteger, expandir e perpetuar seu patrimônio.
          </SectionHeading>
          <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-3xl bg-deep p-8 text-white md:p-12">
              <p className="text-sm uppercase tracking-[.25em] text-accent">Nossa visão</p>
              <p className="mt-8 max-w-xl font-display text-3xl leading-tight">
                “Meu chamado é deixar uma marca edificadora no coração das pessoas por meio do
                mercado financeiro e empresarial.”
              </p>
              <p className="mt-8 text-white/60">Nazareno Lima · CEO e Fundador</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-xl font-semibold">Missão</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  Ajudar o investidor a realizar seus sonhos, por meio do conhecimento e com
                  segurança, conectado ao seu propósito.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-xl font-semibold">Visão</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  Ser um grupo financeiro de excelência no Nordeste até 2029.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow="Nosso jeito de fazer"
            title="Crescer com o cliente. Prosperar com propósito."
          />
          <div className="mt-12 grid gap-3 md:grid-cols-5">
            {[
              "Foco do Cliente",
              "Ambição",
              "Ambiente",
              "Coração Aprendiz",
              "Fazer a coisa certa",
            ].map((v) => (
              <div key={v} className="border-l-2 border-accent px-5 py-5 text-lg font-semibold">
                {v}
              </div>
            ))}
          </div>
          <div className="mt-24">
            <SectionHeading
              eyebrow="Estrutura do Grupo A.W.A"
              title="Um grupo financeiro completo."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-accent/40 bg-card p-8">
                <p className="text-accent">01</p>
                <h3 className="mt-8 text-2xl font-semibold">A.W.A Investimentos</h3>
                <p className="mt-3 text-muted-foreground">
                  Assessoria em Investimentos XP · Patrimônio 100k – 3MM
                </p>
              </div>
              <div className="rounded-3xl border border-accent/40 bg-card p-8">
                <p className="text-accent">02</p>
                <h3 className="mt-8 text-2xl font-semibold">Wealth Services</h3>
                <p className="mt-3 text-muted-foreground">
                  Consultoria com atendimento multicustódia · Patrimônio 3MM+
                </p>
              </div>
              <div className="rounded-3xl border border-accent/40 bg-card p-8">
                <p className="text-accent">03</p>
                <h3 className="mt-8 text-2xl font-semibold">A.W.A Empresas</h3>
                <p className="mt-3 text-muted-foreground">
                  Soluções financeiras para pessoas jurídicas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-light px-5 py-24 text-ink md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <SectionHeading
              eyebrow="Nossa presença"
              title="Uma trajetória construída com confiança."
            >
              Atendemos clientes em três capitais do Nordeste com uma equipe dedicada à gestão de
              patrimônio.
            </SectionHeading>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-6">
                <p className="font-display text-4xl font-semibold">R$ 850 mi</p>
                <p className="mt-2 text-sm text-ink-muted">sob custódia</p>
              </div>
              <div className="rounded-2xl bg-white p-6">
                <p className="font-display text-4xl font-semibold">1.300</p>
                <p className="mt-2 text-sm text-ink-muted">clientes</p>
              </div>
              <div className="rounded-2xl bg-white p-6">
                <p className="font-display text-4xl font-semibold">40+</p>
                <p className="mt-2 text-sm text-ink-muted">profissionais</p>
              </div>
              <div className="rounded-2xl bg-white p-6">
                <p className="font-display text-xl font-semibold">São Luís · Fortaleza · Recife</p>
                <p className="mt-2 text-sm text-ink-muted">unidades A.W.A</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow="Método Edificar" title="Decisões sólidas começam por escuta." />
          <div className="mt-12 grid gap-3 sm:grid-cols-5">
            {[
              ["E", "Escuta Ativa"],
              ["DI", "Diagnóstico Personalizado"],
              ["FI", "Finanças e Investimentos"],
              ["CA", "Consultoria e Acompanhamento"],
              ["R", "Resultados Consistentes"],
            ].map(([letter, label]) => (
              <div key={letter} className="rounded-3xl bg-accent p-5 text-accent-foreground">
                <span className="font-display text-4xl font-bold">{letter}</span>
                <p className="mt-10 font-semibold">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Planejamento como pilar"
                title="Seu patrimônio precisa de estratégia. Não de produtos."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Finanças e Investimentos",
                "Sucessão",
                "Gestão de Risco",
                "Eficiência Tributária",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-card p-6 text-center font-semibold"
                >
                  {item}
                </div>
              ))}
              <div className="col-span-2 rounded-2xl bg-accent p-6 text-center font-display font-semibold text-accent-foreground">
                Planejamento Patrimonial
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="investimentos" className="bg-deep px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow="Investimentos" title="Orgulho em ser um escritório XP.">
            25 anos de mercado · R$ 2,14 trilhões de ativos sob gestão · Maior rede de Assessoria de
            Investimentos do Brasil e Banco Internacional.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {xpProducts.map((p) => (
              <div key={p} className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
                <p className="font-semibold text-white">{p}</p>
                <p className="mt-4 text-sm text-white/50">
                  Acesso a oportunidades com estratégia e acompanhamento.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-24 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Escolha o modelo"
                title="Transparência para escolher o que faz sentido."
              />
              <div className="mt-8 space-y-3">
                {[
                  [
                    "01",
                    "Comissão por Produto",
                    "Remuneração vinculada aos produtos contratados. Custódia XP",
                  ],
                  ["02", "Fee Fixo", "% sobre o valor investido. Custódia XP"],
                  [
                    "03",
                    "Consultoria",
                    "% sobre o valor investido. Multicustódia — Patrimônios acima de 3MM",
                  ],
                ].map(([n, t, d]) => (
                  <div key={n} className="border-l-2 border-accent p-4">
                    <span className="text-accent">{n}</span>
                    <h3 className="mt-2 text-xl font-semibold text-white">{t}</h3>
                    <p className="mt-1 text-sm text-white/55">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-accent text-accent-foreground">
                  <tr>
                    <th className="p-4">Patrimônio Investido</th>
                    <th className="p-4">Fee Fixo*</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map(([range, fee]) => (
                    <tr key={range} className="border-t border-white/10">
                      <td className="p-4 text-white/75">{range}</td>
                      <td className="p-4 font-semibold text-white">{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solucoes-familias"
        className="bg-surface-light px-5 py-24 text-ink md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow="Soluções Financeiras para Famílias"
            title="Muito mais que só investimentos."
          >
            Proteção, sucessão patrimonial e decisões financeiras coordenadas para cada fase da sua
            vida.
          </SectionHeading>
          <SolutionGrid items={familySolutions} />
        </div>
      </section>
      <section id="solucoes-empresas" className="bg-background px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow="Soluções Financeiras para Empresas"
            title="Estratégia para o patrimônio empresarial."
          >
            Soluções financeiras para empresas que precisam de gestão, liquidez e visão de longo
            prazo.
          </SectionHeading>
          <SolutionGrid items={companySolutions} />
        </div>
      </section>

      <section
        id="trabalhe-conosco"
        className="bg-accent px-5 py-24 text-accent-foreground md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em]">Trabalhe conosco</p>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-6xl">
              Construa o próximo capítulo com a A.W.A.
            </h2>
            <p className="mt-6 text-lg">Fale com nossa área de Expansão pelo WhatsApp.</p>
            <a
              href={expansionWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-deep px-6 py-3 font-semibold text-white"
            >
              (98) 99967-2335
            </a>
          </div>
          <form className="space-y-4 rounded-3xl bg-white/25 p-6 md:p-8">
            <input
              className="w-full rounded-xl border-0 bg-white/70 p-4 text-ink outline-none"
              placeholder="Nome"
            />
            <input
              type="email"
              className="w-full rounded-xl border-0 bg-white/70 p-4 text-ink outline-none"
              placeholder="E-mail"
            />
            <input
              className="w-full rounded-xl border-0 bg-white/70 p-4 text-ink outline-none"
              placeholder="Telefone"
            />
            <input
              className="w-full rounded-xl border-0 bg-white/70 p-4 text-ink outline-none"
              placeholder="LinkedIn"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-deep p-4 font-semibold text-white"
            >
              Enviar interesse
            </button>
          </form>
        </div>
      </section>

      <section id="contato" className="bg-deep px-5 py-24 text-center md:px-10">
        <p className="text-sm uppercase tracking-[.3em] text-accent">A.W.A Capital</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold text-white md:text-6xl">
          Fale com um especialista sobre o seu próximo passo.
        </h2>
        <a
          href={specialistWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground"
        >
          Falar com um Especialista <ArrowUpRight size={18} />
        </a>
      </section>
      <a
        aria-label="Falar com um especialista no WhatsApp"
        href={specialistWhatsApp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}

export function AwaValuesList() {
  return (
    <div className="flex gap-2">
      {["Foco do Cliente", "Ambição", "Ambiente", "Coração Aprendiz", "Fazer a coisa certa"].map(
        (value) => (
          <span key={value}>
            <Check size={14} />
            {value}
          </span>
        ),
      )}
    </div>
  );
}
export { Instagram, Linkedin };
