const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstandingLoan");
const getLoanButtonElement = document.getElementById("getLoanButton");

let balance = 0.0;
let outstandingLoan = 0.0;

/**
 * Used to get a new loan. 
 * If you have an outstanding loan, it alerts you about this and blocks you from getting a new one.
 * Also checks that you don't try to loan more than you are allowed.
 */
const getNewLoan = () => {
    if (outstandingLoan > 0.0) {
        alert("You have to pay your outstanding loan before taking a new one. ")
    } else {
        const input = prompt("How much would you like to loan?");
        if (input != null && input != 0) {
            const loan = parseFloat(input);
            if (loan > balance * 2) {
                alert("You can't borrow more than twice your current balance you have in your balance.")
            } else {
                updateOutstandingLoan(loan);
                setBalance(loan + balance);
                togglePayback();
                outstandingLoanElement.style.display = "block";
            }
        } else {
            alert("Invalid input");
        }
    }
}

/**
 * If you have an outstanding loan, it will pay 10% of your incomming pay then add the rest to your balance.
 * Else it will add the full sum to your balance.
 * @param {number} money Your pay from working
 */
const calculateBalance = (money) => {
    if (outstandingLoan > 0.0) {
        updateOutstandingLoan(-money * 0.1);
        balance += money * 0.9;
    } else {
        balance += money;
    }
    setBalance(balance);
}

const getBalance = () => {
    return balance;
}

/**
 * Used to add (or subtract) a value to your balance. 
 * @param {number} sum The value to update balance with. 
 */
const updateBalance = (sum) => {
    setBalance(balance + sum);
}

/**
 * Sets the balance and updates the balanceElement with the new value.
 */
const setBalance = (newBalance) => {
    balance = newBalance;
    balanceElement.innerText = "Balance: " + balance + "kr";
}

/**
 * Adds sum to the existing loan. If the loan gets paid in full the outstandingLoanElement and paybackButton is hidden.
 * If sum pays of more than the loan, the extra money is added to balance.
 * @param {number} sum The sum of the new loan, or the sum of a loan payback.
 */
const updateOutstandingLoan = (sum) => {
    outstandingLoan += sum;
    if (outstandingLoan <= 0.0) {
        updateBalance(-outstandingLoan);
        outstandingLoan = 0.0;
        outstandingLoanElement.style.display = "none";
        togglePayback();
    }
    outstandingLoanElement.innerText = "Outstanding loan: " + outstandingLoan + "kr";
}

setBalance(0);

getLoanButtonElement.addEventListener("click", getNewLoan);
