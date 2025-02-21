//this page is where login signup gets shown in firebase



// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Add event listener for sign-in
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get user inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sign in the user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign-in successful
      alert("Sign-in successful! Redirecting to homepage...");
      window.location.href = "project/index.html"; // Redirect to index.html
    })
    .catch((error) => {
      // Handle errors
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});
