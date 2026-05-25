/* ===================================
PROFILE EDIT TOGGLE
=================================== */
function toggleProfileEdit(){
    const button = document.getElementById("profileEditBtn");
    const form = document.getElementById("profileForm");
    const saveSection = document.getElementById("profileSaveSection");
    const fields = form.querySelectorAll(".profile-field");
    const isDisabled = fields[0].disabled;

    fields.forEach(field => {
    field.disabled = !isDisabled;
});

/* ===================================
BIRTH CERTIFICATE IMAGE TOGGLE
=================================== */

const birthCertificateInput =
document.getElementById(
    "birthCertificateImage"
);

if(birthCertificateInput){

    birthCertificateInput.disabled =
    !isDisabled;

}

    if(isDisabled){
        button.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
        button.classList.add("active");
        form.classList.remove("locked");
        saveSection.classList.remove("d-none");
        saveSection.classList.add("animate-pop-in");
        updateSpouseFields();
    } else {
        button.innerHTML = `<i class="bi bi-pencil-square"></i> Edit Info`;
        button.classList.remove("active");
        form.classList.add("locked");
        saveSection.classList.add("d-none");
        husbandField.disabled = true;
        wifeField.disabled = true;
        husbandWrapper.classList.add("spouse-disabled");
        wifeWrapper.classList.add("spouse-disabled");
    }
}

/* ===================================
PROFILE FORM SUBMIT (UPDATED)
=================================== */
function submitProfileForm(){
    const form = document.getElementById("profileForm");
    const fields = form.querySelectorAll(".profile-field");
    let isValid = true;

    // VALIDATION: Check required fields (exclude spouse fields)
    fields.forEach(field => {
        if (field.id === "husbandName" || field.id === "wifeName") return;
        if (field.hasAttribute("required") && !field.value.trim()) {
            field.style.borderColor = "red";
            isValid = false;
        } else {
            field.style.borderColor = "";
        }
    });

    if (!isValid) {
        alert("Please fill in all mandatory fields.");
        return;
    }

    // SUCCESS LOGIC
    localStorage.setItem("profileCompleted", "true");
    const button = document.getElementById("profileEditBtn");
    const saveSection = document.getElementById("profileSaveSection");

    fields.forEach(field => { field.disabled = true; });
    husbandField.disabled = true;
    wifeField.disabled = true;
    husbandWrapper.classList.add("spouse-disabled");
    wifeWrapper.classList.add("spouse-disabled");

    button.innerHTML = `<i class="bi bi-pencil-square"></i> Edit Info`;
    button.classList.remove("active");
    form.classList.add("locked");
    saveSection.classList.add("d-none");

    if (typeof checkProfileCompletion === 'function') checkProfileCompletion();

    // AUTO-NAVIGATE
    const aadharItem = document.querySelector('[data-section="aadhar-section"]');
    if (aadharItem) aadharItem.click();
}

/* ===================================
AGE & SPOUSE LOGIC (Unchanged)
=================================== */
// ... [Keep your original Age Calculation, Spouse Logic, and Event Listeners exactly as they were]

/* ===================================
AGE CALCULATION
=================================== */

const dobField =
document.getElementById("dob");

const ageField =
document.getElementById("age");

if(dobField){

    dobField.addEventListener("change", () => {

        const dob =
        new Date(dobField.value);

        const today =
        new Date();

        let age =
        today.getFullYear() -
        dob.getFullYear();

        const monthDiff =
        today.getMonth() -
        dob.getMonth();

        if(
            monthDiff < 0 ||
            (
                monthDiff === 0 &&
                today.getDate() < dob.getDate()
            )
        ){

            age--;

        }

        ageField.value =
        age >= 0 ? age : "";

    });

}

/* ===================================
SPOUSE FIELD LOGIC
=================================== */

const genderField =
document.getElementById("gender");

const maritalField =
document.getElementById("maritalStatus");

const husbandField =
document.getElementById("husbandName");

const wifeField =
document.getElementById("wifeName");

const husbandWrapper =
document.getElementById("husbandFieldWrapper");

const wifeWrapper =
document.getElementById("wifeFieldWrapper");

function updateSpouseFields(){

    const gender =
    genderField.value;

    const marital =
    maritalField.value;

    // RESET
    husbandField.disabled = true;

    wifeField.disabled = true;

    husbandWrapper.classList.add(
        "spouse-disabled"
    );

    wifeWrapper.classList.add(
        "spouse-disabled"
    );

    husbandField.placeholder =
    "Locked";

    wifeField.placeholder =
    "Locked";

    // FEMALE CASE
    if(
        gender === "Female" &&
        marital === "Married"
    ){

        husbandField.disabled = false;

        husbandWrapper.classList.remove(
            "spouse-disabled"
        );

        husbandField.placeholder =
        "Husband's Full Name";

    }

    // MALE CASE
    if(
        gender === "Male" &&
        marital === "Married"
    ){

        wifeField.disabled = false;

        wifeWrapper.classList.remove(
            "spouse-disabled"
        );

        wifeField.placeholder =
        "Wife's Full Name";

    }

}

// EVENT LISTENERS
if(genderField && maritalField){

    genderField.addEventListener(
        "change",
        updateSpouseFields
    );

    maritalField.addEventListener(
        "change",
        updateSpouseFields
    );

}
/* ===================================
BIRTH CERTIFICATE UPLOAD
=================================== */

const birthCertificateBox =
document.getElementById(
    "birthCertificateUploadBox"
);

const birthCertificateInput =
document.getElementById(
    "birthCertificateImage"
);

const birthCertificateText =
document.getElementById(
    "birthCertificateUploadText"
);

if(
    birthCertificateBox &&
    birthCertificateInput
){

    // CLICK UPLOAD
    birthCertificateBox.addEventListener(
        "click",
        () => {

            if(
                !birthCertificateInput.disabled
            ){

                birthCertificateInput.click();

            }

        }
    );

    // FILE CHANGE
    birthCertificateInput.addEventListener(
        "change",
        () => {

            const file =
            birthCertificateInput.files[0];

            if(file){

                // ONLY IMAGE
                if(
                    !file.type.startsWith(
                        "image/"
                    )
                ){

                    alert(
                        "Only image files are allowed"
                    );

                    birthCertificateInput.value = "";

                    return;

                }

                birthCertificateText.innerText =
                file.name;

            }

        }
    );

}