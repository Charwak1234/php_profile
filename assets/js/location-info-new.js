console.log("Location JS loaded!");
document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.getElementById("locationEditToggleBtn");
    const form = document.getElementById("locationForm");
    const inputs = form.querySelectorAll("input, select");
    const syncCheckbox = document.getElementById("locationAddressSyncCheckbox");
    const footer = document.getElementById("locationFormFooter");

    // 1. Handle Edit Toggle
    editBtn.addEventListener("click", () => {
        const isLocked = form.classList.contains("locked");
        
        if (isLocked) {
            form.classList.remove("locked");
            inputs.forEach(input => input.disabled = false);
            footer.style.display = "block";
            editBtn.innerHTML = '<i class="bi bi-x-circle"></i> Cancel';
        } else {
            form.classList.add("locked");
            inputs.forEach(input => input.disabled = true);
            footer.style.display = "none";
            editBtn.innerHTML = '<i class="bi bi-pencil-square"></i> Edit Info';
        }
    });

    // 2. Logic for Sync Checkbox (Current -> Permanent)
    syncCheckbox.addEventListener("change", function() {
        if (this.checked) {
            // Map values from current to permanent fields
            document.getElementById("permanentHouseStatus").value = document.getElementById("currentHouseStatus").value;
            document.getElementById("permanentState").value = document.getElementById("currentState").value;
            // ... Add all other mappings here
        }
    });

    // 3. Form Submission Handling
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Add your AJAX call here to save data to the server
        console.log("Saving location data...");
        // After success:
        document.getElementById("locationSuccessPopup").style.display = "block";
    });
});