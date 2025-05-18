<?php 
    $pageTitle = "Sign Up";
    // include 'header.php'; 
?>

        <link rel = "stylesheet" type = "text/css" href = "../css/signup.css">
        <script type = "text/javascript" src = "../js/signup.js"></script>

        <form id="signupForm">
            <div class="input-container">
                <div class="header">
                    <span class="logo">CompareIt</span>
                </div>
                <h1>Sign Up</h1>
                <input id="name" type="text" name="name" placeholder="Name" required>
                <input id="surname" type="text" name="surname" placeholder="Surname" required>
                <input id="email" type="email" name="email" placeholder="Email" required>
                <input id="password" type="password" name="password" placeholder="Password" required>
                <button id="submit" type="submit">Sign Up</button>
            </div>
        </form>
    </body>
</html>