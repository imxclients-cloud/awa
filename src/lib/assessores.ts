/**
 * Dados dos Assessores de Investimentos da A.W.A Capital.
 * Origem: planilha institucional "Assessores" (código + nome + e-mail),
 * com fotos disponíveis em /public/assessores.
 */
export type Assessor = {
  codigo: string;
  nome: string;
  email: string;
  /** Caminho da foto em /public/assessores. Ausente quando não há imagem. */
  foto?: string;
};

const foto = (arquivo: string) => `/assessores/${arquivo}`;

export const assessores: Assessor[] = [
  {
    codigo: "A30221",
    nome: "Auricelia Rodrigues Coutinho",
    email: "auricelia.coutinho@grupoawacapital.com.br",
    foto: foto("AURICELIA.jpeg"),
  },
  {
    codigo: "A33583",
    nome: "Carla Alessandra Rodrigues de Araújo",
    email: "carla.araujo@grupoawacapital.com.br",
    foto: foto("CARLA.jpeg"),
  },
  {
    codigo: "A70342",
    nome: "Charles Pierre Fiausino Mendes",
    email: "charles.pierre@grupoawacapital.com.br",
    foto: foto("CHARLES.jpeg"),
  },
  {
    codigo: "A70344",
    nome: "Claudia Von Sohsten Florencio",
    email: "claudia.vonsohsten@grupoawacapital.com.br",
    foto: foto("CLAUDIA.jpeg"),
  },
  {
    codigo: "A27937",
    nome: "Henrique Mateus Moura Machado Almeida",
    email: "henrique.almeida@grupoawacapital.com.br",
    foto: foto("HENRIQUE.jpeg"),
  },
  {
    codigo: "A67893",
    nome: "Nazareno Carvalho De Lima",
    email: "nazareno@grupoawacapital.com.br",
    foto: foto("NAZARENO.jpeg"),
  },
  {
    codigo: "A73339",
    nome: "Ranieri Leirson Sousa De Araujo",
    email: "ranieri.araujo@grupoawacapital.com.br",
    foto: foto("RANIERI.jpeg"),
  },
  {
    codigo: "A28082",
    nome: "Rodrigo Rocha Asevedo",
    email: "rodrigo.rocha@grupoawacapital.com.br",
    foto: foto("RODRIGO.jpeg"),
  },
  {
    codigo: "A31222",
    nome: "Danielly Teles Santana",
    email: "danielly.teles@grupoawacapital.com.br",
    foto: foto("DANIELLY.jpeg"),
  },
  {
    codigo: "A38901",
    nome: "Guilherme Fischer de Araujo",
    email: "guilherme.fischer@grupoawacapital.com.br",
    foto: foto("GUILHERME.jpeg"),
  },
  {
    codigo: "A41632",
    nome: "Gustavo de Ipanema Moreira Pompeu de Sousa Brasil",
    email: "gustavo.pompeu@grupoawacapital.com.br",
    foto: foto("GUSTAVO POMPEU.jpeg"),
  },
  {
    codigo: "A50823",
    nome: "Euraseo Anderson Figueredo de Sousa",
    email: "euraseo.sousa@grupoawacapital.com.br",
    foto: foto("EURASEO.jpeg"),
  },
  {
    codigo: "A50989",
    nome: "Natanael de Araújo Barros",
    email: "natanael.barros@grupoawacapital.com.br",
    foto: foto("NATANAEL.jpeg"),
  },
  {
    codigo: "A51446",
    nome: "John Lucas dos Santos Silva",
    email: "john.lucas@grupoawacapital.com.br",
    foto: foto("JOHN LUCAS.jpeg"),
  },
  {
    codigo: "A51583",
    nome: "Irineu Reis Neto",
    email: "irineu.reis@grupoawacapital.com.br",
    foto: foto("IRINEU.jpeg"),
  },
  {
    codigo: "A53866",
    nome: "Adriano Marcio Almeida Leite",
    email: "adriano.almeida@grupoawacapital.com.br",
    foto: foto("ADRIANO.jpeg"),
  },
  {
    codigo: "A56528",
    nome: "Ricardo Cacciari Baruffaldi",
    email: "ricardo.baruffaldi@grupoawacapital.com.br",
    foto: foto("RICARDO.jpeg"),
  },
  {
    codigo: "A58052",
    nome: "Wandelison Ferreiro de Oliveira",
    email: "wandelison.oliveira@grupoawacapital.com.br",
    foto: foto("WANDER.jpeg"),
  },
  {
    codigo: "A90166",
    nome: "Carlos Victor Saraiva Oliveira",
    email: "victor.saraiva@grupoawacapital.com.br",
    foto: foto("CARLOS VICTOR.jpeg"),
  },
  {
    codigo: "A95668",
    nome: "Matheus Guerra Turton Lopes",
    email: "matheus.turton@grupoawacapital.com.br",
    foto: foto("MATHEUS.jpeg"),
  },
  {
    codigo: "A96531",
    nome: "Felipe Augusto Muniz Coutinho de Melo",
    email: "felipe.coutinho@grupoawacapital.com.br",
    foto: foto("FELIPE.jpeg"),
  },
  {
    codigo: "A97090",
    nome: "Francisco Matheus Sousa Mesquita Silva",
    email: "francisco.matheus@grupoawacapital.com.br",
    foto: foto("FRANCISCO.jpeg"),
  },
  {
    codigo: "A2877",
    nome: "Miguel Fernandes de Lima Neto",
    email: "miguel.fernandes@grupoawacapital.com.br",
    foto: foto("MIGUEL.jpeg"),
  },
  {
    codigo: "A3092",
    nome: "Christiano Pablo Ribeiro da Silva Garcez",
    email: "christianno.garcez@grupoawacapital.com.br",
    foto: foto("CHRISTIANO.jpeg"),
  },
  {
    codigo: "A5241",
    nome: "Bruno Farias de Menezes",
    email: "bruno.farias@grupoawacapital.com.br",
    foto: foto("BRUNO MENEZES.jpeg"),
  },
  {
    codigo: "A97342",
    nome: "Sergio Maia Freire",
    email: "sergio.freire@grupoawacapital.com.br",
    foto: foto("SERGIO.jpeg"),
  },
  {
    codigo: "A70679",
    nome: "Maria Eduarda Von Sohsten Florencio",
    email: "mariaeduarda.florencio@grupoawacapital.com.br",
    foto: foto("MARIA EDUARDA.jpeg"),
  },
  {
    codigo: "A34128",
    nome: "Raphael Ferreira Vidal",
    email: "raphael.vidal@grupoawacapital.com.br",
    foto: foto("RAPHAEL.jpeg"),
  },
  {
    codigo: "A42057",
    nome: "Carlos Ragner Monteiro",
    email: "carlos.ragner@grupoawacapital.com.br",
    foto: foto("CARLOS.jpeg"),
  },
  {
    codigo: "A68663",
    nome: "Gustavo Henrique De Almeida Matos",
    email: "gustavo@grupoawacapital.com.br",
    foto: foto("GUSTAVO MATOS.jpeg"),
  },
  {
    codigo: "A23748",
    nome: "George Do Nascimento Barbosa",
    email: "george@grupoawacapital.com.br",
  },
  {
    codigo: "A95466",
    nome: "Augusto Henrique Ferreira Leal",
    email: "augusto.leal@grupoawacapital.com.br",
    foto: foto("AUGUSTO.jpeg"),
  },
  {
    codigo: "A33637",
    nome: "Daniella Karla de Nóbrega Nunes",
    email: "daniella.nobrega@grupoawacapital.com.br",
  },
  {
    codigo: "A32622",
    nome: "Saulo Cabral Machado",
    email: "saulo.cabral@grupoawacapital.com.br",
    foto: foto("SAULO.jpeg"),
  },
  {
    codigo: "A50488",
    nome: "Elon Vieira Lima",
    email: "elon.lima@grupoawacapital.com.br",
    foto: foto("ELON.jpeg"),
  },
  {
    codigo: "A71632",
    nome: "Mauricio Sergio Sampaio dos Santos",
    email: "mauricio.sampaio@grupoawacapital.com.br",
    foto: foto("MAURICIO.jpeg"),
  },
].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
