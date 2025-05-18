<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Retailer Details</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheets -->
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
  <link rel="stylesheet" href="../../css/administrator_view/product_details.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card retailer-detail">
      <div class="panel-header">
        <h2>Retailer Details</h2>
      </div>
      <!-- Error message section -->
      <div class="error-message retailer-not-found hidden">
        <span class="material-icons">error_outline</span>
        <p>Retailer not found. Please check the ID and try again.</p>
      </div>
      <!-- Details form (shown when retailer exists) -->
      <form class="form-grid retailer-form">
        <div class="form-group">
          <label for="retailer-id">ID</label>
          <input type="text" id="retailer-id" name="retailer-id" value="201" readonly />
        </div>
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" value="John" />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" value="Smith" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="john.smith@retailer.com" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value="+1234567890" />
        </div>
        <div class="form-group">
          <label for="retailer-name">Retailer Name</label>
          <input type="text" id="retailer-name" name="retailer-name" value="Retail Co." />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">save</span> Save Changes</button>
          <button type="button" class="btn btn-danger"><span class="material-icons">delete</span> Delete Retailer</button>
        </div>
      </form>

      <div class="count-display">Total Products: <span id="product-count">0</span></div>
      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 60%;">
          <col style="width: 30%;">
        </colgroup>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Price</th></tr>
        </thead>
        <tbody>
          <tr class="clickable-row" data-href="#">
            <td>301</td>
            <td>Ergonomic Chair</td>
            <td>$149.99</td>
          </tr>
          <tr class="clickable-row" data-href="#">
            <td>302</td>
            <td>Desk Lamp</td>
            <td>$39.99</td>
          </tr>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>
  </main>

  <!-- JS: count and clickable rows -->
  <script src="../../js/administrator_view/retailer_details.js"></script>
</body>
</html>
