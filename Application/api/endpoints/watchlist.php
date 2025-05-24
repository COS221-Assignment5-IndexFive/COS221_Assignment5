<?php

session_start();


function addToWatchlist($db,$input){
    global $user_id;
    try{
        $stmt=$db->prepare("
            INSERT IGNORE INTO watchlist (user_id, product_id)
            VALUES (?, ?)
        ");
        $stmt->execute([$user_id,$input['product_id']]);
        sendResponse(true,null,"Product added to wathclist", 200);
    }catch(PDOException $e){
        sendResponse(false, null, "Error adding to watchlist: " . $e->getMessage(), 500);
    }
}

function getWatchlist($db){
    global $user_id;
    try{
        $stmt=$db->prepare("
            SELECT p.* FROM products p
            JOIN watchlist w ON p.products_id
            WHERE w.user_id = ?
        ");
        $stmt->execute([$user_id]);
        $watchlist=$stmt->fetchAll("PDI::FETCH_ASSOC");
        sendResponse(true,$watchlist,"watchlist fetched",200);
    }catch(PDOException $e){
        sendResponse(false, null, "Error fetching to watchlist: " . $e->getMessage(), 500);
    }
}

function removeFromWatchlist($db,$input){
    global $user_id;
    try {
        $stmt = $db->prepare("
            DELETE FROM watchlist
            WHERE user_id = ?
            AND product_id = ?
        ");
        $stmt->execute([$user_id, $input['product_id']]);
        sendResponse(true, null, "Product removed from watchlist", 200);
    } catch (PDOException $e) {
        sendResponse(false, null, "Error removing from watchlist: " . $e->getMessage(), 500);
    }
}

function sendResponse($success, $data = null, $message = '', $statusCode = 200)
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'statusCode' => $statusCode ,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

?>
