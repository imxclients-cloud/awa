import fotoClaudia from "@/assets/diretoria-claudia-von-sohsten.png";
import fotoGustavo from "@/assets/diretoria-gustavo-matos.png";
import fotoNazareno from "@/assets/Naza 2.jpeg";
import fotoRaphael from "@/assets/diretoria-raphael-vidal.png";

/**
 * Dados dos profissionais da diretoria da A.W.A Capital.
 * Origem: documento institucional "Diretoria.docx" (foto + cargo + minibio + responsabilidades).
 */
export type Profissional = {
  nome: string;
  cargo: string;
  bio: string;
  foto: string;
  responsabilidades?: string[];
};

export const diretoria: Profissional[] = [
  {
    nome: "Claudia Von Sohsten Florencio",
    cargo: "Diretora Comercial",
    bio: "Sócia Diretora há 6 anos, com experiência desde 2008 na área Financeira. Possui certificados CEA, Certificado de Especialista de Investimentos e Ancord.",
    foto: fotoClaudia,
  },
  {
    nome: "Nazareno Carvalho de Lima",
    cargo: "CEO",
    bio: "CEO e fundador da A.W.A Capital. Com experiência desde 2011 na área Financeira.",
    foto: fotoNazareno,
  },
  {
    nome: "Gustavo Henrique de Almeida Matos",
    cargo: "Diretor de Produtos",
    bio: "Sócio e Diretor, com experiência desde 2017 em gestão patrimonial, alocação de ativos, construção de portfólios e assessoria de investimentos. Lidera a estratégia de produtos de investimento para clientes de alta renda e investidores com diferentes perfis de risco. Possui certificados CFA, CGA e Ancord.",
    foto: fotoGustavo,
    responsabilidades: [
      "Garantir que a definição estabelecida pelo Comitê de Alocação Alphaways seja multiplicada em todas as sedes;",
      "Garantir a execução de todas as operações de Alocações, Renda Variável, Renda Fixa e demais produtos, conforme estratégia definida no Comitê de Alocação, potencializando o retorno sobre o patrimônio dos clientes;",
      "Garantir o atendimento personalizado a cada cliente investidor dando suporte e instruindo na formação do assessor;",
      "Realizar o onboarding de cada investidor;",
      "Garantir a sinergia e a entrega dos resultados do seu time;",
      "Responsável pela sinergia entre as áreas de alocação e os assessores;",
      "Garantir a padronização da carteira dos clientes da Alphaways, conforme estratégia definida no Comitê de Alocação;",
      "Maximizar a geração de receita e do ROA da Alphaways em conformidade aos objetivos de longo prazo contratualizados junto à XP;",
      "Responsável pela comunicação com as casas de análise e com as gestoras;",
      "Realizar a gestão de todos os Investors, Mesas e demais especialistas, incluindo a Endexa;",
      "Liderar o Comitê de Alocação Alphaways.",
    ],
  },
  {
    nome: "Raphael Ferreira Vidal",
    cargo: "Head de Gestão e Pessoas",
    bio: "Sócio, com experiência desde 2015 na área de Planejamento, Atendimento e Relacionamento com Clientes. Atua na área de Expansão e possui certificados do CEA e Ancord.",
    foto: fotoRaphael,
    responsabilidades: [
      "Responsável por construir e desenvolver com a equipe o plano estratégico da instituição, bem como os seus desdobramentos em: marketing, financeiro, pessoal e experiência do cliente;",
      "Coordenar o processo orçamentário anual junto às áreas da Sociedade;",
      "Estruturar e desdobrar as metas e indicadores do negócio nos Cards de Objetivos das Áreas;",
      "Prestar todo o auxílio e suporte ao corpo diretivo e ao Sr. Nazareno Lima, auxiliando no desenvolvimento de diretrizes e iniciativas estratégicas (Partnership, Super Ranking, Campanhas, entre outros);",
      "Implantar e coordenar o processo de acompanhamento dos resultados (Ns), bem como garantir a consistência e execução das ações/projetos propostos pelas áreas;",
      "Identificar e propor ações que garantam a melhoria de performance e sustentabilidade do negócio no longo prazo;",
      "Coordenar e direcionar as equipes sob sua gestão para que alcancem os seus Cards de Metas;",
      "Ser um embaixador da Missão, Visão e Valores da Sociedade com público interno e externo;",
      "Empregar seus melhores esforços para sempre manter-se atualizado sobre o mercado financeiro, especialmente analisando e tentando identificar os planos de ação dos concorrentes da Sociedade;",
      "Gerenciar as equipes associadas a setores de Gente e Cultura, Jurídico, Governança Corporativa, Financeiro, Contabilidade, Experiência do Cliente, Marketing e Dados;",
      "Liderar o time responsável pela expansão e assessoria do negócio;",
      "Busca contínua pela inovação e pioneirismo no mercado de investimentos no Brasil, com iniciativas inovadoras e com foco no cliente;",
      "Garantir a sustentabilidade do negócio com foco nos indicadores, sistemas e informações confidenciais e finanças da Alphaways;",
      "Garantir o desenvolvimento, direcionamento e servidão do time Alphaways com foco no resultado, visão estratégica e cultura da performance dentro do ambiente Alphaways;",
      "Apoiar a formação de novos líderes e assessores de investimentos com a cultura Alphaways;",
      "Garantir o atingimento dos principais indicadores dos negócios como margem líquida, VPL, ROE e TIR;",
      "Promover a expansão do negócio com alta qualidade de bankers do segmento de alta renda, com foco no cliente, estratégia e velocidade;",
      "Acelerar o crescimento da Alphaways frente ao mercado de escritórios credenciados da XP Investimentos.",
    ],
  },
];
