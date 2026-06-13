const urlBase = "https://api.themoviedb.org";
const chaveAPI = "d4fa4bf1f390349488054128cdf9aac9";

// Lógica para movimentar as telas.
let telaAtual = 'tela-home';
let telaAnterior = 'tela-home';

function navegar(destino) {
    let telas = document.getElementsByClassName('tela');
    Array.from(telas).forEach(elemento => {
        elemento.classList.remove("show");
        elemento.classList.add("collapse");
    });
    document.getElementById(destino).classList.remove('collapse');
    document.getElementById(destino).classList.add('show');
    telaAnterior = telaAtual;
    telaAtual = destino;
}

function voltar() {
    navegar(telaAnterior);
}

let categoriaGlobais = {};

async function carregarCategorias() {
    const url = `${urlBase}/3/genre/movie/list?api_key=${chaveAPI}&language=pt-BR`;
    const response = await axios.get(url);
    const selectCategorias = document.getElementById("select-categorias");

    response.data.genres.forEach(categoria => {

        categoriaGlobais[categoria.id] = categoria.name;
        
        if(selectCategorias){
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.name;

            selectCategorias.appendChild(option);
        }
    });
}

carregarCategorias();

async function listarFilmesPorCategorias(idCategoria) {

    try {
        const telaLista = document.getElementById("tela-filmesPorCategorias");
        const url = `${urlBase}/3/discover/movie?api_key=${chaveAPI}&language=pt-BR&with_genres=${idCategoria}`;
        const response = await axios.get(url);

        telaLista.innerHTML = "";
        response.data.results.forEach(filme => {

            const card = document.createElement('div');
            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]} <br>`;
            });

            card.innerHTML = `
                <div class="card" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme">
                    <div class="card-body">
                        <h1 class="card-title">${filme.title}</h1>
                        <p class="card-text">Data de lançamento: ${filme.release_date}<br>
                        <span>${nomeCategorias}</span></p>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-filmesPorCategorias");
    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

async function listarFilmesPopulares() {
    try {
        const telaLista = document.getElementById("tela-populares");
        const url = `${urlBase}/3/movie/popular?api_key=${chaveAPI}&language=pt-BR`;
        const response = await axios.get(url);

        telaLista.innerHTML = "";
        response.data.results.forEach(filme => {

            const card = document.createElement('div');
            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]} <br>`;
            });

            card.innerHTML = `
                <div class="card" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme">
                    <div class="card-body">
                        <h1 class="card-title">${filme.title}</h1>
                        <p class="card-text">Data de lançamento: ${filme.release_date}<br>
                        <span>${nomeCategorias}</span></p>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-populares");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

async function lancamentos() {
    try {

        const telaLista = document.getElementById("tela-lancamentos");
        const url = `${urlBase}/3/movie/upcoming?api_key=${chaveAPI}&language=pt-BR`;
        const response = await axios.get(url);


        telaLista.innerHTML = "";

        response.data.results.forEach(filme => {

            const card = document.createElement('div');

            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]}<br>`;
            });

            card.innerHTML = `
                <div class="card" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h1 class="card-title">${filme.title}</h1>
                        <p class="card-text">Data de lançamento: ${filme.release_date}<br>${nomeCategorias}</p>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-lancamentos");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

lancamentos();

const formulario = document.getElementById("formulario");

formulario.addEventListener('submit', event => {
    event.preventDefault();

    let dado = document.getElementById("busca").value;

    buscar(dado);
});

async function buscar(inputUsuario) {
    try {

        const telaLista = document.getElementById("tela-lancamentos");
        const url = `${urlBase}/3/search/movie?api_key=${chaveAPI}&language=pt-BR&query=${inputUsuario}`;
        const response = await axios.get(url);
        const filmes = response.data.results;

        telaLista.innerHTML = "";

        filmes.forEach(filme => {

            const card = document.createElement('div');

            card.classList.add('col');

            let nomeCategorias = "";

            // forEach para carregar o nome das categorias, já que um filme pode ter mais de uma. 
            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]}<br>`;
            });

            card.innerHTML = `
                <div class="card" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h1 class="card-title">${filme.title}</h1>
                        <p class="card-text">Data de lançamento: ${filme.release_date}<br>${nomeCategorias}</p>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

async function mostrarDetalhes(idFilme) {

    try {
        const telaLista = document.getElementById("tela-detalhes");
        const url = `${urlBase}/3/movie/${idFilme}?api_key=${chaveAPI}&language=pt-BR`;
        const response = await axios.get(url);
        const filme = response.data;
        const card = document.createElement('div');
        let generos = "";

        telaLista.innerHTML = "";

        filme.genres.forEach(genero => {
            generos += `<span class="badge bg-primary me-2">${genero.name}</span>`;
        });

        card.innerHTML = `
            <div class="col-md-3 text-center mb-4 mb-md-0">
                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" 
                    class="img-fluid rounded-4 shadow-lg w-85" 
                    alt="Pôster de ${filme.title}">
            </div>

            <div class="col-md-9">
                <h2 class="fw-bold mb-3">${filme.title}</h2>
                
                <div class="mb-4">
                    ${generos}
                </div>

                <h5 class="fw-semibold">Sinopse</h5>
                <p class="lead text-muted mb-4">${filme.overview}</p>
                
                <p class="mb-2"><strong>Data de lançamento:</strong> ${filme.release_date}</p>
                
                <div class="alert alert-dark d-inline-block mt-3 mb-4 shadow-sm" role="alert">
                    <h5 class="mb-0">
                        ⭐ ${filme.vote_average.toFixed(1)} <span class="fs-6 text-muted">/ 10</span>
                        <span class="ms-3 badge bg-secondary text-light fs-6">${filme.vote_count} votos</span>
                    </h5>
                </div>

                <div class="text-center mt-4">
                    <button class="btn btn-outline-secondary px-5 py-2 shadow-sm rounded-pill" onclick="voltar()">
                        ← Voltar para a lista
                    </button>
                </div>
            </div>
        `;

        card.classList.add("row", "w-100", "align-items-center", "mt-5", "pt-4");

        telaLista.appendChild(card);

        atores(idFilme);

        navegar("tela-detalhes");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

async function atores(idFilme) {
    try {

        const telaLista = document.getElementById("tela-detalhes");
        const url = `https://api.themoviedb.org/3/movie/${idFilme}/credits?api_key=${chaveAPI}&language=pt-BR`;
        const responseElenco = await axios.get(url);
        const card = document.createElement('div');
        card.classList.add('row', 'mt-5', 'w-100');

        const atores = responseElenco.data.cast;

        // Pegando os 6 primeiros atores do resultado da requisição.
        const atoresPrincipais = atores.slice(0, 6);

        card.innerHTML += `<h3 class="fw-bold mb-4">Elenco Principal</h3>`;

        atoresPrincipais.forEach(ator => {

            // Operador Ternário para a imagem do ator, se tiver busca da API, se não tiver, coloca uma imagem generica.
            const imagemAtor = ator.profile_path
                ? `https://image.tmdb.org/t/p/w500/${ator.profile_path}`
                : `https://via.placeholder.com/500x750?text=Sem+Foto`;

            card.innerHTML += `
                <div class="col-6 col-md-2 text-center mb-4">
                    <img src="${imagemAtor}" 
                         class="img-fluid rounded-circle shadow-sm mb-2" 
                         style="width: 120px; height: 120px; object-fit: cover;" 
                         alt="Foto de ${ator.name}">
                    <h6 class="fw-bold mb-0">${ator.name}</h6>
                    <small class="text-muted">${ator.character}</small>
                </div>
            `;
        });

        telaLista.appendChild(card);

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

var pedidoInstalacao;
window.addEventListener('beforeinstallprompt', function (installPrompt) {
    if (installPrompt) {
        document.getElementById("installAppBt").classList.add('show')
        pedidoInstalacao = installPrompt
    }
});

function installApp() {
    pedidoInstalacao.prompt();
}