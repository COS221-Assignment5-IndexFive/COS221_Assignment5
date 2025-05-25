

document.addEventListener("DOMContentLoaded", function () {
    var spinner = document.getElementById("spinner");
    var container = document.getElementById("productDetailContainer");

    spinner.classList.remove("hidden");

    let id = new URLSearchParams(location.search).get("id");

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


//for adding to the reviews table
const getCookie = key =>
  document.cookie
    .split("; ")
    .map(c => c.split("="))
    .find(([k]) => k === key)?.[1] ?? "";

const getRating = () =>
  [...document.querySelectorAll(".star.stars")].length;

const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const review_body = document.getElementById("reviewText").value.trim();
  const rating = getRating();
  const apiKey = getCookie("apikey");

  if (!review_body || !rating) {
    alert("Please provide a review and rating.");
    return;
  }

  const payload = {
    type: "addReview",
    product_id: PRODUCT_ID,
    user_id: 1, // will use key for this, just testing 
    rating: rating,
    review_body: review_body,
    apiKey: apiKey
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../../api/api.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText);
        if (res.success) {
          alert("Review submitted!");
          reviewForm.reset();
          remove(); // Reset stars
          fetchReviews(PRODUCT_ID); // refresh reviews
        } else {
          alert("Error: " + res.message);
        }
      } else {
        alert("HTTP Error: " + xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(payload));
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


function fetchReviews(productId) {
  const apiKey = getCookie("apikey");

  fetch("../../api/api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "getReviews",
      product_id: productId,
      apiKey: apiKey
    })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("userReviews");
      const count = document.getElementById("reviewCount");

      if (!data.success || !data.data.length) {
        container.innerHTML = "<p>No reviews yet.</p>";
        count.textContent = "(0)";
        return;
      }

      const reviews = data.data;
      count.textContent = `(${reviews.length})`;

      container.innerHTML = reviews.map(review => `
        <div class="review">
          <strong>${review.username}</strong> 
          <span style="color: gold;">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
          <p>${review.review_body}</p>
        </div>
      `).join('');
    })
    .catch(() => {
      document.getElementById("userReviews").innerHTML = "<p>Failed to load reviews.</p>";
    });
}



 




