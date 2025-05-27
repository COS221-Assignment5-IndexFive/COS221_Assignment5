import { ApiUtils } from "../../Utils/ApiUtils.js";
import { AlertUtilities } from "../../Utils/AlertUtilites.js";

function showLoadingScreen() {
    /*
        Shows the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("spinner").classList.add("visible");
}

function hideLoadingScreen() {
    /*
        Hides the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("visible");
    document.getElementById("spinner").classList.add("hidden");
}

function getProductId() {
    /*
        Extracts the product ID from the URL query string.
    */
    var url = window.location.href;
    var strUrl = url.toString();

    var idIndex = strUrl.indexOf("id=") + 3;
    var productId = strUrl.substring(idIndex);

    return productId;
}

async function getProduct() {
    /*
        Fetches product details from the API and displays them.
    */
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("POST", "../../api/api.php", true);

        var id = getProductId();

        var reqData =
        {
            type: "getProductByID",
            product_id: id
        };

        showLoadingScreen();

        req.onreadystatechange = function () {
            if (req.readyState == 4) {

                try {
                    var response = JSON.parse(req.responseText);

                    if (response.success == true) {
                        resolve(response.data);
                    }
                    else {
                        reject("Err");
                    }
                }
                catch (e) {
                    console.error("Parsing error:", e);
                }
            }
        };

        req.send(JSON.stringify(reqData));
    })

}

function addWatchlist(productId) 
{
    /*
        Sends a request to the server to add the specified product to the user's watchlist.
    */
    var reqData =
    {
        type: "AddWatchlist",
        product_id: productId
    };

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            try
            {
                var response = JSON.parse(req.responseText);

                if(response.success == true) 
                {
                    const alertEl = document.getElementById("add-success");
                    const alert = new AlertUtilities(alertEl, "to watchlist");
                    alert.showAndDismissAlert();
                }
                else
                {
                    const alertEl = document.getElementById("add-error");
                    const alert = new AlertUtilities(alertEl, "to watchlist");
                    alert.showAndDismissAlert();
                }
            }
            catch(e)
            {
                const alertEl = document.getElementById("add-error");
                const alert = new AlertUtilities(alertEl, "to watchlist");
                alert.showAndDismissAlert();
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function getReviews(productId) {
    /*
        Fetches reviews for a product from the API and displays them.
    */
    var reqData =
    {
        type: "getReviews",
        product_id: productId
    };

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            try {
                var response = JSON.parse(req.responseText);

                if (response.success == true) {
                    displayReviews(response.data)
                }
                else {
                    console.error("Failed to get reviews: " + response.data);
                }
            }
            catch (e) {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function displayReviews(reviews) {
    /*
        Displayes the list of reviews.
    */
    const reviewList = document.querySelector('.review-list');
    reviewList.innerHTML = '';

    if (!reviews || reviews.length === 0) {
        reviewList.innerHTML = '<div class="review-item"><div class="text">No reviews yet. Be the first to review!</div></div>';
    }
    else {
        reviews.forEach(function (review) {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML =
                `
                <div class="meta">
                    <span>${review.user_name}</span>
                    <span>⭐ ${review.rating ? Number(review.rating).toFixed(2) : "--"}</span>
                </div>
                <div class="text">${review.review_body}</div>
            `;
            reviewList.appendChild(item);
        });
    }
}

function addReview(productId, user_id, rating, review_body) {
    /*
        Sends a request to add a new review for a product.
    */
    var reqData =
    {
        type: "addReview",
        product_id: productId,
        user_id: user_id,
        rating: rating,
        review_body: review_body
    };

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            try {
                var response = JSON.parse(req.responseText);

                if (response.success == true) {
                    getReviews(productId);
                }
                else {
                    console.error("Failed to add review: " + response.data);
                }
            }
            catch (e) {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function setupReviewForm(productId) {
    /*
        Sets up the review form submission handler.
    */
    const form = document.querySelector('.review-form');
    const user_id = USER_ID;

    form.onsubmit = function (e) {
        e.preventDefault();

        const review_body = form.querySelector('#review-text').value;

        let rating = 0;
        const checkedRating = form.querySelector('input[name="rating"]:checked');
        if (checkedRating) {
            rating = checkedRating.value;
        }

        addReview(productId, user_id, rating, review_body);
        form.reset();
    };
}

function displayProduct(product) {
    /*
        Displayes the product details in the DOM
    */
    const imageArea = document.querySelector('.product-image-area');
    imageArea.innerHTML = '';
    const img = document.createElement('img');
    img.src = product.image_url;
    img.alt = product.title;
    imageArea.appendChild(img);

    const infoArea = document.querySelector('.product-info-area');
    let priceHtml = '';
    if (product.discount_price) {
        priceHtml = `<span class="discount-price">$${product.discount_price}</span> <span class="original-price">$${product.price}</span>`;
    }
    else {
        priceHtml = `$${product.price}`;
    }

    infoArea.innerHTML =
        `
        <h1>${product.title}</h1>
        <div class="product-retailer"><a href="${product.product_link}" target="_blank">↗${product.retailer}</a></div>
        <div class="product-rating">
            <span class="stars">⭐</span>
            <span class="avg">${product.rating || "--"}</span>
            <span class="count">(${product.nr_reviews || 0})</span>
        </div>
        <div class="product-price">
            ${priceHtml}
        </div>
        <div class="product-actions">
            <button class="add-watchlist-btn">Add to Watchlist</button>
            <button class="back-btn">Back to CompareIt</button>
        </div>
    `;

    const watchlistBtn = infoArea.querySelector('.add-watchlist-btn');
    watchlistBtn.addEventListener('click', function () {
        addWatchlist(product.product_id);
    });

    const backBtn = infoArea.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.location.href = '../../CustomerView/php/customer.php';
    })

    getReviews(product.product_id);
    setupReviewForm(product.product_id);
}

function buildComparisonCard(product, priceMark) {
    var parentLi = document.createElement("li");
    parentLi.classList.add("similar-item");

    var infDiv = document.createElement("div");
    infDiv.classList.add("sim-info");

    var simTitle = document.createElement("div");
    simTitle.classList.add("sim-title");
    // simTitle.title = product.title;
    simTitle.innerHTML = product.title;
    infDiv.appendChild(simTitle);

    var simRet = document.createElement("div");
    simRet.classList.add("sim-retailer");
    simRet.innerHTML = product.retailer;
    infDiv.appendChild(simRet);
    
    parentLi.appendChild(infDiv);

    var priceDiv = document.createElement("div");
    priceDiv.classList.add("sim-price");

    var arrow = document.createElement("span");
    if (Number(product.price) >= Number(priceMark)) {
        arrow.classList.add("arrow", "expensive");
        arrow.innerHTML = "▲";
    } else {
        arrow.classList.add("arrow", "cheaper");
        arrow.innerHTML = "▼";
    }
    priceDiv.appendChild(arrow);

    var priceSpan = document.createElement("span");
    priceSpan.innerHTML = "$" + product.price;

    priceDiv.appendChild(priceSpan);

    parentLi.appendChild(priceDiv);

    var simList = document.querySelectorAll(".similar-list")[0];

    parentLi.addEventListener("click", (event) => {
        window.location.href = "../php/product.php?id=" + product.product_id;
    });

    simList.appendChild(parentLi);
    hideLoadingScreen();
}

async function getComparisonProducts() {
    var utils = new ApiUtils();

    var product;

    await getProduct()
        .then((data) => {
            product = data;
        }).catch((error) => {
            console.log(error);
            return;
        })

    var comparisons;

    await utils.getRequest({
        "type": "getComparisonByTitle",
        "title": product.title,
        "retailer_id": product.retailer_id
    }).then((data) => {
        comparisons = data;
    }).catch((error) => {
        console.log("Error when retrieving product comparisons: " + error);
        return;
    })

    for (let i = 0; i < comparisons.length; i++) {
        buildComparisonCard(comparisons[i], product.price);
    }

}

window.onload = function () {
    getProduct()
        .then((data) => {
            displayProduct(data);
            console.log(data.product_link);
        }).catch((error) => {
            console.log(error);
        })
    getComparisonProducts();
}