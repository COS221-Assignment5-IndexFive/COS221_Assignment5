<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add New Product</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="stylesheet" href="../css/add_products.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card add-product">
      <div class="panel-header">
        <h2>Add New Product</h2>
      </div>
      <form class="form-grid" id="add-product-form">
        <div class="form-group" id="fg-title">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Enter product title" required/>
          <div class="error-message">
            Please enter a valid product title.
          </div>
        </div>
        <div class="form-group" id="fg-price">
          <label for="price">Price</label>
          <input type="number" step="0.01" id="price" name="price" placeholder="Enter price" required/>
          <div class="error-message">
            Please enter a valid product price.
          </div>
        </div>
        <div class="form-group" id="fg-discount-price">
          <label for="discounted-price">Discounted Price</label>
          <input type="number" step="0.01" id="discounted-price" name="discounted-price" placeholder="Enter discounted price or leave blank" />
          <div class="error-message">
            Please enter valid product price.
          </div>
        </div>
        <div class="form-group" id="fg-image-url">
          <label for="image-url">Image URL</label>
          <input type="url" id="image-url" name="image-url" placeholder="Enter image URL" required/>
          <div class="error-message">
            Please enter a valid Image URL.
          </div>
        </div>
        <div class="form-group" id="fg-product-link">
          <label for="product-link">Product Link</label>
          <input type="url" id="product-link" name="product-link" placeholder="Enter product link" required />
          <div class="error-message">
            Please enter a valid product link.
          </div>
        </div>
        <div class="form-group" id="fg-num-reviews">
          <label for="num-reviews">Number of Reviews</label>
          <input type="number" id="num-reviews" name="num-reviews" placeholder="Enter number of reviews" />
          <div class="error-message">
            Please enter a valid number of reviews.
          </div>
        </div> 
        <div class="form-group" id="fg-rating">
          <label for="rating">Average Rating</label>
          <input type="number" step="0.1" id="rating" name="rating" placeholder="Enter rating (e.g., 4.5)" />
          <div class="error-message">
            Please enter a valid rating.
          </div>
        </div>
        <div class="form-group" id="fg-category">
        <label for="category-select">Category</label>

        <select id="category-select" name="category">
          <option value="" disabled selected>Select a category</option>
          <option value="Laptops">Laptops</option>
          <option value="Desktop Computers">Desktop Computers</option>
          <option value="Tablets">Tablets</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Monitors">Monitors</option>
          <option value="Keyboards & Computer Mice">Keyboards & Computer Mice</option>
          <option value="Headphones & Earbuds">Headphones & Earbuds</option>
          <option value="add_new">Add new category</option>
        </select>

        <!-- Hidden until "Add new category" is chosen -->
        <input
          type="text"
          id="new-category"
          name="new_category"
          placeholder="Enter new category"
          style="display: none; margin-top: 0.5rem;"
        />

        <div class="error-message">
          Please enter a valid product category.
        </div>

      </div>
        <div class="form-group" id="fg-retailer">
          <label for="retailer-select">Retailer</label>
          <select id="retailer-select" name="retailer">
            <option value="" disabled selected>Select a retailer</option>
            <option value="Retailer A">Retailer A</option>
            <option value="Retailer B">Retailer B</option>
            <option value="Retailer C">Retailer C</option>
          </select>
          <div class="error-message">
            Please select a retailer.
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">add_shopping_cart</span> Add Product</button>
          <button type="button" class="btn btn-secondary" onclick="window.location.href='index.php'"><span class="material-icons">cancel</span> Cancel</button>
        </div>
      </form>
    </section>
  </main>
  <script src="../js/add_product.js"></script>
</body>
</html>
