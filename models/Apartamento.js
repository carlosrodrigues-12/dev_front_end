export default class Apartamento {
    
    constructor(numero, andar, bloco, edificio, morador) {
        this._numero = numero;
        this._andar = andar;
        this._bloco = bloco;
        this._edificio = edificio; 
        this._morador = morador;  
    }

    get numero() { 
        return this._numero; 
    }

    get andar() { 
        return this._andar; 
    }

    get bloco() { 
        return this._bloco; 
    }

    get edificio() { 
        return this._edificio; 
    }

    get morador() { 
        return this._morador; 
    }

    set numero(novoNumero) { 
        this._numero = novoNumero; 
    }

    set andar(novoAndar) { 
        this._andar = novoAndar; 
    }

    set bloco(novoBloco) { 
        this._bloco = novoBloco; 
    }

    set edificio(novoEdificio) { 
        this._edificio = novoEdificio; 
    }

    set morador(novoMorador) { 
        this._morador = novoMorador; 
    }

    mostrarDadosApartamento() {
        console.log("\n========================================");
        console.log(`Dados do Apartamento ${this._numero}`);
        console.log("----------------------------------------");
        console.log(`Número: ${this._numero}`);
        console.log(`Andar: ${this._andar}`);
        console.log(`Bloco: ${this._bloco}`);
        
        this._edificio.mostrarDadosEdificio();
        this._morador.mostrarDadosMorador();
        console.log("========================================");
    }
}