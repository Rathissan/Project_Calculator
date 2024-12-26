// Sélection des éléments du DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const delButton = document.querySelector('[data-del]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Variables globales
let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let isResultDisplayed = false; // Indique si le dernier affichage est un résultat

// Efface tout l'écran et réinitialise les variables
function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    isResultDisplayed = false;
    updateDisplay();
}

// Supprime le dernier caractère de currentOperand
function del() {
    if (isResultDisplayed) {
        clear(); // Réinitialise si un résultat est affiché
    } else {
        currentOperand = currentOperand.slice(0, -1);
        updateDisplay();
    }
}

// Ajoute un nombre ou un point décimal à currentOperand
function appendNumber(number) {
    if (isResultDisplayed) {
        // Réinitialise si un résultat est déjà affiché
        clear();
    }

    if (number === '.' && currentOperand.includes('.')) return; // Empêche plusieurs points
    currentOperand += number;
    updateDisplay();
}

// Choisit une opération et passe à l'opérande précédente
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute(); // Calcule si une opération précédente existe déjà
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    isResultDisplayed = false;
    updateDisplay();
}

// Effectue le calcul en fonction de l'opération choisie
function compute() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let computation;

    if (isNaN(prev) || isNaN(current)) return; // Si l'un des deux n'est pas un nombre, on arrête

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentOperand = 'Erreur';
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    isResultDisplayed = true; // Marque que le résultat a été affiché
    updateDisplay();
}

// Met à jour l'affichage
function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand || '';
    previousOperandTextElement.innerText = previousOperand + (operation || '');
}

// Ajout des événements aux boutons

// Boutons numériques
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

// Boutons d'opération
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

// Bouton "="
equalsButton.addEventListener('click', () => {
    compute();
});

// Bouton "AC"
allClearButton.addEventListener('click', () => {
    clear();
});

// Bouton "DEL"
delButton.addEventListener('click', () => {
    del();
});
