const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o nome do aluno: ', (nomeAluno) => {
  rl.question('Digite a disciplina: ', (nomeDisciplina) => {
    rl.question('Digite a primeira nota: ', (nota1_str) => {
      rl.question('Digite a segunda nota: ', (nota2_str) => {
        
        const nota1 = parseFloat(nota1_str);
        const nota2 = parseFloat(nota2_str);

        if (isNaN(nota1) || isNaN(nota2)) {
          console.log('\nERRO: Notas inválidas.');
        } else {
          const media = (nota1 + nota2) / 2;

          console.log('\n------------------------------------');
          console.log('      RESULTADO DO ALUNO');
          console.log('------------------------------------');
          console.log(`Nome do Aluno: ${nomeAluno}`);
          console.log(`Disciplina: ${nomeDisciplina}`);
          console.log(`Nota 1: ${nota1.toFixed(2)}`);
          console.log(`Nota 2: ${nota2.toFixed(2)}`);
          console.log(`Média Final: ${media.toFixed(2)}`);
          console.log('------------------------------------');
        }

        rl.close();
      });
    });
  });
});