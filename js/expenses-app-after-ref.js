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

function initApp() { // 5 создаем функцию которая обьединяет по смыслу (на странице в браузере это - лимит, сум, статус)
    limitNode.innerText = LIMIT; // 5 Переносим  в функцию
    sumNode.innerText = 0; // // 5 Переносим  в функцию
    statusNode.innerText = STATUS_IN_LIMIT; // 5 Переносим  в функцию
}

buttonNode.addEventListener('click', function() {
    // 1) Получаем значение из поля ввода
    if (!inputNode.value) {
        return;
    }

    const expense = parseInt(inputNode.value);
 
    inputNode.value = '';

    // 2) Сохраняем трату в список
    expenses.push(expense);

     // 3) Выведем новый список трат
    let expensesListHTML = '';
    expenses.forEach(element => {
        const elementHTML = `<li>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 4) Посчитать сумму и вывести ее
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    console.log(sum)

    sumNode.innerText = sum;

    // 5) Сравнение с лимитом и вывод статуса
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
});