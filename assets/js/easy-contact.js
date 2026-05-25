let isContactEditable = false;

/* ================= TOGGLE EDIT ================= */
function toggleContactEdit() {
    isContactEditable = !isContactEditable;

    const fields = ["countryCode", "mobileNumber", "email"];

    fields.forEach(id => {
        document.getElementById(id).disabled = !isContactEditable;
    });

    document.getElementById("contactFooter").style.display =
        isContactEditable ? "block" : "none";

    document.getElementById("editContactBtn").innerText =
        isContactEditable ? "Cancel" : "Edit Info";

    document.getElementById("contactCard").classList.toggle("locked", !isContactEditable);
}

/* ================= SAVE DATA ================= */
function saveContactInfo() {

    const data = {
        countryCode: document.getElementById("countryCode").value,
        mobileNumber: document.getElementById("mobileNumber").value,
        email: document.getElementById("email").value
    };

    console.log("Contact Info:", data);

    alert("Contact info ready for backend (check console)");
}