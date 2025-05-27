import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";
import { ApiUtils } from "../../Utils/ApiUtils.js";

function displayError() {
  document.getElementsByClassName("product-form")[0].classList.add("hidden");
  document.getElementsByClassName("error-message-id")[0].classList.remove("hidden");
}

// Loading Spinner
function toggleLoadingScreen() {
  document.getElementById("spinner").classList.toggle("hidden");
  document.getElementById("spinner").classList.toggle("visible");
}

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

const utils = new ApiUtils();
var categories;
async function getCategories() {
  categories = JSON.parse(sessionStorage.getItem("categories"));
  if (categories == null) {
    await utils.getRequest({ "type": "getCategories" })
      .then((data) => {
        categories = data;
        sessionStorage.setItem("categories", JSON.stringify(categories));
      })
  }

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

async function getRetailers() {
  // Query API for retailers
  var retailers;

  retailers = JSON.parse(sessionStorage.getItem("retailers"));
  if (retailers == null) {
    retailers = [];
    await utils.getRequest({ "type": "getAllRetailers" })
      .then((data) => {
        var retailersObj = data;
        for (let i = 0; i < retailersObj.length; i++) {
          if (retailersObj[i] != undefined) {
            retailers.push(retailersObj[i].retailer_name);
          }
        }
        sessionStorage.setItem("retailers", JSON.stringify(retailers));
      })
  }

  var retailerSelect = document.getElementById("retailer-select");

  for (var i = 0; i < retailers.length; i++) {
    var option = document.createElement("option");
    option.value = retailers[i].retailer_name;
    option.innerText = retailers[i].retailer_name;
    retailerSelect.appendChild(option);
  }
}

var product;

async function loadProduct() {
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

  // Load product
  await utils.getRequest({ "type": "getProductByID", "product_id": id })
    .then((data) => {
      product = data;
    })
    .catch((error) => {
      displayError();
      return;
    });

  document.getElementById("product-id").value = product.product_id;
  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("discounted-price").value = product.discount_price;
  document.getElementById("rating").value = product.rating;
  document.getElementById("product-link").value = product.product_link;
  document.getElementById("image-url").value = product.image_url;
  document.getElementById("product-img").src = product.image_url;

  var retailers = JSON.parse(sessionStorage.getItem("retailers"));
  console.log(product.retailer);
  var retailerSelect = document.getElementById("retailer-select");
  if (!retailers.includes(product.retailer)) {
    var option = document.createElement("option");
    option.value = product.retailer;
    option.innerHTML = product.retailer;
    retailerSelect.appendChild(option);
  }
  retailerSelect.value = product.retailer;
}

toggleLoadingScreen();
await getRetailers();
await Promise.all([getCategories(), loadProduct()]);
toggleLoadingScreen();

document.getElementById("category-select").value = product.category;
// document.getElementById("retailer-select").innerText = product.retailer;

// Add new category
var selectEl = document.getElementById('category-select');
var newCatInput = document.getElementById('new-category');
var formGroupCat = document.getElementById('category-group');

selectEl.addEventListener("change", function () {
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
imageURL.addEventListener("change", function () {
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

  var retailerName = document.getElementById("retailer-select").value;
  pdv.validationHandler("fg-retailer", retailerName !== "");

  if (!pdv.valid) {
    return;
  }

  var newProductRequest = {
    "type": "updateProduct",
    "product_id": product.product_id,
    "title": title,
    "price": price,
    "discount_price": discountedPrice,
    "image_url": imageURL,
    "product_link": productLink,
    "nr_reviews": numReviews,
    "rating": averageRating,
    "category": category,
    "retailer": retailerName
  };

  var successUpdate = new AlertUtilities(document.getElementById("update-success"), "Product " + product.product_id);
  var errorUpdate = new AlertUtilities(document.getElementById("update-error"), "Product " + product.product_id);

  utils.getRequest(newProductRequest)
    .then((data) => {
      successUpdate.showAndDismissAlert();
    })
    .catch((error) => {
      errorUpdate.showAndDismissAlert();
    })
});

// Delete section
var deleteSuccessMessage = new AlertUtilities(document.getElementById("delete-success"), "Product " + product.product_id);
var deleteErrorMessage = new AlertUtilities(document.getElementById("delete-error"), "Product " + product.product_id);
var confirmDelete = new AlertUtilities(document.getElementById("delete-confirm"), "Product " + product.product_id);

function deleteProduct() {
  utils.getRequest({ "type": "deleteProduct", "product_id": product.product_id })
    .then((data) => {
      deleteSuccessMessage.showAndDismissAlert();
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    })
    .catch((error) => { deleteErrorMessage.showAndDismissAlert() });
}

document.getElementById("delete-btn").addEventListener("click", function () {
  confirmDelete.showAlert();

  document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
    deleteProduct();

  });

  document.getElementById("confirm-no").addEventListener("click", function () {
    confirmDelete.dismissAlert(0);
  });
});