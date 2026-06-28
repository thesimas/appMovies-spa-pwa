# CINE PWA - Catálogo de Filmes 

[Link do Projeto](https://thesimas.github.io/appMovies-spa-pwa/ "Ir para o APP")

O **CinePWA** é um aplicativo de catálogo de filmes desenvolvida com conceitos de **Single Page Application (SPA)** e **Progressive Web App (PWA)**. O projeto consome a API pública do **The Movie Database (TMDB)** para apresentar informações atualizadas sobre filmes, lançamentos, notas de avaliação e elenco.

Este projeto foi desenvolvido como parte **prática** do curso Técnico em Desenvolvimento de Sistemas (IFSC) pela Disciplina de Dispositivos Móveis.

## Funcionalidades

* **Lista de Filmes Populares e Lançamentos:** Exibição dinâmica dos filmes mais em alta no momento.
* **Busca Dinâmica:** Pesquisa de filmes por nome.
* **Filtro por Categorias:** Menu suspenso para explorar filmes por géneros (Ação, Comédia, Terror, etc.).
* **Detalhes do Filme:** Ao clicar num cartão, a aplicação carrega a sinopse, data de lançamento, avaliação (nota e votos) e os principais atores do elenco.
* **Favoritar Filmes:** Dentro do detalhes do filme, o úsuario poderá favoritar o filme, salvando esse dado no LocalStorage, e posteriormente poderá remover esse filme de lá, assim  também terá uma nova opção no navbar, a lista dos seus filmes favoritos.
* **Navegação SPA:** Transições de ecrã fluidas e instantâneas, sem recarregar a página do navegador.
* **Progressive Web App (PWA):**
  * Suporte para instalação direta no telemóvel/computador.
  * Funcionalidade offline básica com Service Worker e cache local.
* **Design Responsivo (Mobile First):** Layout adaptável para telemóveis, tablets e monitores, garantindo uma ótima experiência de utilizador em qualquer dispositivo.

## Tecnologias Utilizadas

* **HTML5 e CSS3**
* **JavaScript (Vanilla JS)** - Manipulação de DOM, Promises e Funções Assíncronas.
* **Bootstrap 5** - Sistema de grelha responsiva e componentes de interface.
* **Axios** - Para a realização de requisições HTTP (GET) à API.
* **TMDB API** - Fonte de dados do catálogo de filmes.