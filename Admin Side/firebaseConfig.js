// Import the functions you need from the SDKs you need
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

// async function readData() {
//   const dbRef = ref(getDatabase());
//   const snapshot = await get(child(dbRef, 'complaints/'));
//   if (snapshot.exists()) {
//       return snapshot.val();
//   }
// //   else {
//       return false;
//      }
// //  };
let heading = document.querySelector(".complaint-table .page-display .heading");
let eachRow = document.querySelector(".complaint-table .complaints-display .main-table .body");
let allComplaintBtn = document.querySelector(".horizontal-bar .all-js");
let pendingBtn = document.querySelector('.horizontal-bar .pending-js');
let resolvedBtn = document.querySelector('.horizontal-bar .resolved-js');

async function readAllComplaints() {
    heading.innerHTML = "All Complaints";
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
    // let EmailElement = document.querySelector(".open-authority-form .complaint-email");
    let CategoryElement = document.querySelector(".open-authority-form .complaint-category")
    let TitleElement = document.querySelector(".open-authority-form .complaint-title");
    let DescriptionElement = document.querySelector(".open-authority-form .complaint-description");
    let complaintStatusElement = document.querySelector(".open-authority-form .complaint-status");

    let complaintDate, complaintEmail, complaintCategory, complaintTitle, complaintDescription, complaintStatus;

    // const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, 'complaints/'))
        .then(async (snapshot) => {

            snapshot.forEach((element) => {
                if (element.key === complaintID) {
                    complaintDate = element.child('date').val();
                    complaintEmail = element.child('email').val();
                    complaintCategory = element.child('complaintType').val();
                    complaintTitle = element.child('title').val();
                    complaintDescription = element.child('complaint').val();
                    complaintStatus = element.child('status').val();

                    CID.innerHTML = `<strong>Complaint ID: </strong>${complaintID}<br>`;
                    DateElement.innerHTML = `<strong>Date: </strong>${complaintDate}<br>`;
                    // EmailElement.innerHTML = `<strong>: </strong>${complaintEmail}<br>`;
                    CategoryElement.innerHTML = `<strong>Category: </strong>${complaintCategory}<br>`;
                    TitleElement.innerHTML = `<strong>Title: </strong>${complaintTitle}<br>`;
                    DescriptionElement.innerHTML = `<strong>Description: </strong>${complaintDescription}<br>`;
                    complaintStatusElement.innerHTML = `<strong>Status: </strong>${complaintStatus}<br>`;
                }
            });
        });

        let discardBtn = popUpDisplay.querySelector('#discard');
        let sendBtn = popUpDisplay.querySelector('#send');
        
        // Remove all previous event listeners
        let newDiscardBtn = discardBtn.cloneNode(true);
        let newSendBtn = sendBtn.cloneNode(true);
        discardBtn.parentNode.replaceChild(newDiscardBtn, discardBtn);
        sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
        
        // Add new event listeners
        newDiscardBtn.addEventListener('click', () => discardComplaint(complaintID));
        newSendBtn.addEventListener('click', () => sendMessageToAuthority(complaintID, complaintCategory));
        
}

function sendMessageToAuthority(complaintID, complaintCategory) {
    alert("ComplaintID: " + complaintID + " sent to " + complaintCategory);

    // const db = getDatabase();
    const complaintRef = ref(db, 'complaints/' + complaintID);

    //Reading the add a note from admin to the authority
    let adminMessageElement = document.querySelector(".open-authority-form .msg-send");
    let adminMessageValue = adminMessageElement.value;
    // alert(adminMessageValue);

    // Update the status in Firebase- setting to in progress

    update(complaintRef, {
        status: 'pending',
        adminNote: adminMessageValue
    }).then(() => {
        console.log("Status updated successfully.");
    }).catch((error) => {
        console.error("Error updating status:", error);
    });

    complaintStatus = element.child('status').val();
    let complaintStatusElement = document.querySelector(".open-authority-form .complaint-status");
    complaintStatusElement.innerHTML = `<strong>Status: </strong>${complaintStatus}<br>`;
}

function discardComplaint(complaintID) {
    alert("Deleting Complaint with ComplaintID: " + complaintID);
    const dataToRemove = ref(db, 'complaints/' + complaintID);

    remove(dataToRemove)
        .then(() => {
            console.log("Data removed successfully.");
        })
        .catch((error) => {
            console.error("Error removing data:", error);
        });
}

async function readPendingResolvedEvents(statusType) {
    if (statusType === 'pending') {
        heading.innerHTML = 'Pending Complaints';
        const dbRef = ref(db);
        get(child(dbRef, 'complaints/'))
            .then((snapshot) => {
                eachRow.innerHTML = '';
                console.log(snapshot.child('status').val());
                snapshot.forEach((snapshot) => {

                    if (snapshot.child('status').val() === statusType) {
                        let complaintID = snapshot.key;
                        let complaintDate = snapshot.child('date').val();
                        let complaintEmail = snapshot.child('email').val();
                        let complaintCategory = snapshot.child('complaintType').val();
                        let complaintTitle = snapshot.child('title').val();
                        let rowdata = `<tr>
                        <td>${complaintID}</td>
                        <td>${complaintDate}</td>
                        <td>${complaintEmail}</td>
                        <td>${complaintCategory}</td>
                        <td>${complaintTitle}</td>
                        <td><button class="status-btn" id="pending-btn">Pending</button></td>
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
                })

            })
            .catch((error) => {
                console.error("Error reading data:", error);
            });

    }
    else if (statusType === 'Resolved') {
        heading.innerHTML = 'Resolved Complaints';
        const dbRef = ref(db);
        get(child(dbRef, 'complaints/'))
            .then((snapshot) => {
                eachRow.innerHTML = '';
                snapshot.forEach((snapshot) => {

                    if (snapshot.child('status').val() === statusType) {
                        let complaintID = snapshot.key;
                        let complaintDate = snapshot.child('date').val();
                        let complaintCategory = snapshot.child('complaintType').val();
                        let complaintTitle = snapshot.child('title').val();
                        let rowdata = `<tr>
                        <td>${complaintID}</td>
                        <td>${complaintDate}</td>
                        <td>Emails</td>
                        <td>${complaintCategory}</td>
                        <td>${complaintTitle}</td>
                        <td><button class="status-btn" id="resolved-btn">Resolved</button></td>
                    </tr>`;
                        eachRow.innerHTML += rowdata;

                        // Get all the buttons
                        // const buttons = document.querySelectorAll(".status-btn");
                        // // Add event listener to each button
                        // buttons.forEach((button) => {
                        //     button.addEventListener("click", () => {
                        //         authorityPopUp(complaintID);
                        //         document.querySelector(".open-authority-form").style.display = "flex";
                        //     });
                        // });
                    }
                })

            })
            .catch((error) => {
                console.error("Error reading data:", error);
            });
    }
}

allComplaintBtn.addEventListener('click', async () => {
    await readAllComplaints();
})

pendingBtn.addEventListener('click', async () => {
    await readPendingResolvedEvents('pending');
})
resolvedBtn.addEventListener('click', async () => {
    await readPendingResolvedEvents('Resolved');
})

