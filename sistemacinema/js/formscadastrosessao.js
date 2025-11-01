function carregarFilmes() {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const selectFilmes = document.getElementById("idfilmesessao");

    filmes.forEach(filme => {
        const option = document.createElement("option");
        option.value = filme.id;
        option.text = filme.titulo;
        selectFilmes.appendChild(option);
    } );

    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const selectSalas = document.getElementById("idsalasessao");

    salas.forEach(sala => {
        const option = document.createElement("option");
        option.value = sala.id;
        option.text = sala.nomesala;
        selectSalas.appendChild(option);
    } );
}

window.addEventListener('load', carregarFilmes);

document.getElementById("form-sessao").addEventListener('submit', function(event) {
        event.preventDefault();

    const filmeId = document.getElementById("idfilmesessao").value;
    const salaId = document.getElementById("idsalasessao").value;
    const datahora = document.getElementById("iddatasessao").value;
    const preco = document.getElementById("idprecosessao").value;
    const formato = document.getElementById("idformatosessao").value;
    const idioma = document.getElementById("ididiomasessao").value;

    
    if (filmeId === "0") {
        alert("Por favor, selecione um filme.");
        return;
    }
    if (salaId === "0") { 
        alert("Por favor, selecione uma sala.");
        return;
    }
    if (idioma === "0") {
        alert("Por favor, selecione um idioma.");
        return;
    }
    if (formato === "0") { 
        alert("Por favor, selecione um formato.");
        return;
    }

        const sessao = {
            id: Date.now(),
            filmeId: document.getElementById("idfilmesessao").value,
            salaId: document.getElementById("idsalasessao").value,
            datahora: document.getElementById("iddatasessao").value,
            preco: document.getElementById("idprecosessao").value,
            formato: document.getElementById("idformatosessao").value,
            idioma: document.getElementById("ididiomasessao").value

        };

        const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
        sessoes.push(sessao);
        localStorage.setItem("sessoes", JSON.stringify(sessoes));
        alert("Sessão cadastrada com sucesso!");
        event.target.reset();
    } );