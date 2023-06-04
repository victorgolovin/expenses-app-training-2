// ПОСЛЕ РЕФАКТОРИНГА

const LIMIT = 10000;

const expenses = [];

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

limitNode.innerText = LIMIT;

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
        const elementHTML = `<li>${element} руб.</li>`;
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
        statusNode.innerText = 'Все хорошо';
    } else {
        statusNode.innerText = 'Все плохо';
        statusNode.classList.add('status-red');
    }
});