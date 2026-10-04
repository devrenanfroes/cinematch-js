import { Serie, calcularCompatibilidade } from "./modelo.js";

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
    callback(
        `Buscando recomendações para ${nome}... Estamos comparando seus gêneros favoritos com o catálogo.`
    );
}

function criarContadorRecalculos() {
    let total = 0;

    return function () {
        total += 1;
        return total;
    };
}

const contarRecalculo = criarContadorRecalculos();

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    erroFormulario.textContent = "";

    const nome = document.querySelector("#nome").value.trim();
    const idade = Number(document.querySelector("#idade").value);

    const generosSelecionados = document.querySelectorAll(
        'input[name="genero"]:checked'
    );

    const generosFavoritos = Array.from(generosSelecionados).map(
        (genero) => genero.value
    );

    if (generosFavoritos.length === 0) {
        erroFormulario.textContent =
            "Selecione pelo menos um gênero favorito.";
        return;
    }

    const novoUsuario = {
        nome,
        idade,
        generosFavoritos,
    };

    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
    botaoTrocarPerfil.hidden = false;

    exibirBoasVindas(novoUsuario.nome, (mensagem) => {
        statusCatalogo.textContent = mensagem;
    });

    contarRecalculo();

    setTimeout(() => {
        buscarCatalogo(novoUsuario);
    }, 1800);
});

botaoTrocarPerfil.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    limparFormulario();
    botaoTrocarPerfil.hidden = true;
    statusCatalogo.textContent = "";
});

async function buscarCatalogo(usuarioAtual) {
    try {
        const resposta = await fetch("https://api.tvmaze.com/shows");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        const series = dados
            .filter((serie) => serie.genres.length > 0)
            .map(
                (serie) =>
                    new Serie(
                        serie.id,
                        serie.name,
                        serie.genres,
                        serie.rating.average,
                        serie.image?.medium ?? null,
                        serie.summary
                    )
            );

        const recomendacoes = series
            .map((serie) =>
                calcularCompatibilidade(usuarioAtual, serie)
            )
            .filter(
                (resultado) =>
                    resultado.generosEmComum.length > 0
            )
            .sort((a, b) => {
                if (b.percentual !== a.percentual) {
                    return b.percentual - a.percentual;
                }

                return (b.serie.nota ?? 0) - (a.serie.nota ?? 0);
            })
            .slice(0, 20);

        if (recomendacoes.length === 0) {
            statusCatalogo.textContent =
                "Não encontramos séries compatíveis com os gêneros selecionados.";
            renderizarCatalogo([]);
            return [];
        }

        statusCatalogo.textContent = "";
        renderizarCatalogo(recomendacoes);

        return recomendacoes;
    } catch (erro) {
        console.error("Erro ao buscar catálogo:", erro);

        statusCatalogo.textContent =
            "Não foi possível carregar as recomendações. Tente novamente.";

        return [];
    }
}