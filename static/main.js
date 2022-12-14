//Функция priority позволяет получить значение приоритета для оператора
//Возможные операторы: +, -, *, /.

function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}

//Проверка, является ли строка str числом.
function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

//Проверка, является ли строка str цифрой.
function isDigit(str) {
    return /^\d{1}$/.test(str);
}

//Проверка, является ли строка str оператором.
function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

//Функция tokenize принимает строку с арифметическим выражением 
//и делит его на токены (числа, операторы, скобки). 
//Возвращаемое значение -- массив токенов.

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if(lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        } 
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        } 
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

//Функция compile принимает строку с арифметическим выражением, 
//записанным в инфиксной нотации, и преобразует это выражение в 
//обратную польскую нотацию (ОПН). Возвращаемое значение -- 
//результат преобразования в виде строки, в которой операторы и 
//операнды отделены друг от друга пробелами. Выражение может включать 
//действительные числа, операторы +, -, *, /, а также скобки. 
//Функция реализует алгоритм сортировочной станции

function compile(str) {
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (stack.length > 0 && isOperation(stack[stack.length - 1]) && priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length-1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}







//Функция evaluate принимает строку с арифметическим выражением, 
//записанным в обратной польской нотации. Возвращаемое значение -- 
//результат вычисления выражения. Выражение может включать 
//действительные числа и операторы +, -, *, /.

let value;
function evaluate(value) {
    var array = String(value).split(' '); //делаем из строчки массив
    let i = 0;
    let otvet;
    while (i < array.length){
        if (array[i] == '*'){
            let x2 = Number(array[i-1]); // идет вперед и когда видит вместо чисел знак, возвращается к числу(i-1) и из строки делает число
            let x1 =  Number(array[i-2]);//то же самое
            otvet = x1 * x2; //расставляем в нужном порядке для подсчета
            array.splice(i-2, 3, otvet) // удаляет с помощью splice три элемента, которыее ранее посчитал и заменят их на ответ
            i=0; //обнуляет указатель массива, переставляя обратно на 0
        }
        if (array[i] == '/'){
            let x2 = Number(array[i-1]);
            let x1 =  Number(array[i-2]);
            otvet = x1 / x2;
            array.splice(i-2, 3, otvet)
            i=0;
        }
        if (array[i] == '-'){
            let x2 = Number(array[i-1]);
            let x1 =  Number(array[i-2]);
            otvet = x1 - x2;
            array.splice(i-2, 3,  otvet)
            i=0;
        }
        if (array[i] == '+'){
            let x1 = Number(array[i-1]);
            let x2 =  Number(array[i-2]);
            otvet = x1 + x2;
            array.splice(i-2, 3, otvet)
            i=0;
        }
        i++;
    }
    result.innerText = otvet;
}

// Назначьте нужные обработчики событий.
// window.onload = function () {
//     // your code here
// }

// const value = event.target.innerText;
// const res = 


//Функция clickHandler предназначена для обработки событий клика по 
//кнопкам калькулятора. По нажатию на кнопки с классами digit, operation
//и bracket на экране (элемент с классом screen) должны
//появляться соответствующие нажатой кнопке символы.

//Воспользуйтесь механизмом делегирования событий, чтобы не назначать 
//обработчик для каждой кнопки в отдельности.

function clickHandler() {
    const buttons = document.querySelector('.buttons');
    const result = document.querySelector('#result');
    

    buttons.addEventListener('click', function(event) {
        if(!event.target.classList.contains('key')) return;
        value = event.target.innerText;
    
        switch(value) { //выбор из вариантов (вместо if else)
            case 'C'://при нажатии "С" в поле заменяется все на пустую строку(очищаеться)
                result.innerText = '';
                break;  
            case '='://при нажатии заменияет вводимые числа на результат вычислений с точностью до двух знаков после "."
                evaluate(compile(result.innerText));
                break;      
            default:
                result.innerText += value; //если "=" или "с" не нажимается, то добавляется нажатая кнопка (продолжается набор выражения)
        }
    });
}
(clickHandler());


// Назначьте нужные обработчики событий.
//window.onload = function () {
    // your code here
//}
