import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { loadLegalPage } from "@/lib/page-data.server";
import { legalPageHead } from "@/lib/legal-seo";

export const Route = createFileRoute("/termos-de-uso")({
  loader: async () => loadLegalPage({ data: { slug: "termos-de-uso" } }),
  head: ({ loaderData }) =>
    legalPageHead(
      loaderData?.doc,
      {
        title: "Termos de Uso — A.W.A Capital",
        description:
          "Condições de acesso e uso do site da A.W.A Capital, vedações, propriedade intelectual, limitação de responsabilidade e legislação aplicável.",
        ogTitle: "Termos de Uso — A.W.A Capital",
        ogDescription: "Regras de utilização do site da A.W.A Capital e responsabilidades do usuário.",
      },
      loaderData?.settings,
      "/termos-de-uso",
    ),
  component: TermosDeUso,
});

function TermosDeUso() {
  const { doc, settings } = Route.useLoaderData();
  return <LegalPage doc={doc} settings={settings} />;
}
