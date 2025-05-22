import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";

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

document.getElementById("change-retailer-form").addEventListener("submit", function (event) {
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
  rdv.validationHandler("fg-retailer", retailer != "" && rdv.validateRetailer(retailer));

  if (!rdv.valid) {
    return;
  }
});

// Count section
function countProducts() {
  document.getElementById("product-count").innerHTML = document.querySelectorAll(".data-table tr").length - 1;
}

countProducts();

// Delete section
function deleteRetailer() {
  var deleted = false;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.onreadystatechange == 4 && request.status == 200) {
      deleted = true;
    } else if (request.onreadystatechange == 4) {
      console.log("Failed to delete user " + id + ", status code: " + request.status);
    }
  }

  request.open("POST", "http://localhost/COS221_Assignment5/api/api.php", false);
  request.send(JSON.stringify({
    "type": "removeRetailer",
    "id": id
  }));

  return deleted;
}

var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "Deleted Retailer " + id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "Failed to delete Retailer " + id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "Retailer " + id);

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
    if (deleteRetailer()) {
      deleteSuccessMessage.showAndDismissAlert();
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    } else {
      deleteErrorMessage.showAndDismissAlert();
    }

  });

  document.getElementById("confirm-no").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
  });
});