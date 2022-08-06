function start() {
  var buttonCalculateImc = document.querySelector('#button-calculate-imc');
  buttonCalculateImc.addEventListener('click', handleCalculateImc);

  var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');

  inputWeight.addEventListener('input', handleCalculateImc);
  inputHeight.addEventListener('input', handleCalculateImc);

  handleCalculateImc();
}

function handleCalculateImc() {
  var inputWeight = Number(document.querySelector('#input-weight').value);
  var inputHeight = Number(document.querySelector('#input-height').value);

  var imc = calculateImc(inputWeight, inputHeight);

  var resultImc = document.querySelector('#imc-result');
  resultImc.textContent = imc.toFixed(2).replace('.', ',');
}

function calculateImc(weight, height) {
  return weight / (height * height);
}

start();
