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
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
  <link rel="stylesheet" href="../../css/administrator_view/user_detail.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

 <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card user-detail">
      <div class="panel-header">
        <h2>User Details</h2>
      </div>
      <!-- Error message section -->
      <div class="error-message user-not-found hidden">
        <span class="material-icons">error_outline</span>
        <p>User not found. Please check the ID and try again.</p>
      </div>

      <!-- Details form (shown when user exists) -->
      <form class="form-grid user-form">
        <div class="form-group">
          <label for="user-id">ID</label>
          <input type="text" id="user-id" name="user-id" value="1" readonly />
        </div>
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" value="Jane" />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" value="Doe" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="jane@example.com" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value="+1234567890" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">save</span> Save Changes</button>
          <button type="button" class="btn btn-danger"><span class="material-icons">delete</span> Delete User</button>
        </div>
      </form>
    </section>
  </main>
  <script src="../../js/administrator_view/single_user_view.js"></script>
</body>
</html>
