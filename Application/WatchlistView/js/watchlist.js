import { AlertUtilities } from "../../Utils/AlertUtilites.js";

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

function getWatchlist() 
{
    /*
        Sends a request to the API to fetch the user's watchlist.
    */
    var userAPI = getCookie("apikey");

    var reqData = 
    {
        type: "GetWatchlist",
        apikey: userAPI
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
                    displayWatchlist(response.data);
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

function deleteWatchlist(productId)
{
    /*
        Sends a request to the API to delete a product from the user's watchlist.
    */
    var userAPI = getCookie("apikey");
   
    var reqData = 
    {
        type: "DeleteWatchlist",
        apikey: userAPI,
        product_id: productId
    };

    var req = new XMLHttpRequest();
    req.open("POST", "../../api/api.php", true);
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            try
            {
                var response = JSON.parse(req.responseText);

                if (response.success == true) 
                {
                    const alertEl = document.getElementById("delete-success");
                    const alert = new AlertUtilities(alertEl, "from watchlist");
                    alert.showAndDismissAlert();
                }
                else
                {
                    const alertEl = document.getElementById("delete-error");
                    const alert = new AlertUtilities(alertEl, "from watchlist");
                    alert.showAndDismissAlert();
                }
            }
            catch(e)
            {
                const alertEl = document.getElementById("delete-error");
                const alert = new AlertUtilities(alertEl, "from watchlist");
                alert.showAndDismissAlert();
            }
        }
    };

    req.send(JSON.stringify(reqData));
}

function displayWatchlist(products)
{
    /*
        Displayes the products on the watshlist page
    */
    const list = document.getElementById('watchlist-list');
    const noResults = document.getElementById('noWatchlistResults');
    list.innerHTML = "";

    if (products == null || products.length === 0) 
    {
        noResults.style.display = "block";
    } 
    else 
    {
        noResults.style.display = "none";

        for (var i = 0; i < products.length; i++) 
        {
            const product = products[i];
            const card = document.createElement('div');
            card.className = "product-card";
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

            card.innerHTML = 
            `
                <div class="product-image">
                    <img src="${product.image_url}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-title">${displayTitle}</span>
                    <span class="product-retailer">${product.retailer}</span>
                </div>
                <button class="remove-watchlist-btn" title="Remove from Watchlist" data-product-id="${product.product_id}">
                    <span class="remove-icon">🗙</span>
                </button>
                <div class="product-price-bar">
                    ${priceHTML}
                </div>
            `;
            list.appendChild(card);

            let remButton = card.querySelector(".remove-watchlist-btn");
            remButton.addEventListener("click", function()
            {
                let productId = this.getAttribute("data-product-id");
                deleteWatchlist(productId);

                card.remove();

                if(list.children.length == 0)
                {
                    noResults.style.display = "block";
                }
            });

            const imageDiv = card.querySelector('.product-image');
            imageDiv.addEventListener('click', function() 
            {
                window.location.href = `../../ProductView/php/product.php?id=${product.product_id}`;
            });
        }
    }
}

window.onload = function() 
{
    getWatchlist();

    const lookupBtn = document.getElementById('goto-lookup-btn');
    lookupBtn.addEventListener("click", function()
    {
        window.location.href = "../../CustomerView/php/customer.php";
    });
};