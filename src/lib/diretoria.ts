import fotoClaudia from "@/assets/diretoria-claudia-von-sohsten.png";
import fotoGustavo from "@/assets/diretoria-gustavo-matos.png";
import fotoNazareno from "@/assets/Naza 2.jpeg";
import fotoMarcia from "@/assets/marcia-tavares.jpeg";
import fotoRafael from "@/assets/rafael-feitosa.jpeg";
import fotoGilson from "@/assets/gilson-valandro.jpeg";

/**
 * Diretoria + Especialistas da HOME.
 * Lista SEPARADA dos Assessores de Investimentos (ver src/lib/assessores.ts).
 */
export type Profissional = {
  nome: string;
  cargo: string;
  bio: string;
  foto: string;
};

/** Diretoria — ordem: Nazareno, Cláudia e Gustavo. */
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
  /** Caminho em /public/assessores ou URL de asset importado. */
  foto?: string;
};

const fotoPublic = (arquivo: string) => `/assessores/${arquivo}`;

/**
 * Especialistas da home (8 pessoas) — NÃO é a lista de Assessores.
 * Fotos preferencialmente em /public/assessores quando existirem.
 */
export const especialistas: Especialista[] = [
  {
    nome: "Carlos Ragner",
    funcao: "Crédito e BackOffice",
    foto: fotoPublic("CARLOS.jpeg"),
  },
  {
    nome: "Duda Florêncio",
    funcao: "Investor Recife e Fortaleza",
    foto: fotoPublic("MARIA EDUARDA.jpeg"),
  },
  {
    nome: "Elon Lima",
    funcao: "Investor São Luís",
    foto: fotoPublic("ELON.jpeg"),
  },
  {
    nome: "Maurício Sampaio",
    funcao: "Head PJ",
    foto: fotoPublic("MAURICIO.jpeg"),
  },
  {
    nome: "Augusto Leal",
    funcao: "Especialista PJ e Câmbio",
    foto: fotoPublic("AUGUSTO.jpeg"),
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

/**
 * Aliases de nome (Sanity / nome completo) → chave do especialista local.
 * Usado só para resolver foto quando o CMS manda nome completo.
 */
export const especialistaNomeAliases: Record<string, string> = {
  "carlos ragner monteiro": "carlos ragner",
  "carlos ragner": "carlos ragner",
  "duda florencio": "duda florencio",
  "maria eduarda von sohsten florencio": "duda florencio",
  "maria eduarda": "duda florencio",
  "elon lima": "elon lima",
  "elon vieira lima": "elon lima",
  "mauricio sampaio": "mauricio sampaio",
  "mauricio sergio sampaio dos santos": "mauricio sampaio",
  "augusto leal": "augusto leal",
  "augusto henrique ferreira leal": "augusto leal",
  "marcia tavares": "marcia tavares",
  "rafael feitosa": "rafael feitosa",
  "gilson valandro": "gilson valandro",
};
