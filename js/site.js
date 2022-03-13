//get values from user
//main / controller function
function getValues() {
    //retrieve values from user
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;
    let valueObj = {};
    let paymentObj = {};
    //parse values
    loanAmount = parseInt(loanAmount);
    term = parseInt(term);
    rate = parseInt(rate);
    //verify the values are integers and pass them to 
    //renderValues() functions. If not alert the user
    //to enter a valid number
    if (Number.isInteger(loanAmount) && Number.isInteger(term) && Number.isInteger(rate)) {
        valueObj.monthlyPayment = monthlyPayment(loanAmount, term, rate);
        valueObj.totalCost = totalCost(valueObj.monthlyPayment, term);
        valueObj.totalInterest = totalInterest(valueObj.totalCost, loanAmount);
        paymentObj = payments(loanAmount, rate, term, valueObj.monthlyPayment);
    } else {
        alert("Please enter in only numbers");
    }

    displayValues(valueObj);
}

//render data from user
//logic function(s)

//function to determine total monthly payment.
function monthlyPayment(loanAmount, term, rate) {
    let monthPayment = loanAmount * (rate / 1200) / (1 - (1 + rate / 1200) ** (-term));
    monthPayment = monthPayment.toFixed(2);
    return monthPayment;
}

//function to determine total loan cost
function totalCost(payment, term) {
    let cost = payment * term;
    cost = cost.toFixed(2);
    return cost;
}

//function to determine total interests
function totalInterest(total, loanAmount) {
    let interest = total - loanAmount;
    interest = interest.toFixed(2);
    return interest;
}

//function to determine interest payment, pricipal payment, and remaining balance
function payments(amount, rate, term, monthlyPayment) {
    let amt = amount;
    let payments = {
        interPayment: [],
        princePayment: [],
        balance: [],
    };

    for (i = term; i > 0; i--) {
        let interPayment = amt * (rate / 1200);
        let princePayment = monthlyPayment - interPayment;
        interPayment = interPayment.toFixed(2);
        princePayment = princePayment.toFixed(2);
        amt = amt - princePayment;
        amt = amt.toFixed(2)
        payments.interPayment.push(interPayment);
        payments.princePayment.push(princePayment);
        payments.balance.push(amt)
    }
    return payments;
}

//display data to user
//view function
function displayValues() {

}