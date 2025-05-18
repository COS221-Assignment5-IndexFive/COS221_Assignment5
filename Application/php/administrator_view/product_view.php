<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Products Management</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card">
      <div class="panel-header">
        <h2>Products</h2>
        <div class="count-display">Total Products: <span id="product-count">0</span></div>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search products..." />
          <button class="btn btn-primary" onclick="window.location.href='add_products.php'"><span class="material-icons">add_shopping_cart</span> Add Product</button>
        </div>
      </div>
      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 45%;">
          <col style="width: 45%;">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="clickable-row-product" data-href="#">
            <td>101</td>
            <td>Wireless Mouse</td>
            <td>$29.99</td>
          </tr>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>
  </main>
  <script src="../../js/administrator_view/index.js"></script>
</body>
</html>