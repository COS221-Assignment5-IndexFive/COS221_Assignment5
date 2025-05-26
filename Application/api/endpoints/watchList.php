<?php
function watchlistAuth() 
{
    if (session_status() === PHP_SESSION_NONE) 
    {
        session_start();
    }

    if (!isset($_SESSION["user_id"])) 
    {
        sendResponse(false, null, "Access denied :(", 403);
    }

    // Only allow customers to have watchlists
    if ($_SESSION["user_type"] == "admin" || $_SESSION["user_type"] == "retailer") 
    {
        sendResponse(false, null, "Unauthorized user :(", 401);
    }
}

function addToWatchlist($db, $input)
{
    watchlistAuth();
    $user_id = $_SESSION["user_id"];

    try 
    {
        $stmt = $db->prepare("
            INSERT IGNORE INTO watchlist (user_id, product_id, date_added)
            VALUES (?, ?, NOW())
        ");
        $stmt->execute([$user_id, $input['product_id']]);
        sendResponse(true, null, "Product added to watchlist", 200);
    } 
    catch (PDOException $e) 
    {
        sendResponse(false, null, "Error adding to watchlist: " . $e->getMessage(), 500);
    }
}

function getWatchlist($db)
{
    watchlistAuth();
    $user_id = $_SESSION["user_id"];

    try 
    {
        $stmt = $db->prepare("
        SELECT p.*, w.date_added 
        FROM products p
        JOIN watchlist w ON p.product_id = w.product_id
        WHERE w.user_id = ?
        ORDER BY w.date_added DESC
        ");

        $stmt->execute([$user_id]);
        $result = $stmt->get_result();

        $watchlist = [];
        while ($row = $result->fetch_assoc()) 
        {
            $watchlist[] = $row;
        }
        
        sendResponse(true, $watchlist, "Watchlist fetched", 200);
    }
    catch (PDOException $e) 
    {
        sendResponse(false, null, "Error fetching watchlist: " . $e->getMessage(), 500);
    }
}

function removeFromWatchlist($db, $input)
{
    watchlistAuth();
    $user_id = $_SESSION["user_id"];

    try 
    {
        $stmt = $db->prepare("
            DELETE FROM watchlist
            WHERE user_id = ? AND product_id = ?
        ");
        $stmt->execute([$user_id, $input['product_id']]);
        sendResponse(true, null, "Product removed from watchlist", 200);
    } 
    catch (PDOException $e) 
    {
        sendResponse(false, null, "Error removing from watchlist: " . $e->getMessage(), 500);
    }
}
?>