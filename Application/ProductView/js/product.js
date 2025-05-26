function showLoadingScreen() 
{
    /*
        Shows the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("spinner").classList.add("visible");
}

function hideLoadingScreen() 
{
    /*
        Hides the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("visible");
    document.getElementById("spinner").classList.add("hidden");
}

function getProductId()
{
    /*
        Extracts the product ID from the URL query string.
    */
    var url = window.location.href;
    var strUrl = url.toString();

    var idIndex = strUrl.indexOf("id=") + 3;
    var productId = strUrl.substring(idIndex);

    return productId;
}

function getProduct()
{
    /*
        Fetches product details from the API and displays them.
    */
    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);

    var id = getProductId();

    var reqData = 
    {
        type: "getProductByID",
        product_id: id
    };

    showLoadingScreen();

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            hideLoadingScreen();
            
            try
            {
                var response = JSON.parse(req.responseText);

                if(response.success == true) 
                {
                    displayProduct(response.data);
                }
                else
                {
                    console.error("Failed to fetch product" + response.data);
                }
            }
            catch(e)
            {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
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

                if(response.success == false) 
                {
                    console.error("Failed to add product to watchlist: " + response.data);
                }
            }
            catch(e)
            {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function getReviews(productId)
{
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

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            try
            {
                var response = JSON.parse(req.responseText);

                if(response.success == true) 
                {
                    displayReviews(response.data)
                }
                else
                {
                    console.error("Failed to get reviews: " + response.data);
                }
            }
            catch(e)
            {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function displayReviews(reviews) 
{
    /*
        Displayes the list of reviews.
    */
    const reviewList = document.querySelector('.review-list');
    reviewList.innerHTML = '';

    if (!reviews || reviews.length === 0) 
    {
        reviewList.innerHTML = '<div class="review-item"><div class="text">No reviews yet. Be the first to review!</div></div>';
    }
    else
    {
        reviews.forEach(function(review) 
        {
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

function addReview(productId, user_id, rating, review_body)
{
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

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            try
            {
                var response = JSON.parse(req.responseText);

                if(response.success == true) 
                {
                    getReviews(productId);
                }
                else
                {
                    console.error("Failed to add review: " + response.data);
                }
            }
            catch(e)
            {
                console.error("Parsing error:", e);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function setupReviewForm(productId) 
{
    /*
        Sets up the review form submission handler.
    */
    const form = document.querySelector('.review-form');
    const user_id = USER_ID;

    form.onsubmit = function(e) 
    {
        e.preventDefault();

        const review_body = form.querySelector('#review-text').value;

        let rating = 0;
        const checkedRating = form.querySelector('input[name="rating"]:checked');
        if (checkedRating) 
        {
            rating = checkedRating.value;
        }

        addReview(productId, user_id, rating, review_body);
        form.reset();
    };
}

function displayProduct(product) 
{
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
    if (product.discount_price) 
    {
        priceHtml = `<span class="discount-price">$${product.discount_price}</span> <span class="original-price">$${product.price}</span>`;
    } 
    else 
    {
        priceHtml = `$${product.price}`;
    }

    infoArea.innerHTML = 
    `
        <h1>${product.title}</h1>
        <div class="product-retailer">${product.retailer}</div>
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
        </div>
    `;

    const watchlistBtn = infoArea.querySelector('.add-watchlist-btn');
    watchlistBtn.addEventListener('click', function() 
    {
        addWatchlist(product.product_id);
    });

    getReviews(product.product_id);
    setupReviewForm(product.product_id);
}

window.onload = function() 
{
    getProduct();
}