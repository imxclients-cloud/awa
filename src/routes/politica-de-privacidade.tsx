import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — A.W.A Capital" },
      {
        name: "description",
        content:
          "Saiba como a A.W.A Capital coleta, utiliza, armazena e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
      },
      { property: "og:title", content: "Política de Privacidade — A.W.A Capital" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais e direitos dos titulares na A.W.A Capital.",
      },
    ],
  }),
  loader: async () => loadLegalPage({ data: { slug: "politica-de-privacidade" } }),
  component: PoliticaDePrivacidade,
});

function PoliticaDePrivacidade() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
