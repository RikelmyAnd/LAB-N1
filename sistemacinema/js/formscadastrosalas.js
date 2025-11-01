document.getElementById("form-sala").addEventListener('submit', function(event) {
        event.preventDefault();

        

        const nomesala = document.getElementById("idnomesala").value;
        const capacidade = document.getElementById("idcapacidadesala").value;
        const tiposala = document.getElementById("idtiposala").value;

        if (tiposala === "0") {
        alert("Por favor, selecione um tipo de sala válido.");
        return;
        }

        const sala = {
            id: Date.now(),
            nomesala: nomesala,
            capacidade: capacidade,
            tiposala: tiposala
        };

        const salas = JSON.parse(localStorage.getItem("salas")) || [];
        salas.push(sala);
        localStorage.setItem("salas", JSON.stringify(salas));
        alert("Sala cadastrada com sucesso!");
        event.target.reset();
    });