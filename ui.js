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