document.getElementById("form-filme").addEventListener('submit', function(event) {
        event.preventDefault();

        const titulo = document.getElementById("idnomefilme").value;
        const duracao = document.getElementById("idduracaofilme").value;
        const genero = document.getElementById("idgenerofilme").value;
        const descricao = document.getElementById("iddescricaofilme").value;
        const datafilme = document.getElementById("iddatafilme").value;

        if (genero === "0") {
            alert("Por favor, selecione um gênero válido.");
            return;
        }

        const filme = {
            id: Date.now(),
            titulo: titulo,
            duracao: duracao,
            genero: genero,
            descricao: descricao,
            datafilme: datafilme,
        };

        const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        filmes.push(filme);
        localStorage.setItem("filmes", JSON.stringify(filmes));
        
        alert("Filme cadastrado com sucesso!");
        event.target.reset();
    });