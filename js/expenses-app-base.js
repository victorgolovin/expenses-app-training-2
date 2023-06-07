// БАЗА

const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASS_NAME = 'status-red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const resetButtonNode = document.querySelector('.js-expense-reset-button');

const expenses = [];

initApp(expenses);

buttonNode.addEventListener('click', function() {
    const expense = getExpenseFromUser();
    
    if (!expense) {
        return
    }

    trackExpanse(expense);

    render(expenses);
});


resetButtonNode.addEventListener('click', function() {
    renderHistory(expenses) === '';
    calculateExpenses(expenses) ===''
})


function initApp(expenses) {
    limitNode.innerText = LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
    statusNode.innerText = STATUS_IN_LIMIT;
}

// 2) Сохраняем трату в список
function trackExpanse(expense) {
    expenses.push(expense);
}


// 1) Получаем значение из поля ввода
function getExpenseFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense = parseInt(inputNode.value);
 
    clearInput();

    return expense;
}

function clearInput() {
    inputNode.value = '';
}

// 4) Посчитать сумму и вывести ее
function calculateExpenses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

// 3) Выведем новый список трат
function renderHistory(expenses) {
    let expensesListHTML = '';
    expenses.forEach(element => {
        const elementHTML = `<li>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
    sumNode.innerText = sum;
}


// 5) Сравнение с лимитом и вывод статуса
function renderStatus (sum) {

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
}
