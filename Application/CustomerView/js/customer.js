/*
    The products returned by the getProducts function will populate 
    the allProducts array to easily manage filtering and sorting.
*/
let allProducts = [];

function getCookie(cname) 
{
    /*
        Retrieves the value of a cookie by its name.
    */
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) 
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function getProducts() 
{
    /*
        Sends a request to fetch products from the server using the user's API key.
        On success, populates the allProducts array and applies filters to display products.
    */
    var userAPI = getCookie("APIKey");
    /*
        Expected request structure:
        {
            action: "getProducts",
            apikey: userApI
        };

        Expected response structure:
        {
            success: <success indicator>
            message: <message>
            data: <JSON object of products>
        }
    */

    var reqData = 
    {
        action: "getProducts",
        apiKey: userAPI
    };

    var req = new XMLHttpRequest();
    req.open("POST", "", true);

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4 && req.status == 200) 
        {
            var response = JSON.parse(req.responseText);

            if (response.status == "success") 
            {
                allProducts = response.data;
                applyAllFilters();
            } 
        }
    };

    req.send(JSON.stringify(reqData));
}

function extractNumericPrice(priceStr) 
{
    /*
        Extracts and returns the numeric value from a price string.
    */
    var result = "";
    for (var i = 0; i < priceStr.length; i++) 
    {
        var ch = priceStr[i];

        if ((ch >= '0' && ch <= '9') || ch === '.') 
        {
            result += ch;
        }
    }

    return parseFloat(result);
}

function sortProducts(products, sortValue) 
{
    /*
        Sorts the given products array based on the selected sort 
        option (price, rating, or alphabetical) using bubble sort.
    */
    var n = products.length;
    var swapped = true;

    while (swapped) 
    {
        swapped = false;

        for (var i = 1; i < n; i++) 
        {
            var swap = false;

            if (sortValue === "price-asc") 
            {
                var priceA = extractNumericPrice(products[i - 1].price);
                var priceB = extractNumericPrice(products[i].price);

                if (priceA > priceB)
                {
                    swap = true;
                }
            } 
            else if (sortValue === "price-desc")
            {
                var priceA = extractNumericPrice(products[i - 1].price);
                var priceB = extractNumericPrice(products[i].price);
                if (priceA < priceB)
                {
                    swap = true;
                }
            } 
            else if (sortValue === "rating") 
            {
                var ratingA = products[i - 1].rating || 0;
                var ratingB = products[i].rating || 0;

                if (ratingA < ratingB)
                {
                    swap = true;
                }
            } 
            else 
            {
                if (products[i - 1].title.localeCompare(products[i].title) > 0)
                {
                    swap = true;
                }
            }

            if (swap) 
            {
                var temp = products[i - 1];
                products[i - 1] = products[i];
                products[i] = temp;
                swapped = true;
            }
        }

        n--;
    }
    return products;
}

function applyAllFilters()
{
    /*
        Applies search, category, on sale, and sort filters to the allProducts array and displayes them.
    */
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    const selectedCategory = document.getElementById('category').value;
    const onSaleChecked = document.getElementById('onSale').checked;
    const sortValue = document.getElementById('sort').value;

    let filtered = [];

    for(var i = 0; i < allProducts.length; i++) 
    {
        var product = allProducts[i];
        var match = true;

        if (searchValue && product.title.toLowerCase().indexOf(searchValue) === -1)
        {
            match = false;
        }

        if (selectedCategory !== "default" && product.category !== selectedCategory)
        {
            match = false;
        }

        if (onSaleChecked && !product.onSale)
        {
            match = false;
        }

        if (match)
        {
            filtered.push(product);
        }
    }

    filtered = sortProducts(filtered, sortValue);

    displayProducts(filtered);

    let noResults = document.getElementById("noResults");

    if (!noResults) 
    {
        noResults = document.createElement("div");
        noResults.id = "noResults";
        noResults.style.color = "#d8000c";
        noResults.style.marginTop = "16px";
        document.getElementById("product-list").appendChild(noResults);
    }

    if (filtered.length == 0) 
    {
        noResults.textContent = "hmm... No results match your filters!";
        noResults.style.display = "block";
    } 
    else 
    {
        noResults.textContent = "";
        noResults.style.display = "none";
    }
}

function addWatchlist(productId)
{
    /*
        Sends a request to the server to add the specified product to the user's watchlist.
    */
    var userAPI = getCookie("APIKey");

    /*
        Expected request structure:
        {
            action: "addWatchlist",
            apikey: userApI,
            product_id: productId
        };

        Expected response structure:
        {
            success: <success indicator>
            message: <message>
            data: null
        }
    */

    var reqData = 
    {
        action: "addWatchlist",
        apikey: userAPI,
        product_id: productId
    };

    var req = new XMLHttpRequest();
    req.open("POST", "", true);

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4 && req.status == 200) 
        {
            var response = JSON.parse(req.responseText);

            if(response.status !== "success") 
            {
                alert("Failed to add product to watchlist: " + response.data);
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function displayProducts(products) 
{
    /*
        Renders the given products array into the product list section of the page.
        Shows the results container and applies some UI transitions.
    */
    const resultsContainer = document.getElementById('results-container');
    const productList = document.getElementById('product-list');
    productList.innerHTML = "";

    for (var i = 0; i < products.length; i++) 
    {
        const product = products[i];
        const item = document.createElement('div');
        item.className = "product-card";
        item.setAttribute('data-category', product.category);
        item.setAttribute('data-onsale', product.onSale ? "true" : "false");

        item.innerHTML = 
        `
            <div class="product-rating">
                <span class="star-icon">⭐</span>
                <span class="rating-value">${product.rating}</span>
            </div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span class="product-title">${product.title}</span>
                <span class="product-retailer">${product.retailer || ""}</span>
            </div>
            <div class="product-price-bar">
                <span class="product-price">${product.price}</span>
                <button class="watchlist-btn" title="Add to Watchlist" data-product-id="${product.id}">
                    <span class="watchlist-icon">🔎</span>
                </button>
            </div>
        `;
        productList.appendChild(item);
    }

    var watchlistButtons = document.querySelectorAll(".watchlist-btn");

    watchlistButtons.forEach(function (button) 
    {
        button.addEventListener("click", function () 
        {
            let productId = this.getAttribute("data-product-id");
            addWatchlist(productId);
        });
    });

    resultsContainer.style.display = "block";
    document.querySelector('.input-container').classList.add('form-top');
    document.body.classList.add('form-transition');
}

window.onload = function() 
{
    document.getElementById('productFilterForm').addEventListener('submit', function(event) 
    {
        event.preventDefault();
        getProducts();

        document.getElementById('search').addEventListener('input', applyAllFilters);
        document.getElementById('category').addEventListener('change', applyAllFilters);
        document.getElementById('onSale').addEventListener('change', applyAllFilters);
        document.getElementById('sort').addEventListener('change', applyAllFilters);

        const submitButton = document.getElementById('submit');
        if (submitButton) 
        {
            submitButton.parentNode.removeChild(submitButton);
        }
    });
}