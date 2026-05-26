let isContactEditable = false;

/* ================= TOGGLE EDIT ================= */
function toggleContactEdit() {

    isContactEditable = !isContactEditable;

    const countryCode = document.getElementById("countryCode");
    const mobileNumber = document.getElementById("mobileNumber");
    const email = document.getElementById("email");

    // ONLY mobile fields are editable
    countryCode.disabled = !isContactEditable;
    mobileNumber.disabled = !isContactEditable;

    // EMAIL is ALWAYS locked
    email.disabled = true;

    // Footer visibility
    document.getElementById("contactFooter").style.display =
        isContactEditable ? "block" : "none";

    // Button text change
    document.getElementById("editContactBtn").innerText =
        isContactEditable ? "Cancel" : "Edit Info";

    // Card state
    document.getElementById("contactCard")
        .classList.toggle("locked", !isContactEditable);
}

/* ================= SAVE DATA ================= */
function saveContactInfo() {

    const data = {
        countryCode: document.getElementById("countryCode").value,
        mobileNumber: document.getElementById("mobileNumber").value,

        // email is still included for backend read-only use
        email: document.getElementById("email").value
    };

    console.log("Contact Info:", data);

    alert("Contact info ready for backend (check console)");

    // optional: close edit mode after save
    toggleContactEdit();
}