const formulario = document.querySelector("#form-perfil");
const erroFormulario = document.querySelector("#erro-formulario");
const usuarioSalvo = localStorage.getItem("usuario");
const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
const botaoTrocarPerfil = document.querySelector("#trocar-perfil");
botaoTrocarPerfil.hidden = !usuario;
const statusCatalogo = document.querySelector("#status-catalogo");

if (usuario) {
    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#idade").value = usuario.idade;
    const checkboxesGeneros = document.querySelectorAll('input[name="genero"]');
    checkboxesGeneros.forEach((checkbox) => {
        checkbox.checked = usuario.generosFavoritos.includes(checkbox.value);
    });
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    erroFormulario.textContent = "";
    const nome = document.querySelector("#nome").value.trim();
    const idade = Number(document.querySelector("#idade").value);
    const generosSelecionados = document.querySelectorAll(
        'input[name="genero"]:checked');
    const generosFavoritos = Array.from(generosSelecionados).map(
        (genero) => genero.value);
    if (generosFavoritos.length === 0) {
        erroFormulario.textContent = "Selecione pelo menos um gênero favorito.";
        return;
    }
    const usuario = {
        nome,
        idade,
        generosFavoritos,
    };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    botaoTrocarPerfil.hidden = false;

    buscarCatalogo();
});

botaoTrocarPerfil.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    formulario.reset();
    erroFormulario.textContent = "";
    botaoTrocarPerfil.hidden = true;
});

class Conteudo {
    constructor(titulo, generos) {
        this.titulo = titulo;
        this.generos = generos;
    }

    exibirResumo() {
        return `${this.titulo} - ${this.generos.join(", ")}`;
    }
}

class Serie extends Conteudo {
    constructor(id, titulo, generos, nota, imagem, resumo) {
        super(titulo, generos);

        this.id = id;
        this.nota = nota;
        this.imagem = imagem;
        this.resumo = resumo;
    }

    exibirResumo() {
        return `${this.titulo} - Nota: ${this.nota ?? "N/A"}`;
    }
}

async function buscarCatalogo() {
    statusCatalogo.textContent = "Carregando catálogo...";

    try {
        const resposta = await fetch("https://api.tvmaze.com/shows");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        const catalogo = dados
            .filter((serie) => serie.genres.length > 0)
            .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
            .slice(0, 20)
            .map((serie) =>
                new Serie(
                    serie.id,
                    serie.name,
                    serie.genres,
                    serie.rating.average,
                    serie.image?.medium ?? null,
                    serie.summary
                )
            );

        if (catalogo.length === 0) {
            statusCatalogo.textContent = "Nenhuma série encontrada.";
            return [];
        }

        statusCatalogo.textContent = "";
        return catalogo;
    } catch (erro) {
        console.error("Erro ao buscar catálogo:", erro);
        statusCatalogo.textContent =
            "Não foi possível carregar o catálogo. Tente novamente.";
        return [];
    }
}