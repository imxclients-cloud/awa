import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";
import { legalPageHead } from "@/lib/legal-seo";

export const Route = createFileRoute("/informacoes-regulatorias")({
  loader: async () => loadLegalPage({ data: { slug: "informacoes-regulatorias" } }),
  head: ({ loaderData }) =>
    legalPageHead(
      loaderData?.doc,
      {
        title: "Informações Regulatórias — A.W.A Capital",
        description:
          "Informações regulatórias da A.W.A Capital: atuação como escritório de agentes autônomos de investimento, credenciamento à XP, remuneração, conflitos de interesse e canais de atendimento e reclamação.",
        ogTitle: "Informações Regulatórias — A.W.A Capital",
        ogDescription:
          "Como atuamos, como somos remunerados e quais são os canais de atendimento e reclamação.",
      },
      loaderData?.settings,
      "/informacoes-regulatorias",
    ),
  component: InformacoesRegulatorias,
});

function InformacoesRegulatorias() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
