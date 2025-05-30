<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Lookup</title>
    <link rel="stylesheet" type="text/css" href="../css/customer.css">
    <script type="module" src="../js/customer.js"></script>
</head>
<body>
    <?php include '../../Header/php/header.php';?>
    <?php include "spinner.php";?>
    <div class="alert-container">
        <?php include "../../AdministratorView/php/add_alerts.php"?>
    </div>
    <div class="main-layout">
        <aside class="sidebar">
            <form id="productFilterForm">
                <div class="input-container">
                    <h1>Find Products</h1>
                    <div class="filters-row">
                        <input class="search-bar" type="text" id="search" name="search" placeholder="Search for products...">
                        <select class="category-select" id="category" name="category">
                            <option value="default">All Categories</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Desktop Computers">Desktop Computers</option>
                            <option value="Tablets">Tablets</option>
                            <option value="Smartphones">Smartphones</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Keyboards & Computer Mice">Keyboards & Computer Mice</option>
                            <option value="Headphones & Earbuds">Headphones & Earbuds</option>
                        </select>
                        <select class="sort-select" id="sort" name="sort">
                            <option value="default">Sort by: Alphabetical</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                        <div class="price-range-row">
                            <div class="price-pair">
                                <label for="minPrice">Min Price</label>
                                <input type="number" id="minPrice" class="price-input" placeholder="Min" min="0" step="10">
                            </div>
                            <div class="price-pair">
                                <label for="maxPrice">Max Price</label>
                                <input type="number" id="maxPrice" class="price-input" placeholder="Max" min="0" step="10">
                            </div>
                        </div>
                        <label>
                            <input class="filter-checkbox" type="checkbox" name="onSale" id="onSale"> On Sale
                        </label>
                    </div>
                    <button id="submit" type="submit">Show Products</button>
                </div>
            </form>
        </aside>
        <main class="content">
            <div id="results-container" class="results-container">
                <h1 id="productsHeading">Top Rated Products</h1>
                <div id="product-list" class="product-list"></div>
                <div id="noResults" style="display:none; color:#d8000c; margin-top:16px;"></div>
            </div>
        </main>
    </div>
</body>
</html>