import Pessoa from "./Pessoa.js";

export default class Morador extends Pessoa {
    constructor(nome, cpf, codigoAcesso) {
        super(nome, cpf); 
        this._codigoAcesso = codigoAcesso;
    }

    get codigoAcesso() {
        return this._codigoAcesso;
    }

    set codigoAcesso(novoCodigo) {
        this._codigoAcesso = novoCodigo;
    }

    mostrarDadosMorador() {
        super.mostrarDadosPessoa(); 
        console.log(`Código de Acesso: ${this._codigoAcesso}`);
    }
}