<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../css/main.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <main class="content">
    <!-- Users Section -->
    <section id="users" class="panel glass-card">
      <div class="panel-header">
        <h2>Users</h2>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search users..." />
          <button class="btn btn-primary" onclick="window.location.href='add_user.php'"><span class="material-icons">person_add</span> Add User</button>
        </div>
      </div>
      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 45%;">
          <col style="width: 45%;">
        </colgroup>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          <tr class="clickable-row-user">
            <td>1</td>
            <td>Jane Doe</td>
            <td>jane@example.com</td>
          </tr>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>

    <!-- Products Section -->
    <section id="products" class="panel glass-card">
      <div class="panel-header">
        <h2>Products</h2>
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
          <tr><th>ID</th><th>Title</th><th>Price</th></tr>
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

    <!-- Retailers Section -->
    <section id="retailers" class="panel glass-card">
      <div class="panel-header">
        <h2>Retailers</h2>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search retailers..." />
          <button class="btn btn-primary" onclick="window.location.href='add_retailer.php'"><span class="material-icons">storefront</span> Add Retailer</button>
        </div>
      </div>
      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 90%;">
        </colgroup>
        <thead>
          <tr><th>ID</th><th>Name</th></tr>
        </thead>
        <tbody>
          <tr class="clickable-row-retailer" data-href="#">
            <td>201</td>
            <td>Retail Co.</td>
          </tr>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>
  </main>
  <script src="../js/index.js"></script>
</body>
</html>