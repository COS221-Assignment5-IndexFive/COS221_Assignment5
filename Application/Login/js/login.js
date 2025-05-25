function showLoadingScreen() 
{
    /*
        Shows the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("spinner").classList.add("visible");
}

function hideLoadingScreen() 
{
    /*
        Hides the loading spinner overlay.
    */
    document.getElementById("spinner").classList.remove("visible");
    document.getElementById("spinner").classList.add("hidden");
}

function validateEmail()
{
    /*
        Validates the email input field.
        Checks if the email is in a valid email format.
        Sets the border color to red if invalid, default if valid or empty.
    */
    var emailField = document.getElementById("email");
    var trimmedEmail = emailField.value.trim();
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = emailRegEx.test(trimmedEmail);

    if(trimmedEmail === "") 
    {
        emailField.style.borderColor = "#ccc";
    }
    else if(valid == false) 
    {
        emailField.style.borderColor = "red";
    }
    else 
    {
        emailField.style.borderColor = "#ccc";
    }

    return valid;
}

function validatePassword()
{
    /*
        Validates the password input field.
        Checks if the password is at least 8 characters long and contains
        uppercase, lowercase, a digit, and a special character.
        Sets the border color to red if invalid, default if valid or empty.
    */
    var passwordField = document.getElementById("password");
    var trimmedPassword = passwordField.value.trim();
    var passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/; 
    var valid = passwordRegEx.test(trimmedPassword);

    if(trimmedPassword === "") 
    {
        passwordField.style.borderColor = "#ccc";
    }
    else if(valid == false) 
    {
        passwordField.style.borderColor = "red";
    }
    else 
    {
        passwordField.style.borderColor = "#ccc";
    }

    return valid;
}

function determineView(type)
{
    /*
        Determines the location the user is sent to after registration (Customer/ Retailer view).
        Sends the user to that location.
    */
    if(type == "user")
    {
        window.location.href = "../../CustomerView/php/customer.php";
    }
    else if(type == "retailer")
    {
        window.location.href = "../../RetailerView/php/index.php";
    }
    else if(type == "admin")
    {
        window.location.href = "../../AdministratorView/php/index.php";
    }
}

window.onload = function()
{
    /*
        Initializes event listeners for validation and form submission.
        Handles real-time validation, border highlighting on blur,
        and AJAX form submission with response handling.
    */
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");
    var submitButton = document.getElementById("submit");

    function validateInput() 
    {
        var emailValid = validateEmail();
        var passwordValid = validatePassword();

        if(emailValid && passwordValid) 
        {
            submitButton.disabled = false;
        } 
        else 
        {
            submitButton.disabled = true;
        }
    }

    emailField.addEventListener("input", validateInput);
    passwordField.addEventListener("input", validateInput);

    emailField.addEventListener("blur", function() 
    {
        if (emailField.value.trim() !== "") 
        {
            validateEmail();
        }
        else 
        {
            emailField.style.borderColor = "#ccc";
        }
    });
    passwordField.addEventListener("blur", function() 
    {
        if (passwordField.value.trim() !== "") 
        {
            validatePassword();
        }
        else 
        {
            passwordField.style.borderColor = "#ccc";
        }
    });

    document.getElementById('loginForm').addEventListener('submit', function(event)
    {
        event.preventDefault();
    
        var data = 
        {
            type: "Login",
            email: emailField.value,
            password: passwordField.value,
        };
        
        showLoadingScreen();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/api.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function() 
        {
            if (xhr.readyState == 4) 
            {
                hideLoadingScreen();
                
                try 
                {
                    var response = JSON.parse(xhr.responseText);
    
                    if (response.success == true) 
                    {
                        determineView(response.data.user_type);
                    }
                    else
                    {
                        var errorDiv = document.getElementById("loginError");
                        errorDiv.textContent = response.message || "Incorrect email or password.";
                        errorDiv.style.display = "block";
                    }
                } 
                catch (e) 
                {
                    console.error("Parsing error:", e);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    });
}