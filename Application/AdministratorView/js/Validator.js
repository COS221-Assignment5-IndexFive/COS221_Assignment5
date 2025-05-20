export class Validator {

    constructor () {
        this.valid = true;
    }

    validationHandler(formGroupId, validation) {
        var formGroup = document.getElementById(formGroupId);
        if (!validation) {
            formGroup.classList.add("has-error");
            this.valid = false;
        } else if (formGroup.classList.contains("has-error")) {
            formGroup.classList.remove("has-error");
        }
    }
    isFloatLike(n) {
        return !isNaN(n) && parseFloat(n) == n;
    }

    validatePrice(price) {
        return this.isFloatLike(price);
    }

    validateFirstAndLastName(name) {
        /* First and last name can consist of:
           - A-Z or a-z, whitespace, "," (comma) "'" (single quote), "-" (dash)
        */
        const namePattern = /^[a-z ,.'-]+$/i;
        return namePattern.test(name);
    }

    validateEmail(email) {
        // Used this regex: https://www.regular-expressions.info/email.html
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    }

    validatePhoneNum(phoneNum) {
        // Matches either +27 (for example) number or regular 10 digit number
        const phonePattern = /^\+?\d{11}$|^\d{10}$/;
        return phonePattern.test(phoneNum);
    }

    validatePassword(password) {
        const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passPattern.test(password);
    }

    validateRetailer(retailer) {
        const retailerPattern = /^(?![ .&'-])[a-zA-Z0-9 .&'-]{0,48}(?<![ .&'-])$/;
        return retailerPattern.test(retailer);
    }

    validateURL(url) {
        // Found pattern here: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return urlPattern.test(url);
    }

    validateNumReviews(numReviews) {
        return numReviews < 0 || !isNaN(numReviews) || !(numReviews.toString().includes('.')) || !(numReviews.toString().includes(',')) || numReviews != undefined;
    }

    validateRating(rating) {
        return this.isFloatLike(rating) && rating >= 0 && rating <= 5;
    }

    validateCategory(category) {
        // Has to begin with letter, can contain digits, a whitespace, some selected special chars
        const categoryPattern = /^[A-Za-z]+[\w '"-&]*$/;
        return categoryPattern.test(category);
    }


    validateRetailer(retailer) {
        const retailerPattern = /^(?![ .&'-])[a-zA-Z0-9 .&'-]{0,48}(?<![ .&'-])$/;
        return retailerPattern.test(retailer);
    }
}