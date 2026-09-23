import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — A.W.A Capital" },
      {
        name: "description",
        content:
          "Saiba como a A.W.A Capital coleta, utiliza, armazena e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
      },
      { property: "og:title", content: "Política de Privacidade — A.W.A Capital" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais e direitos dos titulares na A.W.A Capital.",
      },
    ],
  }),
  component: PoliticaDePrivacidade,
});

// TODO(jurídico): validar o texto com o jurídico e substituir os dados entre colchetes
// (razão social, CNPJ, e-mail do Encarregado e endereço) pelos dados oficiais.
const sections: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem somos e abrangência",
    blocks: [
      {
        kind: "p",
        text: "A A.W.A Capital ([inserir razão social], CNPJ [inserir CNPJ]) é um escritório de agentes autônomos de investimento credenciado à XP Investimentos CCTVM S.A. Esta Política de Privacidade descreve como tratamos os dados pessoais coletados em nosso site, em nossos canais de atendimento e nas relações comerciais e contratuais que mantemos com clientes, prospects, candidatos e parceiros.",
      },
      {
        kind: "p",
        text: "O tratamento de dados pessoais é realizado em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD), com a regulamentação da Comissão de Valores Mobiliários (CVM) e com as demais normas aplicáveis ao mercado financeiro.",
      },
    ],
  },
  {
    id: "dados-coletados",
    title: "Dados pessoais que coletamos",
    blocks: [
      {
        kind: "p",
        text: "Coletamos apenas os dados necessários para as finalidades descritas nesta política, incluindo:",
      },
      {
        kind: "list",
        items: [
          "Dados de identificação e contato: nome, e-mail, telefone/WhatsApp, cidade e perfil profissional informados voluntariamente em formulários.",
          "Dados de cadastro e relacionamento: informações necessárias à abertura de conta, à análise de perfil de investidor (suitability) e à execução de ordens junto às instituições parceiras.",
          "Dados patrimoniais e financeiros: informações sobre objetivos, horizonte de investimento, patrimônio e tolerância a risco fornecidas pelo titular.",
          "Dados de navegação: registros de acesso, endereço IP, tipo de dispositivo e navegador, páginas visitadas e preferências, obtidos por meio de cookies e tecnologias similares.",
        ],
      },
      {
        kind: "p",
        text: "Não coletamos dados pessoais sensíveis nem dados de crianças e adolescentes em nosso site. Caso dados sensíveis sejam necessários para atender a exigências regulatórias específicas, a coleta ocorrerá de forma apartada, com finalidade determinada e base legal própria.",
      },
    ],
  },
  {
    id: "finalidades-bases-legais",
    title: "Finalidades e bases legais do tratamento",
    blocks: [
      {
        kind: "list",
        items: [
          "Execução de contrato e de procedimentos preliminares: prestação de assessoria de investimentos, cadastro, análise de perfil e atendimento solicitado pelo titular.",
          "Cumprimento de obrigação legal ou regulatória: guarda de registros, prevenção à lavagem de dinheiro e ao financiamento do terrorismo, atendimento a órgãos reguladores e autoridades fiscais.",
          "Legítimo interesse: segurança da informação, prevenção a fraudes, melhoria de produtos e serviços e relacionamento institucional, sempre com avaliação prévia e respeito aos direitos do titular.",
          "Consentimento: envio de comunicações de marketing, convites para eventos e conteúdos informativos, quando aplicável e revogável a qualquer momento.",
          "Exercício regular de direitos: defesa em processos administrativos, judiciais ou arbitrais.",
        ],
      },
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de dados",
    blocks: [
      {
        kind: "p",
        text: "Os dados pessoais podem ser compartilhados com as instituições com as quais mantemos relação contratual e com prestadores de serviços que atuam em nosso nome, sempre limitados à finalidade informada:",
      },
      {
        kind: "list",
        items: [
          "Instituições integrantes do sistema de distribuição de valores mobiliários, em especial a XP Investimentos CCTVM S.A., para cadastro, envio de ordens e registro das operações.",
          "Órgãos reguladores, autoridades fiscais, judiciais e administrativas, quando houver determinação legal ou regulatória.",
          "Prestadores de tecnologia, hospedagem, comunicação e segurança da informação, sob contratos com obrigações de confidencialidade e proteção de dados.",
        ],
      },
      {
        kind: "p",
        text: "Não comercializamos dados pessoais e não compartilhamos informações com terceiros para finalidades próprias destes terceiros sem amparo legal.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies e tecnologias de navegação",
    blocks: [
      {
        kind: "p",
        text: "Utilizamos cookies e tecnologias similares para o funcionamento adequado do site, para medição de audiência e para personalização de conteúdo. Você pode gerenciar ou desativar cookies nas configurações do seu navegador; a desativação de cookies necessários pode impactar funcionalidades do site.",
      },
      {
        kind: "p",
        text: "Ferramentas de terceiros eventualmente utilizadas (como soluções de analytics e de anúncios) seguem as políticas de privacidade de seus respectivos fornecedores.",
      },
    ],
  },
  {
    id: "armazenamento-seguranca",
    title: "Armazenamento, segurança e retenção",
    blocks: [
      {
        kind: "p",
        text: "Adotamos medidas técnicas e administrativas destinadas a proteger os dados pessoais contra acessos não autorizados, perda, alteração, destruição ou qualquer forma de tratamento inadequado, incluindo controle de acesso, criptografia de transporte e segregação de ambientes.",
      },
      {
        kind: "p",
        text: "Os dados são mantidos pelo tempo necessário ao cumprimento das finalidades desta política e pelos prazos de guarda exigidos pela legislação e pela regulamentação aplicável. Encerrados esses prazos, os dados são eliminados ou anonimizados, ressalvadas as hipóteses legais de conservação.",
      },
    ],
  },
  {
    id: "direitos-titular",
    title: "Direitos dos titulares",
    blocks: [
      {
        kind: "p",
        text: "Nos termos do artigo 18 da LGPD, o titular pode solicitar, a qualquer momento:",
      },
      {
        kind: "list",
        items: [
          "confirmação da existência de tratamento e acesso aos dados;",
          "correção de dados incompletos, inexatos ou desatualizados;",
          "anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;",
          "portabilidade, nos termos da regulamentação aplicável;",
          "eliminação dos dados tratados com base no consentimento, ressalvadas as hipóteses de conservação obrigatória;",
          "informação sobre entidades com as quais os dados foram compartilhados;",
          "informação sobre a possibilidade de não fornecer consentimento e suas consequências;",
          "revogação do consentimento, quando essa for a base legal do tratamento;",
          "oposição a tratamentos realizados sem o seu consentimento, quando houver descumprimento da LGPD.",
        ],
      },
      {
        kind: "p",
        text: "As solicitações podem ser feitas pelos canais indicados ao final desta política e serão respondidas nos prazos previstos na legislação. Poderemos solicitar informações adicionais para confirmar a identidade do solicitante, como medida de segurança.",
      },
    ],
  },
  {
    id: "encarregado-contato",
    title: "Encarregado (DPO) e canal de contato",
    blocks: [
      {
        kind: "p",
        text: "O encarregado pelo tratamento de dados pessoais (DPO) da A.W.A Capital é o responsável por receber comunicações dos titulares e da Autoridade Nacional de Proteção de Dados (ANPD).",
      },
      {
        kind: "list",
        items: [
          "E-mail do Encarregado: [inserir e-mail do Encarregado (DPO)]",
          "Atendimento por WhatsApp: (98) 98114-5929",
          "Endereço: [inserir endereço da sede]",
        ],
      },
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    blocks: [
      {
        kind: "p",
        text: "Esta política pode ser atualizada para refletir mudanças na legislação, na regulamentação ou em nossos processos internos. A versão vigente é sempre a publicada nesta página, com a data de última atualização indicada no topo. Recomendamos a consulta periódica a este documento.",
      },
    ],
  },
];

const footnote =
  "Este documento integra os Avisos Legais e as Informações Regulatórias divulgados pela A.W.A Capital e deve ser lido em conjunto com os Termos de Uso do site.";

function PoliticaDePrivacidade() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Política de Privacidade"
      updatedAt="23 de setembro de 2026"
      intro="Esta política explica como a A.W.A Capital trata os dados pessoais de clientes, visitantes e demais titulares, quais são as finalidades do tratamento, com quem as informações podem ser compartilhadas e como exercer seus direitos previstos na LGPD."
      sections={sections}
      footnote={footnote}
    />
  );
}
