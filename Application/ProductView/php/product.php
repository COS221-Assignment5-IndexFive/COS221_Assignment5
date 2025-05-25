<?php
    $productId = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$productId) {
        echo "Invalid Product ID.";
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Details</title>
    <link rel="stylesheet" type="text/css" href="../css/product.css">
    <script type="text/javascript">
        const PRODUCT_ID = <?php echo json_encode($productId); ?>;
    </script>
    <script type="text/javascript" src="../js/product.js" defer></script>
</head>
<body>
    <div class="product-detail-container" id="productDetailContainer">
        <div id="spinner" class="spinner-section visible">Loading...</div>
    </div>
    <div class="full-wrapper">
        <div class="review-cont">
            <div class="review-section">
            <h2 class="reviewH">
                Leave a Review 
            </h2>
        
            <form id="reviewForm">
        
                <textarea id="reviewText" placeholder="Write your review..." required></textarea>
                <div id="card-cont">
                    <div class="card">
                        <span onclick="gfg(1)" 
                              class="star">★
                        </span>
                        <span onclick="gfg(2)" 
                              class="star">★
                        </span>
                        <span onclick="gfg(3)" 
                              class="star">★
                        </span>
                        <span onclick="gfg(4)" 
                              class="star">★
                        </span>
                        <span onclick="gfg(5)" 
                              class="star">★
                        </span>
                    </div>
                </div>
        
                <button type="submit">Submit Review</button>
            </form>
        
            <div class="review-display">
            <h2 class="reviewH">User Reviews <span id="reviewCount">(0)</span></h2>
            <div id="userReviews">
            </div>
        </div>
    </div>
</div>
<div class="retailers-compare"></div>

</div>


</body>
</html>
