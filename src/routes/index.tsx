import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header"
import { SanityScripts } from "@/components/sanity-scripts"
import { VisualEditing } from "@/components/visual-editing";
import { Hero } from "@/components/hero";
import { Fundador } from "@/components/fundador";
import { MissaoVisaoValores } from "@/components/missao-visao-valores";
import { GrupoAwa } from "@/components/grupo-awa";
import { FraseTransicao } from "@/components/frase-transicao";
import { Diretores } from "@/components/diretores";
import { Especialistas } from "@/components/especialistas";
import { Provas } from "@/components/provas";
import { Premios } from "@/components/premios";
import { ParceriaXp } from "@/components/parceria-xp";
import { WealthServices } from "@/components/wealth-services";
import { Empresas } from "@/components/empresas";
import { TrabalheConosco } from "@/components/trabalhe-conosco";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import type { Homepage, SiteSettings } from "@/lib/sanity";
import { loadHomeData } from "@/lib/load-home.server";
import { buildSeoMeta, siteOrigin } from "@/lib/seo-meta";

const DEFAULT_SEO = {
  title: "A.W.A Capital — Assessoria de Investimentos e Planejamento Patrimonial",
  description:
    "A.W.A Capital: escritório de investimentos credenciado à XP, com assessoria de investimentos, planejamento patrimonial, planejamento sucessório e soluções financeiras para empresas em São Luís, Fortaleza e Recife.",
  keywords: [
    // Principais
    "Assessoria de investimentos",
    "planejamento patrimonial",
    "gestão patrimonial",
    "planejamento financeiro",
    "soluções financeiras",
    "Wealth Management",
    "Wealth Services",
    "assessoria private",
    "investimentos para alta renda",
    "planejamento sucessório",
    "proteção patrimonial",
    "gestão de riscos",
    "soluções financeiras para empresas",
    "gestão de caixa empresarial",
    // Complementares
    "Escritório de investimentos",
    "escritório de investimentos XP",
    "assessoria de investimentos XP",
    "consultoria de investimentos",
    "investimentos para famílias",
    "investimentos para empresas",
    "investimentos para pessoa jurídica",
    "gestão de patrimônio familiar",
    "sucessão patrimonial",
    "eficiência tributária",
    "planejamento tributário",
    "multicustódia",
    "holding patrimonial",
    "offshore",
    "investimentos internacionais",
    "crédito empresarial",
    "câmbio",
    "seguros corporativos",
    "gestão de fluxo de caixa",
    "previdência privada",
    "renda fixa",
    "fundos de investimento",
    // Geolocalização
    "Assessoria de investimentos em São Luís",
    "assessoria de investimentos em Fortaleza",
    "assessoria de investimentos em Recife",
    "planejamento patrimonial em São Luís",
    "planejamento patrimonial em Fortaleza",
    "planejamento patrimonial em Recife",
    "assessoria de investimentos no Nordeste",
    // Marca
    "A.W.A Capital",
    "AWA Capital",
    "A.W.A Investimentos",
    "A.W.A Empresas",
    "A.W.A Wealth Services",
    "A.W.A Capital XP",
  ].join(", "),
  ogTitle:
    "A.W.A Capital — Soluções financeiras para transformar patrimônio em possibilidades",
  ogDescription:
    "Assessoria de investimentos e planejamento patrimonial para pessoas, famílias e empresas.",
};

export const Route = createFileRoute("/")({
  loader: async (): Promise<{ homepage: Homepage | null; settings: SiteSettings | null }> => {
    const data = await loadHomeData();
    return { homepage: data.homepage, settings: data.settings };
  },
  head: ({ loaderData }) =>
    buildSeoMeta({
      defaults: DEFAULT_SEO,
      page: loaderData?.homepage?.seo ?? null,
      site: loaderData?.settings?.defaultSeo ?? null,
      pageUrl: `${siteOrigin()}/`,
    }),
  component: Index,
});

function Index() {
  const { homepage, settings } = Route.useLoaderData();
  const h = homepage;
  // Seção aparece quando "visible" não está desligado no CMS (null = mostra)
  const on = (key: string) => h?.sectionVisibility?.[key] !== false;
  const frases = (h?.frasesTransicao ?? []).map((f) => f.text).filter(Boolean) as string[];
  const fraseAt = (i: number) => frases[i];

  return (
    <main className="min-h-screen bg-background">
      <VisualEditing />
      <SanityScripts scripts={settings?.headScripts} />
      <SiteHeader settings={settings} />
      {on("hero") && <Hero data={h?.hero} />}

      {on("sobre") && (
        <>
          <Fundador data={h?.fundador} />
          <MissaoVisaoValores data={h?.missaoVisaoValores} />
        </>
      )}
      {fraseAt(0) && <FraseTransicao>{`"${fraseAt(0)}"`}</FraseTransicao>}

      {on("estrutura") && <GrupoAwa data={h?.grupoAwa} />}

      {on("diretoria") && <Diretores data={h?.diretoria} />}
      {fraseAt(1) && <FraseTransicao>{`"${fraseAt(1)}"`}</FraseTransicao>}

      {on("especialistas") && <Especialistas data={h?.especialistas} />}

      {on("provas") && (
        <>
          <Provas data={h?.provas} />
          <Premios data={h?.premios} />
        </>
      )}

      {on("investimentos") && <ParceriaXp data={h?.parceriaXp} />}

      {on("solucoes") && (
        <>
          <WealthServices data={h?.wealthServices} />
          <Empresas data={h?.empresas} />
        </>
      )}
      {fraseAt(2) && <FraseTransicao>{`"${fraseAt(2)}"`}</FraseTransicao>}

      {on("trabalhe") && <TrabalheConosco data={h?.trabalheConosco} settings={settings} />}

      <SiteFooter settings={settings} />
      <WhatsappFloat settings={settings} />
    </main>
  );
}
