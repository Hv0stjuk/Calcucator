const numberBtn = document.querySelectorAll('.number');
const operationBtn = document.querySelectorAll('.operation');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.querySelectorAll('.clear');
const percentBtn = document.getElementById('percent');
const plusminusBtn = document.getElementById('plusminus');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

numberBtn.forEach((element) => {
  element.addEventListener('click', (e) => {
    numberPress(e.target.innerText);
  });
});

operationBtn.forEach((element) => {
  element.addEventListener('click', (e) => {
    operation(e.target.innerText);
  });
});

decimalBtn.addEventListener('click', decimal);

clearBtn.forEach((element) => {
  element.addEventListener('click', (e) => {
    clear(e.target.id);
  });
});

percentBtn.addEventListener('click', (e) => {
  
});

plusminusBtn.addEventListener('click', (e) => {
  plusminus(display.value[0]);
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
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    };
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
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
    };
};


function plusminus(symbol) {

}
