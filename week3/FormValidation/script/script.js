// Get the form

const form = document.getElementById("registrationForm");

// Form Validation

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get Values

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const gender = document.querySelector('input[name="gender"]:checked');

    // Regular Expressions

    const nameRegex = /^[A-Za-z ]+$/;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const phoneRegex = /^[0-9]{10}$/;

    const usernameRegex = /^[A-Za-z0-9]{8}$/;

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

    // Name Validation

    if (!nameRegex.test(name)) {
        alert("Name should contain only alphabets and spaces.");
        return;
    }

    // Email Validation

    if (!emailRegex.test(email)) {
        alert("Enter a valid Email ID.");
        return;
    }

    // Phone Validation

    if (!phoneRegex.test(phone)) {
        alert("Phone Number must contain exactly 10 digits.");
        return;
    }

    // Gender Validation

    if (gender == null) {
        alert("Please select your gender.");
        return;
    }

    // Username Validation

    if (!usernameRegex.test(username)) {
        alert("Username must contain exactly 8 alphanumeric characters.");
        return;
    }

    // Password Validation

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, digit and special character.");
        return;
    }

    // Confirm Password Validation

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Success

    alert("Registration Successful!");

    form.reset();

});