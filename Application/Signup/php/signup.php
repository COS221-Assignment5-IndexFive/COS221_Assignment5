<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sign Up</title> 
        <link rel = "stylesheet" type = "text/css" href = "../css/signup.css">
        <script type = "text/javascript" src = "../js/signup.js"></script>
    </head>
    
    <body>
        <?php include "spinner.php";?>
        <form id="signupForm">
            <div class="input-container">
                <h1>Sign Up</h1>
                <input id="name" type="text" name="name" placeholder="Name" required>
                <input id="surname" type="text" name="surname" placeholder="Surname" required>
                <input id="phone" type="text" name="phone" placeholder="Phone number" required>
                <input id="email" type="email" name="email" placeholder="Email" required>
                <input id="password" type="password" name="password" placeholder="Password" required>
                <div id="signupError" class="signup-error"></div>
                <button id="submit" type="submit">Sign Up</button>
            </div>
        </form>
    </body>
</html>