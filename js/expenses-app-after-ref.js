// ПОСЛЕ РЕФАКТОРИНГА

const LIMIT = 10000;
const CURRENCY = 'руб.'; // 1 задаем конст на валюту для лучшей читаемости кода
const STATUS_IN_LIMIT = 'Все хорошо'; // 2 задаем конст для статуса все хорошо
const STATUS_OUT_OF_LIMIT = 'Все плохо'; // 3 задаем конст для статуса все плохо
const STATUS_OUT_OF_LIMIT_CLASS_NAME = 'status-red'; // 4 задаем конст класса которой в CSS

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

initApp(expenses); // 7 Передаем текущий (expenses) 

buttonNode.addEventListener('click', function() {
    const expense = getExpenseFromUser(); // 1: expense получает расходы от getExpenseFromUser() т.е от юзера
    
    if (!expense) {  //  Если расхода нет (!) то верни 
        return
    }

    trackExpanse(expense); // 2: В то случае если расход есть мы его трекаем 

    render(expenses); // 3: И отрисовываем интерфейс, делаем рендер
});


function initApp(expenses) { // 5 создаем функцию которая обьединяет по смыслу (на странице в браузере это - лимит, сум, статус) // 7 Передаем текущий (expenses) 
    limitNode.innerText = LIMIT; // 5 Переносим  в функцию
    sumNode.innerText = calculateExpenses(expenses); // // 8  передаем calculateExpenses(expenses) который считает сумму
    statusNode.innerText = STATUS_IN_LIMIT; // 5 Переносим  в функцию
}

// 2) Сохраняем трату в список
function trackExpanse(expense) { // 16 функция добавляет в массив expenses - (expense)
    expenses.push(expense);
}


// 1) Получаем значение из поля ввода
function getExpenseFromUser() { // 17 Функция получает значение из поля ввода
    if (!inputNode.value) {
        return null; // null - возвращает пустоту
    }

    const expense = parseInt(inputNode.value);
 
    clearInput(); // Записываем функцию clearInput() для отчитки поля ввода

    return expense; // Возвращаем expense
}

function clearInput() { // 18 Создаем функцию для отчистки поля ввода
    inputNode.value = '';
}

// 4) Посчитать сумму и вывести ее
function calculateExpenses(expenses) { // 6 Создаем функцию в которой мы считаем сумму, передаем массив в функцию (expenses)
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum; // 6.5 Возвращаем сумму
}

function render(expenses) { // 20 Создаем функцию render, в ней мы отрисовываем историю, сумму, статус
    const sum = calculateExpenses(expenses);

    renderHistory(expenses); //пишем функцию renderHistory и передаем в нее (expenses)
    renderSum(sum);  //пишем функцию renderSum и передаем в нее (expenses)
    renderStatus(sum); //пишем функцию renderStatus и передаем в нее (expenses)
}

// 3) Выведем новый список трат
function renderHistory(expenses) { // 10 Создаем функцию для списка истории, функция принимает в себя (expenses)
    let expensesListHTML = '';
    expenses.forEach(element => {
        const elementHTML = `<li>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) { // 12 Создаем функцию renderSum, присваеваем (sum) функцию принимается в себя результат функции calculateExpenses(expenses) и sumNode.innerText
    sumNode.innerText = sum; // 9 Передаем sum
}


// 5) Сравнение с лимитом и вывод статуса
function renderStatus (sum) { // 14 Создаем функцию в которую передаем (sum)

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
}
