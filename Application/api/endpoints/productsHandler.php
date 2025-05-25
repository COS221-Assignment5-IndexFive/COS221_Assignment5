<?php
function productAuth() {
    if (!isset($_SESSION["user_id"])) {
        sendResponse(false,null,"Access denied :(", 403);
    }

    if (($_SESSION["user_type"] == "admin" || $_SESSION["user_type"] == "retailer")) {
        sendResponse(false,null,"Unorthorised user :(",401);
    }
}

function addProduct($db,$input){
    #product id is auto incriment
    productAuth();
    try{
        $stmt = $db->prepare("
            INSERT INTO products
            (rating, title, image_url, product_link, price, discount_price, nr_reviews, category, retailer)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param("dsssddiss", $input['rating'], $input['title'], $input['image_url'], $input['product_link'],
        $input['price'], $input['discount_price'], $input['nr_reviews'], $input['category'], $input['retailer']);
        $stmt->execute();
        $stmt->close();
        sendResponse(true, null, 'Product added successfully.', 200);
    } catch (PDOException $e) {
        sendResponse(false, null, 'Product not added: ' . $e->getMessage(), 500);
    }
}

function deleteProduct($db,$input){
    productAuth();
    try{
        $stmt=$db->prepare("DELETE FROM products WHERE product_id = ?");
        $stmt->execute([$input['product_id']]);
        sendResponse(true, null, 'Product deleted successfully.', 200);
    } catch (PDOException $e) {
        sendResponse(false, null, 'Product not deleted: ' . $e->getMessage(), 500);
    }
}


function updateProduct($db,$input){
    // productAuth();
    try{
        $stmt = $db->prepare("
            UPDATE products
            SET rating = ?, title = ?, image_url = ?, product_link = ?, price = ?, discount_price = ?, nr_reviews = ?, category = ?, retailer = ?
            WHERE product_id = ?
        ");
        // Assuming $db is a MySQLi connection
        $stmt->bind_param(
            "dsssddissi",
            $input['rating'],
            $input['title'],
            $input['image_url'],
            $input['product_link'],
            $input['price'],
            $input['discount_price'],
            $input['nr_reviews'],
            $input['category'],
            $input['retailer'],
            $input['product_id']
        );
        $stmt->execute();
        $stmt->close();
        sendResponse(true, null, 'Product updated successfully.', 200);
    } catch (Exception $e) {
        sendResponse(false, null, 'Product not updated: ' . $e->getMessage(), 500);
    }
}
?>
