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
  <link rel="stylesheet" href="../../css/administrator_view/main.css" />
</head>
<body>
  <?php include 'sidebar.php';?>

  <!-- Main Content -->
  <main class="content">
    <section class="panel glass-card">
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
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr class="clickable-row-user" data-href="#">
            <td>1</td>
            <td>Jane Doe</td>
            <td>jane@example.com</td>
          </tr>
          <!-- Repeat rows dynamically -->
        </tbody>
      </table>
    </section>
  </main>
  <script src="../../js/administrator_view/index.js"></script>
</body>
</html>
