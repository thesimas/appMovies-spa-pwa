const urlBase = "https://api.themoviedb.org";

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

    response.data.genres.forEach(categoria => {
        categoriaGlobais[categoria.id] = categoria.name;
    });
}

carregarCategorias();

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

const botaoInput = document.getElementById("bt-busca");

botaoInput.addEventListener('submit', event => {
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
                <div class="card" onclick="mostrarDetalhes(${filme.id})">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h1 class="card-title">${filme.title}</h1>
                        <p class="card-text">Data de lançamento: ${filme.release_date}<br>${nomeCategorias}</p>
                    </div>
                </div></a>`;

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
            generos += `${genero.name}<br>`;
        });

        card.innerHTML = `
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h1 class="card-title">${filme.title}</h1>
                            <p class="card-text">Descrição: ${filme.overview} <br>
                            Data de lançamento: ${filme.release_date}<br>
                            Categorias: ${generos}
                            Nota: ${filme.vote_average} <br>
                            Total de Votos: ${filme.vote_count} <br>
                            Pôster: <br><img src="https://image.tmdb.org/t/p/w500/${filme.backdrop_path}" alt="...">
                            </p>
                        </div>
                    </div>`;

        telaLista.appendChild(card);

        navegar("tela-detalhes");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}