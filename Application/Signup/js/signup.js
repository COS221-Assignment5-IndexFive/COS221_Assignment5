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

function validateName()
{
    /*
        Validates the name input field.
        Checks if the name is at least 2 characters long and contains only letters.
        Sets the border color to red if invalid, default if valid or empty.
    */
    var nameField = document.getElementById("name");
    var trimmedName = nameField.value.trim();
    var nameRegEx = /^[A-Za-z]{2,}$/;
    var valid = nameRegEx.test(trimmedName);

    if(trimmedName === "") 
    {
        nameField.style.borderColor = "#ccc";
    }
    else if(valid == false) 
    {
        nameField.style.borderColor = "red";
    }
    else 
    {
        nameField.style.borderColor = "#ccc";
    }

    return valid;
}

function validateSurname()
{
    /*
        Validates the surname input field.
        Checks if the surname is at least 2 characters long and contains only letters.
        Sets the border color to red if invalid, default if valid or empty.
    */
    var surnameField = document.getElementById("surname");
    var trimmedSurname = surnameField.value.trim();
    var surnameRegEx = /^[A-Za-z]{2,}$/;
    var valid = surnameRegEx.test(trimmedSurname);

    if(trimmedSurname === "") 
    {
        surnameField.style.borderColor = "#ccc";
    }
    else if(valid == false) 
    {
        surnameField.style.borderColor = "red";
    }
    else 
    {
        surnameField.style.borderColor = "#ccc";
    }

    return valid;
}

function validatePhone()
{
    /*
        Validates the phone input field.
        Checks if the phone number contains only digits and is 10-15 characters long.
        Sets the border color to red if invalid, default if valid or empty.
    */
    var phoneField = document.getElementById("phone");
    var trimmedPhone = phoneField.value.trim();
    var phoneRegEx = /^\d{10,15}$/;
    var valid = phoneRegEx.test(trimmedPhone);

    if(trimmedPhone === "") 
    {
        phoneField.style.borderColor = "#ccc";
    }
    else if(valid == false) 
    {
        phoneField.style.borderColor = "red";
    }
    else 
    {
        phoneField.style.borderColor = "#ccc";
    }

    return valid;
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

window.onload = function()
{
    /*
        Initializes event listeners for validation and form submission.
        Handles real-time validation, border highlighting on blur,
        and AJAX form submission with response handling.
    */
    var nameField = document.getElementById("name");
    var surnameField = document.getElementById("surname");
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");
    var cellPhoneField = document.getElementById("phone")
    var submitButton = document.getElementById("submit");
    submitButton.disabled = true;

    function validateInput() 
    {
        var nameValid = validateName();
        var surnameValid = validateSurname();
        var phoneValid = validatePhone();
        var emailValid = validateEmail();
        var passwordValid = validatePassword();

        if(nameValid && surnameValid && emailValid && passwordValid && phoneValid) 
        {
            submitButton.disabled = false;
        } 
        else 
        {
            submitButton.disabled = true;
        }
    }

    nameField.addEventListener("input", validateInput);
    surnameField.addEventListener("input", validateInput);
    emailField.addEventListener("input", validateInput);
    cellPhoneField.addEventListener("input", validateInput);
    passwordField.addEventListener("input", validateInput);

    nameField.addEventListener("blur", function() 
    {
        if (nameField.value.trim() !== "")
        {
            validateName();
        } 
        else
        {   
            nameField.style.borderColor = "#ccc";
        }
    });
    surnameField.addEventListener("blur", function() 
    {
        if (surnameField.value.trim() !== "")
        {
            validateSurname();
        } 
        else
        {
            surnameField.style.borderColor = "#ccc";
        }
    });
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
    cellPhoneField.addEventListener("blur", function() 
    {
        if (cellPhoneField.value.trim() !== "")
        {
            validatePhone();
        } 
        else
        {
            cellPhoneField.style.borderColor = "#ccc";
        }
    });

    document.getElementById('signupForm').addEventListener('submit', function(event) 
    {
        event.preventDefault();

        var data = 
        {
            type: "Signup",
            name: nameField.value,
            surname: surnameField.value,
            cell_number: cellPhoneField.value,
            email: emailField.value,
            password: passwordField.value
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

                    if(response.success == true) 
                    {
                        window.location.href = "../../CustomerView/php/customer.php";
                    }
                    else
                    {
                        var errorDiv = document.getElementById("signupError");
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