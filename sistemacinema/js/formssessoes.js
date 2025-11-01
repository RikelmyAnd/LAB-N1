window.addEventListener('load', function() {
    carregarSessoes();
}   );

function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];  

    const tabelaSessoes = document.getElementById("tabela");

    tabelaSessoes.innerHTML = '';

    sessoes.forEach(function(sessao) {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        if (!filme || !sala) {
            return;
        }

        const tr = document.createElement("tr");

        const dataFormatada = new Date(sessao.datahora).toLocaleString('pt-BR');
        const precoFormatado = parseFloat(sessao.preco).toFixed(2);

        tr.innerHTML = `
            <td>${filme.titulo}</td>
            <td>${sala.nomesala}</td>
            <td>${dataFormatada}</td>
            <td>R$ ${precoFormatado}</td>
            <td>
                <button onclick="comprarIngresso(${sessao.id})">Comprar</button>
            </td>
        `;

        tabelaSessoes.appendChild(tr);
    });
}   

function comprarIngresso(sessaoId) {
    window.location.href = `./venda-ingressos.html?sessaoId=${sessaoId}`;
}