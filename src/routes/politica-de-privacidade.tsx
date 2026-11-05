import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";
import { legalPageHead } from "@/lib/legal-seo";

export const Route = createFileRoute("/politica-de-privacidade")({
  loader: async () => loadLegalPage({ data: { slug: "politica-de-privacidade" } }),
  head: ({ loaderData }) =>
    legalPageHead(
      loaderData?.doc,
      {
        title: "Política de Privacidade — A.W.A Capital",
        description:
          "Saiba como a A.W.A Capital coleta, utiliza, armazena e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
        ogTitle: "Política de Privacidade — A.W.A Capital",
        ogDescription: "Tratamento de dados pessoais e direitos dos titulares na A.W.A Capital.",
      },
      loaderData?.settings,
      "/politica-de-privacidade",
    ),
  component: PoliticaDePrivacidade,
});

function PoliticaDePrivacidade() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
