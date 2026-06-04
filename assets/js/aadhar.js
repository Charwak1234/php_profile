/* ===================================
AADHAR EDIT TOGGLE
=================================== */

const AADHAR_SAVE_ENDPOINT = window.profileApiUrl("../../api/profile/save_aadhaar.php");
const AADHAR_GET_ENDPOINT = window.profileApiUrl("../../api/profile/get_aadhaar.php");

function aadharValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function setAadharValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== null && value !== undefined) {
        element.value = value;
    }
}

function setAadharNumber(value) {
    const digits = (value || "").replace(/\D/g, "").slice(0, 12);
    setAadharValue("aadharPart1", digits.slice(0, 4));
    setAadharValue("aadharPart2", digits.slice(4, 8));
    setAadharValue("aadharPart3", digits.slice(8, 12));
}

function getAadharNumber() {
    return ["aadharPart1", "aadharPart2", "aadharPart3"].map(aadharValue).join("");
}

async function loadAadharData() {
    try {
        const response = await fetch(AADHAR_GET_ENDPOINT, {
            headers: {
                Accept: "application/json"
            }
        });

        const payload = await response.json();

        if (!payload.success || !payload.data) {
            return;
        }

        const data = payload.data;
        setAadharValue("fullName", data.aadhaar_name || "");
        setAadharNumber(data.aadhaar_number || "");

        localStorage.setItem("aadharCompleted", "true");
        if (typeof checkProfileCompletion === "function") {
            checkProfileCompletion();
        }
    } catch (error) {
        console.error("Unable to load Aadhaar details:", error);
    }
}

function toggleAadharEdit(){

    const button =
    document.getElementById("aadharEditBtn");

    const card =
    document.getElementById("aadharCard");

    const saveSection =
    document.getElementById("aadharSaveSection");

    const uploadSection =
    document.getElementById("uploadSection");

    const uploadTexts =
    document.querySelectorAll(".upload-text");

    const uploadIcons =
    document.querySelectorAll(".upload-icon");

    const fields =
    card.querySelectorAll(
        "input, select, textarea"
    );

    const isDisabled =
    fields[0].disabled;

    /* ==========================
       TOGGLE INPUTS
    ========================== */

    fields.forEach(field => {

        field.disabled = !isDisabled;

    });

    /* ==========================
       ENABLE MODE
    ========================== */

    if(isDisabled){

        button.innerHTML =
        `<i class="bi bi-x-circle"></i> Cancel`;

        button.classList.add("active");

        card.classList.remove("locked");

        saveSection.classList.remove("d-none");

        saveSection.classList.add("animate-pop-in");

        uploadSection.classList.remove(
            "upload-disabled"
        );

        // ENABLE UPLOAD UI
        uploadTexts.forEach(text => {

            text.innerText =
            "Click to upload Aadhaar image";

        });

        uploadIcons.forEach(icon => {

            icon.style.color = "#46d9e3";

        });

        // SHOW AADHAR NUMBER
        document.querySelectorAll(".aadhar-field")
        .forEach(field => {

            field.type = "text";

        });

    }

    /* ==========================
       DISABLE MODE
    ========================== */

    else{

        button.innerHTML =
        `<i class="bi bi-pencil-square"></i> Edit Info`;

        button.classList.remove("active");

        card.classList.add("locked");

        saveSection.classList.add("d-none");

        uploadSection.classList.add(
            "upload-disabled"
        );

        // DISABLE UPLOAD UI
        uploadTexts.forEach(text => {

            text.innerText =
            "Upload Locked";

        });

        uploadIcons.forEach(icon => {

            icon.style.color = "#94a3b8";

        });

        // HIDE AADHAR NUMBER
        document.querySelectorAll(".aadhar-field")
        .forEach(field => {

            field.type = "password";

        });

    }

}

/* ===================================
AADHAR FORM SUBMIT
=================================== */

function submitAadharForm(){

    const card =
    document.getElementById("aadharCard");

    const fields =
    card.querySelectorAll("input, select, textarea");

    let isValid = true;

    /* ==========================
       VALIDATION LOGIC
       ONLY NAME + NUMBER REQUIRED
    ========================== */

    fields.forEach(field => {

        if (
            field.hasAttribute("required") &&
            field.type !== "file" &&
            !field.value.trim()
        ) {

            field.style.borderColor = "red";
            isValid = false;

        }
        else {
            field.style.borderColor = "";
        }

    });

    /* ==========================
       ✅ NEW: MANDATORY FRONT IMAGE CHECK
    ========================== */

    const frontImage =
    document.getElementById("aadharFrontImage");

    if (!frontImage || frontImage.files.length === 0) {

        alert("Aadhaar Front Image is required!");
        isValid = false;

        // highlight upload box
        const box = document.getElementById("frontUploadBox");
        if (box) {
            box.style.border = "2px solid red";
        }

    } else {
        const box = document.getElementById("frontUploadBox");
        if (box) {
            box.style.border = "";
        }
    }

    if (!isValid) {

        alert("Please fill in all mandatory fields.");

        return;

    }

    const formData = new FormData();
    formData.append("aadhaarName", aadharValue("fullName"));
    formData.append("aadhaarNumber", getAadharNumber());

    const selectedFrontImage = document.getElementById("aadharFrontImage");
    const selectedBackImage = document.getElementById("aadharBackImage");

    if (selectedFrontImage && selectedFrontImage.files[0]) {
        formData.append("aadharFrontImage", selectedFrontImage.files[0]);
    }

    if (selectedBackImage && selectedBackImage.files[0]) {
        formData.append("aadharBackImage", selectedBackImage.files[0]);
    }

    fetch(AADHAR_SAVE_ENDPOINT, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(payload => {
        if (!payload.success) {
            alert(payload.message || "Failed to save Aadhaar details.");
            return;
        }

        localStorage.setItem("aadharCompleted", "true");

        fields.forEach(field => {
            field.disabled = true;
        });

        const button = document.getElementById("aadharEditBtn");
        const saveSection = document.getElementById("aadharSaveSection");
        const uploadSection = document.getElementById("uploadSection");
        const uploadTexts = document.querySelectorAll(".upload-text");
        const uploadIcons = document.querySelectorAll(".upload-icon");

        button.innerHTML = `<i class="bi bi-pencil-square"></i> Edit Info`;
        button.classList.remove("active");

        card.classList.add("locked");
        saveSection.classList.add("d-none");
        uploadSection.classList.add("upload-disabled");

        uploadTexts.forEach(text => {
            text.innerText = "Upload Locked";
        });

        uploadIcons.forEach(icon => {
            icon.style.color = "#94a3b8";
        });

        document.querySelectorAll(".aadhar-field").forEach(field => {
            field.type = "password";
        });

        checkProfileCompletion();

        const successModal = document.getElementById("registrationSuccessModal");
        const closeBtn = document.getElementById("closeSuccessModal");

        if (successModal) {
            successModal.style.display = "flex";
        }

        if (closeBtn) {
            closeBtn.onclick = () => {
                successModal.style.display = "none";

                const nextItem = document.querySelector('[data-section="location-section"]');
                if (nextItem) {
                    nextItem.click();
                }
            };
        }
    })
    .catch(error => {
        console.error("Failed to save Aadhaar details:", error);
        alert("Failed to save Aadhaar details.");
    });
}

/* ===================================
AADHAAR IMAGE UPLOAD LOGIC
=================================== */

// FRONT IMAGE
const frontBox =
document.getElementById(
    "frontUploadBox"
);

const frontInput =
document.getElementById(
    "aadharFrontImage"
);

const frontText =
document.getElementById(
    "frontUploadText"
);

if(frontBox && frontInput){

    frontBox.addEventListener(
        "click",
        () => {

            if(!frontInput.disabled){

                frontInput.click();

            }

        }
    );

    frontInput.addEventListener(
        "change",
        () => {

            const file =
            frontInput.files[0];

            if(file){

                // ONLY IMAGE FILES
                if(
                    !file.type.startsWith(
                        "image/"
                    )
                ){

                    alert(
                        "Only image files are allowed"
                    );

                    frontInput.value = "";

                    return;

                }

                frontText.innerText =
                file.name;

            }

        }
    );

}

/* ===================================
BACK IMAGE
=================================== */

const backBox =
document.getElementById(
    "backUploadBox"
);

const backInput =
document.getElementById(
    "aadharBackImage"
);

const backText =
document.getElementById(
    "backUploadText"
);

if(backBox && backInput){

    backBox.addEventListener(
        "click",
        () => {

            if(!backInput.disabled){

                backInput.click();

            }

        }
    );

    backInput.addEventListener(
        "change",
        () => {

            const file =
            backInput.files[0];

            if(file){

                // ONLY IMAGE FILES
                if(
                    !file.type.startsWith(
                        "image/"
                    )
                ){

                    alert(
                        "Only image files are allowed"
                    );

                    backInput.value = "";

                    return;

                }

                backText.innerText =
                file.name;

            }

        }
    );

}

document.addEventListener("DOMContentLoaded", loadAadharData);
