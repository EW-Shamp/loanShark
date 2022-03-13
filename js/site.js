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
        valueObj.interest = interest(valueObj.totalCost, loanAmount);
        paymentObj = payments(loanAmount, rate, term, valueObj.monthlyPayment);
    } else {
        alert("Please enter in only numbers");
    }

    displayValues(valueObj, paymentObj, loanAmount);
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
function interest(total, loanAmount) {
    let interest = total - loanAmount;
    interest = interest.toFixed(2);
    return interest;
}

//function to determine interest payment, pricipal payment, and remaining balance

function payments(amount, rate, term, monthlyPayment) {
    let amt = amount;
    //the payments object contains 5 arrays to hold data based on each monthly payment
    let payments = {
        interPayment: [],
        princePayment: [],
        balance: [],
        totalInterest: [],
        month: [],
    };  
    let month = 0;
    let totalInterest = 0;

    for (i = term; i > 0; i--) {
        let interPayment = amt * (rate / 1200);
        let princePayment = monthlyPayment - interPayment;
        interPayment = interPayment.toFixed(2);
        princePayment = princePayment.toFixed(2);
        amt = amt - princePayment;
        amt = amt.toFixed(2)
        month = month + 1;
        totalInterest = Number(totalInterest) + Number(interPayment);
        totalInterest = totalInterest.toFixed(2);
        payments.interPayment.push(interPayment);
        payments.princePayment.push(princePayment);
        payments.balance.push(amt)
        payments.month.push(month);
        payments.totalInterest.push(totalInterest);
    }
    return payments;
}

//display data to user
//view function
function displayValues(value, payment, loanAmount) {
    document.getElementById("moPayment").innerHTML = `$ ${value.monthlyPayment}`;
    document.getElementById("totalPrincipal").innerHTML = `$ ${loanAmount}`;
    document.getElementById("totalInterest").innerHTML = `$ ${value.interest}`;
    document.getElementById("totalCost").innerHTML = `$ ${value.totalCost}`;

    //import table body element
    let tableBody = document.getElementById("tableBody");

    //import template
    let templateRow = document.getElementById("paymentTemplate");

    //clear table
    tableBody.innerHTML = "";

    //for loop to assign content to the table rows
    for (i = 0; i < payment.month.length; i++) {
        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = payment.month[i];
        rowCols[1].textContent = value.monthlyPayment;
        rowCols[2].textContent = payment.princePayment[i];
        rowCols[3].textContent = payment.interPayment[i];
        rowCols[4].textContent = payment.totalInterest[i];
        rowCols[5].textContent = payment.balance[i];

        tableBody.appendChild(tableRow);
    }
}