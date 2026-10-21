import fotoClaudia from "@/assets/diretoria-claudia-von-sohsten.png";
import fotoGustavo from "@/assets/diretoria-gustavo-matos.png";
import fotoNazareno from "@/assets/Naza 2.jpeg";
import fotoMarcia from "@/assets/marcia-tavares.jpeg";
import fotoRafael from "@/assets/rafael-feitosa.jpeg";
import fotoGilson from "@/assets/gilson-valandro.jpeg";
import fotoElon from "@/assets/elon-lima-2.jpeg";

/**
 * Dados dos profissionais da equipe da A.W.A Capital.
 * Origem: documento de ajustes do cliente (Diretoria + Especialistas, out/2025).
 */
export type Profissional = {
  nome: string;
  cargo: string;
  bio: string;
  foto: string;
};

/** Diretoria — ordem definida pelo cliente: Nazareno, Cláudia e Gustavo. */
export const diretoria: Profissional[] = [
  {
    nome: "Nazareno Carvalho de Lima",
    cargo: "CEO e Fundador",
    bio: "Mais de 20 anos de experiência no mercado financeiro, especialista em atendimento de clientes Private.",
    foto: fotoNazareno,
  },
  {
    nome: "Claudia Von Sohsten Florêncio",
    cargo: "Diretora Comercial",
    bio: "Mais de 30 anos de experiência no mercado financeiro com passagens por grandes instituições.",
    foto: fotoClaudia,
  },
  {
    nome: "Gustavo Henrique de Almeida Matos",
    cargo: "Diretor de Produtos",
    bio: "Experiência desde 2017 em gestão patrimonial, alocação de ativos, construção de portfólios e assessoria de investimentos. Possui certificações CFA, CGA e Ancord.",
    foto: fotoGustavo,
  },
];

export type Especialista = {
  nome: string;
  funcao: string;
  /** Caminho da foto em /public/assessores. Ausente quando não há imagem. */
  foto?: string;
};

const fotoEspecialista = (arquivo: string) => `/assessores/${arquivo}`;

/** Especialistas — agrupados de 4 em 4, somente nome e função. */
export const especialistas: Especialista[] = [
  {
    nome: "Carlos Ragner",
    funcao: "Crédito e BackOffice",
    foto: fotoEspecialista("CARLOS.jpeg"),
  },
  {
    nome: "Duda Florêncio",
    funcao: "Investor Recife e Fortaleza",
    foto: fotoEspecialista("MARIA EDUARDA.jpeg"),
  },
  {
    nome: "Elon Lima",
    funcao: "Investor São Luís",
    foto: fotoElon,
  },
  {
    nome: "Maurício Sampaio",
    funcao: "Head PJ",
    foto: fotoEspecialista("MAURICIO.jpeg"),
  },
  {
    nome: "Augusto Leal",
    funcao: "Especialista PJ e Câmbio",
    foto: fotoEspecialista("AUGUSTO.jpeg"),
  },
  {
    nome: "Márcia Tavares",
    funcao: "Estratégias de Aquisição de Bens",
    foto: fotoMarcia,
  },
  {
    nome: "Rafael Feitosa",
    funcao: "Proteção Empresarial",
    foto: fotoRafael,
  },
  {
    nome: "Gilson Valandro",
    funcao: "Proteção e Sucessão Patrimonial",
    foto: fotoGilson,
  },
];
