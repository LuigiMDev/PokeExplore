# PokeExplore

PokeExplore é um projeto de front-end/back-end feito com **Next.js**, que consome dados da [PokéAPI](https://pokeapi.co/) através de um backend próprio criado com **API Routes do Next.js**. O projeto possui uma interface moderna e interativa, utilizando **ShadCN UI** para componentes e **Zustand** para gerenciamento de estado.

## Funcionalidades

- **Listagem de Pokémons** com paginação.
- **Filtragem por tipo**.
- **Busca por ID ou nome exato** do Pokémon.
- **Página de detalhes** mostrando sprites e características aprofundadas de cada Pokémon.
- **Game "Quem é esse Pokémon?"** usando IA para criar desafios interativos.
- Interface responsiva e interativa com animações e componentes ShadCN.

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS, ShadCN UI
- **Gerenciamento de estado:** Zustand
- **Backend:** Next.js API Routes
- **API de dados:** [PokéAPI](https://pokeapi.co/)
- **Integração com IA:** Hugging Face (opcional, via token)

## Como rodar o projeto

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env.local` e adicione as seguintes variáveis:

```env
AI_ACCESS_TOKEN=seu_token_da_hugging_face
BASE_URL=http://localhost:3000
```

> **Observações:**
>
> - `AI_ACCESS_TOKEN` é usado para integração com IA no game "Quem é esse Pokémon?".
> - `BASE_URL` é a URL onde o Next.js está rodando para fins de SEO. Para local, já está configurado na url https://localhost:3000.
> - A URL da PokéAPI já está configurada no `.env` e será comitada normalmente.

3. Rode o projeto:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

- **/app** → Páginas do Next.js, API, CSS...
- **/app/api** → Rotas do backend que buscam dados da PokéAPI
- **/app/components** → Componentes reutilizáveis com ShadCN UI
- **/types** → Definições de tipos TypeScript para variáveis, objetos e interfaces usadas no projeto
- **/zustand** → Estado global com Zustand
- **/utils** → Funções utilitárias e helpers reutilizáveis em todo o projeto

## Observações

- O backend do Next.js atua como intermediário entre front-end e PokéAPI, permitindo controle sobre caching, filtros e formatação dos dados.
- Busca, paginação e filtragem são feitas no backend para melhorar performance.
- Página de detalhes exibe sprites oficiais e informações detalhadas, como tipos, habilidades e estatísticas.
- O game **“Quem é esse Pokémon?”** utiliza IA para criar desafios interativos, tornando a experiência mais dinâmica e personalizada.

---

Feito com ❤️ por \LuigiMDev.
