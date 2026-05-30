/*And backend will later handle:

fetching categories from DB
saving selected values
updating records
deleting records

Your current JS should therefore:

NOT hardcode final backend logic
ONLY use dummy JSON for testing
keep comments for backend developers

That is already what we fixed.*/ 


document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const professionEditBtn =
        document.getElementById("professionEditBtn");

    const professionCard =
        document.getElementById("professionCard");

    const professionForm =
        document.getElementById("professionForm");

    const mainCategory =
        document.getElementById("mainProfession");

    const subCategoryWrapper =
        document.getElementById("subProfessionWrapper");

    const subCategory =
        document.getElementById("subProfession");

    const thirdCategoryWrapper =
        document.getElementById("twiceSubProfessionWrapper");

    const thirdCategory =
        document.getElementById("twiceSubProfession");

    const professionTableBody =
        document.getElementById("professionTableBody");

    const professionTableWrapper =
        document.getElementById("professionTableWrapper");

    const employmentSaveBtn =
        document.getElementById("employmentSaveBtn");

    const jobTypeSaveBtn =
        document.getElementById("jobTypeSaveBtn");
        const professionFinalSubmitBtn =
            document.getElementById("professionFinalSubmitBtn");

        const scheduleContainer =
            document.getElementById("scheduleContainer");

        const scheduleTableWrapper =
            document.getElementById("scheduleTableWrapper");

        const scheduleTableBody =
            document.getElementById("scheduleTableBody");

    /* =========================================
       SAFETY CHECK
    ========================================= */

    if (
        !professionEditBtn ||
        !professionCard ||
        !professionForm
    ) {
        console.error("Profession section elements missing");
        return;
    }

    /* =========================================
       DUMMY DATA
    ========================================= */

    const professionData = {

        "Technology": {

            "Frontend Development": [
                "React Developer",
                "Angular Developer",
                "Vue Developer"
            ],

            "Backend Development": [
                "Node.js Developer",
                "PHP Developer",
                "Java Developer"
            ],

            "Mobile Development": [
                "Android Developer",
                "iOS Developer",
                "Flutter Developer"
            ]

        },

        "Medical": {

            "Doctors": [
                "Surgeon",
                "Physician",
                "Dentist"
            ],

            "Nursing": [
                "ICU Nurse",
                "Ward Nurse",
                "Staff Nurse"
            ]

        },

        "Business": {

            "Management": [
                "Project Manager",
                "HR Manager",
                "Operations Manager"
            ],

            "Sales": [
                "Sales Executive",
                "Marketing Executive",
                "Business Analyst"
            ]

        }

    };

    /* =========================================
       INITIAL LOCK STATE
    ========================================= */

    lockProfessionSection();

    /* =========================================
       EDIT TOGGLE
    ========================================= */

    professionEditBtn.addEventListener("click", () => {

        if (professionCard.classList.contains("locked")) {

            unlockProfessionSection();

        } else {

            lockProfessionSection();

        }

    });

    /* =========================================
       LOCK FUNCTION
    ========================================= */

    function lockProfessionSection() {

        professionCard.classList.add("locked");

        professionEditBtn.innerHTML =
            `<i class="bi bi-pencil-square"></i> Edit Information`;

        professionEditBtn.classList.remove("active");

        const fields =
            document.querySelectorAll(".profession-input");

        fields.forEach(field => {
            field.disabled = true;
        });
                document
            .querySelectorAll(".schedule-add-btn")
            .forEach(btn => {

                btn.disabled = true;

            });

        if (employmentSaveBtn) {
            employmentSaveBtn.disabled = true;
        }

        if (jobTypeSaveBtn) {
            jobTypeSaveBtn.disabled = true;
        }

            const submitBtn =
                document.getElementById("professionSaveBtn");

            if (submitBtn) {
                submitBtn.disabled = true;
            }

            if (professionFinalSubmitBtn) {
                professionFinalSubmitBtn.disabled = true;
            }

        }

    /* =========================================
       UNLOCK FUNCTION
    ========================================= */

    function unlockProfessionSection() {

        professionCard.classList.remove("locked");

        professionEditBtn.innerHTML =
            `<i class="bi bi-x-circle"></i> Cancel`;

        professionEditBtn.classList.add("active");

        const fields =
            document.querySelectorAll(".profession-input");

        fields.forEach(field => {
            field.disabled = false;
        });
            document
        .querySelectorAll(".schedule-add-btn")
        .forEach(btn => {

            btn.disabled = false;

        });

        if (employmentSaveBtn) {
            employmentSaveBtn.disabled = false;
        }

        if (jobTypeSaveBtn) {
            jobTypeSaveBtn.disabled = false;
        }

            const submitBtn =
        document.getElementById("professionSaveBtn");

            if (submitBtn) {
                submitBtn.disabled = false;
            }

            if (professionFinalSubmitBtn) {
                professionFinalSubmitBtn.disabled = false;
            }

        }

    /* =========================================
       EMPLOYMENT SAVE
    ========================================= */

    if (employmentSaveBtn) {

        employmentSaveBtn.addEventListener("click", () => {

            showSuccessMessage(
                "Employment categories saved successfully."
            );

        });

    }

    /* =========================================
       JOB TYPE SAVE
    ========================================= */

    if (jobTypeSaveBtn) {

        jobTypeSaveBtn.addEventListener("click", () => {

            showSuccessMessage(
                "Job types saved successfully."
            );

        });

    }

    /* =========================================
       MAIN CATEGORY CHANGE
    ========================================= */

    if (mainCategory) {

        mainCategory.addEventListener("change", () => {

            const selectedMain =
                mainCategory.value;

            subCategory.innerHTML =
                `<option value="">Select Sub Profession</option>`;

            thirdCategory.innerHTML =
                `<option value="">Select Profession</option>`;

            thirdCategoryWrapper.style.display =
                "none";

            if (selectedMain === "") {

                subCategoryWrapper.style.display =
                    "none";

                return;

            }

            subCategoryWrapper.style.display =
                "block";

            const subCategories =
                Object.keys(
                    professionData[selectedMain]
                );

            subCategories.forEach(item => {

                const option =
                    document.createElement("option");

                option.value = item;
                option.textContent = item;

                subCategory.appendChild(option);

            });

        });

    }

    /* =========================================
       SUB CATEGORY CHANGE
    ========================================= */

    if (subCategory) {

        subCategory.addEventListener("change", () => {

            const selectedMain =
                mainCategory.value;

            const selectedSub =
                subCategory.value;

            thirdCategory.innerHTML =
                `<option value="">Select Profession</option>`;

            if (selectedSub === "") {

                thirdCategoryWrapper.style.display =
                    "none";

                return;

            }

            thirdCategoryWrapper.style.display =
                "block";

            const thirdLevelItems =
                professionData[selectedMain][selectedSub];

            thirdLevelItems.forEach(item => {

                const option =
                    document.createElement("option");

                option.value = item;
                option.textContent = item;

                thirdCategory.appendChild(option);

            });

        });

    }

            /* =========================================
            PROFESSION SAVE
            ========================================= */

            const professionSaveBtn =
                document.getElementById("professionSaveBtn");

            if (professionSaveBtn) {

                professionSaveBtn.addEventListener("click", () => {

                    const mainValue =
                        mainCategory.value;

                    const subValue =
                        subCategory.value;

                    const thirdValue =
                        thirdCategory.value;

                    if (
                        mainValue === "" ||
                        subValue === "" ||
                        thirdValue === ""
                    ) {

                        alert(
                            "Please select all profession categories."
                        );

                        return;

                    }

                    professionTableWrapper.style.display =
                        "block";
                        const existingRows =
    professionTableBody.querySelectorAll("tr");

                            let alreadyExists = false;

                            existingRows.forEach(row => {

                                const cells =
                                    row.querySelectorAll("td");

                                if (
                                    cells[0].textContent === mainValue &&
                                    cells[1].textContent === subValue &&
                                    cells[2].textContent === thirdValue
                                ) {

                                    alreadyExists = true;

                                }

                            });

                            if (alreadyExists) {

                                alert(
                                    "This profession category already exists."
                                );

                                return;

                            }

                    const row =
                        document.createElement("tr");

                    row.innerHTML = `
                        <td>${mainValue}</td>
                        <td>${subValue}</td>
                        <td>${thirdValue}</td>

                        <td>
                            <button type="button"
                                    class="delete-btn profession-delete-btn">
                                Delete
                            </button>
                        </td>
                    `;

                    professionTableBody.appendChild(row);

                    showSuccessMessage(
                        "Profession category saved successfully."
                    );

                });

            }

                /* =========================================
                DELETE ROW
                ========================================= */

                document.addEventListener("click", (e) => {

                    /* Schedule Delete */

                    if (
                        e.target.classList.contains(
                            "schedule-delete-btn"
                        )
                    ) {

                        e.target.closest("tr").remove();

                        scheduleCount--;

                        if (
                            scheduleTableBody.children.length === 0
                        ) {

                            scheduleTableWrapper.style.display =
                                "none";

                        }

                    }

                    /* Profession Delete */

                    if (
                        e.target.classList.contains(
                            "profession-delete-btn"
                        )
                    ) {

                        e.target.closest("tr").remove();

                        if (
                            professionTableBody.children.length === 0
                        ) {

                            professionTableWrapper.style.display =
                                "none";

                        }

                    }

                });

                /* =========================================
            SCHEDULE SECTION
            ========================================= */

            let scheduleCount = 0;

            document.addEventListener("click", (e) => {

                if (
                    e.target.classList.contains(
                        "schedule-add-btn"
                    )
                ) {

                    const currentRow =
                        e.target.closest(".schedule-row");
                        const day =
    currentRow.querySelector(".schedule-day").value;

                    const fromTime =
                        currentRow.querySelector(".schedule-from").value;

                    const toTime =
                        currentRow.querySelector(".schedule-to").value;

                    const description =
                        currentRow.querySelector(".schedule-description").value;
                        if (description.length > 30) {

                            alert(
                                "Description cannot exceed 30 characters."
                            );

                            return;

                        }

                    if (
                        day === "" ||
                        fromTime === "" ||
                        toTime === "" ||
                        description.trim() === ""
                    ) {

                        alert(
                            "Please fill all schedule fields."
                        );

                        return;

                    }

                    if (scheduleCount >= 10) {

                        alert(
                            "You reached maximum schedule limit."
                        );

                        return;

                    }

                    scheduleTableWrapper.style.display =
                        "block";

                    const tableRow =
                        document.createElement("tr");

                    tableRow.innerHTML = `
                        <td>${day}</td>
                        <td>${fromTime}</td>
                        <td>${toTime}</td>
                        <td>${description}</td>

                        <td>
                            <button type="button"
                                    class="delete-btn schedule-delete-btn">
                                Delete
                            </button>
                        </td>
                    `;

                        scheduleTableBody.appendChild(tableRow);

                        scheduleCount++;

                        currentRow.querySelector(".schedule-day").value = "";
                        currentRow.querySelector(".schedule-from").value = "";
                        currentRow.querySelector(".schedule-to").value = "";
                        currentRow.querySelector(".schedule-description").value = "";

                        showSuccessMessage(
                            "Schedule added successfully."
                        );

                    if (scheduleCount >= 10) {

                        alert(
                            "You reached maximum schedule limit."
                        );

                        return;
                    }

                    const newRow =
                        document.createElement("div");

                    newRow.className =
                        "schedule-row";



                }

            });

            /* =========================================
            FINAL SUBMIT
            ========================================= */

            if (professionFinalSubmitBtn) {

                professionFinalSubmitBtn.addEventListener(
                    "click",
                    () => {

                        /*
                        BACKEND NOTE:

                        Final submit API will be called here.

                        Backend should save:

                        - Employment Categories
                        - Job Types
                        - Profession Categories
                        - Schedule Entries

                        Current frontend only shows success.
                        */

                        showSuccessMessage(
                            "Profession information submitted successfully."
                        );

                        lockProfessionSection();

                    }
                );

            }




            function sortScheduleTable() {

                    const dayOrder = {

                        Monday: 1,
                        Tuesday: 2,
                        Wednesday: 3,
                        Thursday: 4,
                        Friday: 5,
                        Saturday: 6,
                        Sunday: 7

                    };

                    const rows =
                        Array.from(
                            scheduleTableBody.querySelectorAll("tr")
                        );

                    rows.sort((a, b) => {

                        const dayA =
                            a.cells[0].textContent;

                        const dayB =
                            b.cells[0].textContent;

                        if (dayA !== dayB) {

                            return (
                                dayOrder[dayA] -
                                dayOrder[dayB]
                            );

                        }

                        const timeA =
                            a.cells[1].textContent;

                        const timeB =
                            b.cells[1].textContent;

                        return timeA.localeCompare(timeB);

                    });

                    scheduleTableBody.innerHTML = "";

                    rows.forEach(row => {

                        scheduleTableBody.appendChild(row);

                    });

                }
    /* =========================================
       SUCCESS POPUP
    ========================================= */

    function showSuccessMessage(message) {

        const oldPopup =
            document.getElementById(
                "professionSuccessPopup"
            );

        if (oldPopup) {
            oldPopup.remove();
        }

        const popup =
            document.createElement("div");

        popup.id =
            "professionSuccessPopup";

        popup.className =
            "complete-badge animate-pop-in";

        popup.style.position = "fixed";
        popup.style.top = "20px";
        popup.style.right = "20px";
        popup.style.zIndex = "99999";
        popup.style.background = "#10b981";
        popup.style.color = "#fff";
        popup.style.padding = "14px 22px";
        popup.style.borderRadius = "14px";
        popup.style.fontWeight = "600";

        popup.innerHTML = `
            <i class="bi bi-check-circle"></i>
            ${message}
        `;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2500);

    }

});