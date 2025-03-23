// Initialize Firebase Auth
const auth = firebase.auth();

// Get form elements
const loginForm = document.querySelector('#lform');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pw');

// Function to handle login
function login(event) {
    event.preventDefault();

    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate form inputs
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("Login successfully!");

        // setup phiên đăng nhập
        // tạo object UserSession để gán thời gian đăng nhập
        const userSession = {
            user: user,
            // hàm getTime() sẽ lấy thời gian là milisec
            expiry: new Date().getTime() + 3 * 60 * 60 * 1000 // login 3h
        }

        // lưu UserSession vào LocalStorage
        localStorage.setItem('user_session', JSON.stringify(userSession))

        // đẩy về trang chủ sau khi login
        window.location.href = '/index.html';
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMsg = error.message;
        console.log(`Error is: ${errorMsg}`);
        alert('Email or password is wrong!');
    });
}

// Add event listener for form submission
loginForm.addEventListener('submit', login);
