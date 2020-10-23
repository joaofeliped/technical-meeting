let inputHeight;
let inputWeight;
let buttonCalculate;
let divImcResult;
let buttonResult;
let tableBody;
let buttonClean;

const imcValues = [
  {
    id: 'imc1',
    imcText: 'MENOR QUE 18,5',
    classification: 'MAGREZA',
    fatDegree: '0',
    result: (number) => number < 18.5,
  },
  {
    id: 'imc2',
    imcText: 'ENTRE 18,5 E 24,9',
    classification: 'NORMAL',
    fatDegree: '0',
    result: (number) => number >= 18.5 && number <= 24.9,
  },
  {
    id: 'imc3',
    imcText: 'ENTRE 25,0 E 29,9',
    classification: 'SOBREPESO',
    fatDegree: 'I',
    result: (number) => number >= 25 && number <= 29.9,
  },
  {
    id: 'imc4',
    imcText: 'ENTRE 30,0 E 39,9',
    classification: 'OBESIDADE',
    fatDegree: 'II',
    result: (number) => number >= 30 && number <= 39.9,
  },
  {
    id: 'imc5',
    imcText: 'MAIOR QUE 40,0',
    classification: 'OBESIDADE GRAVE',
    fatDegree: 'III',
    result: (number) => number >= 40,
  },
];

const start = () => {
  initializeImcTable();
  initializeElements();
};

const initializeImcTable = () => {
  tableBody = document.querySelector('#tableBody');
  tableBody.innerHTML = '';

  imcValues.forEach((imcValue) => {
    const tr = document.createElement('tr');
    tr.id = imcValue.id;

    const tdImcText = document.createElement('td');
    tdImcText.textContent = imcValue.imcText;

    const tdClassification = document.createElement('td');
    tdClassification.textContent = imcValue.classification;

    const tdFatDegree = document.createElement('td');
    tdFatDegree.textContent = imcValue.fatDegree;

    tr.appendChild(tdImcText);
    tr.appendChild(tdClassification);
    tr.appendChild(tdFatDegree);

    tableBody.appendChild(tr);
  });
};

const initializeElements = () => {
  divImcResult = document.querySelector('#divImcResult');
  buttonResult = document.createElement('button');

  inputHeight = document.querySelector('#inputHeight');
  inputWeight = document.querySelector('#inputWeight');

  buttonCalculate = document.querySelector('#buttonCalculate');
  buttonClean = document.querySelector('#buttonClean');

  inputHeight.addEventListener('keyup', handleEnableCalculationButton);
  inputWeight.addEventListener('keyup', handleEnableCalculationButton);

  buttonCalculate.addEventListener('click', handleCalculation);
  buttonClean.addEventListener('click', handleCLean);
};

const handleEnableCalculationButton = () => {
  if (inputHeight.value && inputWeight.value) {
    buttonCalculate.disabled = false;
  } else {
    buttonCalculate.disabled = true;
    divImcResult.innerHTML = '';
    initializeImcTable();
  }
};

const handleCalculation = () => {
  const imc = (inputWeight.value / inputHeight.value ** 2).toFixed(2);

  buttonResult.type = 'button';
  buttonResult.textContent = `Seu IMC é ${imc}`;
  buttonResult.classList.add('btn');
  buttonResult.classList.add('red');
  buttonResult.classList.add('darken-4');

  divImcResult.appendChild(buttonResult);

  selectRow(imc);
};

const selectRow = (result) => {
  initializeImcTable();
  const rowResult = imcValues.find((imcValue) => imcValue.result(result));
  const rowTable = document.querySelector(`#${rowResult.id}`);

  rowTable.classList.add('red');
};

const handleCLean = () => {
  initializeImcTable();
  initializeElements();

  buttonCalculate.disabled = true;
  divImcResult.innerHTML = '';

  inputHeight.value = null;
  inputWeight.value = null;
};

start();
