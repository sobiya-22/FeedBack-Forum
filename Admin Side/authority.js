// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, set, ref, get, child, remove, push, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoZwThtmjBNBUR1QAIwVJhcsow9Qa_uBU",
    authDomain: "feedback-forum-43ab1.firebaseapp.com",
    projectId: "feedback-forum-43ab1",
    storageBucket: "feedback-forum-43ab1.appspot.com",
    messagingSenderId: "339551754655",
    appId: "1:339551754655:web:dc765ac0e4457002c245aa",
    measurementId: "G-VR6YM99MC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("admin-profile").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("admin-profile").style.width = "0";
}
function closeAuthorityForm() {
    document.querySelector(".open-authority-form").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('.horizontal-bar .authority-name').innerHTML = getAdminData().category;
});


//changing the authority headlines

function getAdminData() {
    // Get the user data from sessionStorage
    let data = sessionStorage.getItem("getAdmin");

    // Parse the JSON string back into an object
    let admin = JSON.parse(data);

    // Now you can access the user's data
    return admin;
}



//complaint table along with heading
let heading = document.querySelector(".complaint-table .page-display .heading");
let eachRow = document.querySelector(".complaint-table .complaints-display .main-table .body");

async function readComplaints() {
    heading.innerHTML = "All Complaints";
    // const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, 'complaints/'))
        .then((snapshot) => {
            eachRow.innerHTML = '';
            snapshot.forEach((snapshot) => {
                let complaintID = snapshot.key;
                let complaintDate = snapshot.child('date').val();
                let complaintEmail = snapshot.child('email').val();
                let complaintCategory = snapshot.child('complaintType').val();
                let complaintTitle = snapshot.child('title').val();
                // let complaintDescription = snapshot.child('complaint').val();
                let rowdata = `<tr>
                    <td>${complaintID}</td>
                    <td>${complaintDate}</td>
                    <td>${complaintEmail}</td>
                    <td>${complaintCategory}</td>
                    <td>${complaintTitle}</td>
                    <td><button class="status-btn">View Details</button></td>
                </tr>`;
                eachRow.innerHTML += rowdata;

                // Get all the buttons
                const buttons = document.querySelectorAll(".status-btn");
                // Add event listener to each button
                buttons.forEach((button) => {
                    button.addEventListener("click", () => {
                        authorityPopUp(complaintID);
                        document.querySelector(".open-authority-form").style.display = "flex";
                    });
                });
            });
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}
