function displayError() {
    document.getElementsByClassName("retailer-form")[0].classList.add("hidden");
    document.getElementsByClassName("count-display")[0].classList.add("hidden");
    document.getElementsByClassName("data-table")[0].classList.add("hidden");
    document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

var numParams = Object.keys(queryParams).length;

if (numParams != 1) {
    displayError();
    throw new Error("Incorrect number of parameters");
}

const id = queryParams.id;

if (id == undefined) {
    displayError();
    throw new Error("ID parameter needs to be passed");
}

if (!isNumericString(id)) {
    displayError();
    throw new Error("ID has to be a number");
}

console.log(id);

document.getElementById("change-retailer-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var valid = true;

    var firstName = document.getElementById("first-name").value;
    validationHandler("fg-first-name", validateFirstAndLastName(firstName));

    var lastName = document.getElementById("last-name").value;
    validationHandler("fg-last-name", validateFirstAndLastName(lastName));

    var email = document.getElementById("email").value;
    validationHandler("fg-email", validateEmail(email));

    var phoneNum = document.getElementById("phone").value;
    validationHandler("fg-phone", validatePhoneNum(phoneNum));

    var retailer = document.getElementById("retailer-name").value;
    validationHandler("fg-retailer", validateRetailer(retailer));

    if (!valid) {
        return;
    }
});

// Generic error display helpers
function validationHandler(formGroupId, validation) {
    var formGroup = document.getElementById(formGroupId);
    if (!validation) {
        formGroup.classList.add("has-error");
        valid = false;
    } else if (formGroup.classList.contains("has-error")) {
        formGroup.classList.remove("has-error");
    }
}

// Validation functions
function validateFirstAndLastName(name) {
    /* First and last name can consist of:
       - A-Z or a-z, whitespace, "," (comma) "'" (single quote), "-" (dash)
    */
    const namePattern = /^[a-z ,.'-]+$/i;
    return namePattern.test(name);
}

function validateEmail(email) {
    // Used this regex: https://www.regular-expressions.info/email.html
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
}

function validatePhoneNum(phoneNum) {
    // Matches either +27 (for example) number or regular 10 digit number
    const phonePattern = /^\+?\d{11}$|^\d{10}$/;
    return phonePattern.test(phoneNum);
}

function validateRetailer(retailer) {
    const retailerPattern = /^(?![ .&'-])[a-zA-Z0-9 .&'-]{0,48}(?<![ .&'-])$/;
    return retailerPattern.test(retailer);
}