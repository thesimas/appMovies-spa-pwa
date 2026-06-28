const urlBase = "https://api.themoviedb.org";
const chaveAPI = "d4fa4bf1f390349488054128cdf9aac9";

let telaAtual = 'tela-home';
let telaAnterior = 'tela-home';
let categoriaGlobais = {};

let tituloAtual = "Filmes Lançamentos";
let tituloAnterior = "Filmes Lançamentos";

const formulario = document.getElementById("formulario");

async function carregarCategorias() {
    const url = `${urlBase}/3/genre/movie/list?api_key=${chaveAPI}&language=pt-BR`;
    const response = await axios.get(url);
    const selectCategorias = document.getElementById("select-categorias");

    response.data.genres.forEach(categoria => {

        categoriaGlobais[categoria.id] = categoria.name;

        if (selectCategorias) {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.name;
            option.classList.add('text-light');
            option.classList.add('bg-dark');

            selectCategorias.appendChild(option);
        }
    });
}

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

    setTitulo(tituloAnterior);
}

async function listarFilmesPorCategorias(idCategoria) {

    try {
        const telaLista = document.getElementById("tela-principal");
        const url = `${urlBase}/3/discover/movie?api_key=${chaveAPI}&language=pt-BR&with_genres=${idCategoria}`;
        const response = await axios.get(url);
        const select = document.getElementById('select-categorias');
        select.selectedIndex = 0;

        titulo = `Filmes de ${categoriaGlobais[idCategoria]}`;
        setTitulo(titulo);

        telaLista.innerHTML = "";

        response.data.results.forEach(filme => {

            const card = document.createElement('div');
            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]} <br>`;
            });

            const dataFormatada = filme.release_date.split('-').reverse().join('/');

            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme" style="aspect-ratio: 2/3; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${filme.title}</h5>
                        
                        <p class="card-text mb-2 text-muted" style="font-size: 0.9rem;">Lançamento: ${dataFormatada}</p>
                        
                        <div class="mt-auto">
                            <span style="font-size: 0.85rem;" class="fw-semibold text-primary">${nomeCategorias}</span>
                        </div>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-principal");

        const menuSanduiche = document.getElementById('navbarNav');
        if (menuSanduiche.classList.contains('show')) {
            const menuCollapse = bootstrap.Collapse.getOrCreateInstance(menuSanduiche);
            menuCollapse.hide();
        }

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

async function listarFilmesPopulares() {
    try {
        const telaLista = document.getElementById("tela-principal");
        const url = `${urlBase}/3/movie/popular?api_key=${chaveAPI}&language=pt-BR`;
        const response = await axios.get(url);

        titulo = "Filmes Populares";
        setTitulo(titulo);

        telaLista.innerHTML = "";
        response.data.results.forEach(filme => {

            const card = document.createElement('div');
            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]} <br>`;
            });

            // Separa a data pelo traço, inverte o array e depois junta ele usando / para separar. 
            const dataFormatada = filme.release_date.split('-').reverse().join('/');

            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme" style="aspect-ratio: 2/3; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${filme.title}</h5>
                        
                        <p class="card-text mb-2 text-muted" style="font-size: 0.9rem;">Lançamento: ${dataFormatada}</p>
                        
                        <div class="mt-auto">
                            <span style="font-size: 0.85rem;" class="fw-semibold text-primary">${nomeCategorias}</span>
                        </div>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-principal");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

function setTitulo(tituloNovo) {
    const titulo = document.getElementById('titulo');

    tituloAnterior = tituloAtual;
    tituloAtual = tituloNovo;

    titulo.innerHTML = tituloAtual;
}

async function lancamentos() {
    try {

        const telaLista = document.getElementById("tela-principal");
        const url = `${urlBase}/3/movie/upcoming?api_key=${chaveAPI}&language=pt-BR`;
        const response = await axios.get(url);

        titulo = "Filmes Lançamentos";
        setTitulo(titulo);

        telaLista.innerHTML = "";

        response.data.results.forEach(filme => {

            const card = document.createElement('div');

            card.classList.add('col');

            let nomeCategorias = "";

            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]} <br>`;
            });

            const dataFormatada = filme.release_date.split('-').reverse().join('/');

            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme" style="aspect-ratio: 2/3; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${filme.title}</h5>
                        
                        <p class="card-text mb-2 text-muted" style="font-size: 0.9rem;">Lançamento: ${dataFormatada}</p>
                        
                        <div class="mt-auto">
                            <span style="font-size: 0.85rem;" class="fw-semibold text-primary">${nomeCategorias}</span>
                        </div>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-principal");

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

formulario.addEventListener('submit', event => {
    event.preventDefault();

    let nome = document.getElementById("busca").value;

    buscar(nome);
});

async function buscar(inputUsuario) {
    try {

        const telaLista = document.getElementById("tela-principal");
        const url = `${urlBase}/3/search/movie?api_key=${chaveAPI}&language=pt-BR&query=${inputUsuario}`;
        const response = await axios.get(url);
        const filmes = response.data.results;

        titulo = `Filmes com o nome ${inputUsuario}`;
        setTitulo(titulo);

        telaLista.innerHTML = "";

        filmes.forEach(filme => {

            const card = document.createElement('div');

            card.classList.add('col');

            let nomeCategorias = "";

            // forEach para carregar o nome das categorias, já que um filme pode ter mais de uma. 
            filme.genre_ids.forEach(genero => {
                nomeCategorias += `${categoriaGlobais[genero]}<br>`;
            });

            const dataFormatada = filme.release_date.split('-').reverse().join('/');

            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme" style="aspect-ratio: 2/3; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${filme.title}</h5>
                        
                        <p class="card-text mb-2 text-muted" style="font-size: 0.9rem;">Lançamento: ${dataFormatada}</p>
                        
                        <div class="mt-auto">
                            <span style="font-size: 0.85rem;" class="fw-semibold text-primary">${nomeCategorias}</span>
                        </div>
                    </div>
                </div>`;

            telaLista.appendChild(card);
        });

        navegar("tela-principal");

        const menuSanduiche = document.getElementById('navbarNav');
        if (menuSanduiche.classList.contains('show')) {
            const menuCollapse = bootstrap.Collapse.getOrCreateInstance(menuSanduiche);
            menuCollapse.hide();
        }

    } catch (erro) {
        console.log(`Erro na requisição: ${erro}`);
    }
}

function favoritar(idFilme) {

    try {
        let lista = localStorage.getItem('filmesFavoritos');

        // Se a lista vier preenchida, transformamos ela em uma json, se não ela vira um array. 
        let listaFilmesFavoritos = lista ? JSON.parse(lista) : [];

        if (!listaFilmesFavoritos.includes(idFilme)) {

            listaFilmesFavoritos.push(idFilme);

            // Salva a lista atualizada no Local Storage, transformando ela em uma string.
            localStorage.setItem('filmesFavoritos', JSON.stringify(listaFilmesFavoritos));

            // Biblioteca SweetAlert2 
            Swal.fire({
                title: "Filme salvo com sucesso!",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Filme já está na sua lista de filmes favoritos!",
                icon: "warning"
            });
        }

    } catch (erro) {
        console.log("Erro ao salvar o filme no Local Storage: ", erro);
    }
}

function removerFilmeFavorito(idFilme) {
    try {
        // Recupera a lista de filmes favoritos do Local Storage
        let listaString = localStorage.getItem('filmesFavoritos');

        // Se a lista existir, converte para array, caso contrário, cria um array vazio
        let listaFilmesFavoritos = listaString ? JSON.parse(listaString) : [];

        // Filtra a lista removendo o filme com o id fornecido
        listaFilmesFavoritos = listaFilmesFavoritos.filter(id => id !== idFilme);
        
        localStorage.setItem('filmesFavoritos', JSON.stringify(listaFilmesFavoritos));

        Swal.fire({
            title: "Filme removido dos favoritos!",
            icon: "success"
        });

    } catch (erro) {
        console.log("Erro ao remover o filme no Local Storage: ", erro);
    }
}

function verificarSeFilmeFavorito(idFilme) {
    let listaString = localStorage.getItem('filmesFavoritos');

    let listaFilmesFavoritos = listaString ? JSON.parse(listaString) : [];

    if(listaFilmesFavoritos.includes(idFilme)) {
        return true;
    } else {
        return false;
    }
}    

async function listarFilmesFavoritos() {
    try {
        const telaLista = document.getElementById("tela-principal");
        telaLista.innerHTML = "";
        
        titulo = "Meus Filmes Favoritos";
        setTitulo(titulo);

        let listaString = localStorage.getItem('filmesFavoritos');

        let listaFilmesFavoritos = listaString ? JSON.parse(listaString) : [];

        
        if (listaFilmesFavoritos.length === 0) {
            telaLista.innerHTML = "<p class='text-center w-100 fs-5 mt-4 text-muted'>Você ainda não tem filmes favoritos salvos.</p>";
        } else {
            
            for (const id of listaFilmesFavoritos) {
                
                
                let url = `${urlBase}/3/movie/${id}?api_key=${chaveAPI}&language=pt-BR`;

                const response = await axios.get(url);
                
                
                const filme = response.data; 

                const card = document.createElement('div');
                card.classList.add('col');

                let nomeCategorias = "";

                filme.genres.forEach(genero => {
                    nomeCategorias += `${genero.name}<br>`;
                });

                const dataFormatada = filme.release_date.split('-').reverse().join('/');

                card.innerHTML = `
                <div class="card h-100 shadow-sm border-0" onclick="mostrarDetalhes(${filme.id})" style="cursor: pointer;">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="Imagem do Filme" style="aspect-ratio: 2/3; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${filme.title}</h5>
                        <p class="card-text mb-2 text-muted" style="font-size: 0.9rem;">Lançamento: ${dataFormatada}</p>
                        <div class="mt-auto">
                            <span style="font-size: 0.85rem;" class="fw-semibold text-primary">${nomeCategorias}</span>
                        </div>
                    </div>
                </div>`;

                telaLista.appendChild(card);
            }
        }
        
        navegar("tela-principal"); 
        
        // Fecha o menu sanduíche ao clicar em "Meus Favoritos"
        const menuSanduiche = document.getElementById('navbarNav');
        if (menuSanduiche.classList.contains('show')) {
            const menuCollapse = bootstrap.Collapse.getOrCreateInstance(menuSanduiche);
            menuCollapse.hide();
        }

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

        titulo = `Detalhes do Filme ${filme.title}`;
        setTitulo(titulo);

        telaLista.innerHTML = "";

        filme.genres.forEach(genero => {
            generos += `<span class="badge bg-primary me-2">${genero.name}</span>`;
        });

        const dataFormatada = filme.release_date.split('-').reverse().join('/');
        
        // Operador ternario para verificar se o filme está nos favoritos e exibir o botão correspondente.
        const botao = verificarSeFilmeFavorito(idFilme) ? `<button class="btn btn-outline-danger px-5 py-2 shadow-sm rounded-pill" onclick="removerFilmeFavorito(${idFilme})">Remover dos favoritos</button>` : `<button class="btn btn-outline-secondary px-5 py-2 shadow-sm rounded-pill" onclick="favoritar(${idFilme})">Adicionar aos favoritos</button>`;

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
                
                <p class="mb-2"><strong>Data de lançamento:</strong> ${dataFormatada}</p>
                
                <div class="alert alert-dark d-inline-block mt-3 mb-4 shadow-sm" role="alert">
                    <h5 class="mb-0">
                        ⭐ ${filme.vote_average.toFixed(1)} <span class="fs-6 text-muted">/ 10</span>
                        <span class="ms-3 badge bg-secondary text-light fs-6">${filme.vote_count} votos</span>
                    </h5>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-outline-secondary px-5 py-2 mb-3 shadow-sm rounded-pill" onclick="voltar()">
                        Voltar para a lista
                    </button>
                    ${botao}
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

async function iniciarApp() {
    try {
        await carregarCategorias();
        lancamentos();
    } catch (erro) {
        console.log(`Erro ao iniciar a aplicação: ${erro}`);
    }
}

iniciarApp();

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