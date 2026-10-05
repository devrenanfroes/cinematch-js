# CineMatch JS

Acesse o projeto online por aqui: [https://cinematch-js-devrenanfroes.vercel.app](https://cinematch-js-devrenanfroes.vercel.app)

Video de apresentação do projeto: [https://drive.google.com/file/d/1su8HLyqqs-WA6grQnPmrvfbmAdhI9Zq9/view?usp=sharing](https://drive.google.com/file/d/1su8HLyqqs-WA6grQnPmrvfbmAdhI9Zq9/view?usp=sharing)

Aplicação web de recomendação de séries desenvolvida com HTML, CSS e JavaScript.

O CineMatch utiliza os gêneros favoritos informados pelo usuário para buscar séries e calcular a compatibilidade com cada conteúdo.

O projeto foi desenvolvido como atividade avaliativa do curso de Desenvolvimento Mobile com React Native.

## Funcionalidades

A aplicação permite:

- criar um perfil com nome, idade e gêneros favoritos
- salvar o perfil no navegador com `localStorage`
- restaurar automaticamente um perfil salvo
- trocar de perfil
- buscar séries reais através da API TVMaze
- calcular os gêneros em comum
- mostrar gêneros ainda não explorados
- calcular o percentual de compatibilidade
- classificar a recomendação em alta, média ou baixa afinidade
- ordenar as recomendações pela compatibilidade
- exibir as séries em cards
- informar estados de carregamento, erro e ausência de resultados

## Como funciona a compatibilidade

O sistema compara os gêneros favoritos do usuário com os gêneros de cada série.

O cálculo utilizado é:

```text
quantidade de gêneros em comum
-------------------------------- x 100
total de gêneros da série
```

A classificação é feita da seguinte forma:

- 80% a 100%: Alta afinidade
- 50% a 79%: Média afinidade
- abaixo de 50%: Baixa afinidade

As séries que não possuem nenhum gênero em comum com o perfil não são exibidas nas recomendações.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- API TVMaze
- Node.js
- npm
- live-server
- localStorage
- Git
- GitHub
- GitHub Projects

## Como executar

Clone o repositório:

```bash
git clone https://github.com/devrenanfroes/cinematch-js.git
```

Entre na pasta do projeto:

```bash
cd cinematch-js
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm start
```

Depois disso, o projeto será aberto no navegador através do `live-server`.

## Estrutura do projeto

```text
cinematch-js/
│
├── index.html
├── style.css
├── script.js
├── ui.js
├── modelo.js
├── cinematch.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

### index.html

Contém a estrutura da página, o formulário de criação do perfil e a área onde as recomendações são exibidas.

### style.css

Contém os estilos da aplicação e os ajustes de responsividade para diferentes tamanhos de tela.

### script.js

Controla o fluxo principal da aplicação, incluindo o formulário, o perfil salvo, a busca do catálogo e o carregamento das recomendações.

### ui.js

Contém as funções relacionadas à interface, como exibição das seções, mensagens para o usuário e criação dos cards das séries.

### modelo.js

Contém as classes e as funções responsáveis pelo cálculo dos gêneros e da compatibilidade.

### cinematch.js

É o arquivo da primeira versão do CineMatch, desenvolvida para funcionar pelo terminal com Node.js.

Ele foi mantido no repositório para preservar a evolução do projeto.

## API TVMaze

Na versão web, o catálogo de séries é obtido através da API pública TVMaze.

A aplicação utiliza `fetch()` com `async/await` para fazer a requisição e transforma os dados recebidos antes de mostrar as recomendações.

Também são tratados casos de:

- erro na requisição
- resposta HTTP inválida
- ausência de séries compatíveis
- séries sem imagem
- séries sem nota

## Métodos de array

Durante o processamento do catálogo são utilizados métodos de array como:

- `filter()`
- `map()`
- `sort()`
- `forEach()`
- `slice()`

O `filter()` é utilizado para selecionar séries válidas e recomendações que possuem gêneros em comum com o usuário.

O `map()` transforma os dados recebidos da API em objetos e também é utilizado no cálculo das recomendações.

O `sort()` organiza os resultados pelo percentual de compatibilidade e pela nota da série.

O `slice()` limita a quantidade de recomendações exibidas.

O `forEach()` é utilizado para criar os cards das séries no DOM.

## Classes e herança

O projeto possui uma classe chamada `Conteudo`, que representa as informações básicas de um conteúdo.

A classe `Serie` herda de `Conteudo` utilizando `extends`.

O `this` é utilizado dentro das classes para acessar os atributos de cada objeto.

## Callback

A função responsável pela busca do catálogo pode receber uma função de callback.

Depois que as recomendações são carregadas com sucesso, o callback é executado para atualizar a mensagem apresentada ao usuário.

## Closure

Foi criado um contador de recálculos utilizando closure.

A variável responsável pela contagem fica dentro da função e mantém seu valor durante a execução atual da página.

## setTimeout

O `setTimeout()` é utilizado no fluxo de carregamento das recomendações.

Após o usuário criar um perfil, uma mensagem de carregamento é exibida antes da busca do catálogo.

## localStorage

O perfil do usuário é salvo no navegador utilizando `localStorage`.

Antes de salvar, o objeto é convertido para texto utilizando `JSON.stringify()`.

Para recuperar o perfil, é utilizado `JSON.parse()`.

Quando existe um perfil salvo, a aplicação pode abrir diretamente a área de recomendações.

O botão **Trocar perfil** remove o perfil salvo e permite preencher o formulário novamente.

## Módulos ES e CommonJS

A versão web utiliza módulos ES no navegador.

O arquivo principal é carregado no HTML com:

```html
<script type="module" src="script.js"></script>
```

Os arquivos `script.js`, `ui.js` e `modelo.js` utilizam `import` e `export` para compartilhar funções e classes.

O projeto também mantém `"type": "commonjs"` no `package.json`.

Isso acontece porque o arquivo `cinematch.js`, que pertence à primeira versão do projeto executada pelo terminal, utiliza CommonJS e a biblioteca `prompt-sync`.

Dessa forma, o repositório mantém as duas etapas do projeto:

- CommonJS na versão de terminal
- ES Modules na versão web

## Acessibilidade

Foram utilizados alguns recursos de acessibilidade, como:

- elementos HTML semânticos
- `label` associado aos campos do formulário
- `fieldset` e `legend` para os gêneros
- mensagens com `aria-live`
- foco visível durante a navegação por teclado
- texto alternativo nas imagens das séries
- navegação pelo teclado

## Responsividade

A interface foi desenvolvida utilizando Flexbox e abordagem mobile-first.

Também foram adicionados ajustes para telas menores e para visualização em desktop.

## Organização com Kanban

As tarefas do projeto foram organizadas utilizando GitHub Projects.

O quadro foi utilizado durante o desenvolvimento para acompanhar as tarefas desde o planejamento até os testes e a preparação da entrega.

As principais colunas utilizadas foram:

- Backlog
- A Fazer
- Em Andamento
- Revisão
- Concluído

## Versionamento

O projeto foi versionado utilizando Git e GitHub.

As principais branches utilizadas na versão web foram:

### main

Branch principal do projeto.

### develop

Branch utilizada para reunir o desenvolvimento antes da versão final.

### feature/cinematch-web

Branch utilizada durante o desenvolvimento da versão web do CineMatch.

Os commits foram realizados durante as diferentes etapas para registrar a evolução do projeto.

## Versão anterior em terminal

Antes da versão web, o CineMatch foi desenvolvido como uma aplicação executada pelo terminal utilizando Node.js e `prompt-sync`.

Essa versão continua disponível no arquivo:

```text
cinematch.js
```

Para executar a versão de terminal:

```bash
node cinematch.js
```

## Apresentação em vídeo

O link da apresentação da versão web será adicionado após a gravação final.

## Autor

Renan Fróes
