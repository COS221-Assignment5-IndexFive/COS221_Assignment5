document.getElementById("add-user-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var valid = true;

    var firstName = document.getElementById("first-name").value;
    if (!validateFirstAndLastName(firstName)) {
        displayError("fg-first-name");
        valid = false;
    } else {
        hideError("fg-first-name");
    }

    var lastName = document.getElementById("last-name").value;
    if (!validateFirstAndLastName(lastName)) {
        displayError("fg-last-name");
        valid = false;
    } else {
        hideError("fg-last-name");
    }

    var email = document.getElementById("email").value;
    if (!validateEmail(email)) {
        displayError("fg-email");
        valid = false;
    } else {
        hideError("fg-email");
    }

    var phoneNum = document.getElementById("phone").value;
    if (!validatePhoneNum(phoneNum)) {
        displayError("fg-phone");
        valid = false;
    } else {
        hideError("fg-phone");
    }

    var password = document.getElementById("passwd").value;
    if (!validatePassword(password)) {
        displayError("fg-passwd");
        valid = false;
    } else {
        hideError("fg-passwd");
    }

    var retailer = document.getElementById("retailer-name").value;
    if (retailer !== undefined && retailer !== "") {
        if (!validateRetailer(retailer)) {
            displayError("fg-retailer");
            valid = false;
        } else {
            hideError("fg-retailer");
        }
    }

    if (!valid) {
        return;
    }

    // Validation successful, call API endpoint
    var type = document.getElementById("add-type").value;
    if (type === "user") {
        console.log("Simulated add user endpoint");
    } else if (type === "retailer") {
        console.log("Simulated add retailer endpoint");
    }
});

// Generic error display helpers
function displayError(formGroupId) {
    document.getElementById(formGroupId).classList.add("has-error");
}

function hideError(formGroupId) {
    var formGroup = document.getElementById(formGroupId);
    if (formGroup.classList.contains("has-error")) {
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

function validatePassword(password) {
    const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passPattern.test(password);
}

function validateRetailer(retailer) {
    const retailerPattern = /^(?![ .&'-])[a-zA-Z0-9 .&'-]{0,48}(?<![ .&'-])$/;
    return retailerPattern.test(retailer);
}
