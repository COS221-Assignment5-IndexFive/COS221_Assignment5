<?php 
    $pageTitle = "Login";
    // include 'header.php'; 
?>
        <link rel = "stylesheet" type = "text/css" href = "../css/login.css">
        <script type = "text/javascript" src = "../js/login.js"></script>

         <form id="loginForm">
            <div class=input-container>
                <h1>Login</h1>
                <input id="email" type="email" name="email" placeholder="Email" required>
                <input id="password" type="password" name="password" placeholder="Password" required>
                <button id="submit" type="submit">Login</button>
            </div>
        </form> 
    </body>
</html>