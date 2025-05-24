document.addEventListener("DOMContentLoaded", function () {
    var spinner = document.getElementById("spinner");
    var container = document.getElementById("productDetailContainer");

    spinner.classList.remove("hidden");

    var id = new URLSearchParams(location.search).get("id");

    var cookies = document.cookie.split(";");
    var apiKey = "";
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim().split("=");
        if (c[0] === "apikey") apiKey = c[1];
    }

    var x = new XMLHttpRequest();
    x.open("POST", "../../api/api.php");
    x.setRequestHeader("Content-Type", "application/json");
    x.onload = function () {
        var res = JSON.parse(x.responseText);
        var product = res.data.find(p => p.product_id == id);
        document.getElementById("reviewCount").textContent = `(${product.nr_reviews})`;


        var html = `
            <div class="product-detail-card">
                <div class="image-container">
                    <img src="${product.image_url}" alt="${product.title}">
                </div>
                <div class="info">
                    <h1>${product.title}</h1>
                    <p>${product.retailer}</p>
                    <p>${product.category}</p>
                    <p>⭐ ${product.rating || "--"}</p>
                    <p>
                        ${product.discount_price && product.discount_price !== product.price
                            ? `<span style="text-decoration:line-through;">$${product.price}</span> <span style="color:red;">$${product.discount_price}</span>`
                            : `<b>$${product.price}</b>`}
                    </p>
                </div>
            </div>
        `;

        container.innerHTML = html;
        spinner.classList.add("hidden");
    };

    x.send(JSON.stringify({ type: "GetProducts", apiKey: apiKey }));
});





let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");

// Funtion to update rating
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "stars";
        else if (n == 2) cls = "stars";
        else if (n == 3) cls = "stars";
        else if (n == 4) cls = "stars";
        else if (n == 5) cls = "stars";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}

// To remove the pre-applied styling
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}








