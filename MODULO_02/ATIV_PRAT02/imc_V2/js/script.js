function start() {
  var buttonCalculateImc = document.querySelector('#button-calculate-imc');
  buttonCalculateImc.addEventListener('click', handleButtonClick);

  var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');

  inputWeight.addEventListener('input', handleButtonClick);
  inputHeight.addEventListener('input', handleButtonClick);

  handleButtonClick();
}

function calculateImc(weight, height) {
  return weight / (height * height);
}

function checkWeightRange(imc) {
  var weightRange = document.querySelector('#paragraph-weight-range');

  var imcRange = document.querySelector('#imc-range');

  imcRange.textContent = '';
  
  if(imc < 16) imcRange.textContent = 'Valor inválido';
  
  else if(imc >= 16 && imc <= 16.9){
    imcRange.textContent = 'Muito abaixo do peso.';
  }

  else if(imc >= 17 && imc <= 18.4) {
    imcRange.textContent = 'abaixo do peso.';
  }

  else if(imc >= 18.5 && imc <= 24.9){
    imcRange.textContent = 'Peso normal.';
  }

  else if(imc >= 25 && imc <= 29.9){
    imcRange.textContent = 'Acima do peso.';
  }

  else if(imc >= 30 && imc <= 34.9){
    imcRange.textContent = 'Obesidade GRAU I';
  }

  else if(imc >= 35 && imc <= 40){
    imcRange.textContent = 'Obesidade GRAU II';
  }

  else if(imc > 40){
    imcRange.textContent = 'Obesidade GRAU III';
    sectionRange.classList.add("ob-grau3");
  }
  

}

function handleButtonClick() {
  var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');
  var imcResult = document.querySelector('#imc-result');

  var weight = Number(inputWeight.value);
  var height = Number(inputHeight.value);

  var imc = calculateImc(weight, height);
  var formattedImc = imc.toFixed(2).replace('.', ',');

  imcResult.textContent = formattedImc;

  checkWeightRange(imc.toFixed(2));
}

start();
