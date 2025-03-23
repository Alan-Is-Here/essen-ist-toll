// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Get form elements
const signupForm = document.querySelector('#sform');
const firstNameInput = document.querySelector('#fname');
const lastNameInput = document.querySelector('#lname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pw');
const confirmPasswordInput = document.querySelector('#cf-pw');
const loginDirectLink = document.querySelector('#login-direct');

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password strength
function isValidPassword(password) {
    return password.length >= 6;
}

// Function to handle signup
function signup(event) {
    event.preventDefault();

    // Get form values
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validate form inputs
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!isValidPassword(password)) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;

            let userData = {
                username,
                email,
                password,
                role_id: role_id
            };

            // lưu user vào firestore
            db.collection("users").add(userData)
                .then((ref) => {
                    alert("Register successfully!");
                    window.location.href = "/index.html";
                    console.log("Document written with ID: ", ref.id);
                })
                .catch((error) => {
                    alert("Register fail!");
                    console.error("Error is: ", error);
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMsg = error.message;

            // alert(`Error: ${errorMsg}`);
            console.log(errorMsg);
        });
}

// Add event listeners
signupForm.addEventListener('submit', signup);

// // Redirect to login page when clicking "Already have account?"
// loginDirectLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.location.href = 'login.html';
// });
