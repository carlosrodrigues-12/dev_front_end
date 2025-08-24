const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite um número para verificar se é par ou ímpar: ', (numeroStr) => {

  const numero = parseInt(numeroStr);

  if (isNaN(numero)) {
    console.log('\nERRO: Número inválido.');
  } else {

    let tipoDoNumero;

    if (numero % 2 === 0) {
      tipoDoNumero = 'par';
    } else {
      tipoDoNumero = 'ímpar';
    }

    console.log('\n------------------------------------');
    console.log(`O número ${numero} que foi digitado é ${tipoDoNumero}!`);
    console.log('------------------------------------');
  }

  rl.close();
});