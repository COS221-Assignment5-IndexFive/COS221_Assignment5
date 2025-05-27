import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";
import { ApiUtils } from "../../Utils/ApiUtils.js";

function displayError() {
  document.getElementsByClassName("retailer-form")[0].classList.add("hidden");
  document.getElementsByClassName("count-display")[0].classList.add("hidden");
  document.getElementsByClassName("data-table")[0].classList.add("hidden");
  document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}

var retailer;

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

function loadRetailer() {
  const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

  var numParams = Object.keys(queryParams).length;

  if (numParams != 1) {
    displayError();
    return;
  }

  const id = queryParams.id;

  if (id == undefined) {
    displayError();
    return;
  }

  if (!isNumericString(id)) {
    displayError();
    return;
  }

  // Load users
  var retailers = JSON.parse(sessionStorage.getItem("retailers"));
  // Check if user id in users arr
  retailer = retailers.filter(retailer => retailer.retailer_id == id);

  if (retailer.length == 0) {
    displayError();
    return;
  }

  retailer = retailer[0];
  document.getElementById("retailer-id").value = retailer.retailer_id;
  document.getElementById("first-name").value = retailer.first_name;
  document.getElementById("last-name").value = retailer.last_name;
  document.getElementById("email").value = retailer.email_address;
  document.getElementById("phone").value = retailer.cell_number;
  document.getElementById("retailer-name").value = retailer.retailer_name;
}

loadRetailer();

document.getElementById("change-retailer-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const rdv = new Validator();

  var firstName = document.getElementById("first-name").value;
  rdv.validationHandler("fg-first-name", rdv.validateFirstAndLastName(firstName));

  var lastName = document.getElementById("last-name").value;
  rdv.validationHandler("fg-last-name", rdv.validateFirstAndLastName(lastName));

  var email = document.getElementById("email").value;
  rdv.validationHandler("fg-email", rdv.validateEmail(email));

  var phoneNum = document.getElementById("phone").value;
  rdv.validationHandler("fg-phone", rdv.validatePhoneNum(phoneNum));

  var retailerForm = document.getElementById("retailer-name").value;
  rdv.validationHandler("fg-retailer", retailerForm != "" && rdv.validateRetailer(retailerForm));

  if (!rdv.valid) {
    return;
  }
  var request = {
    "type": "updateRetailer",
    "retailer_id": retailer.retailer_id,
    "first_name": firstName,
    "last_name": lastName,
    "email_address": email,
    "cell_number": phoneNum,
    "retailer_name": retailerForm
  };

  var updateSuccess = new AlertUtilities(document.getElementById("update-success"), retailer.retailer_id);
  var updateError = new AlertUtilities(document.getElementById("update-error"), retailer.retailer_id);

  utils.getRequest(request)
    .then((data) => {
      updateSuccess.showAndDismissAlert();
    })
    .catch((error) => {
      updateError.showAndDismissAlert();
    })
});


// Delete section
var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "Deleted Retailer " + retailer.retailer_id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "Failed to delete Retailer " + retailer.retailer_id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "Retailer " + retailer.retailer_id);

var utils = new ApiUtils();

function deleteRetailer() {
  utils.getRequest({ "type": "removeRetailer", "retailer_id": retailer.user_id })
    .then((data) => {
      deleteSuccessMessage.showAndDismissAlert();
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    })
    .catch((error) => { deleteErrorMessage.showAndDismissAlert(); });
}

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    deleteRetailer();
  });

  document.getElementById("confirm-no").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
  });
});