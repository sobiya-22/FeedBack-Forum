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

function closeAuthorityForm() {
    document.querySelector(".open-authority-form").style.display = "none";
}