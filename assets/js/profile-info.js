/* ===================================
PROFILE EDIT TOGGLE
=================================== */
const PROFILE_SAVE_ENDPOINT = window.profileApiUrl("../../api/profile/save_profile.php");
const PROFILE_GET_ENDPOINT = window.profileApiUrl("../../api/profile/get_profile.php");

function profileValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function setProfileValue(id, value) {
    const element = document.getElementById(id);

    if (element && value !== null && value !== undefined) {
        element.value = value;
    }
}

function normalizeBirthTime(timeValue) {
    if (!timeValue) {
        return { time: "", format: "AM" };
    }

    const parts = timeValue.split(":");
    let hour = parseInt(parts[0], 10) || 0;
    const minute = parts[1] || "00";
    const second = parts[2] || "00";
    const format = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
    }

    return {
        time: `${String(hour).padStart(2, "0")}:${minute}:${second}`,
        format
    };
}

function formatAgeForDisplay(ageValue) {
    if (ageValue === null || ageValue === undefined || ageValue === "") {
        return "";
    }

    return `${ageValue} years`;
}

async function loadProfileData() {
    const ageField = document.getElementById("age");

    try {
        const response = await fetch(PROFILE_GET_ENDPOINT, {
            credentials: "same-origin",
            headers: {
                "Accept": "application/json"
            }
        });

        const payload = await response.json();

        if (!payload.success || !payload.data) {
            return;
        }

        const data = payload.data;

        setProfileValue("firstName", data.first_name || "");
        setProfileValue("middleName", data.middle_name || "");
        setProfileValue("lastName", data.last_name || "");
        setProfileValue("gender", data.gender || "");
        setProfileValue("maritalStatus", data.marital_status || "");
        setProfileValue("dob", data.dob || "");
        setProfileValue("birthPlace", data.birth_place || "");
        setProfileValue("birthHospital", data.hospital_name || "");
        setProfileValue("fatherName", data.father_name || "");
        setProfileValue("motherName", data.mother_name || "");
        setProfileValue("husbandName", data.husband_name || "");
        setProfileValue("wifeName", data.wife_name || "");

        if (data.birth_time) {
            const normalized = normalizeBirthTime(data.birth_time);
            setProfileValue("birthTime", normalized.time);
            setProfileValue("birthTimeFormat", normalized.format);
        }

        if (ageField) {
            ageField.value = formatAgeForDisplay(data.age);
        }

        localStorage.setItem("profileCompleted", "true");
        if (typeof checkProfileCompletion === "function") {
            checkProfileCompletion();
        }
    } catch (error) {
        console.error("Unable to load profile data:", error);
    }
}

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
async function submitProfileForm(){
    const form = document.getElementById("profileForm");
    const fields = form.querySelectorAll(".profile-field");
    const button = document.getElementById("profileEditBtn");
    const saveSection = document.getElementById("profileSaveSection");
    const birthCertificateInput = document.getElementById("birthCertificateImage");
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

    const formData = new FormData();

    formData.append("firstName", profileValue("firstName"));
    formData.append("middleName", profileValue("middleName"));
    formData.append("lastName", profileValue("lastName"));
    formData.append("gender", profileValue("gender"));
    formData.append("maritalStatus", profileValue("maritalStatus"));
    formData.append("fatherName", profileValue("fatherName"));
    formData.append("motherName", profileValue("motherName"));
    formData.append("husbandName", profileValue("husbandName"));
    formData.append("wifeName", profileValue("wifeName"));
    formData.append("dob", profileValue("dob"));
    formData.append("birthTime", profileValue("birthTime"));
    formData.append("birthTimeFormat", profileValue("birthTimeFormat") || "AM");
    formData.append("birthPlace", profileValue("birthPlace"));
    formData.append("birthHospital", profileValue("birthHospital"));

    if (birthCertificateInput && birthCertificateInput.files[0]) {
        formData.append("birthCertificateImage", birthCertificateInput.files[0]);
    }

    const saveResponse = await fetch(PROFILE_SAVE_ENDPOINT, {
        method: "POST",
        credentials: "same-origin",
        body: formData
    });

    const payload = await saveResponse.json();

    if (!payload.success) {
        alert(payload.message || "Failed to save profile data.");
        return;
    }

    localStorage.setItem("profileCompleted", "true");

    fields.forEach(field => { field.disabled = true; });
    husbandField.disabled = true;
    wifeField.disabled = true;
    husbandWrapper.classList.add("spouse-disabled");
    wifeWrapper.classList.add("spouse-disabled");

    if (birthCertificateInput) {
        birthCertificateInput.disabled = true;
    }

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

/* ===================================
AGE CALCULATION (UPDATED: years + months + days)
=================================== */

const dobField =
document.getElementById("dob");

const ageField =
document.getElementById("age");

function calculateAgeDetailed(dobValue) {

    const dob = new Date(dobValue);
    const today = new Date();

    if (dob > today) return "";

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // adjust days
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // adjust months
    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years} years ${months} months ${days} days old`;
}

if (dobField) {

    dobField.addEventListener("change", () => {

        const value = dobField.value;

        if (!value) {
            ageField.value = "";
            return;
        }

        ageField.value = calculateAgeDetailed(value);
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
/* ===================================
12 HOUR TIME VALIDATION
=================================== */

const birthTimeField =
document.getElementById("birthTime");

document.addEventListener("DOMContentLoaded", loadProfileData);

if(birthTimeField){

    birthTimeField.addEventListener(
        "change",
        () => {

            const value =
            birthTimeField.value;

            if(!value) return;

            const parts =
            value.split(":");

            const hour =
            parseInt(parts[0]);

            // ALLOW ONLY 00 to 12
            if(hour > 12){

                alert(
                    "Please select time between 00:00 and 12:59 only."
                );

                birthTimeField.value = "";

            }

        }
    );

}
