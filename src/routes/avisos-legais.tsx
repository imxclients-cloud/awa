import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";

export const Route = createFileRoute("/avisos-legais")({
  head: () => ({
    meta: [
      { title: "Avisos Legais — A.W.A Capital" },
      {
        name: "description",
        content:
          "Avisos legais da A.W.A Capital sobre a natureza informativa do conteúdo, ausência de garantia de rentabilidade, uso de materiais e relação com instituições parceiras.",
      },
      { property: "og:title", content: "Avisos Legais — A.W.A Capital" },
      {
        property: "og:description",
        content: "Informações importantes sobre o conteúdo divulgado pela A.W.A Capital.",
      },
    ],
  }),
  loader: async () => loadLegalPage({ data: { slug: "avisos-legais" } }),
  component: AvisosLegais,
});

function AvisosLegais() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
