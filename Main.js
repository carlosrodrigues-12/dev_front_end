import Pessoa from "./models/Pessoa.js";
import Apartamento from "./models/Apartamento.js";
import Morador from "./models/Morador.js";
import Edificio from "./models/Edificio.js";

class Main {
    static run() {
        const edificioSantaClara = new Edificio(
            "Residencial Santa Clara",
            "Rua do Teste, 123",
            "Jardim Flores",
            "Goiânia",
            "GO"
        );

        const edificioDasLuzes = new Edificio(
            "Residencial das Luzes",
            "Rua do sol, 321",
            "Setor Central",
            "Goiânia",
            "GO"
        );

        const morador1 = new Morador("Lucas Rodrigues Porto", "111.111.111-11", "1111A");
        const morador2 = new Morador("Carlos Henrique", "222.222.222-22", "2222B");
        const morador3 = new Morador("Fernando Diniz", "333.333.333-33", "3333C");
        const morador4 = new Morador("Daniela Faria Lima", "444.444.444-44", "4444D");
        const morador5 = new Morador("Alexandre Mendonça", "555.555.555-55", "5555E");

        const apartamento101 = new Apartamento(401, 4, "A", edificioSantaClara, morador1);
        const apartamento102 = new Apartamento(302, 3, "A", edificioDasLuzes, morador2);
        const apartamento201 = new Apartamento(1002, 10, "B", edificioSantaClara, morador3);
        const apartamento404 = new Apartamento(2004, 20, "B", edificioDasLuzes, morador4);
        const apartamento801 = new Apartamento(2402, 24, "C", edificioSantaClara, morador5);

        const apartamentos = [
            apartamento101,
            apartamento102,
            apartamento201,
            apartamento404,
            apartamento801,
        ];

        console.log("DADOS DOS APARTAMENTOS");
        for (const ap of apartamentos) {
            ap.mostrarDadosApartamento();
        }
    }
}

Main.run();
