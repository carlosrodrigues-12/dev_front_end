export default class Edificio {
    constructor(nome, endereco, bairro, cidade, uf) {
        this._nome = nome;
        this._endereco = endereco;
        this._bairro = bairro;
        this._cidade = cidade;
        this._uf = uf;
    }

    get nome() { 
        return this._nome; 
    }

    get endereco() { 
        return this._endereco; 
    }

    get bairro() { 
        return this._bairro; 
    }

    get cidade() { 
        return this._cidade; 
    }

    get uf() { 
        return this._uf; 
    }

    set nome(novoNome) { 
        this._nome = novoNome; 
    }

    set endereco(novoEndereco) { 
        this._endereco = novoEndereco; 
    }

    set bairro(novoBairro) { 
        this._bairro = novoBairro; 
    }

    set cidade(novaCidade) { 
        this._cidade = novaCidade; 
    }

    set uf(novoUf) { 
        this._uf = novoUf; 
    }

    mostrarDadosEdificio() {
        console.log(`Edifício: ${this._nome}`);
        console.log(`Endereço: ${this._endereco}, ${this._bairro} - ${this._cidade}/${this._uf}`);
    }
}