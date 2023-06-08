// ПОСЛЕ РЕФАКТОРИНГА (С КОММЕНТАМИ) ЧАСТЬ 2


// Объявление переменныйх - Строковых констант
const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASS_NAME = 'status-red';

// Объявление переменныйх - ссылок на html элементы
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const resetButtonNode = document.querySelector('.js-expense-reset-button');

// Объявление нашей основной переменной 
// При сапуске она содержит в себе пустой массив
// Который мы пополняем по нажатию Добавить
const expenses = [];

// ---ФУНКЦИИ------------------------------------------------------------


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

// Полсчитывает и возвращает сумму всех трат
function calculateExpenses(expenses) {
    let sum = 0;
    expenses.forEach(element => {
        // пробегаем по массиву обьектов expense
        sum += element;
    });

    return sum;
}

// Отрисовывает/обновляет блок с "Всего", "Лимит", "Статус"
function renderStatus (sum) {
    // 
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
}


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



