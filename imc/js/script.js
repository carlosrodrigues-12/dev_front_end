document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('imc-form');
  const inputAltura = document.getElementById('altura');
  const inputPeso = document.getElementById('peso');
  const btnCalcular = document.getElementById('calcular');
  const btnLimpar = document.getElementById('limpar');
  const resultado = document.getElementById('resultado');
  const valorImc = document.getElementById('valor-imc');
  const situacao = document.getElementById('situacao');
  const grauObesidade = document.getElementById('grau-obesidade');

  // Função para calcular o IMC
  function calcularIMC(altura, peso) {
    return peso / (altura * altura);
  }

  // Função para classificar o IMC
  function classificarIMC(imc) {
      if (imc < 16) {
        return { situacao: 'Magreza grave', grau: '-' };
      } else if (imc >= 16 && imc <= 16.9) {
        return { situacao: 'Magreza moderada', grau: '-' };
      } else if (imc >= 17 && imc <= 18.5) {
        return { situacao: 'Magreza leve', grau: '-' };
      } else if (imc >= 18.6 && imc <= 24.9) {
        return { situacao: 'Peso ideal', grau: '-' };
      } else if (imc >= 25 && imc <= 29.9) {
        return { situacao: 'Sobrepeso', grau: '0' };
      } else if (imc >= 30 && imc <= 34.9) {
        return { situacao: 'Obesidade', grau: 'I' };
      } else if (imc >= 35 && imc <= 39.9) {
        return { situacao: 'Obesidade severa', grau: 'II' };
      } else if (imc >= 40) {
        return { situacao: 'Obesidade mórbida', grau: 'III' };
      }
  }

  // Event listener para o formulário
  btnCalcular.addEventListener('click', function(e) {
    e.preventDefault();
      
    const altura = parseFloat(inputAltura.value);
    const peso = parseFloat(inputPeso.value);
      
    // Validação básica
    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
      alert('Por favor, insira valores válidos para altura e peso.');
      return;
    }
      
    // Calcular IMC
    const imc = calcularIMC(altura, peso);
    const classificacao = classificarIMC(imc);
      
    // Exibir resultados
    valorImc.textContent = imc.toFixed(2);
    situacao.textContent = classificacao.situacao;
    grauObesidade.textContent = classificacao.grau;
      
    // Mostrar a seção de resultados
    resultado.classList.remove('hidden');
      
    // Destacar a linha correspondente na tabela
    destacarLinhaTabela(imc);
  });

  // Função para destacar a linha da tabela correspondente ao IMC calculado
  function destacarLinhaTabela(imc) {
    // Remover destaque anterior
    const linhas = document.querySelectorAll('#tabela-imc tbody tr');
    linhas.forEach(linha => {
      linha.style.backgroundColor = '';
      linha.style.fontWeight = 'normal';
    });
    
    // Encontrar e destacar a linha correspondente
    if (imc < 16) {
      linhas[0].style.backgroundColor = '#ffe6e6';
      linhas[0].style.fontWeight = 'bold';
    } else if (imc >= 16 && imc <= 16.9) {
      linhas[1].style.backgroundColor = '#ffe6e6';
      linhas[1].style.fontWeight = 'bold';
    } else if (imc >= 17 && imc <= 18.5) {
      linhas[2].style.backgroundColor = '#ffe6e6';
      linhas[2].style.fontWeight = 'bold';
    } else if (imc >= 18.6 && imc <= 24.9) {
      linhas[3].style.backgroundColor = '#e6ffe6';
      linhas[3].style.fontWeight = 'bold';
    } else if (imc >= 25 && imc <= 29.9) {
      linhas[4].style.backgroundColor = '#fff9e6';
      linhas[4].style.fontWeight = 'bold';
    } else if (imc >= 30 && imc <= 34.9) {
      linhas[5].style.backgroundColor = '#ffe6e6';
      linhas[5].style.fontWeight = 'bold';
    } else if (imc >= 35 && imc <= 39.9) {
      linhas[6].style.backgroundColor = '#ffe6e6';
      linhas[6].style.fontWeight = 'bold';
    } else if (imc >= 40) {
      linhas[7].style.backgroundColor = '#ffe6e6';
      linhas[7].style.fontWeight = 'bold';
    }
  }

  // Event listener para o botão limpar
  btnLimpar.addEventListener('click', function() {
    form.reset();
    resultado.classList.add('hidden');
      
    // Remover destaque da tabela
    const linhas = document.querySelectorAll('#tabela-imc tbody tr');
    linhas.forEach(linha => {
      linha.style.backgroundColor = '';
      linha.style.fontWeight = 'normal';
    });
  });
});