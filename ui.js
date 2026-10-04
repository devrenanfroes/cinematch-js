export const formulario = document.querySelector("#form-perfil");
export const erroFormulario = document.querySelector("#erro-formulario");
export const botaoTrocarPerfil = document.querySelector("#trocar-perfil");
export const statusCatalogo = document.querySelector("#status-catalogo");
export const secaoPerfil = document.querySelector("#secao-perfil");
export const secaoCatalogo = document.querySelector("#secao-catalogo");

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

export function renderizarCatalogo(recomendacoes) {
    const listaCatalogo = document.querySelector("#lista-catalogo");

    listaCatalogo.innerHTML = "";

    recomendacoes.forEach((resultado) => {
        const serie = resultado.serie;

        const card = document.createElement("article");
        card.classList.add("card-serie");

        const titulo = document.createElement("h3");
        titulo.textContent = serie.titulo;

        if (serie.imagem) {
            const imagem = document.createElement("img");
            imagem.src = serie.imagem;
            imagem.alt = `Capa da série ${serie.titulo}`;
            card.appendChild(imagem);
        }

        const generos = document.createElement("p");
        generos.textContent =
            `Gêneros: ${serie.generos.join(", ")}`;

        const compatibilidade = document.createElement("p");
        compatibilidade.textContent =
            `${Math.round(resultado.percentual)}% de compatibilidade`;

        const nota = document.createElement("p");
        nota.textContent = `Nota: ${serie.nota ?? "N/A"}`;

        card.appendChild(titulo);
        card.appendChild(generos);
        card.appendChild(compatibilidade);
        card.appendChild(nota);

        listaCatalogo.appendChild(card);
    });
}