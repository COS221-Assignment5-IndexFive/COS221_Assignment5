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

var pages = [];

function paginationInit(productsArr) {
  pages = [];
  for (var i = 0; i < productsArr.length; i += 50) {
    pages.push(productsArr.slice(i, i + 50));
  }
}

function displayPages(currentPage) {
  if (currentPage > pages.length && pages.length != 0) {
    return;
  } else if (pages.length == 0) {
    displayProducts([]);
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
    if (products == null) {
      console.log("here");
      utils.getRequest({ "type": "GetProducts" })
        .then((retProd) => {
          products = retProd;
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
      paginationInit(products.filter(product => product.title.toLowerCase().includes(searchTerm)));
      displayPages(1);
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