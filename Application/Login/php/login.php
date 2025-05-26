<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Login</title> 
        <link rel = "stylesheet" type = "text/css" href = "../css/login.css">
        <script type = "text/javascript" src = "../js/login.js"></script>
    </head>
    
    <body>
        <?php include '../../Header/php/header.php';?>
        <?php include "spinner.php";?>
        <div class="signup-main">
            <form id="loginForm">
                <div class="input-container">
                    <h1>Login</h1>
                    <input id="email" type="email" name="email" placeholder="Email" required>
                    <input id="password" type="password" name="password" placeholder="Password" required>
                    <div id="loginError" class="login-error"></div>
                    <button id="submit" type="submit">Login</button>
                </div>
            </form>
        </div>
    </body>
</html>