/*function saveComplaintsToFile() {
    const allComplaints = JSON.parse(localStorage.getItem('allComplaints')) || [];
    const jsonData = JSON.stringify(allComplaints, null, 2); 
    const blob = new Blob([jsonData], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'all_complaints.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const formE1 = document.querySelector('.form');
    formE1.addEventListener('submit', event => {  
        event.preventDefault();
        const currentDate = new Date().toISOString();
        const formData = new FormData(formE1);
        const data = Object.fromEntries(formData);
        data.submissionDate = currentDate;
        let allComplaints = JSON.parse(localStorage.getItem('allComplaints')) || [];
        allComplaints.push(data);
        localStorage.setItem('allComplaints', JSON.stringify(allComplaints));
        alert('Complaint submitted successfully!');
        
        // Save complaints to a JSON file automatically after each submission
        saveComplaintsToFile();
    });
});

/*const popup = document.getElementById("popup");
            
            function openPopup() {
                popup.classList.add("open-popup");
            }
            
            function closePopup() {
                popup.classList.remove("open-popup");
            }*/
    /*
    /const currentDate = new Date().toISOString();
    const formData = new FormData(formE1);
    const data =Object.fromEntries(formData);
    data.submissionDate = currentDate;

   // saveDataToIndexedDB(data);
   let allComplaints = JSON.parse(localStorage.getItem('allComplaints')) || [];

    // Add the current complaint to the array
    allComplaints.push(data);

    // Store updated complaints array in localStorage
    localStorage.setItem('allComplaints', JSON.stringify(allComplaints));

    // Optionally, you can update UI or perform other actions here

    // Provide feedback to the user, if needed
    alert('Complaint submitted successfully!');
    document.getElementById('exportButton').addEventListener('click', exportComplaints);
   
});*/


document.getElementById("complaintForm").addEventListener("submit", function(event) {
                
    event.preventDefault();

    const currentDate = new Date().toISOString();

    const formData = new FormData(this);

    const complaintData = {
        date: currentDate, // Store the current date
        complaintType: formData.get("ComplaintType"),
        title: formData.get("Title"),
        write: formData.get("Write"),
        imageUpload: formData.get("imageUpload") ? URL.createObjectURL(formData.get("imageUpload")) : null,
        anonymity: formData.get("anonymity") ? true : false
    };

    
    localStorage.setItem("complaintData", JSON.stringify(complaintData));

    // Display the thank you popup
    openPopup();
});
