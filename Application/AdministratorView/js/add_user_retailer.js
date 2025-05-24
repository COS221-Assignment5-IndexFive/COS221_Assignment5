import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";
import { ApiUtils } from "../../Utils/ApiUtils.js";

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

    var type = document.getElementById("add-type").value;

    var retailer = document.getElementById("retailer-name");
    if (type === "retailer") {
        auv.validationHandler("fg-retailer", auv.validateRetailer(retailer.value) && retailer.value !== "");
    }

    if (!auv.valid) {
        return;
    }

    // Validation successful, call API endpoint
    const utils = new ApiUtils();

    var successMessage = new AlertUtilities(document.getElementById("add-success"), email);
    var errorMessage = new AlertUtilities(document.getElementById("add-error"), email);

    if (type === "user") {
        var request = {
            "type": "Signup",
            "name": firstName + "" + lastName,
            "email": email,
            "password": password,
            "cell_number": phoneNum
        };

        utils.getRequest(request)
            .then((data) => {
                successMessage.showAndDismissAlert();
            })
            .catch((error) => {
                errorMessage.showAndDismissAlert();
            })
            .finally(() => {
                clearForm();
            })
        console.log("Simulated add user endpoint");
    } else if (type === "retailer") {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var successMessage = new AlertUtilities(document.getElementById("add-success"), email);
                successMessage.showAndDismissAlert();
            } else if (this.readyState == 4) {
                var errorMessage = new AlertUtilities(document.getElementById("add-error"), email);
                errorMessage.showAndDismissAlert();
            }
        }

        request.open("POST", "http://localhost/COS221_Assignment5/api/api.php", true);
        request.send(JSON.stringify({
            "type": "addRetailer",
            "name": retailer
        }));
        // console.log("Simulated add retailer endpoint");
    }


    // var successAlert = new AlertUtilities(document.getElementById("add-success"), "Added user " + firstName + " " + lastName);
    // successAlert.showAndDismissAlert();
    // clearForm();

});
