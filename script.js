const formulario = document.querySelector("#form-perfil");
const erroFormulario = document.querySelector("#erro-formulario");
const usuarioSalvo = localStorage.getItem("usuario");
const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
const botaoTrocarPerfil = document.querySelector("#trocar-perfil");
botaoTrocarPerfil.hidden = !usuario;

if (usuario) {
    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#idade").value = usuario.idade;
    const checkboxesGeneros = document.querySelectorAll('input[name="genero"]');
    checkboxesGeneros.forEach((checkbox) => {
    checkbox.checked = usuario.generosFavoritos.includes(checkbox.value);});
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
    return;}
    const usuario = {
    nome,
    idade,
    generosFavoritos,};
    localStorage.setItem("usuario", JSON.stringify(usuario));
    botaoTrocarPerfil.hidden = false;
});

botaoTrocarPerfil.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    formulario.reset();
    erroFormulario.textContent = "";
    botaoTrocarPerfil.hidden = true;
});

async function buscarCatalogo() {
    try {
        const resposta = await fetch("https://api.tvmaze.com/shows");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const catalogo = await resposta.json();
        return catalogo;
    } catch (erro) {
        console.error("Erro ao buscar catálogo:", erro);
        return [];
    }
}