// Initialize Firebase Auth
const auth = firebase.auth();

// Get form elements
const loginForm = document.querySelector('lform');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');

// Function to handle login
async function login(event) {
    event.preventDefault();

    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate form inputs
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        // Sign in with email and password
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        
        // Clear form
        loginForm.reset();
        
        // Redirect to home page after successful login
        window.location.href = 'index.html';
        
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            alert('Invalid email or password');
        } else {
            alert('Error logging in: ' + error.message);
        }
    }
}

// Add event listener for form submission
loginForm.addEventListener('submit', login);
