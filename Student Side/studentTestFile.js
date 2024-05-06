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
