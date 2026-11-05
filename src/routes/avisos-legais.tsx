import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";
import { legalPageHead } from "@/lib/legal-seo";

export const Route = createFileRoute("/avisos-legais")({
  loader: async () => loadLegalPage({ data: { slug: "avisos-legais" } }),
  head: ({ loaderData }) =>
    legalPageHead(
      loaderData?.doc,
      {
        title: "Avisos Legais — A.W.A Capital",
        description:
          "Avisos legais da A.W.A Capital sobre a natureza informativa do conteúdo, ausência de garantia de rentabilidade, uso de materiais e relação com instituições parceiras.",
        ogTitle: "Avisos Legais — A.W.A Capital",
        ogDescription: "Informações importantes sobre o conteúdo divulgado pela A.W.A Capital.",
      },
      loaderData?.settings,
      "/avisos-legais",
    ),
  component: AvisosLegais,
});

function AvisosLegais() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
