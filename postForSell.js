// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4l9MAjo0nwg8svNH2nCe1amzsRnu11Lk",
  authDomain: "adopet-9b45a.firebaseapp.com",
  databaseURL: "https://adopet-9b45a-default-rtdb.firebaseio.com",
  projectId: "adopet-9b45a",
  storageBucket: "adopet-9b45a.appspot.com",
  messagingSenderId: "528567839616",
  appId: "1:528567839616:web:4def598f1423ef83ab6f65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// References to DOM elements
const petForm = document.getElementById("petForm");

// Handle the form submission
const postPetForSale = (e) => {
  e.preventDefault();

  // Get the form data
  const photo = document.getElementById("photo")?.files[0]?.name || "No photo uploaded";
  const name = document.getElementById("name").value.trim();
  const breed = document.getElementById("breed").value.trim();
  const age = parseFloat(document.getElementById("age").value.trim());
  const sex = document.getElementById("sex").value;
  const weight = parseFloat(document.getElementById("weight").value.trim());
  const vaccinations = document.getElementById("vaccinations").value.trim();
  const lastVaccinationDate = document.getElementById("lastVaccinationDate").value.trim();
  const vetDocs = document.getElementById("vetDocs").files;
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value.trim());
  const contact = document.getElementById("contact").value.trim();

  // Validate age, weight, and price to ensure they are non-negative
  if (isNaN(age) || age < 0) {
    alert("Age must be a positive number.");
    return;
  }

  if (isNaN(weight) || weight < 0) {
    alert("Weight must be a positive number.");
    return;
  }

  if (isNaN(price) || price < 0) {
    alert("Price must be a positive number.");
    return;
  }

  // Validate last vaccination date to ensure it's not in the future
  const currentDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
  if (lastVaccinationDate && lastVaccinationDate > currentDate) {
    alert("Vaccination date cannot be in the future.");
    return;
  }

  // Validate contact number to ensure it is exactly 10 digits
  const phonePattern = /^[0-9]{10}$/; // Regex for exactly 10 digits
  if (!contact.match(phonePattern)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      const petData = {
        petName: name,
        breed: breed,
        age: age,
        sex: sex,
        weight: weight,
        vaccinations: vaccinations,
        lastVaccinationDate: lastVaccinationDate,
        vetDocs: Array.from(vetDocs).map((file) => file.name), // File names for vet docs
        description: description,
        price: `Rs ${price.toLocaleString()}`, // Display price in rupees (Rs)
        contact: contact,
        photo: photo, // You would handle photo uploads separately (firebase storage)
        posterEmail: user.email,
      };

      const petRef = ref(database, "petsForSale/");
      push(petRef, petData)
        .then(() => {
          alert("Pet posted successfully for sale!");
          window.location.href = "./backend/profile.html"; // Redirect to user profile page
        })
        .catch((error) => {
          alert("Failed to post pet. Try again.");
          console.error(error);
        });
    } else {
      alert("Please log in to post.");
    }
  });
};

// Add event listener for form submission
petForm.addEventListener("submit", postPetForSale);
