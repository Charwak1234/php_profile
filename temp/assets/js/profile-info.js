/* ===================================
PROFILE EDIT TOGGLE
=================================== */

function toggleProfileEdit(){

    const button =
    document.getElementById("profileEditBtn");

    const form =
    document.getElementById("profileForm");

    const saveSection =
    document.getElementById("profileSaveSection");

    const fields =
    form.querySelectorAll(".profile-field");

    const isDisabled =
    fields[0].disabled;

    // TOGGLE ALL PROFILE FIELDS
    fields.forEach(field => {

        field.disabled = !isDisabled;

    });

    // ENABLE MODE
    if(isDisabled){

        button.innerHTML =
        `<i class="bi bi-x-circle"></i> Cancel`;

        button.classList.add("active");

        form.classList.remove("locked");

        saveSection.classList.remove("d-none");

        saveSection.classList.add("animate-pop-in");

        // UPDATE SPOUSE FIELDS
        updateSpouseFields();

    }

    // DISABLE MODE
    else{

        button.innerHTML =
        `<i class="bi bi-pencil-square"></i> Edit Info`;

        button.classList.remove("active");

        form.classList.add("locked");

        saveSection.classList.add("d-none");

        // LOCK SPOUSE FIELDS
        husbandField.disabled = true;

        wifeField.disabled = true;

        husbandWrapper.classList.add(
            "spouse-disabled"
        );

        wifeWrapper.classList.add(
            "spouse-disabled"
        );

    }

}

/* ===================================
PROFILE FORM SUBMIT
=================================== */

function submitProfileForm(){

    // STORE PROFILE COMPLETION
    localStorage.setItem(
        "profileCompleted",
        "true"
    );

    // ELEMENTS
    const button =
    document.getElementById("profileEditBtn");

    const form =
    document.getElementById("profileForm");

    const saveSection =
    document.getElementById("profileSaveSection");

    const fields =
    form.querySelectorAll(".profile-field");

    // LOCK ALL FIELDS
    fields.forEach(field => {

        field.disabled = true;

    });

    // LOCK SPOUSE FIELDS
    husbandField.disabled = true;

    wifeField.disabled = true;

    husbandWrapper.classList.add(
        "spouse-disabled"
    );

    wifeWrapper.classList.add(
        "spouse-disabled"
    );

    // RESET BUTTON
    button.innerHTML =
    `<i class="bi bi-pencil-square"></i> Edit Info`;

    button.classList.remove("active");

    // LOCK FORM
    form.classList.add("locked");

    // HIDE SAVE BUTTON
    saveSection.classList.add("d-none");

    // CHECK IF BOTH SECTIONS COMPLETE
    checkProfileCompletion();

}

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