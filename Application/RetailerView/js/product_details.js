function displayError() {
    document.getElementsByClassName("product-form")[0].classList.add("hidden");
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
var valid = true;

document.getElementById("change-product-form").addEventListener("submit", function (event) {
    valid = true;
    event.preventDefault();
    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var validPrice = validatePrice(price);

    validationHandler("fg-price", validPrice);

    var discountedPrice = document.getElementById("discounted-price").value;
    console.log(discountedPrice);
    if (discountedPrice != undefined && discountedPrice !== "") {
        if (validPrice) {
            validationHandler("fg-discount-price", validatePrice(discountedPrice) && discountedPrice < price);
        } else {
            validationHandler("fg-discount-price", validatePrice(discountedPrice));
        }
    }

    imageURL = document.getElementById("image-url").value;
    validationHandler("fg-image-url", validateURL(imageURL));

    var productLink = document.getElementById("product-link").value;
    validationHandler("fg-product-link", validateURL(productLink));

    var category = selectEl.value;
    validationHandler("fg-category", validateCategory(category));


    if (!valid) {
        return;
    }

    console.log("Simulate API request to add product");
});

function validationHandler(formGroupId, validation) {
    var formGroup = document.getElementById(formGroupId);
    if (!validation) {
        formGroup.classList.add("has-error");
        valid = false;
    } else if (formGroup.classList.contains("has-error")) {
        formGroup.classList.remove("has-error");
    }
}

function isFloatLike(n) {
    return !isNaN(n) && parseFloat(n) == n;
}

function validatePrice(price) {
    return isFloatLike(price);
}

function validateURL(url) {
    // Found pattern here: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlPattern.test(url);
}

function validateCategory(category) {
    // Has to begin with letter, can contain digits, a whitespace, some selected special chars
    const categoryPattern = /^[A-Za-z]+[\w '"-&]*$/;
    return categoryPattern.test(category);
}