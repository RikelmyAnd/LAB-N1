//Classe Aluno

class Aluno {
    constructor(nome, idade, curso, nota) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }

    isAprovado() {
        return this.nota >= 7;
    }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota: ${this.nota}, Aprovado: ${this.isAprovado() ? 'Sim' : 'Não'}`;
    }
}

//Classe ControlerAluno

class ControlerAluno {
    constructor() {
        this.alunos = [];
        this.editandoIndex = null;
        this.init();
    }   
    init() {
        document.getElementById("btnSalvar").addEventListener("click", (e) => this.salvar(e));
        document.getElementById("btnAprovados").addEventListener("click", () => this.calcularAprovados());
        document.getElementById("btnMediaNotas").addEventListener("click", () => this.calcularMediaNotas());
        document.getElementById("btnMediaIdades").addEventListener("click", () => this.calcularMediaIdade());
        document.getElementById("btnOrdemNome").addEventListener("click", () => this.ordenarNome());
        document.getElementById("btnAlunosPorCurso").addEventListener("click", () => this.gerarAlunosPorCurso());
    }
    mostrarRelatorio(conteudo) {
        document.getElementById("relatorio").innerHTML = conteudo;
    }
    salvar(e) {

        e.preventDefault();
        let nome = document.getElementById("idnome").value;
        let idade = parseInt(document.getElementById("ididade").value);
        let curso = document.getElementById("idcurso").value;
        let nota = parseFloat(document.getElementById("idnota").value);

//VALIDAÇÕES BÁSICAS
        if (nome.trim() === "") {
            alert("O nome não pode estar vazio.");
            return;
        }

        if (isNaN(idade) || idade <= 0 || idade > 150) {
            alert("Idade inválida. Por favor, insira um número válido, maior que 0 e menor que 150.");
            return;
        }
        if (curso === "0") {
            alert("Por favor, selecione um curso válido.");
            return;
        }
        if (isNaN(nota) || nota < 0 || nota > 10) {
            alert("Nota inválida. Por favor, insira uma nota entre 0 e 10.");
            return;
        }

//CRIAR O OBJETO ALUNO
        let aluno = new Aluno(nome, idade, curso, nota);

        if (this.editandoIndex !== null) {
            this.alunos[this.editandoIndex] = aluno;
            alert("Aluno atualizado com sucesso!");
            this.editandoIndex = null;
        } else {
            this.alunos.push(aluno);
            alert("Aluno adicionado com sucesso!");
        }


        this.atualizarTabela();
        this.limparFormulario();

        document.getElementById("btnSalvar").value = "Salvar";

    }
    atualizarTabela() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";
        this.alunos.forEach((aluno, index) => {
            let row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = aluno.nome;
            row.insertCell(2).innerText = aluno.idade;
            row.insertCell(3).innerText = aluno.curso;
            row.insertCell(4).innerText = aluno.nota;

//CRIAR BOTÃO EXCLUIR E BOTÃO EDITAR
            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";
            btnEditar.type = "button";

            const btnExcluir = document.createElement("button");
            btnExcluir.innerText = "Excluir";
            btnExcluir.type = "button";

            const actionCell = row.insertCell(5);
            actionCell.appendChild(btnEditar);
            actionCell.appendChild(btnExcluir);

//ADICIONAR EVENTO AOS BOTÕES
            btnEditar.addEventListener("click", (event) => this.carregarParaEditar(event, index));
            btnExcluir.addEventListener("click", (event) => this.excluir(event, index));
        });
    }
    excluir(event, index) {
        event.preventDefault();
        if (confirm("Tem certeza que deseja excluir este aluno?")) {
            this.alunos.splice(index, 1);
            this.atualizarTabela();
            alert("Aluno excluído com sucesso!");
        }
    }
    carregarParaEditar(event, index) {
        event.preventDefault();
        const aluno = this.alunos[index];
        document.getElementById("idnome").value = aluno.nome;
        document.getElementById("ididade").value = aluno.idade;
        document.getElementById("idcurso").value = aluno.curso;
        document.getElementById("idnota").value = aluno.nota;
        this.editandoIndex = index;
        document.getElementById("btnSalvar").value = "Atualizar";
    }

    limparFormulario() {
        document.getElementById("idnome").value = "";
        document.getElementById("ididade").value = "";
        document.getElementById("idcurso").value = "";
        document.getElementById("idnota").value = "";
    }
    calcularAprovados() {
        const aprovados = this.alunos.filter(aluno => aluno.isAprovado());

        let html = `<b>Alunos Aprovados: </b><br>`;
        if (aprovados.length === 0) {
            html += "Nenhum aluno aprovado.";
        } else {
            aprovados.forEach(aluno => {
                html += `- ${aluno.nome} (Nota: ${aluno.nota})<br>`;
            });
        
        }

        this.mostrarRelatorio(html);
    }
    calcularMediaIdade() {
        if (this.alunos.length === 0) {
            this.mostrarRelatorio("Nenhum aluno cadastrado para calcular a média de idades.");
            return;
        }

        const totalIdade = this.alunos.reduce((soma, aluno) => soma + aluno.idade, 0);
        const mediaIdade = totalIdade / this.alunos.length;

        this.mostrarRelatorio(`<b>A média de idades dos alunos é: </b> ${mediaIdade.toFixed(1)} anos.`);
    }
    calcularMediaNotas() {
        if (this.alunos.length === 0) {
            this.mostrarRelatorio("Nenhum aluno cadastrado para calcular a média de notas.");
            return;
        }   
        const totalNotas = this.alunos.reduce((soma, aluno) => soma + aluno.nota, 0);
        const mediaNotas = totalNotas / this.alunos.length;

        this.mostrarRelatorio(`<b>A média de notas dos alunos é: </b> ${mediaNotas.toFixed(2)}.`);
    }
    ordenarNome() {
        if (this.alunos.length === 0) {
            this.mostrarRelatorio("Nenhum aluno cadastrado.");
            return;
        }

        const nomes = this.alunos.map(aluno => aluno.nome);
        nomes.sort();

        this.mostrarRelatorio("<b>Alunos em ordem alfabética: </b><br>" + nomes.join("<br>"));
    }
    gerarAlunosPorCurso() {
        if (this.alunos.length === 0) {
            this.mostrarRelatorio("Nenhum aluno cadastrado.");
            return;
        }

        const contagemPorCurso = this.alunos.reduce ((acc, aluno) => {
            const curso = aluno.curso;

            if (!acc[curso]) {
                acc[curso] = 0;
            }

            acc[curso]++;
            return acc;
        }, {});

        let html = "<b>Quantidade de Alunos por Curso: </b><br>";

        Object.keys(contagemPorCurso).forEach(curso => {
            const nomeCurso = curso.charAt(0).toUpperCase() + curso.slice(1)
            html += `- ${nomeCurso}: ${contagemPorCurso[curso]} alunos<br>`;
        });

        this.mostrarRelatorio(html);
    }
}

new ControlerAluno();

