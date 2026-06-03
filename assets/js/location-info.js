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

    const LOCATION_SAVE_ENDPOINT = "../../api/profile/save_location.php";
    const LOCATION_GET_ENDPOINT = "../../api/profile/get_location.php";

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

    function locationValue(id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    }

    function setLocationValue(id, value) {
        const element = document.getElementById(id);

        if (element && value !== null && value !== undefined) {
            element.value = value;
        }
    }

    function setSelectValueWithFallback(id, value) {
        const element = document.getElementById(id);

        if (!element || value === null || value === undefined || value === "") {
            return;
        }

        const optionExists = Array.from(element.options).some(option => option.value === value);

        if (!optionExists) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            element.appendChild(option);
        }

        element.value = value;
    }

    function copyCurrentToPermanent() {
        const fieldPairs = [
            ["currentHouseStatus", "permanentHouseStatus"],
            ["currentState", "permanentState"],
            ["currentDistrict", "permanentDistrict"],
            ["currentCityTaluka", "permanentCityTaluka"],
            ["currentVillageTown", "permanentVillageTown"],
            ["currentPin", "permanentPin"],
            ["currentPlotFlatNo", "permanentPlotFlatNo"],
            ["currentBuildingName", "permanentBuildingName"],
            ["currentColony", "permanentColony"],
            ["currentArea", "permanentArea"],
            ["currentNearby", "permanentNearby"],
            ["currentBehind", "permanentBehind"],
            ["currentMapLink", "permanentMapLink"],
            ["currentStd", "permanentStd"],
            ["currentPhoneNo", "permanentPhoneNo"]
        ];

        fieldPairs.forEach(([sourceId, targetId]) => {
            setLocationValue(targetId, locationValue(sourceId));
        });
    }

    function showLocationSuccess() {
        const popup = document.getElementById("locationSuccessPopup");

        if (popup) {
            popup.style.display = "block";

            window.setTimeout(() => {
                popup.style.display = "none";
            }, 2500);
        }
    }

    function showLocationError(message) {
        const banner = document.getElementById("locationErrorBanner");
        const text = document.getElementById("locationErrorText");

        if (text) {
            text.textContent = message;
        }

        if (banner) {
            banner.style.display = "block";
        }
    }

    function hideLocationError() {
        const banner = document.getElementById("locationErrorBanner");

        if (banner) {
            banner.style.display = "none";
        }
    }

    function refreshCurrentAddressGroups() {
        if (currentState) {
            if (currentState.value !== "") {
                currentDistrictGroup.style.display = "block";
            } else {
                currentDistrictGroup.style.display = "none";
                currentCityGroup.style.display = "none";
                currentVillageGroup.style.display = "none";
            }
        }

        if (currentDistrict) {
            if (currentDistrict.value !== "") {
                currentCityGroup.style.display = "block";
            } else {
                currentCityGroup.style.display = currentState && currentState.value !== "" ? "block" : "none";
                currentVillageGroup.style.display = "none";
            }
        }

        if (currentCity) {
            if (currentCity.value !== "") {
                currentVillageGroup.style.display = "block";
            } else if (currentDistrict && currentDistrict.value !== "") {
                currentVillageGroup.style.display = "block";
            } else {
                currentVillageGroup.style.display = "none";
            }
        }
    }

    function refreshPermanentAddressGroups() {
        if (permanentState) {
            if (permanentState.value !== "") {
                permanentDistrictGroup.style.display = "block";
            } else {
                permanentDistrictGroup.style.display = "none";
                permanentCityGroup.style.display = "none";
                permanentVillageGroup.style.display = "none";
            }
        }

        if (permanentDistrict) {
            if (permanentDistrict.value !== "") {
                permanentCityGroup.style.display = "block";
            } else {
                permanentCityGroup.style.display = permanentState && permanentState.value !== "" ? "block" : "none";
                permanentVillageGroup.style.display = "none";
            }
        }

        if (permanentCity) {
            if (permanentCity.value !== "") {
                permanentVillageGroup.style.display = "block";
            } else if (permanentDistrict && permanentDistrict.value !== "") {
                permanentVillageGroup.style.display = "block";
            } else {
                permanentVillageGroup.style.display = "none";
            }
        }
    }

    async function loadLocationData() {
        try {
            const response = await fetch(LOCATION_GET_ENDPOINT, {
                headers: {
                    Accept: "application/json"
                }
            });

            const payload = await response.json();

            if (!payload.success || !payload.data) {
                return;
            }

            const data = payload.data;

            setLocationValue("currentHouseStatus", data.house_status || "");
            setLocationValue("currentState", data.state || "");
            setSelectValueWithFallback("currentDistrict", data.district || "");
            setSelectValueWithFallback("currentCityTaluka", data.taluka || "");
            setSelectValueWithFallback("currentVillageTown", data.village || "");
            setLocationValue("currentPin", data.pincode || "");
            setLocationValue("currentPlotFlatNo", data.plot_no || "");
            setLocationValue("currentBuildingName", data.building_name || "");
            setLocationValue("currentColony", data.colony || "");
            setLocationValue("currentArea", data.area || "");
            setLocationValue("currentNearby", data.nearby || "");
            setLocationValue("currentBehind", data.behind || "");
            setLocationValue("currentMapLink", data.map_link || "");
            setLocationValue("currentStd", data.std_code || "");
            setLocationValue("currentPhoneNo", data.phone_no || "");

            setLocationValue("permanentHouseStatus", data.permanent_house_status || "");
            setLocationValue("permanentState", data.permanent_state || "");
            setSelectValueWithFallback("permanentDistrict", data.permanent_district || "");
            setSelectValueWithFallback("permanentCityTaluka", data.permanent_taluka || "");
            setSelectValueWithFallback("permanentVillageTown", data.permanent_village || "");
            setLocationValue("permanentPin", data.permanent_pincode || "");
            setLocationValue("permanentPlotFlatNo", data.permanent_plot_no || "");
            setLocationValue("permanentBuildingName", data.permanent_building_name || "");
            setLocationValue("permanentColony", data.permanent_colony || "");
            setLocationValue("permanentArea", data.permanent_area || "");
            setLocationValue("permanentNearby", data.permanent_nearby || "");
            setLocationValue("permanentBehind", data.permanent_behind || "");
            setLocationValue("permanentMapLink", data.permanent_map_link || "");
            setLocationValue("permanentStd", data.permanent_std_code || "");
            setLocationValue("permanentPhoneNo", data.permanent_phone_no || "");

            refreshCurrentAddressGroups();
            refreshPermanentAddressGroups();
        } catch (error) {
            console.error("Unable to load location details:", error);
        }
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

            const currentPin = document.getElementById("currentPin");
            const permanentPin = document.getElementById("permanentPin");

            if (currentPin) {
                currentPin.disabled = !isEditable;
            }

            if (permanentPin) {
                permanentPin.disabled = !isEditable;
            }

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
        hideLocationError();

        if (syncCheckbox && syncCheckbox.checked) {
            copyCurrentToPermanent();
        }

        const formData = new FormData();
        formData.append("addressSync", syncCheckbox && syncCheckbox.checked ? "1" : "0");

        [
            "currentHouseStatus",
            "currentState",
            "currentDistrict",
            "currentCityTaluka",
            "currentVillageTown",
            "currentPin",
            "currentPlotFlatNo",
            "currentBuildingName",
            "currentColony",
            "currentArea",
            "currentNearby",
            "currentBehind",
            "currentMapLink",
            "currentStd",
            "currentPhoneNo",
            "permanentHouseStatus",
            "permanentState",
            "permanentDistrict",
            "permanentCityTaluka",
            "permanentVillageTown",
            "permanentPin",
            "permanentPlotFlatNo",
            "permanentBuildingName",
            "permanentColony",
            "permanentArea",
            "permanentNearby",
            "permanentBehind",
            "permanentMapLink",
            "permanentStd",
            "permanentPhoneNo"
        ].forEach(id => {
            formData.append(id, locationValue(id));
        });

        fetch(LOCATION_SAVE_ENDPOINT, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(payload => {
            if (!payload.success) {
                showLocationError(payload.message || "Failed to save location details.");
                return;
            }

            localStorage.setItem("locationCompleted", "true");

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

            if (syncWrapper) {
                syncWrapper.classList.add("disabled-sync");
            }

            showLocationSuccess();
        })
        .catch(error => {
            console.error("Unable to save location details:", error);
            showLocationError("Unable to save location details.");
        });

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

    loadLocationData();

});