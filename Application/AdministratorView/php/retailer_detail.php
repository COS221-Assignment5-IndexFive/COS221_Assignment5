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
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="stylesheet" href="../css/messages.css" />
  <link rel="stylesheet" href="../css/retailer_detail.css" />
</head>
<body>
  <?php include 'sidebar.php';?>
  <div class="alert-container">
    <?php include "update_alerts.php"?>
    <?php include "delete_alerts.php"?>
  </div>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card retailer-detail">
      <div class="panel-header">
        <h2>Retailer Details</h2>
      </div>
      <!-- Error message section -->
      <div class="error-message-id retailer-not-found hidden">
        <span class="material-icons">error_outline</span>
        <p>Retailer not found. Please check the ID and try again.</p>
      </div>
      <!-- Details form (shown when retailer exists) -->
      <form class="form-grid retailer-form" id="change-retailer-form">
        <div class="form-group">
          <label for="retailer-id">ID</label>
          <input type="text" id="retailer-id" name="retailer-id" value="201" readonly />
        </div>
        <div class="form-group" id="fg-first-name">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" value="John" />
          <div class="error-message">
            Please enter a valid first name.
          </div>
        </div>
        <div class="form-group" id="fg-last-name">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" value="Smith" />
          <div class="error-message">
            Please enter a valid last name.
          </div>
        </div>
        <div class="form-group" id="fg-email">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="john.smith@retailer.com" />
          <div class="error-message">
            Please enter a valid email.
          </div>
        </div>
        <div class="form-group" id="fg-phone">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value="+1234567890" />
          <div class="error-message">
            Please enter a valid phone number.
          </div>
        </div>
        <div class="form-group" id="fg-retailer">
          <label for="retailer-name">Retailer Name</label>
          <input type="text" id="retailer-name" name="retailer-name" value="Retail Co." />
          <div class="error-message">
            Please enter a valid retailer name.
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">save</span> Save Changes</button>
          <button type="button" class="btn btn-danger" id="delete-btn"><span class="material-icons">delete</span> Delete Retailer</button>
        </div>
      </form>
      <table class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 60%;">
          <col style="width: 30%;">
        </colgroup>
      </table>
    </section>
  </main>

  <script type="module" src="../js/retailer_details.js"></script>
  <script src="../js/index.js"></script>
</body>
</html>
