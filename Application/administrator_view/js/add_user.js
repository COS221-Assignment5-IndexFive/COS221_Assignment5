document.getElementById("add-user-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var firstName = document.getElementById("first-name").value;
    if (!validateFirstAndLastName(firstName)) {
        // Eror message, firstname contains invalid chars
        document.getElementById("fg-first-name").classList.add("has-error");
       
    }

    var lastName = document.getElementById("last-name").value;
    if (!validateFirstAndLastName(lastName)) {
        // Eror message, lastname contains invalid chars
    }    

    var email = document.getElementById("email").value;

    if (!validateEmail(email)) {
        // Error message, invalid email
    }

    var phoneNum = document.getElementById("phone");

    if (!validatePhoneNum(phoneNum)) {
        // Display error, invalid phone num
    }

    // Validation successful
    // Call API endpoint to register user
    console.log("Add user form submitted");
});

function validateFirstAndLastName(name) {
    /* First and last name can consist of:
    - A-Z or a-z, whitespace, "," (comma) "'" (single quote), "-" (dash)
    */
    const namePattern = /^[a-z ,.'-]+$/i;
    return namePattern.test(name);
}

function validateEmail(email) {
    // Used this regex: https://www.regular-expressions.info/email.html
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
    return(emailPattern.test(email));
}

function validatePhoneNum(phoneNum) {
    // Matches either +27 (for example) number or regular 10 digit number
    const phonePattern = /^\+?\d{11}$|^\d{10}$/;
    return(phonePattern.test(phoneNum));
}