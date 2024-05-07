
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, set, ref, get, child, remove, push, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"


document.addEventListener("DOMContentLoaded", function (event) {
    let changeAuthority = getAdminData().authority;
    console.log(changeAuthority);
    // if (changeAuthority) {
    //     document.querySelector(".authority-name").innerHTML = 'A';
    // } else {
    //     console.error("Admin data not found or invalid.");
    // }
    displayTable(changeAuthority);
});

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

async function displayTable(complaintType) {
    document.querySelector(".authority-name").innerHTML = complaintType + " Authority";
    heading.innerHTML = complaintType + ' Complaints';
    
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
                let adminNote = snapshot.child('adminNote').val();
                let complaintStatus = snapshot.child('status').val();

                if (complaintCategory === complaintType && complaintStatus==='pending') {
                    let rowdata = `<tr>
                    <td>${complaintID}</td>
                    <td>${complaintDate}</td>
                    <td>${complaintEmail}</td>
                    <td>${complaintTitle}</td>
                    <td>${adminNote}</td>
                    <td>${complaintStatus}</td>
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
                }
            });
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}
// Event listener for the table body to update the authority popup everytime the user clicks on details button
const tableBody = document.querySelector(".complaint-table .complaints-display .main-table .body");
tableBody.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const row = event.target.closest("tr");
        if (row) {
            let complaintID = row.querySelector("td:first-child").textContent;
            authorityPopUp(complaintID);
        }
    }
});

function authorityPopUp(complaintID) {
    let popUpDisplay = document.querySelector(".open-authority-form")
    popUpDisplay.style.display = "flex";

    let CID = document.querySelector(".open-authority-form .complaint-id");
    let DateElement = document.querySelector(".open-authority-form .complaint-date");
    // let ComplaintEmailElement = document.querySelector(".open-authority-form .complaint-email");
    let TitleElement = document.querySelector(".open-authority-form .complaint-title");
    let DescriptionElement = document.querySelector(".open-authority-form .complaint-description");
    let complaintStatusElement = document.querySelector(".open-authority-form .complaint-status");
    let complaintAdminNoteElement = document.querySelector(".open-authority-form .admin-note");

    let complaintDate, complaintTitle, complaintDescription,complaintAdminNote, complaintStatus;

    const dbRef = ref(db);
    get(child(dbRef, 'complaints/'))
        .then(async (snapshot) => {

            snapshot.forEach((element) => {
                if (element.key === complaintID) {
                    complaintDate = element.child('date').val();
                    // complaintEmail = element.child('email').val();
                    complaintTitle = element.child('title').val();
                    complaintDescription = element.child('complaint').val();
                    complaintAdminNote = element.child('adminNote').val();
                    complaintStatus = element.child('status').val();

                    CID.innerHTML = `<strong>Complaint ID: </strong>${complaintID}<br>`;
                    DateElement.innerHTML = `<strong>Date: </strong>${complaintDate}<br>`;
                    // ComplaintEmailElement.innerHTML = `<strong>Email: </strong>${complaintEmail}<br>`;
                    TitleElement.innerHTML = `<strong>Title: </strong>${complaintTitle}<br>`;
                    DescriptionElement.innerHTML = `<strong>Description: </strong>${complaintDescription}<br>`;
                    complaintAdminNoteElement.innerHTML = `<strong>Admin Note: </strong>${complaintAdminNote}<br>`;
                    complaintStatusElement.innerHTML = `<strong>Status: </strong>${complaintStatus}<br>`;
                }
            });
        });

        let sendBtn = popUpDisplay.querySelector('#send');

        let newSendBtn = sendBtn.cloneNode(true);

        sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
        newSendBtn.addEventListener('click', () => sendMessageToAuthority(complaintID));
        
}

function sendMessageToAuthority(complaintID) {

    const complaintRef = ref(db, 'complaints/' + complaintID);

    // Update the status in Firebase- setting to in progress
    update(complaintRef, {
        status: 'Resolved',
    }).then(() => {
        alert("Complaint resolved! ");
    }).catch((error) => {
        console.error("Error updating status:", error);
    });
    alert(complaintID + " Resolved! ");
    let complaintStatus = element.child('status').val();
    let complaintStatusElement = document.querySelector(".open-authority-form .complaint-status");
    complaintStatusElement.innerHTML = `<strong>Status: </strong>${complaintStatus}<br>`;
    
}








// function getAuthority() {
//     // Get the user data from sessionStorage
  
// let data = sessionStorage.getItem("getAdmin");

// // Parse the JSON string back into an object
// let user = JSON.parse(data);

// // Now you can access the user's data
// // let email = user.email;
// // return email;
// return user;
// }