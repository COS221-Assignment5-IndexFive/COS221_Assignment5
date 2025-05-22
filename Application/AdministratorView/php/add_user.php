<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add New User</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="stylesheet" href="../css/add_user.css" />
  <link rel="stylesheet" href="../css/messages.css" />

</head>
<body>
  <?php include 'sidebar.php';?>
  <div class="alert-container">
    <?php include "add_alerts.php"?>
  </div>
  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card add-user">
      <div class="panel-header">
        <h2>Add New User</h2>
      </div>
      <form class="form-grid" id="add-user-form">
        <div class="form-group" id="fg-first-name">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" placeholder="Enter first name" required />
          <div class="error-message">
            Please enter a valid first name.
          </div>
        </div>
        <div class="form-group" id="fg-last-name">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" placeholder="Enter last name" required />
          <div class="error-message">
            Please enter a valid last name.
          </div>
        </div>
        <div class="form-group" id="fg-email">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email address" required />
          <div class="error-message">
            Please enter a valid email.
          </div>
        </div>
        <div class="form-group" id="fg-phone">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter phone number" required />
          <div class="error-message">
            Please enter a valid phone number.
          </div>
        </div>
        <div class="form-group" id="fg-passwd">
          <label for="passwd">Password</label>
          <input type="password" id="passwd" name="passwd" placeholder="Enter user password" required />
          <div class="error-message">
            Please enter a valid password.
          </div>
        </div>
        <input type="hidden" id="add-type" name="type" value="user"> 
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">person_add</span> Add User</button>
          <button type="button" class="btn btn-secondary" onclick="window.location.href='user_view.php'"><span class="material-icons">cancel</span> Cancel</button>
        </div>
      </form>
    </section>
  </main>
  <script type="module" src="../js/add_user_retailer.js"></script>
</body>
</html>
