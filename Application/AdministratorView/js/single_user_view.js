import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";



function displayError() {
    document.getElementsByClassName("user-form")[0].classList.add("hidden");
    document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}


function isNumericString(value) {
    return !isNaN(value) && value.trim() !== "";
}

function populateFormFields(index) {
    document.getElementById("user-id").value = users[index].id;
    document.getElementById("first-name").value = users[index].firstname;
    document.getElementById("last-name").value = users[index].lastname;
    document.getElementById("email").value = users[index].email;
    document.getElementById("phone").value = users[index].phone;
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
// Load users
var users = sessionStorage.getItem("users");

// Get GET (lol, get get) params
const params = new URLSearchParams(window.location.search);
const userID = params.get("id");

// Check if user id exists as param
if (!userID) {
    displayError();
}

// Check if user id in users arr
var user = users.filter(user => user.user_id == userID);

populateFormFields(index);

console.log(id);

document.getElementById("change-user-form").addEventListener("submit", function(event) {
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

    var updateSuccess = new AlertUtilities(document.getElementById("update-success"));
    updateSuccess.showAndDismissAlert();
});

// Delete section
function deleteUser() {
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

var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "User "+ id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "User" + id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "User " + id);

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
    if (deleteUser()) {
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