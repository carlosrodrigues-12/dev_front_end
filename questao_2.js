const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const anoReferencia = 2024;

rl.question('Digite o ano de nascimento: ', (anoNascimentoStr) => {
  
  const anoNascimento = parseInt(anoNascimentoStr);

  if (isNaN(anoNascimento) || anoNascimento <= 0 || anoNascimento > anoReferencia) {
    console.log('\nERRO: Data inválida.');
  } else {
    const idade = anoReferencia - anoNascimento;

    console.log('\n------------------------------------');
    console.log(`Quem nasceu em ${anoNascimento} irá completar ${idade} anos em ${anoReferencia}.`);
    console.log('------------------------------------');
  }

  rl.close();
});