import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";

var users = [
  {
    "id": 1,
    "firstname": "Alice",
    "lastname": "Johnson",
    "email": "alice.johnson@example.com",
    "phone": "1234567890"
  },
  {
    "id": 2,
    "firstname": "Brian",
    "lastname": "Smith",
    "email": "brian.smith@example.com",
    "phone": "2345678901"
  },
  {
    "id": 3,
    "firstname": "Catherine",
    "lastname": "Lee",
    "email": "catherine.lee@example.com",
    "phone": "3456789012"
  },
  {
    "id": 4,
    "firstname": "Daniel",
    "lastname": "Thompson",
    "email": "daniel.thompson@example.com",
    "phone": "4567890123"
  },
  {
    "id": 5,
    "firstname": "Emily",
    "lastname": "Davis",
    "email": "emily.davis@example.com",
    "phone": "5678901234"
  },
  {
    "id": 6,
    "firstname": "Frank",
    "lastname": "Martin",
    "email": "frank.martin@example.com",
    "phone": "6789012345"
  },
  {
    "id": 7,
    "firstname": "Grace",
    "lastname": "Chen",
    "email": "grace.chen@example.com",
    "phone": "7890123456"
  },
  {
    "id": 8,
    "firstname": "Henry",
    "lastname": "Wilson",
    "email": "henry.wilson@example.com",
    "phone": "8901234567"
  },
  {
    "id": 9,
    "firstname": "Isabella",
    "lastname": "Moore",
    "email": "isabella.moore@example.com",
    "phone": "9012345678"
  },
  {
    "id": 10,
    "firstname": "Jack",
    "lastname": "Taylor",
    "email": "jack.taylor@example.com",
    "phone": "0123456789"
  }
];


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

var index = -1;
for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
        index = i;
        break;
    }
}

if (index < 0) {
    displayError();
    throw new Error("User does not exist");
}

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