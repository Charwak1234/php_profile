/* ===================================
AADHAR EDIT TOGGLE
=================================== */

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
    card.querySelectorAll(
        "input, select, textarea"
    );

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

    if (!isValid) {

        alert(
            "Please fill in all mandatory fields."
        );

        return;

    }

    /* ==========================
       MARK COMPLETE
    ========================== */

    localStorage.setItem(
        "aadharCompleted",
        "true"
    );

    /* ==========================
       ELEMENTS
    ========================== */

    const button =
    document.getElementById("aadharEditBtn");

    const saveSection =
    document.getElementById("aadharSaveSection");

    const uploadSection =
    document.getElementById("uploadSection");

    const uploadTexts =
    document.querySelectorAll(".upload-text");

    const uploadIcons =
    document.querySelectorAll(".upload-icon");

    /* ==========================
       LOCK ALL FIELDS
    ========================== */

    fields.forEach(field => {

        field.disabled = true;

    });

    /* ==========================
       RESET BUTTON
    ========================== */

    button.innerHTML =
    `<i class="bi bi-pencil-square"></i> Edit Info`;

    button.classList.remove("active");

    /* ==========================
       LOCK CARD
    ========================== */

    card.classList.add("locked");

    /* ==========================
       HIDE SAVE SECTION
    ========================== */

    saveSection.classList.add("d-none");

    /* ==========================
       DISABLE UPLOAD UI
    ========================== */

    uploadSection.classList.add(
        "upload-disabled"
    );

    uploadTexts.forEach(text => {

        text.innerText =
        "Upload Locked";

    });

    uploadIcons.forEach(icon => {

        icon.style.color = "#94a3b8";

    });

    /* ==========================
       HIDE AADHAR NUMBER
    ========================== */

    document.querySelectorAll(".aadhar-field")
    .forEach(field => {

        field.type = "password";

    });

    /* ==========================
       CHECK PROFILE COMPLETION
    ========================== */

    checkProfileCompletion();

    /* ==========================
       SHOW SUCCESS MODAL
    ========================== */

    const successModal =
    document.getElementById(
        "registrationSuccessModal"
    );

    const closeBtn =
    document.getElementById(
        "closeSuccessModal"
    );

    if(successModal){

        successModal.style.display = "flex";

    }

    /* ==========================
       CLOSE MODAL + OPEN LOCATION
    ========================== */

    if(closeBtn){

        closeBtn.onclick = () => {

            // CLOSE MODAL
            successModal.style.display =
            "none";

            // OPEN LOCATION SECTION
            const nextItem =
            document.querySelector(
                '[data-section="location-section"]'
            );

            if(nextItem){

                nextItem.click();

            }

        };

    }

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