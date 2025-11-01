// === Classes ===
// Item base
class ItemBiblioteca {
  constructor(titulo, autor, anoPublicacao) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = true;
  }
  
  emprestar() {
    if (this.disponivel) {
      this.disponivel = false;
      return true;
    }
    return false;
  }
  
  devolver() {
    this.disponivel = true;
  }
  
  estaDisponivel() {
    return this.disponivel;
  }
  
  obterInformacaoes() {
    return `${this.titulo} - ${this.autor} (${this.anoPublicacao})`;
  }
}

// Livro
class Livro extends ItemBiblioteca {
  constructor(titulo, autor, anoPublicacao, isbn, genero) {
    super(titulo, autor, anoPublicacao);
    this.isbn = isbn;
    this.genero = genero;
  }
  
  obterInformacaoes() {
    return `Livro: ${this.titulo} - ${this.autor} (${this.anoPublicacao}) - ISBN: ${this.isbn} - Gênero: ${this.genero}`;
  }
}

// Revista
class Revista extends ItemBiblioteca {
  constructor(titulo, autor, anoPublicacao, numeroEdicao) {
    super(titulo, autor, anoPublicacao);
    this.numeroEdicao = numeroEdicao;
  }
  
  obterInformacaoes() {
    return `Revista: ${this.titulo} - Edição: ${this.numeroEdicao} (${this.anoPublicacao})`;
  }
}

// Usuario
class Usuario {
  #multa = 0;
  #historicoEmprestimos = [];
  
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
  }
  
  get multa() {
    return this.#multa;
  }
  
  adicionarMulta(valor) {
    this.#multa += valor;
  }
  
  pagarMulta(valor) {
    this.#multa = Math.max(0, this.#multa - valor);
  }
  
  podePegarEmprestimo() {
    return this.#multa === 0 && this.#historicoEmprestimos.length < 5;
  }
  
  adicionarEmprestimo(emprestimo) {
    this.#historicoEmprestimos.push(emprestimo);
  }
}

// Emprestimo
class Emprestimo {
  #dataEmprestimo;
  #dataDevolucaoPrevista;
  #dataDevolucao;
  
  constructor(usuario, item) {
    this.usuario = usuario;
    this.item = item;
    this.#dataEmprestimo = new Date();
    this.#dataDevolucaoPrevista = new Date();
    this.#dataDevolucaoPrevista.setDate(this.#dataEmprestimo.getDate() + 14);
    this.#dataDevolucao = null;
  }
  
  get informacoes() {
    return `Empréstimo: ${this.item.titulo} para ${this.usuario.nome}`;
  }
  
  calcularMulta() {
    const hoje = new Date();
    if (hoje > this.#dataDevolucaoPrevista && !this.#dataDevolucao) {
      const diasAtraso = Math.ceil(
        (hoje - this.#dataDevolucaoPrevista) / (1000 * 60 * 60 * 24)
      );
      return diasAtraso * 2;
    }
    return 0;
  }
  
  devolver() {
    this.#dataDevolucao = new Date();
    const multa = this.calcularMulta();
    if (multa > 0) this.usuario.adicionarMulta(multa);
    this.item.devolver();
  }
  
  get devolvido() {
    return this.#dataDevolucao !== null;
  }
}

// Biblioteca (Singleton)
class Biblioteca {
  static #instancia;
  
  constructor() {
    if (Biblioteca.#instancia) return Biblioteca.#instancia;
    
    this.itens = [];
    this.usuarios = [];
    this.emprestimos = [];
    
    Biblioteca.#instancia = this;
  }
  
  static getInstancia() {
    if (!Biblioteca.#instancia) Biblioteca.#instancia = new Biblioteca();
    return Biblioteca.#instancia;
  }
  
  adicionarItem(item) {
    this.itens.push(item);
  }
  
  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }
  
  realizarEmprestimo(usuario, item) {
    if (usuario.podePegarEmprestimo() && item.estaDisponivel()) {
      const emprestimo = new Emprestimo(usuario, item);
      this.emprestimos.push(emprestimo);
      item.emprestar();
      usuario.adicionarEmprestimo(emprestimo);
      return emprestimo;
    }
    return null;
  }
}

// === Instâncias de teste ===
const biblioteca = Biblioteca.getInstancia();

const usuario = new Usuario("Maria Santos", "USR002");

const livros = [
  new Livro("Dom Casmurro", "Machado de Assis", 1899, "978-85-7232-144-9", "Romance"),
  new Livro("O Alienista", "Machado de Assis", 1900, "978-85-359-0284-6", "Conto")
];

const revistas = [
  new Revista("National Geographic", "National Geographic Society", 2023, 245),
  new Revista("Superinteressante", "Editora Abril", 2022, 120)
];

// Adiciona ao sistema
livros.forEach(l => biblioteca.adicionarItem(l));
revistas.forEach(r => biblioteca.adicionarItem(r));
biblioteca.adicionarUsuario(usuario);

// Emprestimo de teste
biblioteca.realizarEmprestimo(usuario, livros[0]);

// === Exibir no HTML ===
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("Livrosinfo").textContent = livros
    .map(l => l.obterInformacaoes())
    .join("\n\n");
  
  document.getElementById("Revistasinfo").textContent = revistas
    .map(r => r.obterInformacaoes())
    .join("\n\n");
  
  document.getElementById("Emprestimosinfo").textContent = biblioteca.emprestimos
    .map(e => e.informacoes)
    .join("\n\n");
});