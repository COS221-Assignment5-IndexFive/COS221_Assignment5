function displayError() {
    document.getElementsByClassName("retailer-form")[0].classList.add("hidden");
    document.getElementsByClassName("count-display")[0].classList.add("hidden");
    document.getElementsByClassName("data-table")[0].classList.add("hidden");
    document.getElementsByClassName("error-message")[0].classList.remove("hidden");
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
