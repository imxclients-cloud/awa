import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — A.W.A Capital" },
      {
        name: "description",
        content:
          "Condições de acesso e uso do site da A.W.A Capital, vedações, propriedade intelectual, limitação de responsabilidade e legislação aplicável.",
      },
      { property: "og:title", content: "Termos de Uso — A.W.A Capital" },
      {
        property: "og:description",
        content: "Regras de utilização do site da A.W.A Capital e responsabilidades do usuário.",
      },
    ],
  }),
  loader: async () => loadLegalPage({ data: { slug: "termos-de-uso" } }),
  component: TermosDeUso,
});

function TermosDeUso() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
