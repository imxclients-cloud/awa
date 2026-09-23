import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

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
  component: InformacoesRegulatorias,
});

// TODO(jurídico): validar o texto com o jurídico e substituir os dados entre colchetes
// (razão social, CNPJ, sócios responsáveis e endereço) pelos dados oficiais.
const sections: LegalSection[] = [
  {
    id: "estrutura-regulatoria",
    title: "Estrutura regulatória e forma de atuação",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital ([inserir razão social], CNPJ [inserir CNPJ]) atua como escritório de agentes autônomos de investimento, nos termos da regulamentação editada pela Comissão de Valores Mobiliários (CVM), em especial a Resolução CVM nº 178/2023, que dispõe sobre a atividade de agente autônomo de investimento.",
      },
      {
        kind: "list",
        items: [
          "Os agentes autônomos atuam exclusivamente por intermédio de instituições integrantes do sistema de distribuição de valores mobiliários com as quais mantenham contrato.",
          "Os agentes autônomos não administram carteiras, não custodiam recursos ou valores mobiliários e não recebem recursos de investidores.",
          "A intermediação, a custódia, a liquidação e a guarda dos ativos ocorrem no âmbito das instituições integrantes do sistema de distribuição.",
          "A atuação observa o Código de Ética e as regras de conduta aplicáveis ao mercado de capitais e às associações representativas do setor.",
        ],
      },
    ],
  },
  {
    id: "credenciamento-xp",
    title: "Credenciamento à XP Investimentos",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital é um escritório credenciado à XP Investimentos CCTVM S.A., instituição autorizada a funcionar pelo Banco Central do Brasil e integrante do sistema de distribuição de valores mobiliários. Nosso time atua amparado pelos contratos celebrados entre o escritório e a instituição credenciadora.",
      },
      {
        kind: "p",
        text: "Serviços como abertura de conta, execução de ordens, custódia, transferência de titularidade e envio de informes de rendimentos são prestados pela instituição credenciadora, com o apoio operacional do nosso time de assessoria.",
      },
    ],
  },
  {
    id: "suitability",
    title: "Adequação do perfil do investidor (suitability)",
    blocks: [
      {
        kind: "p",
        text: "Em conformidade com a Resolução CVM nº 30/2021, a recomendação de produtos e serviços de investimento é precedida de análise do perfil do investidor, considerando objetivos, situação financeira, conhecimento em investimentos e tolerância a riscos.",
      },
      {
        kind: "p",
        text: "O investidor deve manter seus dados cadastrais atualizados e informar qualquer alteração relevante em sua situação financeira ou em seus objetivos, de modo que as recomendações permaneçam adequadas ao seu perfil.",
      },
    ],
  },
  {
    id: "remuneracao",
    title: "Formas de remuneração",
    blocks: [
      {
        kind: "p",
        text: "A remuneração da A.W.A Capital decorre de contratos firmados com as instituições com as quais mantém relação de credenciamento ou de distribuição, podendo incluir:",
      },
      {
        kind: "list",
        items: [
          "parcela de remuneração pela distribuição de produtos de investimento, conforme percentuais definidos pela instituição;",
          "remuneração relacionada a serviços de assessoria e acompanhamento prestados ao cliente;",
          "receitas associadas a produtos e serviços específicos, conforme tabelas vigentes das instituições.",
        ],
      },
      {
        kind: "p",
        text: "Eventuais custos, taxas e tributos incidentes sobre os investimentos constam dos documentos oficiais dos produtos e são informados ao cliente antes da contratação.",
      },
    ],
  },
  {
    id: "conflitos-interesse",
    title: "Conflitos de interesse e transparência",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital adota políticas internas destinadas a identificar, mitigar e divulgar situações que possam configurar conflito de interesse, incluindo a existência de remuneração diferenciada entre produtos e a participação em operações de distribuição.",
      },
      {
        kind: "p",
        text: "O cliente pode solicitar, a qualquer momento, informações sobre a remuneração recebida pelo escritório em razão de suas recomendações, bem como sobre eventuais interesses envolvidos nas operações apresentadas.",
      },
    ],
  },
  {
    id: "sigilo-seguranca",
    title: "Sigilo, segurança da informação e prevenção à fraude",
    blocks: [
      {
        kind: "p",
        text: "As informações do cliente são tratadas com sigilo, observadas as obrigações legais aplicáveis, e utilizadas conforme a nossa Política de Privacidade. A A.W.A Capital mantém controles de segurança da informação e procedimentos de prevenção à lavagem de dinheiro e ao financiamento do terrorismo.",
      },
      {
        kind: "list",
        items: [
          "Nunca solicitamos senhas, tokens de acesso ou códigos de verificação por telefone, e-mail ou mensagem.",
          "Não solicitamos transferências ou pagamentos a contas de pessoas físicas em nome do escritório.",
          "Em caso de contato suspeito, interrompa a comunicação e confirme a autenticidade pelos canais oficiais divulgados nesta página.",
        ],
      },
    ],
  },
  {
    id: "canais-atendimento",
    title: "Atendimento, sugestões e reclamações",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital se compromete a receber, registrar e tratar sugestões, dúvidas e reclamações de clientes e do público em geral, adotando as providências necessárias e mantendo o interessado informado sobre o andamento do atendimento.",
      },
      {
        kind: "list",
        items: [
          "Atendimento pelo WhatsApp: (98) 98114-5929",
          "E-mail: [inserir e-mail de atendimento]",
          "Horário de atendimento: dias úteis, das 9h às 18h",
          "Ouvidoria da instituição credenciadora (XP Investimentos): canal disponível nos canais oficiais da instituição, para as matérias de sua competência",
          "Comissão de Valores Mobiliários (CVM): www.gov.br/cvm",
          "Banco Central do Brasil (para assuntos bancários): www.bcb.gov.br",
          "Consumidor.gov.br e Procons, para as demandas de natureza consumerista",
        ],
      },
      {
        kind: "p",
        text: "Reclamações relacionadas diretamente a produtos, ordens executadas, custódia ou saldos devem ser direcionadas à instituição responsável pela prestação do serviço, cabendo à A.W.A Capital prestar o suporte necessário ao cliente no acompanhamento da demanda.",
      },
    ],
  },
  {
    id: "dados-cadastrais",
    title: "Atualização de dados e informações cadastrais",
    blocks: [
      {
        kind: "p",
        text: "O cliente é responsável pela veracidade, exatidão e atualidade das informações prestadas, comprometendo-se a comunicar alterações de endereço, telefone, e-mail, situação financeira ou patrimonial, conforme exigido pela regulamentação aplicável.",
      },
    ],
  },
  {
    id: "atualizacoes",
    title: "Atualizações destas informações",
    blocks: [
      {
        kind: "p",
        text: "Estas Informações Regulatórias podem ser atualizadas em razão de alterações na legislação, na regulamentação ou na estrutura do escritório. A versão vigente é sempre a publicada nesta página, com a data de última atualização indicada no topo.",
      },
      {
        kind: "p",
        text: "Dúvidas sobre estas informações podem ser encaminhadas ao nosso time pelos canais de atendimento indicados acima.",
      },
    ],
  },
];

const footnote =
  "As informações desta página são divulgadas em atendimento às boas práticas de transparência do mercado de valores mobiliários e complementam os Avisos Legais, os Termos de Uso e a Política de Privacidade da A.W.A Capital.";

function InformacoesRegulatorias() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Informações Regulatórias"
      updatedAt="23 de setembro de 2026"
      intro="Reunimos aqui as informações sobre a nossa estrutura regulatória, o credenciamento à XP Investimentos, as formas de remuneração do escritório, o tratamento de conflitos de interesse e os canais oficiais de atendimento e reclamação."
      sections={sections}
      footnote={footnote}
    />
  );
}
