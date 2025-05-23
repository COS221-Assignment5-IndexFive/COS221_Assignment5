<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Users Management</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../css/main.css" />
</head>
<body>
  <?php include 'sidebar.php';?>
  <?php include "spinner.php";?>

  <!-- Main Content -->
  <main class="content">
    <section id="users" class="panel glass-card">
      <div class="panel-header">
        <h2>Users</h2>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search users..." id="user-search" />
          <button class="btn btn-primary" onclick="window.location.href='add_user.php'"><span class="material-icons">person_add</span> Add User</button>
        </div>
      </div>
      <table id="dt-users" class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 45%;">
          <col style="width: 45%;">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>
  </main>
  <script type="module" src="../js/populate_tables.js"></script>
  <script src="../js/index.js"></script>
</body>
</html>
