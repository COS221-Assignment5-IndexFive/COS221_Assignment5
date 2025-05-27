<?php
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product View</title>
    <link rel="stylesheet" href="../css/product.css">
    <script>
        const USER_ID = <?php echo json_encode($user_id); ?>;
    </script>
    <script type="module" src="../js/product.js"></script>
</head>
<body>
    <?php include "spinner.php";?>
    <div class="page-container">
        <div class="main-flex">
            <div class="product-main">
                <div class="product-image-area"></div>
                <div class="product-info-area"></div>
            </div>
            <aside class="similar-panel">
                <h2>Other Retailers</h2>
                <ul class="similar-list">
                    <!-- <li class="similar-item">
                        <div class="sim-info">
                            <div class="sim-title">Similar 1</div>
                            <div class="sim-retailer">Retailer A</div>
                        </div>
                        <div class="sim-price">
                            <span class="arrow cheaper">▼</span>
                            <span>$179.00</span>
                        </div>
                    </li> -->
                </ul>
            </aside>
        </div>
        <section class="reviews-panel">
            <div class="review-list-container">
                <h2>Customer Reviews</h2>
                <div class="review-list"></div>
            </div>
            <div class="review-form-container">
                <form class="review-form">
                    <h3>Add a Review</h3>
                    <div class="form-group">
                        <label for="reviewer">Name</label>
                        <input id="reviewer" type="text" required>
                    </div>
                    <div class="form-group">
                        <label for="review-text">Review</label>
                        <textarea id="review-text" rows="3" required></textarea>
                    </div>
                    <div class="form-group rating-input">
                        <label>Rating</label>
                        <span class="star-rating">
                            <input type="radio" id="star5" name="rating" value="5"><label for="star5">&#9733;</label>
                            <input type="radio" id="star4" name="rating" value="4"><label for="star4">&#9733;</label>
                            <input type="radio" id="star3" name="rating" value="3"><label for="star3">&#9733;</label>
                            <input type="radio" id="star2" name="rating" value="2"><label for="star2">&#9733;</label>
                            <input type="radio" id="star1" name="rating" value="1"><label for="star1">&#9733;</label>
                        </span>
                    </div>
                    <button type="submit" class="submit-review">Submit Review</button>
                </form>
            </div>
        </section>
    </div>
</body>
</html>