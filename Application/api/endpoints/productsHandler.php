<?php
//only admin and retailers can do these
session_start();

$user_id=$_SESSION['user_id'] ?? null;
if(!$user_id){
    sendResponse(false,null,"Unorthorised user :(",401);
}

//gets at least 1 administrator or retailer
$check_user=$db->prepare("
    SELECT 1 FROM administrator WHERE user_id = ?
    UNION
    SELECT 1 FROM retailers WHERE retailer_id = ?
");
$check_user->execute([$user_id,$user_id]);
if(!$check_user->fetchColumn()){
    sendResponse(false,null,"Access denied :(", 403);
}


function addProduct($db,$input){
    #product id is auto incriment
    try{
        $stmt=$db->prepare("
            INSERT INTO PRODUCTS
            (rating,title,image_url,product_link,price,discount_price,nr_reviews,category)
            VALUES(?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([
            $input['rating'],
            $input['title'],
            $input['image_url'],
            $input['product_link'],
            $input['price'],
            $input['discount_price'],
            $input['nr_reviews'],
            $input['category']
        ]);
        sendResponse(true, null ,'Product added successfully.',200);
    }catch(PDOException $e){
        sendResponse(false, null,'Product not added: ' . $e->getMessage(), 500);
    }
}

function deleteProduct($db,$input){
    try{
        $stmt=$db->prepare("DELETE FROM products WHERE product_id = ?");
        $stmt->execute([$input['product_id']]);
        sendResponse(true, null,'Product deleted successfully.',200);
    }catch(PDOException $e){
        sendResponse(false, null,'Product not deletd: ' . $e->getMessage(),500);
    }
}

function updateProduct($db,$input){
    try{
        $stmt=$db->prepare("
            UPDATE products
            SET rating = ?, title = ?, image_url = ?, product_link = ?, price = ?, discount_price = ?, nr_reviews= ?, category =?
            WHERE product_id = ?
        ");
        $stmt->execute([
            $input['rating'],
            $input['title'],
            $input['image_url'],
            $input['product_link'],
            $input['price'],
            $input['discount_price'],
            $input['nr_reviews'],
            $input['category'],
            $input['product_id']
        ]);
        sendResponse(true, null,'Product updated successfully.',200);
    }catch(PDOException $e){
        sendResponse(false, null,'Product not added: ' . $e->getMessage(), 500);
    }
}
?>