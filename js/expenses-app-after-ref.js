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
    // 1) Получаем значение из поля ввода
    if (!inputNode.value) {
        return;
    }

    const expense = parseInt(inputNode.value);
 
    inputNode.value = '';

    // 2) Сохраняем трату в список
    expenses.push(expense);


    renderHistory(expenses); // 11 пишем функцию renderHistory и передаем в нее (expenses)

    renderSum(expenses); // 13 пишем функцию renderSum и передаем в нее (expenses)

    

    
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
});


function initApp(expenses) { // 5 создаем функцию которая обьединяет по смыслу (на странице в браузере это - лимит, сум, статус) // 7 Передаем текущий (expenses) 
    limitNode.innerText = LIMIT; // 5 Переносим  в функцию
    sumNode.innerText = calculateExpenses(expenses); // // 8  передаем calculateExpenses(expenses) который считает сумму
    statusNode.innerText = STATUS_IN_LIMIT; // 5 Переносим  в функцию
}

// 4) Посчитать сумму и вывести ее
function calculateExpenses(expenses) { // 6 Создаем функцию в которой мы считаем сумму, передаем массив в функцию (expenses)
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum; // 6.5 Возвращаем сумму
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

function renderSum(expenses) { // 12 Создаем функцию renderSum, присваеваем (expenses) функцию принимается в себя результат функции calculateExpenses(expenses) и sumNode.innerText
    sumNode.innerText = calculateExpenses(expenses); // 9 Передаем calculateExpenses(expenses)
}


// 5) Сравнение с лимитом и вывод статуса
function renderStatus () { // 14 Создаем функцию в которой 

}


//commit