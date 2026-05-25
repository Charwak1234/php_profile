/* ===================================
AADHAR EDIT TOGGLE
=================================== */

function toggleAadharEdit(){

    const button = document.getElementById("aadharEditBtn");

    const card = document.getElementById("aadharCard");

    const saveSection = document.getElementById("aadharSaveSection");

    const uploadSection = document.getElementById("uploadSection");

    const uploadText = document.querySelector(".upload-text");

    const uploadIcon = document.querySelector(".upload-icon");

    const fields = card.querySelectorAll("input");

    const isDisabled = fields[0].disabled;

    fields.forEach(field => {

        field.disabled = !isDisabled;

    });

    // ENABLE MODE
    if(isDisabled){

        button.innerHTML =
        `<i class="bi bi-x-circle"></i> Cancel`;

        button.classList.add("active");

        card.classList.remove("locked");

        saveSection.classList.remove("d-none");

        saveSection.classList.add("animate-pop-in");

        uploadSection.classList.remove("upload-disabled");

        uploadText.innerText =
        "Click to upload Aadhar image";

        uploadIcon.style.color = "#46d9e3";

        // SHOW AADHAR
        document.querySelectorAll(".aadhar-field")
        .forEach(field => {

            field.type = "text";

        });

    }

    // DISABLE MODE
    else{

        button.innerHTML =
        `<i class="bi bi-pencil-square"></i> Edit Info`;

        button.classList.remove("active");

        card.classList.add("locked");

        saveSection.classList.add("d-none");

        uploadSection.classList.add("upload-disabled");

        uploadText.innerText =
        "Upload Locked";

        uploadIcon.style.color = "#94a3b8";

        // HIDE AADHAR
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

    // MARK COMPLETE
    localStorage.setItem(
        "aadharCompleted",
        "true"
    );

    // ELEMENTS
    const button =
    document.getElementById("aadharEditBtn");

    const card =
    document.getElementById("aadharCard");

    const saveSection =
    document.getElementById("aadharSaveSection");

    const uploadSection =
    document.getElementById("uploadSection");

    const uploadText =
    document.querySelector(".upload-text");

    const uploadIcon =
    document.querySelector(".upload-icon");

    const fields =
    card.querySelectorAll("input");

    // LOCK ALL FIELDS
    fields.forEach(field => {

        field.disabled = true;

    });

    // RESET BUTTON
    button.innerHTML =
    `<i class="bi bi-pencil-square"></i> Edit Info`;

    button.classList.remove("active");

    // LOCK CARD
    card.classList.add("locked");

    // HIDE SAVE SECTION
    saveSection.classList.add("d-none");

    // DISABLE UPLOAD
    uploadSection.classList.add("upload-disabled");

    uploadText.innerText =
    "Upload Locked";

    uploadIcon.style.color = "#94a3b8";

    // HIDE AADHAR
    document.querySelectorAll(".aadhar-field")
    .forEach(field => {

        field.type = "password";

    });

    // CHECK PROFILE COMPLETION
    checkProfileCompletion();

}