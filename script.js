const billInput = document.querySelector('.bill__input');
const peopleLength = document.querySelector('.people__length');
const tipCustom = document.querySelector('.tip__custom');
const tipButtons = document.querySelectorAll('.tip-button');

billInput.value = '';
tipCustom.value = '';
peopleLength.value = '';

let tipPercentage = 0;

billInput.addEventListener('input', () => calculateAmount(tipPercentage));
billInput.addEventListener('focusin', e => e.currentTarget.parentElement.classList.add('active'));
billInput.addEventListener('focusout', e => e.currentTarget.parentElement.classList.remove('active'));

tipCustom.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active-tip'));
    tipPercentage = tipCustom.value;
    calculateAmount(tipPercentage);
});
tipCustom.addEventListener('focusin', e => e.currentTarget.classList.add('active'));
tipCustom.addEventListener('focusout', e => e.currentTarget.classList.remove('active'));

peopleLength.addEventListener('input', () => calculateAmount(tipPercentage));

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('active-tip');
        tipButtons.forEach(item => item !== btn && item.classList.remove('active-tip'));
        tipCustom.value = '';
        tipPercentage = parseInt(btn.textContent.slice(0, -1));
        calculateAmount(tipPercentage);
    });
});

const calculateAmount = (tipPercentage) => {
    const billValue = billInput.value;
    const tipValue = tipPercentage / 100;
    const peopleValue = peopleLength.value;

    const tipAmountValueDisplay = document.querySelector('.tip-amount__value');
    const totalValueDisplay = document.querySelector('.total__value');

    if(!peopleValue || peopleValue < 1) {
        peopleLength.parentElement.parentElement.classList.add('error-people');
        totalValueDisplay.innerHTML = '$0';
        tipAmountValueDisplay.innerHTML = `$0`;
    }else if(billValue > 0 && tipValue > 0) {
        peopleLength.parentElement.parentElement.classList.remove('error-people');

        let totalAmount = billValue * tipValue / peopleValue;
        let totalValue = billValue * tipValue;

        tipAmountValueDisplay.innerHTML = decimalFormatter(totalAmount);
        totalValueDisplay.innerHTML = decimalFormatter(totalValue);
    } else {
        tipAmountValueDisplay.innerHTML = `$0`;
        totalValueDisplay.innerHTML = '$0';
    };
};

const decimalFormatter = (val) => {
    if(val.toString().includes('.')) {
        const numArr = val.toString().split('.');
        if(numArr[1] > 99) {
            numArr[1] = numArr[1].slice(0,2);
            return `${numArr[0]}.${numArr[1]}`;
        };
    };
    return `$${val}`;
};