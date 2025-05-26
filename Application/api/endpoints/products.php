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
    if(empty($input['product_id'])){//if there is no product id you cannot get the product
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
    try{
        $query = $db->query("SELECT DISTINCT category FROM products ORDER BY category ASC");
        if($query){
            $categories=[];
            while($row=$result->fetch_assoc()){
                $categories[]=$row['category'];
            }
            sendResponse(true, $categories,"Categories fetched :)", 200);
        }
    }catch(PDOException $e){
        sendResponse(false,null,"Error: ". $e->getMessage(),500);
    }
}

function getComparisonsByCategory($db,$input){
    try{
        $user_id=$_SESSION['user_id']??'';
        if(!$user_id){
            sendResponse(false,null,"Unorthorised user :(",401);
        }
        $title=$input['title']??'';
        if(empty($title)){
            sendResponse(false, null,"Product title not foud to perform comparison :(",400);
        }
        $words=explode(" ",$title);
        $search="%".implode("%",$words)."%";
        $stmt=$db->prepare("SELECT * FROM products WHERE title LIKE ? AND retailer_id!=?");
        $stmt->bind_param("si",$search,$user_id);
        $stmt->execute();
        $res=$stmt->get_result();
        //if no products are found, shorten the search till you can find multiple options
        while($res->num_rows===0 && count($words)>1){
            array_pop($words);//get rid of last word
            $search="%".implode("%",$words)."%";//update search
            $stmt->bind_param("si",$search,$user_id);
            $stmt->execute();
            $res=$stmt->get_result();
        }
        if($res->num_rows>0){
            $prods=[];
            while($row=$res->fetch_assoc()){
                $prods[]=$row;
            }
            sendResponse(true,$prods,"Products fetched successfully :)",200);
        }else{
            sendResponse(false,null,"No comparable products found :(",404);
        }
    }catch(PDOException $e){
        sendResponse(false,null,"Error fetching products for comparison: ".$e.getMessage(),500);
    }
}
?>