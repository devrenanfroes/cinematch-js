import { Serie } from "./modelo.js";
import {
    formulario,
    erroFormulario,
    botaoTrocarPerfil,
    statusCatalogo,
    preencherFormulario,
    limparFormulario,
    renderizarCatalogo,
} from "./ui.js";

const usuarioSalvo = localStorage.getItem("usuario");
const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

botaoTrocarPerfil.hidden = !usuario;

if (usuario) {
    preencherFormulario(usuario);
}
function exibirBoasVindas(nome, callback) {
    callback(`Olá, ${nome}! Vamos encontrar séries que combinam com você.`);
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
    exibirBoasVindas(usuario.nome, (mensagem) => {
    statusCatalogo.textContent = mensagem;
    });

    buscarCatalogo();
});

botaoTrocarPerfil.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    limparFormulario();
    botaoTrocarPerfil.hidden = true;
});

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
        renderizarCatalogo(catalogo);
        return catalogo;
    } catch (erro) {
        console.error("Erro ao buscar catálogo:", erro);
        statusCatalogo.textContent =
            "Não foi possível carregar o catálogo. Tente novamente.";
        return [];
    }
}