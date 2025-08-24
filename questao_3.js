const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite um número para calcular seu fatorial: ', (numeroStr) => {

  const numero = parseInt(numeroStr);

  if (isNaN(numero)) {
    console.log('\nERRO: Número inválido.');
    rl.close();
    return; 
  }

  if (numero < 0) {
    console.log('\nERRO: Não é permitido número negativo.');
    rl.close();
    return; 
  }

  let resultado = 1n;

  for (let i = 1n; i <= BigInt(numero); i++) {
    resultado *= i;
  }

  console.log('\n------------------------------------');
  console.log(`O fatorial de ${numero} é:`);
  console.log(resultado.toString());
  console.log('------------------------------------');

  rl.close();
});