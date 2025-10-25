// Classe De itens da biblioteca
class itemBiblioteca {
  constructor(titulo,autor,anoPublicacao) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = true;
  }
  
  obterInformacaoes () {
    return "Informacoes do Item";
  }
  
  emprestar () {
    if (this.diponivel) {
      this.disponivel = false;
      return true;
    }
    return false;
  }
  
  devolver () {
    this.diponivel = true;
  }
  
  estaDisponivel () {
    return this.disponivel;
  }
  
}

// Classe Livro que vai herdar itens da classe itensBiblioteca
class Livro extends itemBiblioteca {
  constructor(titulo,autor,anoPublicacao,isbn,genero) {
    super(titulo,autor,anoPublicacao);
    this.isbn = isbn;
    this.genero = genero;
  }
    
  obterInformacaoes () {
    //Retorna informações específicas
    return `Livro: ${this.titulo} - ${this.autor} - (${this.anoPublicacao}) - ISBN: ${this.isbn} - Genero: ${this.genero}`;
    }
}

// Classe Revista Que herda de itensBiblioteca
class Revista extends itemBiblioteca {
  constructor (titulo,autor,anoPublicacao,numeroEdicao) {
    super(titulo,autor,anoPublicacao);
    this.numeroEdicao = numeroEdicao;
  }
  
  obterInformacaoes () {
    return `Revista: ${this.titulo} - Edição: ${this.numeroEdicao} - (${this.anoPublicacao})`;
  }
}
  
// Classe do Usuario
class Usuario {
  constructor (nome,id) {
    this.nome = nome;
    this.id = id;
    this.itensEmprestados = [];
  }
  
  emprestarItem (item) {
    if (item.emprestar()) {
      this.itensEmprestados.push(item);
      return true;
    }
    return false;
  }
  
  devolverItem (item) {
    const index = this.itensEmprestados.indexOf(item);
    if (index > -1 ) {
      this.itensEmprestados.splice(index,1);
      itens.devolver;
      return true;
    }
    return false;
  }
  
}

// Teste
// const livro1 = new Livro("Dom Casmurro", "Machado de Assis", 1899,"978-85-359-0277-8", "Ficção");

// const revista = new Revista("National Geographic", "National Geographic Society", 2023, 245);
// const usuario = new Usuario("Joao", "RS011");
// Livros
const livros = [
  new Livro("Dom Casmurro", "Machado de Assis", 1899,"978-85-359-0277-8", "Romance"),
  new Livro("O Alienista", "Machado de Assis", 1900,"978-85-359-0284-6", "Conto"),
  new Livro("Os Sertões", "Euclides da Cunha", 1938,"978-85-359-0290-7", "História"),
  new Livro("Iracema", "José de Alencar", 1910,"978-85-359-0300-3", "Romance")
  ];

const revistas = [
  new Revista("National Geographic", "National Geographic Society", 2023, 245),
  new Revista("Superinteressante", "Editora Abril", 2022, 120)
  ];

// Exibir todos os livros
document.getElementById("Livroinfo").textContent = livros.map(livro => livro.obterInformacaoes()).join("\n");

// Exibir todas as revistas
document.getElementById("Revistainfo").textContent = revistas.map(revista => revista.obterInformacaoes()).join("\n");