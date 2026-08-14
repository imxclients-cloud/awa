import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { NovaAwa } from "@/components/nova-awa";
import { Solucoes } from "@/components/solucoes";
import { Diferencial } from "@/components/diferencial";
import { ComoFunciona } from "@/components/como-funciona";
import { WealthServices } from "@/components/wealth-services";
import { Empresas } from "@/components/empresas";
import { ParceriaXp } from "@/components/parceria-xp";
import { Cultura } from "@/components/cultura";
import { Conteudos } from "@/components/conteudos";
import { Provas } from "@/components/provas";
import { Faq } from "@/components/faq";
import { CtaFinal } from "@/components/cta-final";
import { SiteFooter } from "@/components/site-footer";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.W.A Capital — Assessoria de investimentos e patrimônio" },
      {
        name: "description",
        content:
          "A.W.A Capital: assessoria de investimentos e planejamento patrimonial para Alta Renda e Private. O caminho para a prosperidade com sabedoria.",
      },
      { property: "og:title", content: "A.W.A Capital — Prosperidade com sabedoria" },
      {
        property: "og:description",
        content:
          "Assessoria de investimentos e planejamento patrimonial para Alta Renda e Private.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <NovaAwa />
      <Solucoes />
      <Diferencial />
      <ComoFunciona />
      <WealthServices />
      <Empresas />
      <ParceriaXp />
      <Cultura />
      <Conteudos />
      <Provas />
      <Faq />
      <CtaFinal />
      <SiteFooter />

    </main>
  );
}


