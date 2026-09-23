import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

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
  component: AvisosLegais,
});

// TODO(jurídico): validar o texto com o jurídico e ajustar referências regulatórias
// conforme o material oficial enviado pela XP.
const sections: LegalSection[] = [
  {
    id: "natureza-informativa",
    title: "Natureza informativa do conteúdo",
    blocks: [
      {
        kind: "p",
        text: "Todo o conteúdo publicado neste site, em materiais impressos e em nossos canais digitais tem caráter meramente informativo e educacional. Nenhuma informação deve ser interpretada como oferta, solicitação, recomendação personalizada de investimento, análise de valores mobiliários ou garantia de resultado.",
      },
      {
        kind: "p",
        text: "Decisões de investimento devem ser tomadas com base na análise individual de cada investidor, à luz de seus objetivos, horizonte de investimento, situação financeira e tolerância a risco, após o devido processo de adequação de perfil (suitability) realizado junto à instituição distribuidora.",
      },
    ],
  },
  {
    id: "rentabilidade",
    title: "Ausência de garantia de rentabilidade",
    blocks: [
      {
        kind: "p",
        text: "Rentabilidade passada não representa garantia de rentabilidade futura. Investimentos envolvem riscos, incluindo a possibilidade de perda do capital investido.",
      },
      {
        kind: "p",
        text: "Determinados produtos podem estar sujeitos a riscos adicionais, como risco de crédito, risco de mercado, risco de liquidez, risco de câmbio e risco de concentração. Antes de investir, leia atentamente o regulamento, o material informativo e a lâmina de informações essenciais do produto indicado.",
      },
    ],
  },
  {
    id: "relacao-xp",
    title: "Relação com instituições parceiras",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital é um escritório de agentes autônomos de investimento credenciado à XP Investimentos CCTVM S.A. Os agentes autônomos atuam por intermédio de instituições integrantes do sistema de distribuição de valores mobiliários e não integram o quadro de funcionários da instituição credenciadora.",
      },
      {
        kind: "p",
        text: "Os produtos e serviços mencionados neste site são ofertados e contratados junto às instituições com as quais a A.W.A Capital mantém contrato, observadas as regras de atuação, os limites operacionais e a política de remuneração aplicável ao escritório.",
      },
    ],
  },
  {
    id: "produtos-servicos",
    title: "Produtos, serviços e informações de terceiros",
    blocks: [
      {
        kind: "p",
        text: "As descrições de produtos, taxas, prazos e condições podem ser alteradas pelas instituições emissoras ou distribuidoras sem aviso prévio. As informações vigentes são sempre aquelas divulgadas nos documentos oficiais dos produtos.",
      },
      {
        kind: "p",
        text: "Os resultados de consultorias, planejamentos, projeções ou simulações apresentados pela A.W.A Capital são estimativas baseadas em premissas informadas pelo cliente e em cenários econômicos conhecidos na data de elaboração, não constituindo promessa de desempenho futuro.",
      },
    ],
  },
  {
    id: "uso-material",
    title: "Uso dos materiais e direitos autorais",
    blocks: [
      {
        kind: "p",
        text: "Materiais informativos, apresentações, relatórios e conteúdos publicados pela A.W.A Capital são de uso pessoal e não podem ser reproduzidos, redistribuídos ou comercializados sem autorização prévia e escrita do escritório.",
      },
      {
        kind: "p",
        text: "Marcas, nomes empresariais e logotipos de terceiros, incluindo XP Investimentos, pertencem aos seus respectivos titulares e são utilizados apenas para identificar a relação contratual existente, sem qualquer vínculo societário além do credenciamento.",
      },
    ],
  },
  {
    id: "comunicacoes",
    title: "Comunicações e privacidade",
    blocks: [
      {
        kind: "p",
        text: "O envio de comunicações informativas e de marketing observa a nossa Política de Privacidade e a Lei nº 13.709/2018 (LGPD). O titular pode, a qualquer momento, solicitar o cancelamento do recebimento dessas comunicações pelos nossos canais de atendimento.",
      },
      {
        kind: "p",
        text: "A A.W.A Capital não solicita senhas, tokens ou transferências financeiras por e-mail, telefone ou redes sociais. Em caso de comunicado suspeito, confirme a autenticidade com o seu assessor pelos canais oficiais.",
      },
    ],
  },
  {
    id: "limitacao",
    title: "Limitação de responsabilidade sobre informações",
    blocks: [
      {
        kind: "p",
        text: "As informações, projeções e cenários divulgados podem ser alterados a qualquer momento, sem aviso prévio, e não constituem promessa, garantia ou compromisso de resultado por parte da A.W.A Capital, das instituições parceiras ou de seus respectivos colaboradores.",
      },
      {
        kind: "p",
        text: "A A.W.A Capital não se responsabiliza por decisões tomadas com base exclusiva em conteúdo informativo, sem a devida análise do perfil do investidor e a leitura dos documentos oficiais dos produtos.",
      },
    ],
  },
  {
    id: "atualizacoes-avisos",
    title: "Atualizações destes avisos",
    blocks: [
      {
        kind: "p",
        text: "Estes Avisos Legais podem ser atualizados para refletir mudanças na legislação, na regulamentação ou nas nossas práticas internas. A versão vigente é sempre a publicada nesta página, com a data de última atualização indicada no topo.",
      },
    ],
  },
];

const footnote =
  "Este documento deve ser lido em conjunto com os Termos de Uso, as Informações Regulatórias e a Política de Privacidade da A.W.A Capital. Dúvidas podem ser encaminhadas pelos nossos canais de atendimento.";

function AvisosLegais() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Avisos legais"
      updatedAt="23 de setembro de 2026"
      intro="Estes avisos esclarecem a natureza informativa do conteúdo que divulgamos, os riscos inerentes aos investimentos e os limites da atuação da A.W.A Capital como escritório de agentes autônomos de investimento credenciado à XP Investimentos."
      sections={sections}
      footnote={footnote}
    />
  );
}
