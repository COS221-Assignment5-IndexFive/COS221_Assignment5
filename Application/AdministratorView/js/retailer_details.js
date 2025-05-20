import { Validator } from "./Validator.js";
import { AlertUtilities } from "./AlertUtilites.js";

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
    const rdv = new Validator();

    var firstName = document.getElementById("first-name").value;
    rdv.rdv.validationHandler("fg-first-name", rdv.validateFirstAndLastName(firstName));

    var lastName = document.getElementById("last-name").value;
    rdv.validationHandler("fg-last-name", rdv.validateFirstAndLastName(lastName));

    var email = document.getElementById("email").value;
    rdv.validationHandler("fg-email", rdv.validateEmail(email));

    var phoneNum = document.getElementById("phone").value;
    rdv.validationHandler("fg-phone", rdv.validatePhoneNum(phoneNum));

    var retailer = document.getElementById("retailer-name").value;
    rdv.validationHandler("fg-retailer", rdv.validateRetailer(retailer));

    if (!rdv.valid) {
        return;
    }
});

// Delete section
document.getElementById("delete-btn").addEventListener("click", function() {
  var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"));
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function() {
    confirmDelete.dismissAlert(0);
    var deleteSuccess = new AlertUtilities(document.getElementById("delete-success"));
    deleteSuccess.showAndDismissAlert();
    setTimeout(() => {
      window.location.href = "index.php";
    }, 1000)
  });

  document.getElementById("confirm-no").addEventListener("click", function() {
    confirmDelete.dismissAlert(0);
  });
});