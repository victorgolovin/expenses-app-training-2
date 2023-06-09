// ПОСЛЕ РЕФАКТОРИНГА (С КОММЕНТАМИ) ЧАСТЬ 2


// Объявление переменныйх - Строковых констант
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';


// Объявление переменныйх - ссылок на html элементы
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const clearButtonNode = document.querySelector('.js-expense-clear-button');
const totalValueNode = document.querySelector();
const statusNode = document.querySelector('.js-status');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');


// Получаем лимит из элемента HTML с js-limit
const limitNode = document.querySelector('.js-limit');
const limit = parseInt(limitNode.innerText);


// Объявление нашей основной переменной 
// При сапуске она содержит в себе пустой массив
// Который мы пополняем по нажатию Добавить
let expenses = [];

// ---ФУНКЦИИ------------------------------------------------------------


// Подсчитываем и возвращаем сумму всех трат
function getTotal() {
    let sum = 0;
    expenses.forEach(function(expense) {
        // пробегаем по массиву обьектов expense, берем из каждого поле amount
        // и прибавляем к переменной sum
        sum += expense.amount;
    });

    return sum;
}


// Отрисовывает/обновляет блог с "Всего", "Лимит" и "Статус" 
function renderStatus() {
    // Создаем переменную total(всего) и записываем в нее результат выполнения getTotal
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    // Условие сравнения - что больше всего или лимит
    if (total <= limit) {
        // всего меньше чем лимит - хорошо
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats__statusText_positive";
    } else {
        // всего меньше чем лимит - все плохо

        // шаблонная строка - строка в которую можно вставить переменные
        // тут вставлена переменная STATUS_OUT_OF_LIMIT
        // и будет вставлено значение разницы между лимитом и общей суммой расходов
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
        statusNode.className = "stats__statusText_negative";
    }
}

// Отрисовываем/обновляет блок
function renderHistory() {
    historyList.innerHTML = ""
    // сокращаем запись:
    // expenses.forEach((expense) => {})

    // цикл по массиву expenses, где каждый элемент - запись в расходе (сумма и категория)
    expenses.forEach(function (expense) {
        // создание элемента li (он пока создан только в памяти)
        const historyItem = document.createElement("li");

        // через свойство className так же можно прописывать классы
        historyItem.className = "rub";

        // снова создаем шаблонную строку
        // форма "категория" - "сумма" (а не наоборот, чтобы не усложнять html)

        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        // берем нам li из памяти и вставляем в документ, в конце historyList
        historyList.appendChild(historyItem);
    })
}

// Отрисовываем/обновляем весь интерфейс (в нашем случае историю, всего, статус)
function render() {
    // вызываем функцию обновления статуса и "всего"
    renderStatus();

    // вызываем функцию обновления истории 
    renderHistory();
}

// Возвращет введенную пользователем сумму
function getExpenseFromUser() {
    return parseInt(inputNode.value);
}

// Возвращает выбранную пользователем категорию 





