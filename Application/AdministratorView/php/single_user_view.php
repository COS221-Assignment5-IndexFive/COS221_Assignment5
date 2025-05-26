<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Details</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="stylesheet" href="../css/user_detail.css" />
  <link rel="stylesheet" href="../css/messages.css" />

</head>
<body>
  <?php include 'sidebar.php';?>

 <!-- Main Content -->
  <div class="alert-container">
    <?php include "update_alerts.php"?>
    <?php include "delete_alerts.php"?>
  </div>
  <main class="content">
    <section class="panel glass-card user-detail">
      <div class="panel-header">
        <h2>User Details</h2>
      </div>
      <!-- Error message section -->
      <div class="error-message-id user-not-found hidden">
        <span class="material-icons">error_outline</span>
        <p>User not found. Please check the ID and try again.</p>
      </div>

      <!-- Details form (shown when user exists) -->
      <form class="form-grid user-form" id="change-user-form">
        <div class="form-group" id="fg-id">
          <label for="user-id">ID</label>
          <input type="text" id="user-id" name="user-id" value="1" readonly />
          <div class="error-message">
            Please enter a valid ID.
          </div>
        </div>
        <div class="form-group" id="fg-first-name">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" value="Jane" />
          <div class="error-message">
            Please enter a First Name.
          </div>
        </div>
        <div class="form-group" id="fg-last-name">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" value="Doe" />
          <div class="error-message">
            Please enter a Last Name.
          </div>
        </div>
        <div class="form-group" id="fg-email">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="jane@example.com" />
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
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">save</span> Save Changes</button>
          <button type="button" class="btn btn-danger" id="delete-btn"><span class="material-icons">delete</span> Delete User</button>
        </div>
      </form>
    </section>
  </main>
  <script type="module" src="../js/single_user_view.js"></script>
</body>
</html>
