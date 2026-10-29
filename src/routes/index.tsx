import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
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
import {
  fetchHomepage,
  fetchSiteSettings,
  type Homepage,
  type SiteSettings,
} from "@/lib/sanity";

const DEFAULT_SEO = {
  title: "A.W.A Capital — Assessoria de Investimentos e Planejamento Patrimonial",
  description:
    "A.W.A Capital: escritório de investimentos credenciado à XP, com assessoria de investimentos, planejamento patrimonial, planejamento sucessório e soluções financeiras para empresas em São Luís, Fortaleza e Recife.",
  keywords:
    "assessoria de investimentos, escritório de investimentos, planejamento patrimonial, planejamento financeiro, Wealth Management, Wealth Services, soluções financeiras para empresas, gestão de patrimônio, planejamento sucessório, investimentos para alta renda, assessoria private, investimentos internacionais, gestão de caixa empresarial",
  ogTitle:
    "A.W.A Capital — Soluções financeiras para transformar patrimônio em possibilidades",
  ogDescription:
    "Assessoria de investimentos e planejamento patrimonial para pessoas, famílias e empresas.",
};

export const Route = createFileRoute("/")({
  loader: async (): Promise<{ homepage: Homepage | null; settings: SiteSettings | null }> => {
    const [homepage, settings] = await Promise.all([
      fetchHomepage(),
      fetchSiteSettings(),
    ]);
    return { homepage, settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.homepage?.seo;
    const fallback = loaderData?.settings?.defaultSeo;
    const title = seo?.title || fallback?.title || DEFAULT_SEO.title;
    const description =
      seo?.description || fallback?.description || DEFAULT_SEO.description;
    const keywords = seo?.keywords || fallback?.keywords || DEFAULT_SEO.keywords;
    const ogTitle = seo?.ogTitle || fallback?.ogTitle || DEFAULT_SEO.ogTitle;
    const ogDescription =
      seo?.ogDescription || fallback?.ogDescription || DEFAULT_SEO.ogDescription;
    const twitter =
      seo?.twitterCard || fallback?.twitterCard || "summary_large_image";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: twitter },
        ...(seo?.noIndex || fallback?.noIndex
          ? [{ name: "robots", content: "noindex, nofollow" }]
          : []),
      ],
    };
  },
  component: Index,
});

function Index() {
  const { homepage, settings } = Route.useLoaderData();
  const h = homepage;
  const frases = h?.frasesTransicao?.map((f) => f.text).filter(Boolean) as
    | string[]
    | undefined;

  const f1 = frases?.[0] || "A.W.A Capital, sua boutique de serviços financeiros.";
  const f2 = frases?.[1] || "Seu patrimônio precisa de estratégia. Não de produtos.";
  const f3 = frases?.[2] || "Muito mais que só Investimentos.";

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <Hero data={h?.hero} />

      <Fundador data={h?.fundador} />
      <MissaoVisaoValores data={h?.missaoVisaoValores} />

      <FraseTransicao>"{f1}"</FraseTransicao>

      <GrupoAwa data={h?.grupoAwa} />

      <Diretores data={h?.diretoria} />

      <FraseTransicao>"{f2}"</FraseTransicao>

      <Especialistas data={h?.especialistas} />

      <Provas data={h?.provas} />
      <Premios data={h?.premios} />

      <ParceriaXp data={h?.parceriaXp} />

      <WealthServices data={h?.wealthServices} />

      <Empresas data={h?.empresas} />

      <FraseTransicao>"{f3}"</FraseTransicao>

      <TrabalheConosco data={h?.trabalheConosco} />

      <SiteFooter settings={settings} />
      <WhatsappFloat settings={settings} />
    </main>
  );
}
