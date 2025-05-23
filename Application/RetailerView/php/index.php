<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Retailer Dashboard</title>

  <!-- Google Fonts & Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Styles -->
  <link rel="stylesheet" href="../css/retailer.css" />
  <link rel="stylesheet" href="../css/retailer_dashboard.css" />
</head>
<body>
  <?php include '../../Utils/spinner.php' ?>
  <!-- Main Content -->
  <main class="content">
    <section id="products" class="panel glass-card retailer-dashboard">
      <div class="panel-header">
        <h2>My Products</h2>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search products..." id="product-search" />
          <button class="btn btn-primary" id="add-product-btn" onclick="window.location.href='add_products.php'">
            <span class="material-icons">add</span> Add Product
          </button>
        </div>
      </div>

      <div class="count-display">Total Products: <span id="product-count">0</span></div>

      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 50%;">
          <col style="width: 20%;">
          <col style="width: 20%;">
        </colgroup>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr class="clickable-row-product" data-href="#">
            <td>301</td>
            <td>Ergonomic Chair</td>
            <td>$149.99</td>
            <td>
              <button class="btn btn-sm btn-danger"><span class="material-icons">delete</span></button>
            </td>
          </tr>
          <!-- more rows -->
        </tbody>
      </table>
    </section>
  </main>
    <script type="module" src="../js/index.js"></script>
</body>
</html>
