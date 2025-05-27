import { AlertUtilities } from "../../Utils/AlertUtilites.js";

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

function getProducts(isInitialLoad = false) 
{
    /*
        Sends a request to fetch products from the server.
        On success, applies filters to display products.
    */
    var reqData = 
    {
        type: "GetProducts"
    };

    showLoadingScreen();

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            hideLoadingScreen();

            try
            {
                var response = JSON.parse(req.responseText);

                if (response.success == true) 
                {
                    if(isInitialLoad == true)
                    {
                        let topRated = getTopRated(response.data);
                        displayProducts(topRated, true);
                    }
                    else
                    {
                        applyAllFilters();
                    }
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

function getTopRated(products) 
{
    /*
        Returns the top 8 products sorted by rating (highest first) using bubble sort.
    */
    let arr = products.slice();
    let n = arr.length;
    let swapped = true;

    while (swapped) 
    {
        swapped = false;
        for (let i = 1; i < n; i++) 
        {
            let ratingA = arr[i - 1].rating || 0;
            let ratingB = arr[i].rating || 0;
            if (ratingA < ratingB) 
            {
                let temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;
                swapped = true;
            }
        }

        n--;
    }

    return arr.slice(0, 8);
}

function applyAllFilters()
{
    /*
        Applies search, category, on sale, and sort filters to the product and displayes them.
    */
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    const selectedCategory = document.getElementById('category').value;
    const onSaleChecked = document.getElementById('onSale').checked;
    const sortValue = document.getElementById('sort').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    var reqData = 
    {
        type: "GetProducts"
    };

    if (selectedCategory !== "default") 
    {
        reqData.category = selectedCategory;
    }

    if (minPrice) 
    {
        reqData.min_price = parseFloat(minPrice);
    }

    if (maxPrice) 
    {
        reqData.max_price = parseFloat(maxPrice);
    }

    if (sortValue && sortValue !== "default") 
    {
        if (sortValue === "price-asc") 
        {
            reqData.sort_by = "price";
            reqData.order = "ASC";
        } 
        else if (sortValue === "price-desc") 
        {
            reqData.sort_by = "price";
            reqData.order = "DESC";
        } 
        else if (sortValue === "rating") 
        {
            reqData.sort_by = "rating";
            reqData.order = "DESC";
        }
    }

    showLoadingScreen();

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            hideLoadingScreen();

            try 
            {
                var response = JSON.parse(req.responseText);

                if (response.success == true) 
                {
                    let filtered = response.data;

                    if (searchValue) 
                    {
                        let filteredBySearch = [];
                        for (let i = 0; i < filtered.length; i++) 
                        {
                            let product = filtered[i];

                            if (product.title.toLowerCase().includes(searchValue)) 
                            {
                                filteredBySearch.push(product);
                            }
                        }

                        filtered = filteredBySearch;
                    }

                    if (onSaleChecked) 
                    {
                        let filteredOnSale = [];

                        for (let i = 0; i < filtered.length; i++) 
                        {
                            let product = filtered[i];
                            if (product.discount_price && product.discount_price !== product.price) 
                            {
                                filteredOnSale.push(product);
                            }
                        }

                        filtered = filteredOnSale;
                    }

                    displayProducts(filtered, false);

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
            } 
            catch (e) 
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

function displayProducts(products, isTopRated = true) 
{
    /*
        Renders the given products array into the product list section of the page.
        Shows the results container and applies some UI transitions.
    */
    const resultsContainer = document.getElementById('results-container');
    const productList = document.getElementById('product-list');
    const heading = document.getElementById('productsHeading');
    productList.innerHTML = "";

    if(isTopRated == true)
    {
        heading.textContent = "Top Rated Products";
    }
    else
    {
        heading.textContent = "Browse Products";
    }

    for (var i = 0; i < products.length; i++) 
    {
        const product = products[i];
        const item = document.createElement('div');
        item.className = "product-card";
        
        let priceHTML = "";
        if (product.discount_price && product.discount_price !== product.price)
        {
            priceHTML = 
            `
                <span class="product-original-price">
                    $${product.price}
                </span>
                <span class="product-discounted-price">
                    $${product.discount_price}
                </span>
            `;
        } 
        else 
        {
            priceHTML = `<span class="product-price">$${product.price}</span>`;
        }

        let displayTitle = product.title;
        const maxTitleLength = 25;

        if (displayTitle.length > maxTitleLength) 
        {
            displayTitle = displayTitle.substring(0, maxTitleLength - 3) + '...';
        }

        item.innerHTML = 
        `
            <div class="product-rating">
                <span class="star-icon">⭐</span>
                <span class="rating-value">${product.rating || '--'}</span>
            </div>
            <div class="product-image">
                <img src="${product.image_url}" alt="${displayTitle}">
            </div>
            <div class="product-info">
                <span class="product-title">${displayTitle}</span>
                <span class="product-retailer">${product.retailer}</span>
            </div>
            <div class="product-price-bar">
                ${priceHTML}
                <button class="watchlist-btn" title="Add to Watchlist" data-product-id="${product.product_id}">
                    <span class="watchlist-icon">➕</span>
                </button>
            </div>
        `;

        productList.appendChild(item);

        const imageDiv = item.querySelector('.product-image');
        imageDiv.addEventListener('click', function() 
        {
            window.location.href = `../../ProductView/php/product.php?id=${product.product_id}`;
        });
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
}

window.onload = function() 
{
    document.getElementById('productFilterForm').addEventListener('submit', function(event) 
    {
        event.preventDefault();
        applyAllFilters();
    });

    getProducts(true);
}