<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Retailers Management</title>

  <!-- Google Fonts and Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../css/main.css" />

</head>
<body>
  <?php include 'sidebar.php';?>
  <!-- Main Content -->
  <main class="content">
    <section id="retailers" class="panel glass-card">
      <div class="panel-header">
        <h2>Retailers</h2>
        <div class="panel-actions">
          <input class="search-input" type="text" placeholder="Search retailers..." />
          <button class="btn btn-primary" onclick="window.location.href='add_retailer.php'"><span class="material-icons">storefront</span> Add Retailer</button>
        </div>
      </div>
      <table id="dt-retailers" class="data-table">
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 90%;">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
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
  <script src="../js/populate_tables.js"></script>
  <script src="../js/index.js"></script>
</body>
</html>
