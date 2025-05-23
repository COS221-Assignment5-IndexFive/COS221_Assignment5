<?php
session_start();
//any users can use these functions
function getProducts($db,$input){
    
    $query="SELECT * FROM products";
    $filters=[];
    $parameters=[];
    $types="";
    if(!empty($input['category'])){
        $filters[]="category = ?";
        $parameters[]=$input['category'];
        $types="s";
    }
    if(!empty($input['min_price'])){
        $filters[]="price >= ?";
        $parameters[]=$input['min_price'];
        $types="d";
    }
    if(!empty($input['max_price'])){
        $filters[]="price <= ?";
        $parameters[]=$input['max_price'];
        $types="d";
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
    if(!$stmt){
        sendResponse(false,null,"Products not fetched :".$db->error,500);
    }
    if(!empty($parameters)){
        $stmt->bind_param($types,...$parameters);
    }
    $stmt->execute();
    $result=$stmt->get_result();
    $products=$result->fetch_All(MYSQLI_ASSOC);
    sendResponse(true,$products,"Products fetched :)",200);
    
}

function getProductByID($db,$input){
    if(empty($input['prodict_id'])){//if there is no product id you cannot get the product
        sendResponse(false,null,"Product id is invalid",400);
    }
    
    $stmt=$db->prepare("SELECT * FROM products WHERE product_id = ?");
    $stmt->bind_param("i",$input['product_id']);
    $stmt->execute();
    $result=$stmt->get_result();
    $product=$result->fetch_assoc();
    if($product){
        sendResponse(true,$product,"Product found :)",200);
    }else{
        sendResponse(false,null,"Product not found :( ",404);
    }    
}

function getCategories($db,$input){
    
    $query = $db->query("SELECT DISTINCT category FROM products ORDER BY category ASC");
    $result = $db->query($query);
    if($result){
        $categories=[];
        while($row=$result->fetch_assoc()){
            $categories[]=$row['category'];
        }
        sendResponse(true, $categories,"Categories fetched :)", 200);
    }else{
        sendResponse(false,null,"Error: ". $e->getMessage(),500);
    }
}
?>