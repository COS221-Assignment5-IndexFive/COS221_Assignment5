import { Validator } from "./Validator.js";
import { AlertUtilities } from "./AlertUtilites.js";

function displayError() {
    document.getElementsByClassName("product-form")[0].classList.add("hidden");
    document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

function populateFormFields(index) {
    document.getElementById("product-id").value = products[index].id;
    document.getElementById("title").value = products[index].title;
    document.getElementById("price").value = products[index].price;
    document.getElementById("discounted-price").value = products[index].discounted_price;
    document.getElementById("rating").value = products[index].rating;
    document.getElementById("product-link").value = products[index].product_link;
    document.getElementById("image-url").value = products[index].image_url;
    document.getElementById("category-select").value = products[index].category;
    document.getElementById("retailer-select").value = products[index].retailer;
}

function getCategories() {
    // Query API for categories
    var categories = [
        "Laptops",
        "Desktop Computers",
        "Tablets",
        "Smartphones",
        "Monitors",
        "Keyboards & Computer Mice",
        "Headphones & Earbuds"
    ];
    var categoriesSelect = document.getElementById("category-select");

    for (var i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.value = categories[i];
        option.innerText = categories[i];
        categoriesSelect.appendChild(option);
    }

    var newCategoryOption = document.createElement("option");
    newCategoryOption.value = "add_new";
    newCategoryOption.innerText = "Add new category";
    categoriesSelect.appendChild(newCategoryOption);
}

function getRetailers() {
    // Query API for retailers
    var retailers = [
        "retailer A",
        "retailer B"
    ];

    var retailerSelect = document.getElementById("retailer-select");

    for (var i = 0; i < retailers.length; i++) {
        var option = document.createElement("option");
        option.value = retailers[i];
        option.innerText = retailers[i];
        retailerSelect.appendChild(option);
    }
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

getCategories();
getRetailers();

// Add new category
var selectEl = document.getElementById('category-select');
var newCatInput = document.getElementById('new-category');
var formGroupCat = document.getElementById('category-group');

selectEl.addEventListener("change", function() {
    if (selectEl.value === "add_new") {
        newCatInput.style.display = "block";
        newCatInput.focus();
    } else {
        newCatInput.style.display = 'none';
        newCatInput.value = '';
        if (formGroupCat != undefined && formGroupCat.classList.contains("has-error")) {
            formGroupCat.classList.remove("has-error");
        }
    }
});

var imageURL = document.getElementById("image-url");
imageURL.addEventListener("change", function() {
    document.getElementById("product-img").src = imageURL.value;
})

// Form validation
document.getElementById("change-product-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const pdv = new Validator();

    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var validPrice = pdv.validatePrice(price);

    pdv.validationHandler("fg-price", validPrice);

    var discountedPrice = document.getElementById("discounted-price").value;
    console.log(discountedPrice);
    if (discountedPrice != undefined && discountedPrice !== "") {
        if (validPrice) {
            pdv.validationHandler("fg-discount-price", pdv.validatePrice(discountedPrice) && discountedPrice < price);
        } else {
            pdv.validationHandler("fg-discount-price", pdv.validatePrice(discountedPrice));
        }
    }

    imageURL = document.getElementById("image-url").value;
    pdv.validationHandler("fg-image-url", pdv.validateURL(imageURL));

    var productLink = document.getElementById("product-link").value;
    pdv.validationHandler("fg-product-link", pdv.validateURL(productLink));

    var numReviews = document.getElementById("num-reviews").value;
    pdv.validationHandler("fg-num-reviews", pdv.validateNumReviews(numReviews));

    var averageRating = document.getElementById("rating").value;
    pdv.validationHandler("fg-rating", pdv.validateRating(averageRating));

    var category = selectEl.value;
    pdv.validationHandler("fg-category", pdv.validateCategory(category));

    var retailer = document.getElementById("retailer-select").value;
    pdv.validationHandler("fg-retailer", retailer !== "");

    if (!pdv.valid) {
        return;
    }

    var successUpdate = new AlertUtilities(document.getElementById("update-success"));
    successUpdate.showAndDismissAlert();
    console.log("Simulate API request to add product");
});

// Delete section
function deleteProduct() {
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

var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "Product " + id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "Product " + id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "Product " + id);

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
    if (deleteProduct()) {
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