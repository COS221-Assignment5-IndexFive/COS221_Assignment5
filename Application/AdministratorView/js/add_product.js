import { Validator } from "./Validator.js";
import { AlertUtilities } from "./AlertUtilites.js";

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

// Populate fields
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

// Form utilities
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("discounted-price").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("product-link").value = "";
    document.getElementById("image-url").value = "";
    document.getElementById("category-select").value = "";
    document.getElementById("num-reviews").value = "";
    document.getElementById("retailer-select").value = "";
}

// Form validation
document.getElementById("add-product-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const apv = new Validator();

    var title = document.getElementById("title").value;

    var price = document.getElementById("price").value;
    var validPrice = apv.validatePrice(price);

    apv.validationHandler("fg-price", validPrice);

    var discountedPrice = document.getElementById("discounted-price").value;
    if (discountedPrice != undefined) {
        if (validPrice) {
            apv.validationHandler("fg-discount-price", apv.validatePrice(discountedPrice) && Number(discountedPrice) < Number(price));
        } else {
            apv.validationHandler("fg-discount-price", apv.validatePrice(discountedPrice));
        }
    }

    var imageURL = document.getElementById("image-url").value;
    apv.validationHandler("fg-image-url", apv.validateURL(imageURL));

    var productLink = document.getElementById("product-link").value;
    apv.validationHandler("fg-product-link", apv.validateURL(productLink));

    var numReviews = document.getElementById("num-reviews").value;
    apv.validationHandler("fg-num-reviews", apv.validateNumReviews(numReviews));

    var averageRating = document.getElementById("rating").value;
    apv.validationHandler("fg-rating", apv.validateRating(averageRating));

    var category = selectEl.value;
    apv.validationHandler("fg-category", apv.validateCategory(category));

    var retailer = document.getElementById("retailer-select").value;
    apv.validationHandler("fg-retailer", retailer !== "");

    if (!apv.valid) {
        return;
    }

    var newProductRequest = {
        "type": "CreateProduct",
        "title": title,
        "price": price,
        "discounted-price": discountedPrice,
        "image_url": imageURL,
        "product_link": productLink,
        "num_reviews": numReviews,
        "average_rating": averageRating,
        "category": category,
        "retailer": retailer
    };

    var successMessage = new AlertUtilities(document.getElementById("add-error"));
    successMessage.showAndDismissAlert();
    clearForm();
    console.log("Simulate API request to add product");
});