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
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
  <link rel="stylesheet" href="../../css/administrator_view/add_user.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card add-user">
      <div class="panel-header">
        <h2>Add New User</h2>
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
        <div class="form-actions">
          <button type="submit" class="btn btn-primary"><span class="material-icons">person_add</span> Add User</button>
          <button type="button" class="btn btn-secondary" onclick="window.location.href='user_view.php'"><span class="material-icons">cancel</span> Cancel</button>
        </div>
      </form>
    </section>
  </main>
</body>
</html>
