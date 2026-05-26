console.log("LOCATION JS STARTED");

document.addEventListener("DOMContentLoaded", () => {

    console.log("STEP 1");

    const editToggleBtn =
        document.getElementById("locationEditToggleBtn");

    const form =
        document.getElementById("locationForm");

    const formFooter =
        document.getElementById("locationFormFooter");

    const syncCheckbox =
        document.getElementById("locationAddressSyncCheckbox");
        const currentPin = document.getElementById("currentPin");
    const permanentPin = document.getElementById("permanentPin");

    if (currentPin) currentPin.removeAttribute("required");
    if (permanentPin) permanentPin.removeAttribute("required");

    const syncWrapper =
        document.getElementById("syncCheckboxWrapper");

    const section =
        document.getElementById("location-section");

    console.log("STEP 2");

    // SAFETY CHECKS
    if (!editToggleBtn) {
        console.error("locationEditToggleBtn NOT FOUND");
        return;
    }

    if (!form) {
        console.error("locationForm NOT FOUND");
        return;
    }

    console.log("STEP 3");

    // ===================================
    // ALL INPUTS
    // ===================================

    const fields = form.querySelectorAll(
        "input, select, textarea"
    );

    // ===================================
    // EDIT BUTTON CLICK
    // ===================================

    let isEditable = false;

    editToggleBtn.addEventListener("click", () => {

        console.log("EDIT CLICKED");

        isEditable = !isEditable;

        fields.forEach(field => {

            if (
                field.id !== "locationAddressSyncCheckbox" &&
                field.id !== "currentPin" &&
                field.id !== "permanentPin"
            ) {
                field.disabled = !isEditable;
            }

        });

        // sync checkbox
        if (syncCheckbox) {
            syncCheckbox.disabled = !isEditable;
        }

        // FORM UI
        if (isEditable) {

            editToggleBtn.innerHTML =
                `<i class="bi bi-x-circle"></i> Cancel`;

            editToggleBtn.classList.add("active");

            form.classList.remove("locked");

            if (formFooter) {
                formFooter.style.display = "block";
            }

            if (syncWrapper) {
                syncWrapper.classList.remove("disabled-sync");
            }

        } else {

            editToggleBtn.innerHTML =
                `<i class="bi bi-pencil-square"></i> Edit Info`;

            editToggleBtn.classList.remove("active");

            form.classList.add("locked");

            if (formFooter) {
                formFooter.style.display = "none";
            }

            if (syncWrapper) {
                syncWrapper.classList.add("disabled-sync");
            }

            fields.forEach(field => {

            if (field.id !== "locationAddressSyncCheckbox") {
                field.disabled = true;
            }

        });

        }

    });

    // ===================================
    // FORM SUBMIT
    // ===================================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        console.log("FORM SUBMITTED");

        fields.forEach(field => {
            field.disabled = true;
        });

        editToggleBtn.innerHTML =
            `<i class="bi bi-pencil-square"></i> Edit Info`;

        editToggleBtn.classList.remove("active");

        form.classList.add("locked");

        if (formFooter) {
            formFooter.style.display = "none";
        }

        alert("Location Saved Successfully");

    });
    // ===================================
// LOCATION STEP VISIBILITY LOGIC
// ===================================

// CURRENT ADDRESS
const currentState =
    document.getElementById("currentState");

const currentDistrict =
    document.getElementById("currentDistrict");

const currentCity =
    document.getElementById("currentCityTaluka");

const currentVillage =
    document.getElementById("currentVillageTown");

// PERMANENT ADDRESS
const permanentState =
    document.getElementById("permanentState");

const permanentDistrict =
    document.getElementById("permanentDistrict");

const permanentCity =
    document.getElementById("permanentCityTaluka");

const permanentVillage =
    document.getElementById("permanentVillageTown");

// GET FIELD GROUPS
const currentDistrictGroup =
    currentDistrict.closest(".field-group");

const currentCityGroup =
    currentCity.closest(".field-group");

const currentVillageGroup =
    currentVillage.closest(".field-group");

const permanentDistrictGroup =
    permanentDistrict.closest(".field-group");

const permanentCityGroup =
    permanentCity.closest(".field-group");

const permanentVillageGroup =
    permanentVillage.closest(".field-group");

// HIDE ALL INITIALLY
currentDistrictGroup.style.display = "none";
currentCityGroup.style.display = "none";
currentVillageGroup.style.display = "none";

permanentDistrictGroup.style.display = "none";
permanentCityGroup.style.display = "none";
permanentVillageGroup.style.display = "none";

// ===================================
// CURRENT ADDRESS FLOW
// ===================================

// STATE -> DISTRICT
currentState.addEventListener("change", () => {

    if (currentState.value !== "") {

        currentDistrictGroup.style.display = "block";

    } else {

        currentDistrictGroup.style.display = "none";
        currentCityGroup.style.display = "none";
        currentVillageGroup.style.display = "none";

        currentDistrict.value = "";
        currentCity.value = "";
        currentVillage.value = "";
    }

});

// DISTRICT -> CITY
currentDistrict.addEventListener("change", () => {

    if (currentDistrict.value !== "") {

        currentCityGroup.style.display = "block";

    } else {

        currentCityGroup.style.display = "none";
        currentVillageGroup.style.display = "none";

        currentCity.value = "";
        currentVillage.value = "";
    }

});

// CITY -> VILLAGE
currentCity.addEventListener("change", () => {

    if (currentCity.value !== "") {

        currentVillageGroup.style.display = "block";

    } else {

        currentVillageGroup.style.display = "none";

        currentVillage.value = "";
    }

});
// ===================================
// ADDRESS SYNC LOGIC
// ===================================

syncCheckbox.addEventListener("change", () => {

    // ALL CURRENT ADDRESS FIELDS
    const currentFields = {
        houseStatus: document.getElementById("currentHouseStatus"),
        state: document.getElementById("currentState"),
        district: document.getElementById("currentDistrict"),
        city: document.getElementById("currentCityTaluka"),
        village: document.getElementById("currentVillageTown"),
        pin: document.getElementById("currentPin"),
        plot: document.getElementById("currentPlotFlatNo"),
        building: document.getElementById("currentBuildingName"),
        colony: document.getElementById("currentColony"),
        area: document.getElementById("currentArea"),
        nearby: document.getElementById("currentNearby"),
        behind: document.getElementById("currentBehind"),
        map: document.getElementById("currentMapLink"),
        std: document.getElementById("currentStd"),
        phone: document.getElementById("currentPhoneNo")
    };

    // ALL PERMANENT ADDRESS FIELDS
    const permanentFields = {
        houseStatus: document.getElementById("permanentHouseStatus"),
        state: document.getElementById("permanentState"),
        district: document.getElementById("permanentDistrict"),
        city: document.getElementById("permanentCityTaluka"),
        village: document.getElementById("permanentVillageTown"),
        pin: document.getElementById("permanentPin"),
        plot: document.getElementById("permanentPlotFlatNo"),
        building: document.getElementById("permanentBuildingName"),
        colony: document.getElementById("permanentColony"),
        area: document.getElementById("permanentArea"),
        nearby: document.getElementById("permanentNearby"),
        behind: document.getElementById("permanentBehind"),
        map: document.getElementById("permanentMapLink"),
        std: document.getElementById("permanentStd"),
        phone: document.getElementById("permanentPhoneNo")
    };

    // ===================================
    // IF CHECKED
    // ===================================

    if (syncCheckbox.checked) {

        // COPY VALUES
        Object.keys(currentFields).forEach(key => {

            permanentFields[key].value =
                currentFields[key].value;

            // LOCK PERMANENT FIELDS
            permanentFields[key].disabled = true;

        });

    } else {

        // CLEAR VALUES
        Object.keys(permanentFields).forEach(key => {

            permanentFields[key].value = "";

            // ENABLE AGAIN
            permanentFields[key].disabled = !isEditable;

        });

    }

});

// ===================================
// PERMANENT ADDRESS FLOW
// ===================================

// STATE -> DISTRICT
permanentState.addEventListener("change", () => {

    if (permanentState.value !== "") {

        permanentDistrictGroup.style.display = "block";

    } else {

        permanentDistrictGroup.style.display = "none";
        permanentCityGroup.style.display = "none";
        permanentVillageGroup.style.display = "none";

        permanentDistrict.value = "";
        permanentCity.value = "";
        permanentVillage.value = "";
    }

});


// DISTRICT -> CITY
permanentDistrict.addEventListener("change", () => {

    if (permanentDistrict.value !== "") {

        permanentCityGroup.style.display = "block";

    } else {

        permanentCityGroup.style.display = "none";
        permanentVillageGroup.style.display = "none";

        permanentCity.value = "";
        permanentVillage.value = "";
    }

});

// CITY -> VILLAGE
permanentCity.addEventListener("change", () => {

    if (permanentCity.value !== "") {

        permanentVillageGroup.style.display = "block";

    } else {

        permanentVillageGroup.style.display = "none";

        permanentVillage.value = "";
    }

});

    console.log("LOCATION JS LOADED SUCCESSFULLY");

});