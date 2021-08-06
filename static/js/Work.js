const payElement = document.getElementById("pay");
const workButtonElement = document.getElementById("workButton");
const bankButtonElement = document.getElementById("bankButton");
const paybackButtonElement = document.getElementById("paybackButton");

let pay = 0.0;

/**
 * Sets pay to 0 or adds sum to pay.
 * @param {number} sum  
 */
const setPay = (sum) => {
    if (sum === 0.0) {
        pay = 0.0;
        payElement.innerText = "Pay: " + pay + "kr";
    } else {
        pay += sum;
        payElement.innerText = "Pay: " + pay + "kr";
        payElement.value = pay;
    }
}

/**
 * Calls setPay() to add 100kr when workButton is clicked.
 */
const handleWorkButton = () => {
    setPay(100.0);
}

/**
 * Calls calculateBalance to transfer money to the bank, then sets pay to 0.
 */
const handleBankButton = () => {
    calculateBalance(pay);
    setPay(0.0);
}

/**
 * Calls updateOutstandingLoan to directly transfer the full amount of pay to pay back the loan.
 * Then sets pay to 0.
 */
const handlePaybackLoanButton = () => {
    updateOutstandingLoan(-pay);
    setPay(0);
}

/**
 * Hides or displays the paybackButton.
 */
function togglePayback() {
    if (paybackButtonElement.style.display === "none") {
        paybackButtonElement.style.display = "inline-block";

    } else {
        paybackButtonElement.style.display = "none";
    }
}

setPay(0);

workButtonElement.addEventListener("click", handleWorkButton);
bankButtonElement.addEventListener("click", handleBankButton);
paybackButtonElement.addEventListener("click", handlePaybackLoanButton);
