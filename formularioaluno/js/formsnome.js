//Classe Aluno

class Aluno {
    constructor(nome, idade, curso, nota) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }
}

//Classe ControlerAluno

class ControlerAluno {
    constructor() {
        this.alunos = [];
        this.init();
    }   
    init() {
        document.getElementById("btnSalvar").addEventListener("click", (e) => this.salvar(e));
        
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }  
    listarAlunos() {
        return this.alunos;
    }
}
