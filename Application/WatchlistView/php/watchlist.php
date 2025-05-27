<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Watchlist</title>
        <link rel="stylesheet" type="text/css" href="../css/watchlist.css">
        <script type="module" src="../js/watchlist.js"></script>
    </head>
    
    <body>
        <?php include '../../Header/php/header.php';?>
        <div class="alert-container">
            <?php include "../../AdministratorView/php/add_alerts.php"?>
            <div class="alert add-success hidden" id="delete-success">
                <span class="material-icons">check_circle</span>
            </div>

            <div class="alert error hidden" id="delete-error">
                <span class="material-icons">error_outline</span>
            </div>
        </div>
        <div class="watchlist-main">
            <div class="input-container">
                <h1>Your Watchlist</h1>
            </div>
            <?php include "spinner.php";?>
            <div id="watchlist-container" class="results-container">
                <h2>Tracked Products</h2>
                <div id="watchlist-list" class="product-list"></div>
                <div id="noWatchlistResults" class="no-watchlist-results">
                    You have no products in your watchlist.<br>
                    <button id="goto-lookup-btn" class="lookup-btn">Go to lookup page</button>
                </div>
            </div>
        </div>
    </body>
</html>