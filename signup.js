// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4l9MAjo0nwg8svNH2nCe1amzsRnu11Lk",
  authDomain: "adopet-9b45a.firebaseapp.com",
  projectId: "adopet-9b45a",
  storageBucket: "adopet-9b45a.appspot.com",
  messagingSenderId: "528567839616",
  appId: "1:528567839616:web:4def598f1423ef83ab6f65",
  measurementId: "G-GK1YF97X41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add event listener for the sign-up form submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get user inputs
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate passwords
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Create user in Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User account created successfully
      const user = userCredential.user;
      alert("Account created successfully! Redirecting to Sign In page...");
      
      // Redirect to login page
      window.location.href = "login.html";
    })
    .catch((error) => {
      // Handle errors
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});
