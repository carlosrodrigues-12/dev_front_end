const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite um número para ver a sua tabuada: ', (numeroStr) => {

  const numero = parseInt(numeroStr);

  if (isNaN(numero)) {
    console.log('\nERRO: Número inválido.');
  } else {
    console.log('\n------------------------------------');
    console.log(`TABUADA DO ${numero}`);
    console.log('------------------------------------');

    for (let i = 1; i <= 10; i++) {
      const resultado = numero * i;
      console.log(`  ${numero} x ${i} = ${resultado}`);
    }

    console.log('------------------------------------');
  }

  rl.close();
});