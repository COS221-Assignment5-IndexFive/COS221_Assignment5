<?php

session_start();

$user_id=$_SESSION['user_id'] ?? null;
if(!$user_id){
    sendResponse(false,null,"Unorthorised user :(",401);
}

function addToWatchlist($db,$input){
    global $user_id;
    $product_id=$input['product_id']??null;
    if(!$product_id){
        sendResponse(false,null,"Product ID missing", 400);
    }
    $stmt=mysqli_prepare($db,"
        INSERT IGNORE INTO watchlist (user_id, product_id) 
        VALUES (?, ?)
    ");
    if(!$stmt){
        sendResponse(false,null,"Prepare failed: ".mysqli_error($db), 500);
    }
    mysqli_stmtbind_param($stmt, "ii",$user_id,$product_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    sendResponse(true,null,"Product added to wathclist :)", 200);
}

function getWatchlist($db){
    global $user_id;
    $stmt=mysqli_prepare($db,"
        SELECT p.* FROM products p
        JOIN watchlist w ON p.products_id
        WHERE w.user_id = ?
    ");
    if(!$stmt){
        sendResponse(false,null,"Prepare failed: ".mysqli_error($db), 500);
    }
    mysqli_stmtbind_param($stmt, "ii",$user_id,$product_id);
    mysqli_stmt_execute($stmt);
    $result=mysqli_stmt_get_result($stmt);
    $watchlist=[];
    while($row=mysqli_fetch_getResult($stmt)){
        $watchlist[]=$row;
    }
    mysqli_stmt_close($stmt);
    sendResponse(true,$watchlist,"watchlist fetched :)",200);
}

function removeFromWatchlist($db,$input){
    global $user_id;
    $stmt = $db->prepare("
        DELETE FROM watchlist 
        WHERE user_id = ? 
        AND product_id = ?
    ");
    if(!$stmt){
        sendResponse(false,null,"Prepare failed: ".mysqli_error($db), 500);
    }
    mysqli_stmtbind_param($stmt, "ii",$user_id,$product_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    sendResponse(true, null, "Product removed from watchlist :)", 200);
}

//stolen from @morgan
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