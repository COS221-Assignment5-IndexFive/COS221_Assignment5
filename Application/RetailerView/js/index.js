import { ApiUtils } from "../../Utils/ApiUtils.js";

// Loading Spinner
function toggleLoadingScreen() {
    document.getElementById("spinner").classList.toggle("hidden");
    document.getElementById("spinner").classList.toggle("visible");
}

var products;

function displayProducts(products) {
    var table = document.querySelector("#dt-products tbody");
    table.innerHTML = "";
    for (var i = 0; i < products.length; i++) {
        var newRow = document.createElement("tr");
        newRow.classList.add("clickable-row-product");

        var id = products[i]["product_id"];
        var title = products[i]["title"]
        var price = "$" + products[i]["price"];

        var tdID = document.createElement("td");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");

        tdID.innerText = id;
        tdTitle.innerText = title;
        tdPrice.innerText = price;

        newRow.appendChild(tdID);
        newRow.appendChild(tdTitle);
        newRow.appendChild(tdPrice);

        table.appendChild(newRow);
    }
}

const utils = new ApiUtils();

function populateProducts() {
    // Send API request to fetch products
    return new Promise((resolve, reject) => {
        utils.getRequest({ "type": "getProducts" })
            .then((retProd) => {
                products = retProd;
                displayProducts(products);
            })
            .catch((error) => {
                console.log("Error occured when trying to fetch products")
            })
            .finally(() => {
                resolve(1);
            })
    })
}

toggleLoadingScreen();
await populateProducts();

document.querySelectorAll(`.clickable-row-product`).forEach(row => {
    row.addEventListener("click", () => {
        var id = row.childNodes[0].innerHTML;
        window.location.href = `product_details.php?id=${id}`;
    });
});

// Count total num of products displayed
function countProducts() {
  const prodCount = document.getElementById("product-count");
  if (prodCount != null) {
    prodCount.innerHTML = document.querySelectorAll(".data-table tr").length - 1;
  }
}

countProducts();
toggleLoadingScreen();

document.getElementById("product-search").addEventListener("input", (event) => {
    var searchTerm = event.target.value.toLowerCase();
    displayProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm)));
    countProducts();
});


