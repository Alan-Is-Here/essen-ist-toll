// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Get form elements
const signupForm = document.querySelector('form');
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');
const confirmPasswordInput = document.getElementById('cf-pw');
const loginDirectLink = document.getElementById('login-direct');

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
async function signup(event) {
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

    try {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Add user details to Firestore
        await db.collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Clear form
        signupForm.reset();
        
        // Redirect to login page
        window.location.href = 'login.html';
        
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('This email is already registered. Please login instead.');
            window.location.href = 'login.html';
        } else {
            alert('Error creating account: ' + error.message);
        }
    }
}

// Add event listeners
signupForm.addEventListener('submit', signup);

// Redirect to login page when clicking "Already have account?"
loginDirectLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'login.html';
});
