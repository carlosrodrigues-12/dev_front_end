export default class Pessoa {

    constructor(nome, cpf) {
        this._nome = nome;
        this._cpf = cpf;
    }

    get nome() {
        return this._nome;
    }

    get cpf() {
        return this._cpf;
    }

    set nome(novoNome) {
        this._nome = novoNome;
    }

    set cpf(novoCpf) {
        this._cpf = novoCpf;
    }

    mostrarDadosPessoa() {
        console.log(`Nome: ${this._nome}`);
        console.log(`CPF: ${this._cpf}`);
    }
}