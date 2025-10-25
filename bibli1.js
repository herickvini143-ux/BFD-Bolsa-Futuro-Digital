// Classe Livro
class Livro {
    constructor(titulo, autor, anoPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = true;
    }

    emprestar() {
        this.disponivel = false;
    }

    estaDisponivel() {
        return this.disponivel;
    }
}

// Função para carregar os livros na tabela
function carregarLivrosTabela() {
    const livros = [
        new Livro("Dom Casmurro", "Machado de Assis", 1899),
        new Livro("O Alienista", "Machado de Assis", 1900),
        new Livro("Os Sertões", "Euclides da Cunha", 1938),
        new Livro("Iracema", "José de Alencar", 1910),
        new Livro("Senhor dos Aneis", "J.R.R. Tolkein", 1954),
        new Livro("Capitães de Areia", "Jorge Amado", 1937),
        new Livro("As Crônicas de Gelo e Fogo", "George R.R. Martin", 1996),
        new Livro("Maus: a história de um sobrevivente","Art Spiegelman", 1986)
    ];

    // Empresta o último livro
    livros[3].emprestar();
    livros[4].emprestar();

    const tabelaLivros = document.getElementById("livros-tbody");

    // Garante que a tabela começa vazia
    tabelaLivros.innerHTML = "";

    for (let livro of livros) {
        const linha = document.createElement("tr");

        // Coluna: título
        const titulo = document.createElement("td");
        titulo.textContent = livro.titulo;

        // Coluna: autor
        const autor = document.createElement("td");
        autor.textContent = livro.autor;

        // Coluna: ano
        const ano = document.createElement("td");
        ano.textContent = livro.anoPublicacao;

        // Coluna: disponibilidade
        const disponivel = document.createElement("td");
        disponivel.textContent = livro.estaDisponivel() ? "Sim" : "Não";

        // Coluna: botão de emprestar
        const tdEmprestar = document.createElement("td");
        const botaoEmprestar = document.createElement("button");
        botaoEmprestar.textContent = "Emprestar";
        botaoEmprestar.disabled = !livro.estaDisponivel();

        botaoEmprestar.addEventListener("click", () => {
            livro.emprestar();
            disponivel.textContent = "Não";
            botaoEmprestar.disabled = true;
        });

        tdEmprestar.appendChild(botaoEmprestar);

        // Monta a linha
        linha.appendChild(titulo);
        linha.appendChild(autor);
        linha.appendChild(ano);
        linha.appendChild(disponivel);
        linha.appendChild(tdEmprestar);

        tabelaLivros.appendChild(linha);
    }
}

// Quando o documento terminar de carregar, executa a função
document.addEventListener("DOMContentLoaded", carregarLivrosTabela);
