const formulario = document.querySelector("#form-perfil");
const erroFormulario = document.querySelector("#erro-formulario");

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
    return;}
    const usuario = {
    nome,
    idade,
    generosFavoritos,};
});

