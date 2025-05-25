import { ApiUtils } from "../../Utils/ApiUtils.js";

function isNumericString(value) {
  return !isNaN(value) && value.trim() !== "";
}

var utils = new ApiUtils();

async function loadRetailer() {
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

    var numParams = Object.keys(queryParams).length;

    if (numParams != 1) {
        return;
    }

    const id = queryParams.retlr;

    if (id == undefined) {
        displayError();
        return;
    }

    if (!isNumericString(id)) {
        displayError();
        return;
    }

    sessionStorage.setItem("retailerID", id);
    setRetailerName(id);
}

async function setRetailerName(retailerID) {
    var retailers;

    await utils.getRequest({ "type": "getAllRetailers" })
        .then((retailerRes) => {
            retailers = retailerRes;
        })
        .catch((error) => {
            console.log(error);
        });
    
    var retailer = retailers.filter(ret => ret.retailer_id == retailerID);
    sessionStorage.setItem("retailerName", retailer[0].retailer_name);
}

await loadRetailer();

// Loading Spinner
function toggleLoadingScreen() {
    document.getElementById("spinner").classList.toggle("hidden");
    document.getElementById("spinner").classList.toggle("visible");
}

// Make rows clickable
function redirectOnRowClick(entityType, newURL) {
    document.querySelectorAll(`.clickable-row-${entityType}`).forEach(row => {
        row.addEventListener("click", () => {
            var id = row.childNodes[0].innerHTML;
            window.location.href = `${newURL}?id=${id}`;
        });
    });
}

var pages = [];

function paginationInit(productsArr) {
    pages = [];
    for (var i = 0; i < productsArr.length; i += 50) {
        pages.push(productsArr.slice(i, i + 50));
    }
}

function displayPages(currentPage) {
    if ((currentPage > pages.length && pages.length != 0) || pages.length == 0) {
        return;
    }
    displayProducts(pages[currentPage - 1]);
    var pagination = document.querySelector(".pagination");
    // Remove existing numerical page buttons
    Array.from(pagination.querySelectorAll('li:not(.prev-next)')).forEach(li => li.remove());

    var nextPrevArr = document.querySelectorAll(".prev-next");
    var prev = nextPrevArr[0];
    var next = nextPrevArr[1];

    prev.addEventListener("click", (event) => {
        if (currentPage > 1) {
            displayPages(currentPage - 1);
        }
    })

    next.addEventListener("click", (event) => {
        if (currentPage < pages.length) {
            displayPages(currentPage + 1);
        }
    })

    // Create and insert current page button
    var pageLi = document.createElement("li");
    var pageBtn = document.createElement("button");
    pageBtn.type = "button";
    pageBtn.textContent = currentPage;
    pageBtn.classList.add("active");
    pageLi.appendChild(pageBtn);
    pagination.insertBefore(pageLi, pagination.children[1]);

    // Insert next two pages
    for (let i = currentPage + 1; i <= currentPage + 2; i++) {
        const altPageLi = document.createElement("li");
        const altPageBtn = document.createElement("button");
        altPageBtn.type = "button";
        altPageBtn.textContent = i;
        altPageBtn.addEventListener("click", (event) => {
            displayPages(i);
        });
        altPageLi.appendChild(altPageBtn);
        // Insert each new page after the current page
        pagination.insertBefore(altPageLi, pagination.children[2 + (i - currentPage - 1)]);
    }
}

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
    redirectOnRowClick("product", "product_details.php");
}

function getSessionItemJSON(itemKey) {
    var out;
    try {
        out = JSON.parse(sessionStorage.getItem(itemKey));
    } catch (error) {
        out = null;
    }

    return out;
}

var products = null;

var utils = new ApiUtils();

function populateProducts() {
    // Send API request to fetch products
    return new Promise((resolve, reject) => {
        if (products == null) {
            utils.getRequest({ "type": "GetProducts" })
                .then((retProd) => {
                    products = retProd.filter(prod => prod.retailer == sessionStorage.getItem("retailerName"));
                    console.log(sessionStorage.getItem("retailerName"));
                    console.log(products);
                    sessionStorage.setItem("products", JSON.stringify(products));
                    paginationInit(products);
                    displayPages(1);
                    resolve("Success");
                })
                .catch((error) => {
                    console.log("Error fetching products");
                })
        } else {
            paginationInit(products);
            displayPages(1);
            resolve("Success");
        }
    });
}

async function populateAll() {
    toggleLoadingScreen();
    try {
        await populateProducts();
    } catch (error) {
        console.log(error);
    }

    // Count total num of products displayed
    function countProducts() {
        const prodCount = document.getElementById("product-count");
        if (prodCount == null) {
            return;
        }
        var count = 0;
        for (let i = 0; i < pages.length; i++) {
            count += pages[i].length;
        }
        prodCount.innerHTML = count;

    }

    countProducts();

    // Search bars
    const productSearch = document.getElementById("product-search");

    if (productSearch) {
        productSearch.addEventListener("input", (event) => {
            var searchTerm = event.target.value.toLowerCase();
            paginationInit(products.filter(product => product.title.toLowerCase().includes(searchTerm)));
            displayPages(1);
            countProducts();
        });
    }

    toggleLoadingScreen();
}

toggleLoadingScreen();
populateAll();
toggleLoadingScreen();
