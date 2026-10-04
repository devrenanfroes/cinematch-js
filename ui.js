export const formulario = document.querySelector("#form-perfil");
export const erroFormulario = document.querySelector("#erro-formulario");
export const botaoTrocarPerfil = document.querySelector("#trocar-perfil");
export const statusCatalogo = document.querySelector("#status-catalogo");
export const secaoPerfil = document.querySelector("#secao-perfil");
export const secaoCatalogo = document.querySelector("#secao-catalogo");
export const contadorRecalculos =
    document.querySelector("#contador-recalculos");

export function limparFormulario() {
    formulario.reset();
    erroFormulario.textContent = "";
}

export function limparCatalogo() {
    const listaCatalogo = document.querySelector("#lista-catalogo");

    listaCatalogo.innerHTML = "";
    statusCatalogo.textContent = "";
}

export function mostrarPerfil() {
    secaoPerfil.hidden = false;
    secaoCatalogo.hidden = true;
    botaoTrocarPerfil.hidden = true;
}

export function mostrarCatalogo() {
    secaoPerfil.hidden = true;
    secaoCatalogo.hidden = false;
}
export function atualizarContadorRecalculos(total) {
    contadorRecalculos.textContent =
        `Recálculos nesta sessão: ${total}`;
}
function traduzirGenero(genero) {
    const traducoes = {
        Action: "Ação",
        Adventure: "Aventura",
        Comedy: "Comédia",
        Crime: "Crime",
        Drama: "Drama",
        Family: "Família",
        Fantasy: "Fantasia",
        History: "História",
        Horror: "Terror",
        Music: "Música",
        Mystery: "Mistério",
        Romance: "Romance",
        "Science-Fiction": "Ficção científica",
        Sports: "Esportes",
        Thriller: "Suspense",
        Anime: "Anime",
        Supernatural: "Sobrenatural"
    };

    return traducoes[genero] ?? genero;
}
export function renderizarCatalogo(recomendacoes) {
    const listaCatalogo = document.querySelector("#lista-catalogo");

    listaCatalogo.innerHTML = "";

    recomendacoes.forEach((resultado) => {
        const serie = resultado.serie;

        const card = document.createElement("article");
        card.classList.add("card-serie");

        if (serie.imagem) {
            const imagem = document.createElement("img");
            imagem.src = serie.imagem;
            imagem.alt = `Capa da série ${serie.titulo}`;
            card.appendChild(imagem);
        }

        const titulo = document.createElement("h3");
        titulo.textContent = serie.titulo;

        const generosEmComum = document.createElement("p");
        generosEmComum.textContent =
            `Em comum: ${resultado.generosEmComum
            .map(traduzirGenero)
            .join(", ")}`;
        const generosNaoExplorados = document.createElement("p");
        generosNaoExplorados.textContent =
            resultado.generosNaoExplorados.length > 0
                ? `Não explorados: ${resultado.generosNaoExplorados
                    .map(traduzirGenero)
                    .join(", ")}`
                : "Não explorados: nenhum";

        const compatibilidade = document.createElement("p");
        compatibilidade.textContent =
            `Compatibilidade: ${Math.round(resultado.percentual)}%`;

        const classificacao = document.createElement("p");
        classificacao.textContent = resultado.classificacao;

        const nota = document.createElement("p");
        nota.textContent = `Nota: ${serie.nota ?? "N/A"}`;

        card.appendChild(titulo);
        card.appendChild(generosEmComum);
        card.appendChild(generosNaoExplorados);
        card.appendChild(compatibilidade);
        card.appendChild(classificacao);
        card.appendChild(nota);

        listaCatalogo.appendChild(card);
    });
}