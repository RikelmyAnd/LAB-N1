window.addEventListener('load', function() {
    carregarSessoes();
    verificarSessao();
});

function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];

    const selectSessao = document.getElementById("idsessaoingresso");

    sessoes.forEach(function(sessao) {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        if (!filme || !sala) {
            return;
        }

        const dataFormatada = new Date(sessao.datahora).toLocaleString('pt-BR');
        const textoOpcao = `${filme.titulo} - Sala ${sala.nomesala} - ${sessao.datahora}`;
        const option = document.createElement("option");
        option.value = sessao.id;
        option.text = textoOpcao;
        selectSessao.appendChild(option);
    });
}

function verificarSessao() {
    const params = new URLSearchParams(window.location.search);
    const sessaoId = params.get('sessaoId');

    if (sessaoId) {
        const selectSessao = document.getElementById("idsessaoingresso");
        selectSessao.value = sessaoId;
    }
}



document.getElementById("form-ingresso").addEventListener('submit', function(event) {
        event.preventDefault();

        const sessaoId = document.getElementById("idsessaoingresso").value;
        const nome = document.getElementById("idnomeingresso").value;
        const cpf = document.getElementById("idcpfingresso").value;
        const assento = document.getElementById("idassentoingresso").value;
        const pagamento = document.getElementById("idpagamentoingresso").value;

        if (!sessaoId) {
            alert("Por favor, selecione uma sessão.");
            return;
        }

        const ingresso = {
            id: Date.now(),
            sessaoId: sessaoId,
            nome: nome,
            cpf: cpf,
            assento: assento,
            pagamento: pagamento
        };

        const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
        ingressos.push(ingresso);
        localStorage.setItem("ingressos", JSON.stringify(ingressos));
        alert("Ingresso vendido com sucesso!");
        event.target.reset();
    } );