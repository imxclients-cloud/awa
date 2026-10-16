import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

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
  component: TermosDeUso,
});

// TODO(jurídico): validar o texto com o jurídico e substituir os dados entre colchetes
// (razão social, CNPJ e comarca do foro) pelos dados oficiais.
const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos termos",
    blocks: [
      {
        kind: "p",
        text: "Este site é de titularidade de A.W.A Capital ([inserir razão social], CNPJ [inserir CNPJ]) e seu acesso é regido por estes Termos de Uso. Ao navegar ou utilizar qualquer funcionalidade do site, o usuário declara ter lido, compreendido e aceito integralmente as condições aqui previstas.",
      },
      {
        kind: "p",
        text: "Caso não concorde com estes termos, o usuário deve interromper o uso do site. Este documento pode ser atualizado a qualquer momento, e a versão vigente é sempre a publicada nesta página.",
      },
    ],
  },
  {
    id: "finalidade",
    title: "Finalidade e conteúdo do site",
    blocks: [
      {
        kind: "p",
        text: "O site tem caráter institucional e informativo. Seu objetivo é apresentar a A.W.A Capital, sua equipe, sua metodologia de trabalho e as soluções de assessoria de investimentos, planejamento patrimonial e serviços financeiros disponibilizados por intermédio de instituições autorizadas.",
      },
      {
        kind: "p",
        text: "As informações publicadas não constituem consultoria, recomendação personalizada ou oferta de produtos e serviços, que dependem de análise prévia, da coleta de dados do investidor e da contratação formal junto às instituições competentes.",
      },
    ],
  },
  {
    id: "ausencia-oferta",
    title: "Ausência de oferta, recomendação ou consultoria",
    blocks: [
      {
        kind: "p",
        text: "Nenhuma informação contida neste site deve ser interpretada como oferta pública de distribuição de valores mobiliários, recomendação de investimento ou análise de valores mobiliários, nos termos da regulamentação da Comissão de Valores Mobiliários (CVM).",
      },
      {
        kind: "p",
        text: "Eventuais ofertas ocorrerão exclusivamente por meio dos documentos próprios de cada operação e somente aos investidores que atendam aos requisitos legais aplicáveis, conforme a Resolução CVM nº 160 e as demais normas vigentes.",
      },
    ],
  },
  {
    id: "uso-permitido",
    title: "Uso permitido e vedações",
    blocks: [
      {
        kind: "p",
        text: "O usuário compromete-se a utilizar o site de forma lícita, não sendo permitido:",
      },
      {
        kind: "list",
        items: [
          "utilizar mecanismos automatizados capazes de sobrecarregar, prejudicar ou realizar cópia massiva do site e de seu conteúdo;",
          "tentar obter acesso não autorizado a áreas restritas, servidores, bancos de dados ou sistemas da A.W.A Capital;",
          "inserir códigos maliciosos, informações falsas ou conteúdo ilícito em qualquer formulário ou canal disponibilizado;",
          "reproduzir, distribuir, sublicenciar ou explorar comercialmente o conteúdo do site sem autorização prévia e escrita;",
          "utilizar o site para finalidades que contrariem a legislação aplicável ao mercado financeiro.",
        ],
      },
    ],
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade intelectual",
    blocks: [
      {
        kind: "p",
        text: "Marcas, logotipos, textos, imagens, layout, base de dados e demais elementos do site são protegidos pela legislação de propriedade intelectual e pertencem à A.W.A Capital ou a terceiros que autorizaram seu uso. O acesso ao site não implica qualquer cessão ou licença de uso a favor do usuário.",
      },
      {
        kind: "p",
        text: "Marcas de terceiros eventualmente mencionadas — incluindo XP Investimentos — pertencem aos seus respectivos titulares e são utilizadas apenas para identificar a relação contratual de credenciamento existente.",
      },
    ],
  },
  {
    id: "links-terceiros",
    title: "Links de terceiros",
    blocks: [
      {
        kind: "p",
        text: "O site pode conter links para páginas de terceiros. A A.W.A Capital não controla, não administra nem se responsabiliza pelo conteúdo, pelas políticas de privacidade ou pelas práticas desses ambientes externos, cabendo ao usuário avaliar o risco de navegar em tais endereços.",
      },
    ],
  },
  {
    id: "responsabilidade",
    title: "Limitação de responsabilidade",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital adota esforços razoáveis para manter as informações do site corretas e atualizadas, mas não garante que o conteúdo esteja livre de erros, omissões ou interrupções de acesso.",
      },
      {
        kind: "p",
        text: "A A.W.A Capital não se responsabiliza por decisões de investimento tomadas exclusivamente com base em informações disponibilizadas neste site, nem por danos diretos ou indiretos decorrentes de falhas de conexão, indisponibilidade do serviço, uso indevido por terceiros ou caso fortuito e força maior.",
      },
      {
        kind: "p",
        text: "Produtos e serviços podem ser alterados ou descontinuados e parceiros podem ser substituídos, sem aviso prévio, respeitadas as obrigações contratuais em vigor.",
      },
    ],
  },
  {
    id: "privacidade",
    title: "Privacidade e proteção de dados",
    blocks: [
      {
        kind: "p",
        text: "O tratamento de dados pessoais realizado a partir do uso deste site segue a nossa Política de Privacidade, complementada pelos Avisos Legais e pelas Informações Regulatórias, que integram estes Termos de Uso para todos os fins.",
      },
    ],
  },
  {
    id: "legislacao-foro",
    title: "Legislação aplicável e foro",
    blocks: [
      {
        kind: "p",
        text: "Estes Termos de Uso são regidos pela legislação brasileira, em especial pelo Código Civil, pelo Código de Defesa do Consumidor, quando aplicável, e pela regulamentação da CVM pertinente ao mercado de valores mobiliários.",
      },
      {
        kind: "p",
        text: "Fica eleito o foro da comarca de [inserir comarca] para dirimir eventuais controvérsias decorrentes deste documento, ressalvado o direito do consumidor de demandar no foro de seu domicílio.",
      },
    ],
  },
  {
    id: "contato-termos",
    title: "Contato",
    blocks: [
      {
        kind: "p",
        text: "Dúvidas sobre estes Termos de Uso podem ser encaminhadas pelos canais de atendimento da A.W.A Capital, inclusive pelo WhatsApp (98) 98114-5929, ou por meio dos endereços indicados nas Informações Regulatórias.",
      },
    ],
  },
];

const footnote =
  "A A.W.A Capital é um escritório de agentes autônomos de investimento credenciado à XP Investimentos CCTVM S.A. Este material tem caráter meramente informativo e não deve ser considerado oferta, recomendação ou análise de investimento.";

function TermosDeUso() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Termos de Uso"
      updatedAt="23 de setembro de 2026"
      intro="Estes termos estabelecem as condições para acesso e uso do site da A.W.A Capital, as responsabilidades do usuário, as limitações aplicáveis ao conteúdo publicado e a legislação que rege essa relação."
      sections={sections}
      footnote={footnote}
    />
  );
}
