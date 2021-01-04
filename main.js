const numberBtn = document.querySelectorAll('.number');
const operationBtn = document.querySelectorAll('.operation');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.querySelectorAll('.clear');
const percentBtn = document.getElementById('percent');
const plusminusBtn = document.getElementById('plusminus');
const display = document.getElementById('display');
const btnSwitchCalc = document.getElementById('engineering');
const addBtnEngineering = document.querySelectorAll('.engineering--hiden');
const allBtn = document.querySelectorAll('.button');
const action = document.getElementById('actions');

const backspace = document.getElementById('backspace');
const special = document.querySelectorAll('.engineering--hiden');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

special.forEach((element) => {
  element.addEventListener('click', ({target}) => {
    operation(target.id);
});
});

backspace.addEventListener('click', () => {
  MemoryNewNumber = false;
  MemoryCurrentNumber = display.value.slice(0, display.value.length - 1);
  if (MemoryCurrentNumber === '') {
    MemoryCurrentNumber = 0;
  }
  display.value = MemoryCurrentNumber;
});

btnSwitchCalc.addEventListener('click', () => {
  addBtnEngineering.forEach(el => el.classList.toggle('engineering--hiden'));
  allBtn.forEach(el => el.classList.toggle('button--small'));
});

numberBtn.forEach((element) => {
  element.addEventListener('click', ({target}) => {
    numberPress(target.innerText);
  });
});

operationBtn.forEach((element) => {
  element.addEventListener('click', ({target}) => {
    operation(target.innerText);
  });
});

decimalBtn.addEventListener('click', decimal);

clearBtn.forEach((element) => {
  element.addEventListener('click', ({target}) => {
    clear(target.id);
  });
});

function numberPress(number) {
 if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
 } else {
    if (display.value === '0') {
      display.value = number;

  } else {
    display.value += number;
  };
 };
  
};

function operation(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else if (op === 'sqrt') {
      MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
    } else if (op === 'module') {
      MemoryCurrentNumber = Math.abs(parseFloat(localOperationMemory));
    } else if (op === 'exp') {
      MemoryCurrentNumber = Math.pow(parseFloat(localOperationMemory), 2);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
  writeAction (op);
};

function decimal() {
  let localDecimalMemory = display.value;
  if (MemoryNewNumber) {
    localDecimalMemory ='0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.'
    };
  };
  display.value = localDecimalMemory;
};

function clear(id) {

    if (id === 'ce') {
      display.value = '0';
      MemoryNewNumber = true;
    } else
    if (id === 'c') {
      display.value = '0';
      MemoryNewNumber = true;
      MemoryCurrentNumber = 0;
      MemoryPendingOperation = 0;
    }
};

function writeAction (op) {
  if (op !== '=' && op !== 'module' && op !== 'sqrt' && op !== 'exp' && op !== 'backspace') {
    action.textContent = `${op} `;
  } else if (display.value === '0' || op === 0) {
    action.textContent = '';
  } else if (op === 'module') {
    action.textContent = `|| `;
  } else if (op === 'exp') {
    action.textContent = 'х²';
  } else if (op === 'sqrt') {
    action.textContent = '√'
  }

};

