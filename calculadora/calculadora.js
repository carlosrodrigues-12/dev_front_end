/**
 * Função principal para calcular o resultado da operação.
 * É chamada quando o usuário clica no botão "Calcular".
 * Alunos: Lucas Rodrigues Porto				        Matrícula: 2025200247
           Carlos Henrique Silva Bispo Rodrigues		Matrícula: 2025200222
 */
function calcular() {
  const num1Element = document.getElementById('numero1');
  const num2Element = document.getElementById('numero2');
  const operadorElement = document.getElementById('operador');
  const resultadoElement = document.getElementById('resultado');
  const erroElement = document.getElementById('mensagem-erro');

  erroElement.textContent = '';
  resultadoElement.value = '';

  const numero1 = parseFloat(num1Element.value);
  const numero2 = parseFloat(num2Element.value);
  const operador = operadorElement.value;

  if (isNaN(numero1) || isNaN(numero2)) {
    erroElement.textContent = 'Erro: Por favor, informe números válidos em ambos os campos.';
    return; 
  }

  if (operador === '/' && numero2 === 0) {
    erroElement.textContent = 'Erro: Não é possível realizar divisão por zero.';
    return; 
  }

  let resultadoFinal;

  switch (operador) {
    case '+':
      resultadoFinal = numero1 + numero2;
      break;
    case '-':
      resultadoFinal = numero1 - numero2;
      break;
    case '*':
      resultadoFinal = numero1 * numero2;
      break;
    case '/':
      resultadoFinal = numero1 / numero2;
      break;
    default:
      erroElement.textContent = 'Erro: Operador inválido.';
      return;
  }

  resultadoElement.value = resultadoFinal.toLocaleString('pt-BR');
}