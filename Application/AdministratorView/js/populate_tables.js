import { ApiUtils } from "../../Utils/ApiUtils.js";

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

// Define display functions
function displayUsers(users) {
  var table = document.querySelector("#dt-users tbody");
  table.innerHTML = "";
  for (var i = 0; i < users.length; i++) {
    var newRow = document.createElement("tr");
    newRow.classList.add("clickable-row-user");

    var id = users[i]["user_id"];
    var name = users[i]["first_name"] + " " + users[i]["last_name"];
    var email = users[i]["email_address"];

    var tdID = document.createElement("td");
    var tdName = document.createElement("td");
    var tdEmail = document.createElement("td");

    tdID.innerText = id;
    tdName.innerText = name;
    tdEmail.innerText = email;

    newRow.appendChild(tdID);
    newRow.appendChild(tdName);
    newRow.appendChild(tdEmail);

    table.appendChild(newRow);
  }
  redirectOnRowClick("user", "single_user_view.php");
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

function displayRetailers(retailers) {
  var table = document.querySelector("#dt-retailers tbody");
  table.innerHTML = "";
  for (var i = 0; i < retailers.length; i++) {
    var newRow = document.createElement("tr");
    newRow.classList.add("clickable-row-retailer");

    var id = retailers[i]["retailer_id"];
    var name = retailers[i]["retailer_name"];

    var tdID = document.createElement("td");
    var tdName = document.createElement("td");

    tdID.innerText = id;
    tdName.innerText = name;

    newRow.appendChild(tdID);
    newRow.appendChild(tdName);
    table.appendChild(newRow);
  }
  redirectOnRowClick("retailer", "retailer_detail.php");
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

var users = getSessionItemJSON("users");
var products = getSessionItemJSON("products");
var retailers = getSessionItemJSON("retailers");

var utils = new ApiUtils();

// Populate tables
function populateUsers() {
  // Send API request to fetch all users
  return new Promise((resolve, reject) => {
    if (users != null) {
      displayUsers(users);
      resolve("Loaded users from storage");
    }
    utils.getRequest({ "type": "getAllUsers" })
      .then((data) => {
        users = data;
        sessionStorage.setItem("users", JSON.stringify(users));
        displayUsers(users);
      })
      .catch(() => {
        console.log("Error: ");
        reject("Error populating users");
      })
      .finally(() => resolve("Fetched users"))
  });
}

function populateProducts() {
  // Send API request to fetch products
  return new Promise((resolve, reject) => {
    if (products != null) {
      displayProducts(products);
      resolve("Loaded products from storage");
    }
    utils.getRequest({ "type": "GetProducts" })
      .then((retProd) => {
        products = retProd;
        displayProducts(products);
        sessionStorage.setItem("products", JSON.stringify(products));
      })
      .catch((error) => {
        reject("Error fetching products")
      })
      .finally(() => {
        resolve("Fetched products");
      })
  })
}

function populateRetailers() {
  return new Promise((resolve, reject) => {
    if (retailers != null) {
      displayRetailers(retailers);
      resolve("Loaded retailers from session storage");
    }
    utils.getRequest({ "type": "getAllRetailers" })
      .then((retailerRes) => {
        retailers = retailerRes;
        sessionStorage.setItem("retailers", JSON.stringify(retailers));
        displayRetailers(retailers);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { resolve("Fetched retailers") });
  });
}

async function populateAll() {
  toggleLoadingScreen();
  try {
    if (document.getElementById("users") != null
      && document.getElementById("products") != null
      && document.getElementById("retailers") != null) {
      await Promise.all([populateUsers(), populateRetailers(), populateProducts()]);
    } else if (document.getElementById("users") != null) {
      await populateUsers();
    } else if (document.getElementById("products") != null) {
      await populateProducts();
    } else {
      await populateRetailers();
    }
  } catch (error) {
    console.log(error);
  }

  // Count total num of products displayed
  function countProducts() {
    const prodCount = document.getElementById("product-count");
    if (prodCount != null) {
      prodCount.innerHTML = document.querySelectorAll(".data-table tr").length - 1;
    }
  }

  countProducts();

  // Search bars
  const userSearch = document.getElementById("user-search");
  const productSearch = document.getElementById("product-search");
  const retailerSearch = document.getElementById("retailer-search");

  if (userSearch) {
    userSearch.addEventListener("input", (event) => {
      var searchTerm = event.target.value.toLowerCase();
      displayUsers(users.filter(user => user.first_name.toLowerCase().includes(searchTerm) || user.last_name.toLowerCase().includes(searchTerm)));
    });
  }

  if (productSearch) {
    productSearch.addEventListener("input", (event) => {
      var searchTerm = event.target.value.toLowerCase();
      displayProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm)));
      countProducts();
    });
  }

  if (retailerSearch) {
    retailerSearch.addEventListener("input", (event) => {
      var searchTerm = event.target.value.toLowerCase();
      displayRetailers(retailers.filter(retailer => retailer.retailer_name.toLowerCase().includes(searchTerm)));
    });
  }

  toggleLoadingScreen();
}

toggleLoadingScreen();
populateAll();
toggleLoadingScreen();

// Add refresh functionality
document.getElementById("refresh").addEventListener("click", (event) => {
  sessionStorage.clear();
  users = null;
  products = null;
  retailers = null;
  populateAll();
});