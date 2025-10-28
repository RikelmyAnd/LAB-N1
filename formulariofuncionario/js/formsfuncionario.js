//Classe Funcionario

class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }

    get nome() {
        return this._nome;
    }
    set nome(valor) {
        this._nome = valor;
    }

    get idade() {
        return this._idade;
    }   
    set idade(valor) {
        this._idade = valor;
    }

    get cargo() {
        return this._cargo;
    }
    set cargo(valor) {
        this._cargo = valor;
    }

    get salario() {
        return this._salario;
    }
    set salario(valor) {
        this._salario = valor;
    }


    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario}`;
    }
}

//Classe ControlerFuncionario

class ControlerFuncionario{
    constructor() {
        this.funcionarios = [];
        this.editandoIndex = null;
        this.init();
    }   
    init() {
        document.getElementById("btnSalvar").addEventListener("click", (e) => this.salvar(e));
        document.getElementById("btnSalario").addEventListener("click", () => this.calcularSal());
        document.getElementById("btnMediaSal").addEventListener("click", () => this.calcularMediaSal());
        document.getElementById("btnCargos").addEventListener("click", () => this.buscarCargos());
        document.getElementById("btnNomes").addEventListener("click", () => this.ordenarNomes());
    }
    mostrarRelatorio(conteudo) {
        document.getElementById("relatorio").innerHTML = conteudo;
    }
    salvar(e) {

        e.preventDefault();
        let nome = document.getElementById("idnome").value;
        let idade = parseInt(document.getElementById("ididade").value);
        let cargo = document.getElementById("idcargo").value;
        let salario = parseFloat(document.getElementById("idsal").value);

//VALIDAÇÕES BÁSICAS
        if (nome.trim() === "") {
            alert("O nome não pode estar vazio.");
            return;
        }

        if (isNaN(idade) || idade <= 0 || idade > 150) {
            alert("Idade inválida. Por favor, insira um número válido, maior que 0 e menor que 150.");
            return;
        }
        if (cargo.trim() === "") {
            alert("O cargo não pode estar vazio.");
            return;
        }
        if (isNaN(salario) || salario  < 0) {
            alert("Salário inválido. O valor do Salário não pode estar vazio ou ser negativo.");
            return;
        }

//CRIAR O OBJETO FUNCIONARIO
        let funcionario = new Funcionario (nome, idade, cargo, salario);

        if (this.editandoIndex !== null) {
            this.funcionarios[this.editandoIndex] = funcionario;
            alert("Funcionário atualizado com sucesso!");
            this.editandoIndex = null;
        } else {
            this.funcionarios.push(funcionario);
            alert("Funcionário adicionado com sucesso!");
        }


        this.atualizarTabela();
        this.limparFormulario();

        document.getElementById("btnSalvar").value = "Salvar";

    }
    atualizarTabela() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";
        this.funcionarios.forEach((funcionario, index) => {
            let row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = funcionario.nome;
            row.insertCell(2).innerText = funcionario.idade;
            row.insertCell(3).innerText = funcionario.cargo;
            row.insertCell(4).innerText = funcionario.salario;

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
        if (confirm("Tem certeza que deseja excluir este Funcionário?")) {
            this.funcionarios.splice(index, 1);
            this.atualizarTabela();
            alert("Funcionário excluído com sucesso!");
        }
    }
    carregarParaEditar(event, index) {
        event.preventDefault();
        const funcionario = this.funcionarios[index];
        document.getElementById("idnome").value = funcionario.nome;
        document.getElementById("ididade").value = funcionario.idade;
        document.getElementById("idcargo").value = funcionario.cargo;
        document.getElementById("idsal").value = funcionario.salario;
        this.editandoIndex = index;
        document.getElementById("btnSalvar").value = "Atualizar";
    }

    limparFormulario() {
        document.getElementById("idnome").value = "";
        document.getElementById("ididade").value = "";
        document.getElementById("idcargo").value = "";
        document.getElementById("idsal").value = "";
    }
    calcularSal() {
        const filtroSalario = this.funcionarios.filter(func => func.salario > 5000);

        let html = "<b>Funcionários com Salários acima de R$5000:</b><br><br>";

        if (filtroSalario.length === 0) {
            html += "Nenhum Funcionário encontrado com Salário acima de R$5000.";
        } else {
            filtroSalario.forEach(func => {
                html += `- ${func.nome}, Salário: R$${func.salario.toFixed(2)}<br>`;
            });
        }
        this.mostrarRelatorio(html);
    }
    calcularMediaSal() {
        if (this.funcionarios.length === 0) {
            this.mostrarRelatorio("Nenhum Funcionário cadastrado para calcular a média Salarial.");
            return;
        }   
        const totalSal = this.funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0);
        const mediaSal = totalSal / this.funcionarios.length;

        this.mostrarRelatorio(`<b>A média Salarial dos Funcionários é: </b> ${mediaSal.toFixed(2)}.`);
    }
    ordenarNomes() {
        if (this.funcionarios.length === 0) {
            this.mostrarRelatorio("Nenhum Funcionário cadastrado.");
            return;
        }

        const nomesMaiusulos = this.funcionarios.map(func => func.nome.toUpperCase());

        let html = `<b>Lista de Nomes dos Funcionários (em maiúsculo):</b><br><br>`;
        html += nomesMaiusulos.join("<br>");

        this.mostrarRelatorio(html);
    }
     buscarCargos() {
        if (this.funcionarios.length === 0) {
            this.mostrarRelatorio("Nenhum Funcionário cadastrado.");
            return;
        }
        const todosCargos = this.funcionarios.map(func => func.cargo);
        const cargosUnicos = [...new Set(todosCargos)];

        let html = `<b>Lista de Cargos Ùnicos na Empresa:</b><br><br>`;
        cargosUnicos.forEach(cargo => {
            html += `- ${cargo}<br>`;
        });

        this.mostrarRelatorio(html);
    }
}

new ControlerFuncionario();

