// 1. Deposit some money - Done
// 2. Determine number of lines to bet on - Done
//    - Validates input to ensure it's between 1 and 3
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Determine if the player won or lost
// 6. Update the player's balance
// 7. Play again or exit

const prompt = require('prompt-sync')();

const deposit = () => {
    while (true) {
        const depositAmount = prompt('Enter deposit amount: ')
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log('Invalid deposit amount, Try again.');
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const numberOfLines = prompt('Enter number of lines to bet on (1-3): ');
        const numberOfLinesInt = parseInt(numberOfLines);

        if (isNaN(numberOfLinesInt) || numberOfLinesInt < 1 || numberOfLinesInt > 3) {
            console.log('Invalid number of lines, Try again.');
        } else {
            return numberOfLinesInt;
        }
    }
}

const depositAmount = deposit();
const numberOfLines = getNumberOfLines();

