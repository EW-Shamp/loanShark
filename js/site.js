//get values from user
//main / controller function
function getValues() {
    //retrieve values from user
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;
    let valueObj = {}
    //parse values
    loanAmount = parseInt(loanAmount);
    term = parseInt(term);
    rate = parseInt(rate);
    //verify the values are integers and pass them to 
    //renderValues() function. If not alert the user
    //to enter a valid number
    if (Number.isInteger(loanAmount) && Number.isInteger(term) && Number.isInteger(rate)) {
        valueObj = renderValues(loanAmount, term, rate);
    } else {
        alert("Please enter in only numbers");
    }

    displayValues(valueObj);
}

//render data from user
//logic function(s)
function renderValues(loanAmount, term, rate) {
    
}

//display data to user
//view function
function displayValues() {

}