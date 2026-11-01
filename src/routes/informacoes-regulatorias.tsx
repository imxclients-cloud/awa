import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";

export const Route = createFileRoute("/informacoes-regulatorias")({
  head: () => ({
    meta: [
      { title: "Informações Regulatórias — A.W.A Capital" },
      {
        name: "description",
        content:
          "Informações regulatórias da A.W.A Capital: atuação como escritório de agentes autônomos de investimento, credenciamento à XP, remuneração, conflitos de interesse e canais de atendimento e reclamação.",
      },
      { property: "og:title", content: "Informações Regulatórias — A.W.A Capital" },
      {
        property: "og:description",
        content:
          "Como atuamos, como somos remunerados e quais são os canais de atendimento e reclamação.",
      },
    ],
  }),
  loader: async () => loadLegalPage({ data: { slug: "informacoes-regulatorias" } }),
  component: InformacoesRegulatorias,
});

function InformacoesRegulatorias() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
