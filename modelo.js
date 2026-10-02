export class Conteudo {
    constructor(titulo, generos) {
        this.titulo = titulo;
        this.generos = generos;
    }

    exibirResumo() {
        return `${this.titulo} - ${this.generos.join(", ")}`;
    }
}

export class Serie extends Conteudo {
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

export function calcularGeneros(usuario, serie) {
    const generosEmComum = serie.generos.filter((genero) =>
        usuario.generosFavoritos.includes(genero)
    );

    const generosNaoExplorados = serie.generos.filter(
        (genero) => !usuario.generosFavoritos.includes(genero)
    );

    return {
        generosEmComum,
        generosNaoExplorados,
    };
}

export function classificarAfinidade(percentual) {
    if (percentual >= 80) {
        return "Alta afinidade";
    }

    if (percentual >= 50) {
        return "Média afinidade";
    }

    return "Baixa afinidade";
}

export function calcularCompatibilidade(usuario, serie) {
    const { generosEmComum, generosNaoExplorados } =
        calcularGeneros(usuario, serie);

    const percentual =
        (generosEmComum.length / serie.generos.length) * 100;

    return {
        serie,
        percentual,
        generosEmComum,
        generosNaoExplorados,
        classificacao: classificarAfinidade(percentual),
    };
}