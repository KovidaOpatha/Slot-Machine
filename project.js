// 1. Deposit some money - Done
// 2. Determine number of lines to bet on - Done
//    - Validates input to ensure it's between 1 and 3
// 3. Collect a bet amount - Done
//    - Validates input to ensure it's a positive number and does not exceed the balance
// 4. Spin the slot machine - Done
//    - Randomly selects symbols for each reel based on predefined counts
//    - Each reel contains 3 symbols
//    - Each symbol has a specific value
// 5. Determine if the player won or lost
// 6. Update the player's balance
// 7. Play again or exit

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLUMS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

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

const getBet = (balance, numberOfLines) => {
    while (true) {
        const bet = prompt('Enter bet amount per line: ');
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / numberOfLines) {
            console.log('Invalid bet amount, Try again.');
        } else {
            return betAmount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLUMS; i++) {
        reels.push([]);
        // Create a copy of symbols to avoid modifying the original array
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLUMS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = '';
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += ' | '
            }
        }
        console.log(rowString);
    }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
