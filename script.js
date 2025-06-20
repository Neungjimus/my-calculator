// 숫자 버튼들 디스플레이 요소 선택
const numberButtons = document.querySelectorAll('button.number');
const functionButtons = document.querySelectorAll('button.function');
const operatorButtons = document.querySelectorAll('button.operator');
const equalButton = document.querySelector('button.operator.equal');
const display = document.getElementById('result');

// 변수 선언
let firstOperand = null; //계산에서 사용될 첫 번째 숫자를 저장
let operator = null; // 선택한 연산자(ex: +,-)를 저장
let waitingForSecondOperand = false; // 이게 만약 true이면 다음에 입력되는 숫자는 새로운 두 번째 피연산자로 간주하고 화면 교체




// 숫자, 소수점 버튼 클릭 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // 소수점 버튼일 때
        if (value === '.') {
            // 이미 소수점이 있으면 추가 X
            if (display.textContent.includes('.')) return;

        if (waitingForSecondOperand) {
            display.textContent = '0'
            waitingForSecondOperand = false;
            return;
        }
            
        // 만약 display가 '0'일때면 '0.' 로 바꿈
        if (display.textContent === '0') {
            display.textContent = '0.';
           }else {
            display.textContent += '.';
           }
            return;
        }

        // 두 번째 숫자 입력 대기중이면 새 값으로 교체
        if (waitingForSecondOperand) {
            display.textContent = value; // 디스플레이 값 새로 교체
            waitingForSecondOperand = false; // 두 번째 숫자 입력 상태 종료
           }else {

        // 디스플레이에 이어붙이거나 0대체
        if (display.textContent === '0') {
            display.textContent = value;
        } else {
            display.textContent += value;
            } 
        }
    });
});

// C, ±, % 버튼 클릭
functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === "C") {
            display.textContent = '0'
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        } else if (value === '±') {
            let currentValue = parseFloat(display.textContent);

            if (!isNaN(currentValue)) {
                display.textContent = (currentValue * -1).toString();
            }    
                } else if (value === '%') {
                    let currentValue = parseFloat(display.textContent);
                    if (!isNaN(currentValue)) {
                        display.textContent = (currentValue / 100).toString();
                    }
            
        }
    })
})

// 연산자 버튼 클릭
operatorButtons.forEach(button => {
    if (button.dataset.value === '=') return;

    button.addEventListener('click', () => {
        const value = button.dataset.value;

        firstOperand = parseFloat(display.textContent);
        operator = value;
        waitingForSecondOperand = true;

        console.log(`First Operand: ${firstOperand}, Operator: ${operator}`);
    })
})

// 계산 함수
function calculate(first, operator, second) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return second;
    }
}

// = 버튼 클릭 시 계산 진행
equalButton.addEventListener('click', () => {
    if (firstOperand === null || operator === null) return;
    
    const secondOperand = parseFloat(display.textContent);
    const result = calculate(firstOperand, operator, secondOperand);

    display.textContent = result;

    //상태 초기화
    firstOperand = result;
    waitingForSecondOperand = true;
    operator = null;
})
