var users = [
  {
    "id": 1,
    "firstname": "Alice",
    "lastname": "Johnson",
    "email": "alice.johnson@example.com",
    "phone": "1234567890"
  },
  {
    "id": 2,
    "firstname": "Brian",
    "lastname": "Smith",
    "email": "brian.smith@example.com",
    "phone": "2345678901"
  },
  {
    "id": 3,
    "firstname": "Catherine",
    "lastname": "Lee",
    "email": "catherine.lee@example.com",
    "phone": "3456789012"
  },
  {
    "id": 4,
    "firstname": "Daniel",
    "lastname": "Thompson",
    "email": "daniel.thompson@example.com",
    "phone": "4567890123"
  },
  {
    "id": 5,
    "firstname": "Emily",
    "lastname": "Davis",
    "email": "emily.davis@example.com",
    "phone": "5678901234"
  },
  {
    "id": 6,
    "firstname": "Frank",
    "lastname": "Martin",
    "email": "frank.martin@example.com",
    "phone": "6789012345"
  },
  {
    "id": 7,
    "firstname": "Grace",
    "lastname": "Chen",
    "email": "grace.chen@example.com",
    "phone": "7890123456"
  },
  {
    "id": 8,
    "firstname": "Henry",
    "lastname": "Wilson",
    "email": "henry.wilson@example.com",
    "phone": "8901234567"
  },
  {
    "id": 9,
    "firstname": "Isabella",
    "lastname": "Moore",
    "email": "isabella.moore@example.com",
    "phone": "9012345678"
  },
  {
    "id": 10,
    "firstname": "Jack",
    "lastname": "Taylor",
    "email": "jack.taylor@example.com",
    "phone": "0123456789"
  }
];

var products = [
  {
    "id": 101,
    "title": "Wireless Mouse",
    "price": "29,99",
    "discounted_price": "",
    "image_url": "https://example.com/mouse.jpg",
    "rating": "4,5",
    "number_of_reviews": 120,
    "product_link": "https://example.com/mouse",
    "category": "Computer Accessories",
    "retailer": "TechStore"
  },
  {
    "id": 102,
    "title": "Mechanical Keyboard",
    "price": "79,99",
    "discounted_price": "69,99",
    "image_url": "https://example.com/keyboard.jpg",
    "rating": "4,7",
    "number_of_reviews": 342,
    "product_link": "https://example.com/keyboard",
    "category": "Keyboards & Computer Mice",
    "retailer": "ClickMart"
  },
  {
    "id": 103,
    "title": "27\" 4K Monitor",
    "price": "299,99",
    "discounted_price": "",
    "image_url": "https://example.com/monitor.jpg",
    "rating": "4,6",
    "number_of_reviews": 210,
    "product_link": "https://example.com/monitor",
    "category": "Monitors",
    "retailer": "DisplayWorld"
  },
  {
    "id": 104,
    "title": "Gaming Laptop",
    "price": "1299,99",
    "discounted_price": "1199,99",
    "image_url": "https://example.com/gaming-laptop.jpg",
    "rating": "4,8",
    "number_of_reviews": 512,
    "product_link": "https://example.com/gaming-laptop",
    "category": "Laptops",
    "retailer": "GamerZone"
  },
  {
    "id": 105,
    "title": "Bluetooth Earbuds",
    "price": "49,99",
    "discounted_price": "39,99",
    "image_url": "https://example.com/earbuds.jpg",
    "rating": "4,3",
    "number_of_reviews": 170,
    "product_link": "https://example.com/earbuds",
    "category": "Headphones & Earbuds",
    "retailer": "AudioHub"
  },
  {
    "id": 106,
    "title": "USB-C Hub",
    "price": "24,99",
    "discounted_price": "",
    "image_url": "https://example.com/hub.jpg",
    "rating": "4,4",
    "number_of_reviews": 94,
    "product_link": "https://example.com/hub",
    "category": "Computer Accessories",
    "retailer": "GadgetStore"
  },
  {
    "id": 107,
    "title": "Smartphone 6.5\" AMOLED",
    "price": "499,99",
    "discounted_price": "479,99",
    "image_url": "https://example.com/phone.jpg",
    "rating": "4,6",
    "number_of_reviews": 321,
    "product_link": "https://example.com/phone",
    "category": "Smartphones",
    "retailer": "MobilePlus"
  },
  {
    "id": 108,
    "title": "Tablet 10\" Android",
    "price": "199,99",
    "discounted_price": "",
    "image_url": "https://example.com/tablet.jpg",
    "rating": "4,1",
    "number_of_reviews": 88,
    "product_link": "https://example.com/tablet",
    "category": "Tablets",
    "retailer": "TabWorld"
  },
  {
    "id": 109,
    "title": "All-in-One Desktop PC",
    "price": "899,99",
    "discounted_price": "849,99",
    "image_url": "https://example.com/desktop.jpg",
    "rating": "4,5",
    "number_of_reviews": 196,
    "product_link": "https://example.com/desktop",
    "category": "Desktop Computers",
    "retailer": "CompTech"
  },
  {
    "id": 110,
    "title": "Wireless Charger Pad",
    "price": "19,99",
    "discounted_price": "",
    "image_url": "https://example.com/charger.jpg",
    "rating": "4,2",
    "number_of_reviews": 75,
    "product_link": "https://example.com/charger",
    "category": "Computer Accessories",
    "retailer": "ChargeIt"
  }
];

function populateUsers() {
  // Send API request to fetch all users
  var table = document.querySelector("#dt-users tbody");
  for (var i = 0; i < users.length; i++) {
    var newRow = document.createElement("tr");
    newRow.classList.add("clickable-row-user");

    var id = users[i]["id"];
    var name = users[i]["firstname"] + " " + users[i]["lastname"];
    var email = users[i]["email"];

    // Validation?

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
}

function populateProducts() {
  // Send API request to fetch products
  var table = document.querySelector("#dt-products tbody");
  for (var i = 0; i < products.length; i++) {
    var newRow = document.createElement("tr");
    newRow.classList.add("clickable-row-product");

    var id = products[i]["id"];
    var title = products[i]["title"]
    var price = "$" + products[i]["price"];

    // Validation?

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

function populateRetailers() {

  var retailers = [];

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      retailers = response.data;
    } else if (this.readyState == 4) {
      console.log("Failed to fetch retailers, status code: " + this.status);
    }
  }

  request.open("POST", "http://localhost/COS221_Assignment5/api/api.php", false);
  request.send(JSON.stringify({ "type": "getAllRetailers" }));

  var table = document.querySelector("#dt-retailers tbody");
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
}

if (document.getElementById("users") != null) {
  // Populate users
  populateUsers();
}

if (document.getElementById("products") != null) {
  // Populate products
  populateProducts();
}

if (document.getElementById("retailers") != null) {
  // Populate retailers
  populateRetailers();
}

