import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { NovaAwa } from "@/components/nova-awa";
import { Fundador } from "@/components/fundador";
import { MissaoVisaoValores } from "@/components/missao-visao-valores";
import { GrupoAwa } from "@/components/grupo-awa";
import { Cultura } from "@/components/cultura";
import { Equipe } from "@/components/equipe";
import { Provas } from "@/components/provas";
import { Premios } from "@/components/premios";
import { MetodoEdificar } from "@/components/metodo-edificar";
import { ComoFunciona } from "@/components/como-funciona";
import { FraseTransicao } from "@/components/frase-transicao";
import { ParceriaXp } from "@/components/parceria-xp";
import { WealthServices } from "@/components/wealth-services";
import { Empresas } from "@/components/empresas";
import { TrabalheConosco } from "@/components/trabalhe-conosco";
import { CtaFinal } from "@/components/cta-final";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloat } from "@/components/whatsapp-float";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "A.W.A Capital — Assessoria de Investimentos e Planejamento Patrimonial",
      },
      {
        name: "description",
        content:
          "A.W.A Capital: escritório de investimentos credenciado à XP, com assessoria de investimentos, planejamento patrimonial, planejamento sucessório e soluções financeiras para empresas em São Luís, Fortaleza e Recife.",
      },
      {
        name: "keywords",
        content:
          "assessoria de investimentos, escritório de investimentos, planejamento patrimonial, planejamento financeiro, Wealth Management, Wealth Services, soluções financeiras para empresas, gestão de patrimônio, planejamento sucessório, investimentos para alta renda, assessoria private, investimentos internacionais, gestão de caixa empresarial",
      },
      {
        property: "og:title",
        content: "A.W.A Capital — Soluções financeiras para transformar patrimônio em possibilidades",
      },
      {
        property: "og:description",
        content:
          "Assessoria de investimentos e planejamento patrimonial para pessoas, famílias e empresas.",
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

      {/* Sobre nós */}
      <NovaAwa />
      <Fundador />
      <MissaoVisaoValores />
      <GrupoAwa />
      <Cultura />
      <Equipe />
      <Provas />
      <Premios />
      <MetodoEdificar />
      <ComoFunciona />

      <FraseTransicao>“A.W.A Capital, sua boutique de serviços financeiros.”</FraseTransicao>

      {/* Investimentos */}
      <ParceriaXp />

      <FraseTransicao>“Seu patrimônio precisa de estratégia. Não de produtos.”</FraseTransicao>

      {/* Soluções Financeiras para Famílias */}
      <WealthServices />

      {/* Soluções Financeiras para Empresas */}
      <Empresas />

      <FraseTransicao>“Muito mais que só Investimentos.”</FraseTransicao>

      {/* Trabalhe conosco */}
      <TrabalheConosco />

      <CtaFinal />
      <SiteFooter />
      <WhatsappFloat />
    </main>
  );
}
