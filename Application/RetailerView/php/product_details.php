<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Details</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheets -->
  <link rel="stylesheet" href="../css/retailer.css" />
  <link rel="stylesheet" href="../../AdministratorView/css/messages.css" />
  <link rel="stylesheet" href="../css/product_details.css" />
</head>
<body>
  <div class="alert-container">
    <?php include "../../AdministratorView/php/update_alerts.php"?>
    <?php include "../../AdministratorView/php/delete_alerts.php"?>
  </div>
  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card product-detail">
      <div class="panel-header">
        <h2>Product Details</h2>
      </div>
      <!-- Error message section -->
      <div class="error-message-id product-not-found hidden">
        <span class="material-icons">error_outline</span>
        <p>Product not found. Please check the ID and try again.</p>
      </div>
      <!-- Details form (shown when product exists) -->
      <form class="form-grid product-form" id="change-product-form">
        <div class="form-group">
          <label for="product-id">ID</label>
          <input type="text" id="product-id" name="product-id" value="101" readonly />
        </div>
        <div class="form-group" id="fg-title">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" value="Wireless Mouse" />
          <div class="error-message">
            Please enter a valid title.
          </div>
        </div>
        <div class="form-group" id="fg-price">
          <label for="price">Price</label>
          <input type="number" step="0.01" id="price" name="price" value="29.99" />
        </div>
        <div class="form-group" id="fg-discount-price">
          <label for="discounted-price">Discounted Price</label>
          <input type="number" step="0.01" id="discounted-price" name="discounted-price" placeholder="Enter discount price or leave empty" />
          <div class="error-message">
            Please enter a valid price.
          </div>
        </div>
        <div class="form-group image-group">
          <label>Image</label>
          <div class="image-preview">
            <img src="https://example.com/mouse.jpg" alt="Product Image" id="product-img" />
          </div>
        </div>
        <div class="form-group" id="fg-image-url">
          <label for="image-url">Image URL</label>
          <input type="url" id="image-url" name="image-url" value="https://example.com/mouse.jpg" />
          <div class="error-message">
            Please enter a image URL.
          </div>
        </div>
        <div class="form-group" id="fg-rating">
          <label for="rating">Rating</label>
          <input type="number" step="0.1" id="rating" name="rating" value="4.5" disabled />
        </div>
        <div class="form-group" id="fg-product-link">
          <label for="product-link">Product Link</label>
          <input type="url" id="product-link" name="product-link" value="https://example.com/mouse" />
          <div class="error-message">
            Please enter a valid product link.
          </div>
        </div>
        <div class="form-group" id="fg-num-reviews">
          <label for="num-reviews">Number of Reviews</label>
          <input type="number" id="num-reviews" name="num-reviews" value="120" disabled />
        </div>
        <div class="form-group" id="fg-category">
          <label for="category-select">Category</label>
        <select id="category-select" name="category">
          <option value="" disabled selected>Select a category</option>
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
            Please select a category.
          </div>
</div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">save</span> Save Changes</button>
          <button type="button" class="btn btn-danger" id="delete-btn"><span class="material-icons">delete</span> Delete Product</button>
        </div>
      </form>
    </section>
  </main>
  <script type="module" src="../js/product_details.js"></script>
</body>
</html>
