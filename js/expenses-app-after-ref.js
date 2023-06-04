// ПОСЛЕ РЕФАКТОРИНГА

const LIMIT = 10000; // 18 Теперь нам нужен создать лимит с котором мы потом будем сравнивать траты

const expenses = []; // 1 Добавляем массив в который будем пушить расходы

const inputNode = document.querySelector('.js-expense-input'); // 2 через суфикс Node даем понять что у нас лежит часть HTML который на странице браузера
const buttonNode = document.querySelector('.js-expense-button'); // 3 так же добавляем кнопку
const historyNode = document.querySelector('.js-history'); // 8 Добавляем историю изменений
const sumNode = document.querySelector('.js-sum'); // 17 добавляем sumNode чтобы выводить на экран ОБЩУЮ сумму
const limitNode = document.querySelector('.js-limit'); // 19 Создаем limitNode подключаем элемент страницы HTML
const statusNode = document.querySelector('.js-status'); // 21 Создаем statusNode в которомы у нас будет вывод сообщения на экран какой статус

limitNode.innerText = LIMIT; // 20 Присваиваем limitNode.innerText значение в LIMIT, теперь limitNode.innerText отображатеся у нас на стронице в браузере

buttonNode.addEventListener('click', function() { // 4 Добавляем обработчик событий для кнопки buttonNode
    // 1) Получаем значение из поля ввода
    if (!inputNode.value) {    // 8 Добавляем условие если строка пустая, если условие выполнится в скобках return не даст выполнится коду ниже
        return;
    }

    const expense = parseInt(inputNode.value); // 5 создаем конст expense и присваеваем  inputNode.value, теперь мы можем вводить в инпут значения и по клику через console.log() выводить на экран
                                                // 5.5 через функцию pacseInt переводим строковые значения в числовые, т.к изначально браузер выдает нам строку которую потом мы обрабатываем

    inputNode.value = ''; // 7 После ввода в инпут сбрасывается строка (становится пустой)

    // 2) Сохраняем трату в список
    expenses.push(expense); // 6 Добавляем в массив через команду push значения expense

    // 3) Выведем новый список трат
    let expensesListHTML = ''; //14 Создаем пустую переменную списка расходов
    expenses.forEach(element => { // 12 С помощью команды forEach пробегаемся по каждому элементу массива, в итоге у нас в список выводится каждый элемент отдельно
        const elementHTML = `<li>${element} руб.</li>`; //13 С
        expensesListHTML += elementHTML; // 14 Теперь переменная будет перезаписываться если пользователь ввел новое число в инпут
    });

    // const  html = `<ol><li>${expense}</li></ol>`; // 10 Создаем конст для конструкции разметки html внутри js с помощью шаблонной строки
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`; // 11 innerHTML позваляет нам обращаться к HTML
                                                            // 15 Теперь про нажатию на кнопку у нас выводится список в столбик(после того как мы ввели `<ol>${expensesListHTML}</ol>`)
    
    // 4) Посчитать сумму и вывести ее
    let sum = 0;

    expenses.forEach(element => { // 16 Теперь на нужно посчитать сумму в массиве, когда юзер вводит новое число - оно складывается с предыдущем
        sum += element;
    });

    console.log(sum)

    sumNode.innerText = sum;

    // 5) Сравнение с лимитом и вывод статуса
    if (sum <= LIMIT) { //22 Делаем проверку если сумма больше или меньше лимита
        statusNode.innerText = 'Все хорошо';
    } else {
        statusNode.innerText = 'Все плохо';
        statusNode.classList.add('status-red'); //23 Через statusNode.classList.add мы можем элементу дабавить class,
        // например тут мы выводим status-red который заменит нам status т.к выше идет проверка
    }
});