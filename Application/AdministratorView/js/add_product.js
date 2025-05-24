import { Validator } from "../../Utils/Validator.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";
import { ApiUtils } from "../../Utils/ApiUtils.js";

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
                    retailers.push(retailersObj[i].retailer_name);
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

await Promise.all([getCategories(), getRetailers()]);

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

    if (!categories.includes(category)) {
        categories.push(category);
    }

    var newProductRequest = {
        "type": "addProduct",
        "title": title,
        "price": price,
        "discount_price": discountedPrice,
        "image_url": imageURL,
        "product_link": productLink,
        "nr_reviews": numReviews,
        "rating": averageRating,
        "category": category,
        "retailer": retailer
    };

    var successMessage = new AlertUtilities(document.getElementById("add-success"), "Product " + title);
    var errorMessage = new AlertUtilities(document.getElementById("add-error"), "Product " + title);

    utils.getRequest(newProductRequest)
        .then((data) => {
            successMessage.showAndDismissAlert();
        })
        .catch((error) => {
            errorMessage.showAndDismissAlert();
        });
    clearForm();
});