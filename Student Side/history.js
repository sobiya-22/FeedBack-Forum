
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, set, ref, get, child, remove, push, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"

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

document.addEventListener("DOMContentLoaded", function (event) {
    let change = getUserData();
    if (change) {
        document.querySelector(".authority-name").innerHTML = 'A';
    } else {
        console.error("Admin data not found or invalid.");
    }
    // let changeMail = getUserData().email;
    displayTable(change);
});


//complaint table along with heading
let heading = document.querySelector(".complaint-table .page-display .heading");
let eachRow = document.querySelector(".complaint-table .complaints-display .main-table .body");

async function displayTable(change) {
    document.querySelector(".authority-name").innerHTML = change.crn;
    heading.innerHTML = change.crn + "'s  Complaints";
    
    const dbRef = ref(db);
    get(child(dbRef, 'complaints/'))
        .then((snapshot) => {
            eachRow.innerHTML = '';
            snapshot.forEach((snapshot) => {
                let complaintID = snapshot.key;
                let complaintDate = snapshot.child('date').val();
                let complaintEmail = snapshot.child('email').val();
                // let complaintCategory = snapshot.child('complaintType').val();
                let complaintTitle = snapshot.child('title').val();
                // let adminNote = snapshot.child('adminNote').val();
                let complaintStatus = snapshot.child('status').val();
                if (complaintEmail === change.email) {
                    let rowdata = `<tr>
                    <td>${complaintID}</td>
                    <td>${complaintDate}</td>
                    <td>${complaintTitle}</td>
                    <td><button class="status-btn">${complaintStatus}</button></td>
                </tr>`;
                    eachRow.innerHTML += rowdata;
                }
            });
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}
function getUserData() {
    // Get the user data from sessionStorage
    let data = sessionStorage.getItem("getUser");

    // Parse the JSON string back into an object
    let user = JSON.parse(data);

    // Now you can access the user's data
    return user;
}