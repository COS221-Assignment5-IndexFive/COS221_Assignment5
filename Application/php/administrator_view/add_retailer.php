<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add New Retailer</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
  <link rel="stylesheet" href="../../css/administrator_view/add_retailer.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card add-retailer">
      <div class="panel-header">
        <h2>Add New Retailer</h2>
      </div>
      <form class="form-grid">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" placeholder="Enter first name" />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" placeholder="Enter last name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email address" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter phone number" />
        </div>
        <div class="form-group">
          <label for="retailer-name">Retailer Name</label>
          <input type="text" id="retailer-name" name="retailer-name" placeholder="Enter retailer name" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <span class="material-icons">storefront</span> Add Retailer
          </button>
          <button type="button" class="btn btn-secondary" onclick="window.location.href='index.php'">
            <span class="material-icons">cancel</span> Cancel
          </button>
        </div>
      </form>
    </section>
  </main>
</body>
</html>