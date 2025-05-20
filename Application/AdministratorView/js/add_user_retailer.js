import { Validator } from "./Validator.js";
import { AlertUtilities } from "./AlertUtilites.js";

// Reset form
function clearForm() {
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("passwd").value = "";
    if (document.getElementById("retailer-name")) {
        document.getElementById("retailer-name").value = "";
    }
}

// Form validation + action
document.getElementById("add-user-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const auv = new Validator();
    var firstName = document.getElementById("first-name").value;
    auv.validationHandler("fg-first-name", auv.validateFirstAndLastName(firstName));

    var lastName = document.getElementById("last-name").value;
    auv.validationHandler("fg-last-name", auv.validateFirstAndLastName(lastName));


    var email = document.getElementById("email").value;
    auv.validationHandler("fg-email", auv.validateEmail(email));


    var phoneNum = document.getElementById("phone").value;
    auv.validationHandler("fg-phone", auv.validatePhoneNum(phoneNum));

    var password = document.getElementById("passwd").value;
    auv.validationHandler("fg-passwd", auv.validatePassword(password));

    var retailer = document.getElementById("retailer-name");
    if (retailer !== null && retailer !== "") {
        auv.validationHandler("fg-retailer", auv.validateRetailer(retailer.value));
    }

    if (!auv.valid) {
        return;
    }

    // Validation successful, call API endpoint
    var type = document.getElementById("add-type").value;
    if (type === "user") {
        console.log("Simulated add user endpoint");
    } else if (type === "retailer") {
        console.log("Simulated add retailer endpoint");
    }


    var successAlert = new AlertUtilities(document.getElementById("add-success"));
    successAlert.showAndDismissAlert();
    clearForm();

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
