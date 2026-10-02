export const formulario = document.querySelector("#form-perfil");
export const erroFormulario = document.querySelector("#erro-formulario");
export const botaoTrocarPerfil = document.querySelector("#trocar-perfil");
export const statusCatalogo = document.querySelector("#status-catalogo");

export function preencherFormulario(usuario) {
    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#idade").value = usuario.idade;

    const checkboxesGeneros = document.querySelectorAll(
        'input[name="genero"]'
    );

    checkboxesGeneros.forEach((checkbox) => {
        checkbox.checked = usuario.generosFavoritos.includes(checkbox.value);
    });
}

export function limparFormulario() {
    formulario.reset();
    erroFormulario.textContent = "";
}

export function renderizarCatalogo(catalogo) {
    const listaCatalogo = document.querySelector("#lista-catalogo");

    listaCatalogo.innerHTML = "";

    catalogo.forEach((serie) => {
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
        generos.textContent = `Gêneros: ${serie.generos.join(", ")}`;

        const nota = document.createElement("p");
        nota.textContent = `Nota: ${serie.nota ?? "N/A"}`;

        card.appendChild(titulo);
        card.appendChild(generos);
        card.appendChild(nota);

        listaCatalogo.appendChild(card);
    });
}