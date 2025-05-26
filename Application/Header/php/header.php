<?php
if (session_status() === PHP_SESSION_NONE) 
{
  session_start();
}
?>

<link rel="stylesheet" href="../../Header/css/header.css">
<nav class="top-nav">
  <div class="nav-wrapper">
    <?php if (isset($_SESSION['user_id'])): ?>
      <a href="../../CustomerView/php/customer.php" class="nav-logo">CompareIt</a>
    <?php else: ?>
      <span class="nav-logo" style="cursor: default; color: #6366f1;">CompareIt</span>
    <?php endif; ?>
    <div class="nav-links">
      <?php if (isset($_SESSION['user_id'])): ?>
        <a href="../../WatchlistView/php/watchlist.php">Watchlist</a>
        <a href="../../Header/php/logout.php" class="logout-btn">Logout</a>
      <?php else: ?>
        <a href="../../Login/php/login.php">Login</a>
        <a href="../../Signup/php/signup.php">Sign Up</a>
      <?php endif; ?>
    </div>
  </div>
</nav>