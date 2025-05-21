<?php
session_start();
//any users can use these functions
function getProducts($db,$input){
    try{
        $query="SELECT * FROM products";
        $filters=[];
        $parameters=[];
        if(!empty($input['category'])){
            $filters[]="category = ?";
            $parameters[]=$input['category'];
        }
        if(!empty($input['min_price'])){
            $filters[]="price >= ?";
            $parameters[]=$input['min_price'];
        }
        if(!empty($input['max_price'])){
            $filters[]="price <= ?";
            $parameters[]=$input['max_price'];
        }
        if(!empty($filters)){
            $query.= "WHERE ". implode(" AND ",$filters);
        }
        if(!empty($input['sort_by'])){
            $allowedSorts=['price','rating','nr_reviews'];//only allowing to sort by these, the others seem unneseary
            if(in_array($input['sort_by'],$allowedSorts)){
                $order=strtoupper($input['order']??'ASC');//ensures it is always uppercase
                $order=($order==='DESC')?'DESC':'ASC';
                $query.=" ORDER BY {$input['sort_by']} $order";
            }
        }
        $stmt=$db->prepare($query);
        $stmt->execute($parameters);
        $products=$stmt->fetchAll(PDO::FETCH_ASSOC);
        sendResponse(true,$products,"Products fetched :)",200);
    }catch(PDOException $e){
        sendResponse(false,null,"Products not fetched :".$e->getMessage(),500);
    }
}

function getProductByID($db,$input){
    if(empty($input['prodict_id'])){//if there is no product id you cannot get the product
        sendResponse(false,null,"Product id is invalid",400);
    }
    try{
        $stmt=$db->prepare("SELECT * FROM products WHERE product_id = ?");
        $stmt->execute([$input['product_id']]);
        $product=$stmt->fetch(PDO::FETCH_ASSOC);
        if($product){
            sendResponse(true,$product,"Product found :)",200);
        }else{
            sendResponse(false,null,"Product not found :( ",404);
        }
    }catch(PDOException $e){
        sendResponse(false,null,"Error:".$e->getMessage(),500);
    }
}

function getCategories($db,$input){
    try {
        $stmt = $db->query("SELECT DISTINCT category FROM products ORDER BY category ASC");
        $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
        sendResponse(true, $categories,"Categories fetched :)", 200);
    } catch(PDOException $e){
        sendResponse(false,null,"Error: ". $e->getMessage(),500);
    }
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