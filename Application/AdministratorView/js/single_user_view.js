import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";
import { ApiUtils } from "../../Utils/ApiUtils.js";

function displayError() {
  document.getElementsByClassName("user-form")[0].classList.add("hidden");
  document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

var user;

function loadUser() {
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
  var users = JSON.parse(sessionStorage.getItem("users"));
  // Check if user id in users arr
  user = users.filter(user => user.user_id == id);

  if (user.length == 0) {
    displayError();
    return;
  }

  user = user[0];

  document.getElementById("user-id").value = user.user_id;
  document.getElementById("first-name").value = user.first_name;
  document.getElementById("last-name").value = user.last_name;
  document.getElementById("email").value = user.email_address;
  document.getElementById("phone").value = user.cell_number;
}

loadUser();
var utils = new ApiUtils();

document.getElementById("change-user-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const suv = new Validator();

  var firstName = document.getElementById("first-name").value;
  suv.validationHandler("fg-first-name", suv.validateFirstAndLastName(firstName));

  var lastName = document.getElementById("last-name").value;
  suv.validationHandler("fg-last-name", suv.validateFirstAndLastName(lastName));

  var email = document.getElementById("email").value;
  suv.validationHandler("fg-email", suv.validateEmail(email));

  var phoneNum = document.getElementById("phone").value;
  suv.validationHandler("fg-phone", suv.validatePhoneNum(phoneNum));

  if (!suv.valid) {
    return;
  }

  var request = {
    "type": "UpdateUser",
    "user_id": user.user_id,
    "first_name": firstName,
    "last_name": lastName,
    "email_address": email,
    "cell_number": phoneNum
  };

  var updateSuccess = new AlertUtilities(document.getElementById("update-success"), user.user_id);
  var updateError = new AlertUtilities(document.getElementById("update-error"), user.user_id);

  utils.getRequest(request)
    .then((data) => {
      updateSuccess.showAndDismissAlert();
    })
    .catch((error) => {
      updateError.showAndDismissAlert();
    })
});

// Delete section
var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "User " + user.user_id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "User" + user.user_id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "User " + user.user_id);

function deleteUser() {
  utils.getRequest({ "type": "removeUser", "user_id": user.user_id })
    .then((data) => { deleteSuccessMessage.showAndDismissAlert() })
    .catch((error) => { deleteErrorMessage.showAndDismissAlert() });
    setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
}

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
    deleteUser();
  });

  document.getElementById("confirm-no").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
  });
});