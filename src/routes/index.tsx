import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { AwaHome } from "@/components/awa-home";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.W.A Capital — Assessoria de investimentos e planejamento patrimonial" },
      {
        name: "description",
        content:
          "Assessoria de investimentos, planejamento patrimonial e soluções financeiras para famílias e empresas.",
      },
      { property: "og:title", content: "A.W.A Capital — Estratégia para o seu patrimônio" },
      {
        property: "og:description",
        content:
          "Gestão de patrimônio, investimentos para alta renda e soluções financeiras para empresas.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <AwaHome />
      <SiteFooter />
    </main>
  );
}

export default Index;
