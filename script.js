// CODED BY: JEFFREY TUASON

const billInput = document.querySelector('.bill__input');
const peopleLength = document.querySelector('.people__length');
const tipCustom = document.querySelector('.tip__custom');
const tipButtons = document.querySelectorAll('.tip-button');

let tipPercentage = 0;

billInput.addEventListener('input', () => {
    calculateAmount(tipPercentage);
});
billInput.addEventListener('focusin', () => billInput.parentElement.classList.add('active'));
billInput.addEventListener('focusout', () => billInput.parentElement.classList.remove('active'));

tipCustom.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active-tip'));
    tipPercentage = tipCustom.value;
    calculateAmount(tipPercentage);
});
tipCustom.addEventListener('focusin', () => tipCustom.classList.add('active'));
tipCustom.addEventListener('focusout', () => tipCustom.classList.remove('active'));

peopleLength.addEventListener('input', () => calculateAmount(tipPercentage));
peopleLength.addEventListener('focusin', () => peopleLength.parentElement.classList.add('active'));
peopleLength.addEventListener('focusout', () => peopleLength.parentElement.classList.remove('active'));

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

    if(billInput.value.length > 6 || tipCustom.value > 100) {
        return;
    };

    const billValue = billInput.value;
    const tipValue = tipPercentage / 100;
    const peopleValue = peopleLength.value;

    const tipAmountValueDisplay = document.querySelector('.tip-amount__value');
    const totalValueDisplay = document.querySelector('.total__value');

    if(!peopleValue || peopleValue < 1) {
        peopleLength.parentElement.parentElement.classList.add('error-people');
        totalValueDisplay.innerHTML = '$0';
        tipAmountValueDisplay.innerHTML = `$0`;
    } else {
        peopleLength.parentElement.parentElement.classList.remove('error-people');
    };
    if(peopleValue > 0 && billValue > 0 && tipValue > 0) {

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
    const numArr = val.toString().split('.');

    if(val.toString().includes('.')) {
        if(numArr[1] > 99) {
            numArr[1] = numArr[1].slice(0,2);
            return `$${parseInt(numArr[0]).toLocaleString("en-US")}.${numArr[1]}`
        } else {
            return `$${parseInt(numArr[0]).toLocaleString("en-US")}.${numArr[1]}`;
        }
    };
    return `$${parseInt(numArr[0]).toLocaleString("en-US")}`;
};

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => resetValues());

const resetValues = () => {
    const tipAmountValueDisplay = document.querySelector('.tip-amount__value');
    const totalValueDisplay = document.querySelector('.total__value');

    tipAmountValueDisplay.innerHTML = `$0`;
    totalValueDisplay.innerHTML = '$0';

    billInput.value = '';
    tipCustom.value = '';
    peopleLength.value = '';

    tipPercentage = 0;
    tipButtons.forEach(btn => btn.classList.remove('active-tip'));
    peopleLength.parentElement.parentElement.classList.remove('error-people');
};
resetValues();