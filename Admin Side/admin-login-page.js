document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("all-complaints").click();
});
/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("admin-profile").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("admin-profile").style.width = "0";
}

complaintData = fetch("data.json")
    .then(function (response) {
        return response.json();
    })
function allComplaints() {
    let head = document.querySelector(".complaint-table .page-display .heading");
    head.innerHTML = "All Complaints";

    complaintData.then(function (complaints) {
        let placeholder = document.querySelector(".complaint-table .complaints-display .main-table .body");
        let out = "";
        for (const complaint of complaints) {
            out += `
                <tr>
                    <td>${complaint.complaintID}</td>
                    <td>${complaint.date}</td>
                    <td>${complaint.category}</td>
                    <td>${complaint.title}</td>
                    <td>${complaint.description}</td>
                    <td><button class="status-btn" onclick="openAuthorityForm()">View Details</button></td>
                </tr>
            `;
        }
        placeholder.innerHTML = out;
    })
}
function pendingComplaints() {
    let head = document.querySelector(".complaint-table .page-display .heading");
    head.innerHTML = "Pending Complaints";

    complaintData.then(function (complaints) {
        let placeholder = document.querySelector(".complaint-table .complaints-display .main-table .body");
        let out = "";
        for (const complaint of complaints) {
            if (complaint.status === "pending") {
                out += `
            <tr>
                <td>${complaint.complaintID}</td>
                <td>${complaint.date}</td>
                <td>${complaint.category}</td>
                <td>${complaint.title}</td>
                <td>${complaint.description}</td>
                <td><button class="pending-processing-complaints" id="pending-btn">${complaint.status}</button></td>
            </tr>
        `;
            }
        }
        placeholder.innerHTML = out;
    })
}
function processingComplaints() {
    let head = document.querySelector(".complaint-table .page-display .heading");
    head.innerHTML = "Processing Complaints";
    complaintData.then(function (complaints) {
        let placeholder = document.querySelector(".complaint-table .complaints-display .main-table .body");
        let out = "";
        for (const complaint of complaints) {
            if (complaint.status === "in_progress") {
                out += `
            <tr>
                <td>${complaint.complaintID}</td>
                <td>${complaint.date}</td>
                <td>${complaint.category}</td>
                <td>${complaint.title}</td>
                <td>${complaint.description}</td>
                <td><button class="pending-processing-complaints" id="processing-btn">${complaint.status}</button></td>
            </tr>
        `;
            }
        }
        placeholder.innerHTML = out;
    })
}

function openAuthorityForm() {
    complaintData.then(function (complaints) {
        let CID = document.querySelector(".open-authority-form .complaint-id");
        let DateElement = document.querySelector(".open-authority-form .complaint-date");
        let TitleElement = document.querySelector(".open-authority-form .complaint-title");
        let DescriptionElement = document.querySelector(".open-authority-form .complaint-description");
        let complaintStatusElement = document.querySelector(".open-authority-form .complaint-status");
        let complaintID;

        const tableBody = document.querySelector(".complaint-table .complaints-display .main-table .body");
        tableBody.addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON") {
                const row = event.target.closest("tr");
                if (row) {
                    complaintID = row.querySelector("td:first-child").textContent;
                    CID.innerHTML = `<strong>Complaint ID: </strong>${complaintID}<br>`;
                }
                const i = complaints.findIndex(complaint => complaint.complaintID === complaintID);
                if (i !== -1) {
                    DateElement.innerHTML = `<strong>Date: </strong>${complaints[i].date}<br>`;
                    TitleElement.innerHTML = `<strong>Title: </strong>${complaints[i].title}<br>`;
                    DescriptionElement.innerHTML = `<strong>Description: </strong>${complaints[i].description}<br>`;
                    complaintStatusElement.innerHTML = `<strong>Status: </strong>${complaints[i].status}<br>`;
                } else {
                    console.log("Complaint ID not found.");
                }
            }
        });

        document.querySelector(".open-authority-form").style.display = "flex";
    });
}

function closeAuthorityForm() {
    document.querySelector(".open-authority-form").style.display = "none";
}