if (window.__qualificationModuleLoaded) {
    console.warn("Qualification module already initialized. Skipping duplicate bind.");
} else {
    window.__qualificationModuleLoaded = true;

document.addEventListener("DOMContentLoaded", () => {
console.log("Qualification JS Loaded");
const qualBoard =
    document.getElementById("qualBoard");

const otherBoardWrapper =
    document.getElementById("otherBoardWrapper");

const otherBoardName =
    document.getElementById("otherBoardName");
console.log("qualBoard:", qualBoard);
console.log("otherBoardWrapper:", otherBoardWrapper);
console.log("otherBoardName:", otherBoardName);


    const section = document.getElementById("qualificationSection");
    const editToggleBtn = document.getElementById("qualEditToggleBtn");
    const form = document.getElementById("qualificationForm");
    const formFooter = document.getElementById("qualFormFooter");
    const errorBanner = document.getElementById("qualErrorBanner");
    const errorText = document.getElementById("qualErrorText");
    const successPopup = document.getElementById("qualSuccessPopup");
    const tableBody = document.getElementById("qualRegistryTableBody");

    const degreeInput = document.getElementById("qualDegree");
    const instTypeInput = document.getElementById("qualInstType");
    const boardInput = document.getElementById("qualBoard");
    const boardNameInput =
    document.getElementById("qualBoardName");
    const otherInstitutionWrapper =
    document.getElementById("otherInstitutionWrapper");

const otherInstitutionInput =
    document.getElementById("otherInstitutionName");
    const courseNameInput = document.getElementById("qualCourseName");
    const branchNameInput = document.getElementById("qualBranchName");
    const marksObtainedInput = document.getElementById("qualMarksObtained");
    const marksOutOf = document.getElementById("qualMarksOutOf");
    const percentageInput = document.getElementById("qualPercentage");
    const gradeInput = document.getElementById("qualGrade");

    // NEW
    const passingMonthInput = document.getElementById("qualPassingMonth");
    const passingYearInput = document.getElementById("qualPassingYear");

    const fileInput = document.getElementById("qualFile");
    const uploadWrapper = document.getElementById("qualUploadWrapper");
    const uploadStatusText = document.getElementById("uploadStatusText");

    const lightbox = document.getElementById("qualLightboxModal");
    const closeLightboxBtn = document.getElementById("closeQualLightbox");

    let qualificationsList = [];
    let certificateImageBase64 = null;
    let isEditable = false;
        qualBoard.addEventListener("change", () => {

            console.log("Board Changed:", qualBoard.value);

            if (qualBoard.value === "Other") {

                otherBoardWrapper.style.display = "block";
                otherBoardName.disabled = false;

            } else {

                otherBoardWrapper.style.display = "none";
                otherBoardName.disabled = true;
                otherBoardName.value = "";

            }

        });

    // =========================
    // Upload click
    // =========================
    uploadWrapper?.addEventListener("click", () => {
        fileInput.click();
    });


    // =========================
    // EDIT TOGGLE
    // =========================
    editToggleBtn?.addEventListener("click", () => {
        console.log("Edit button clicked");
        isEditable = !isEditable;
        errorBanner.style.display = "none";

        if (isEditable) {
            editToggleBtn.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
            editToggleBtn.classList.add("active");
            form.classList.remove("locked");
            formFooter.style.display = "flex";
            console.log("EDIT MODE ENABLED");
            console.log("About to call setInputsDisabledState");
setInputsDisabledState(false);
        } else {
            resetFormWorkspace();
        }
    });

function setInputsDisabledState(status) {

    console.log("setInputsDisabledState called:", status);

    if (otherBoardName) {

        if (status) {

            otherBoardName.disabled = true;

        } else {

            otherBoardName.disabled =
                boardInput.value !== "Other";
        }
    }

    degreeInput.disabled = status;
    instTypeInput.disabled = status;
    boardInput.disabled = status;
    boardNameInput.disabled = status;

    console.log("boardInput.disabled =", boardInput.disabled);

    if (status) {

        otherInstitutionInput.disabled = true;

    } else {

        otherInstitutionInput.disabled =
            boardNameInput.value !== "Other";
    }

    courseNameInput.disabled = status;
    branchNameInput.disabled = status;
    marksObtainedInput.disabled = status;
    marksOutOf.disabled = status;
    gradeInput.disabled = status;

    passingMonthInput.disabled = status;
    passingYearInput.disabled = status;

    fileInput.disabled = status;

    uploadWrapper.classList.toggle("upload-disabled", status);
}

    function resetFormWorkspace() {
        if (otherBoardWrapper) {
                otherBoardWrapper.style.display = "none";
            }

            if (otherBoardName) {
                otherBoardName.value = "";
            }
        isEditable = false;

        editToggleBtn.innerHTML = `<i class="bi bi-pencil-square"></i> Add Credentials`;
        editToggleBtn.classList.remove("active");

        form.classList.add("locked");
        formFooter.style.display = "none";

        form.reset();

        certificateImageBase64 = null;

        // RESET FIX
        passingMonthInput.value = "";
        passingYearInput.value = "";

        percentageInput.value = "";

        uploadStatusText.innerText =
            "Click here to upload your academic certificate image";

            otherInstitutionWrapper.style.display = "none";

            otherInstitutionInput.value = "";

        setInputsDisabledState(true);
    }

    // =========================
    // PERCENTAGE
    // =========================
    function calculatePercentage() {
        const obtained = parseFloat(marksObtainedInput.value);
        const total = parseFloat(marksOutOf.value);

        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
            const calculated = ((obtained / total) * 100).toFixed(2);
            percentageInput.value = `${calculated}%`;
        } else {
            percentageInput.value = "";
        }
    }

    marksObtainedInput?.addEventListener("input", calculatePercentage);
    marksOutOf?.addEventListener("input", calculatePercentage);
boardInput?.addEventListener("change", () => {

    if (!otherBoardWrapper || !otherBoardName) {
        return;
    }

    if (boardInput.value === "Other") {

        otherBoardWrapper.style.display = "block";
        otherBoardName.disabled = false;

    } else {

        otherBoardWrapper.style.display = "none";
        otherBoardName.disabled = true;
        otherBoardName.value = "";
    }
});
boardNameInput?.addEventListener("change", () => {

    if (!otherInstitutionWrapper || !otherInstitutionInput) {
        return;
    }

    if (boardNameInput.value === "Other") {

        otherInstitutionWrapper.style.display = "block";
        otherInstitutionInput.disabled = false;

    } else {

        otherInstitutionWrapper.style.display = "none";
        otherInstitutionInput.disabled = true;
        otherInstitutionInput.value = "";
    }
});

    // =========================
    // FILE UPLOAD
    // =========================
    fileInput?.addEventListener("change", (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (!validImageTypes.includes(file.type)) {
            alert("Only PNG/JPG allowed");
            fileInput.value = "";
            return;
        }

        uploadStatusText.innerText = file.name;

        const reader = new FileReader();
        reader.onloadend = () => {
            certificateImageBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    });

    // =========================
    // FORM SUBMIT
    // =========================
    form?.addEventListener("submit", (e) => {
        e.preventDefault();

            if (
                !degreeInput.value ||
                !boardInput.value ||
                !boardNameInput.value ||
                !instTypeInput.value
            ) {
                errorText.innerText = "Required fields missing";
                errorBanner.style.display = "block";
                return;
            }

            if (
                boardNameInput.value === "Other" &&
                !otherInstitutionInput.value.trim()
            ) {
                errorText.innerText =
                    "Please enter institution name";

                errorBanner.style.display = "block";

                return;
            }
            if (
                    boardInput.value === "Other" &&
                    !otherBoardName.value.trim()
                ) {
                    errorText.innerText =
                        "Please enter Board / University name";

                    errorBanner.style.display = "block";

                    return;
                }
                let finalBoardName = "";

            let finalInstitutionName = "";
                        if (boardInput.value === "Other") {

                finalBoardName =
                    otherBoardName.value.trim();

            } else {

                finalBoardName =
                    boardInput.value;
            }

                if (boardNameInput.value === "Other") {

                    finalInstitutionName =
                        otherInstitutionInput.value.trim();

                } else {

                    finalInstitutionName =
                        boardNameInput.value;
                }
        const id = "qual-" + Date.now();

        const payload = {
            id,
            degree: degreeInput.value,
            board: finalBoardName,
            boardName: finalInstitutionName,

                isCustomInstitution:
                    boardNameInput.value === "Other",
            institutionType: instTypeInput.value,
            courseName: courseNameInput.value || "N/A",
            branchName: branchNameInput.value || "N/A",
            marksObtained: marksObtainedInput.value || "N/A",
            marksOutOf: marksOutOf.value || "N/A",
            percentage: percentageInput.value.replace("%", "") || "N/A",
            grade: gradeInput.value || "N/A",

            // FIXED TYPES
            passingMonth: Number(passingMonthInput.value) || 0,
            passingYear: Number(passingYearInput.value) || 0,

            image: certificateImageBase64
        };

        qualificationsList.push(payload);

        // BACKEND NOTE:
        // Backend should replace this sorting using:
        // ORDER BY passing_year ASC, passing_month ASC

        qualificationsList.sort((a, b) => {
            if (a.passingYear !== b.passingYear) {
                return a.passingYear - b.passingYear;
            }
            return a.passingMonth - b.passingMonth;
        });

        renderAll();

        successPopup.style.display = "flex";

        setTimeout(() => {
            successPopup.style.display = "none";
            resetFormWorkspace();
        }, 1500);
    });

    // =========================
    // RENDER
    // =========================
    function renderAll() {
        tableBody.innerHTML = "";

        qualificationsList.forEach(item => {

            const tr = document.createElement("tr");
            tr.id = item.id;

            tr.innerHTML = `
                <td>${item.degree}</td>
                <td>${item.boardName}</td>
                <td>${item.passingMonth}/${item.passingYear}</td>
                <td>${item.percentage}%</td>
                <td>
                    <button class="view" data-id="${item.id}">View</button>
                    <button class="del" data-id="${item.id}">Delete</button>
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // =========================
    // ACTIONS
    // =========================
    tableBody?.addEventListener("click", (e) => {

        const del = e.target.closest(".del");

        if (del) {

            const id = del.dataset.id;

            qualificationsList =
                qualificationsList.filter(i => i.id !== id);

            renderAll();
        }

        const view = e.target.closest(".view");

        if (view) {

            const record =
                qualificationsList.find(i => i.id === view.dataset.id);

            if (!record) return;

            document.getElementById("modalViewDegree").innerText = record.degree;
            document.getElementById("modalViewType").innerText = record.institutionType;
            document.getElementById("modalViewBoard").innerText = record.board;
            document.getElementById("modalViewBoardName").innerText =
    record.boardName || "-";
            document.getElementById("modalViewCourse").innerText = record.courseName;
            document.getElementById("modalViewBranch").innerText = record.branchName;
            document.getElementById("modalViewMarks").innerText =
                `${record.marksObtained}/${record.marksOutOf}`;
            document.getElementById("modalViewPercentage").innerText = record.percentage;
            document.getElementById("modalViewGrade").innerText = record.grade;

            document.getElementById("modalViewPassingMonth").innerText = record.passingMonth;
            document.getElementById("modalViewPassingYear").innerText = record.passingYear;

            const imgEl = document.getElementById("modalViewImg");

            if (record.image) {
                imgEl.src = record.image;
                imgEl.style.display = "block";
                document.getElementById("modalViewEmptyAsset").style.display = "none";
            } else {
                imgEl.style.display = "none";
                document.getElementById("modalViewEmptyAsset").style.display = "block";
            }

            lightbox.style.display = "flex";
        }
    });

    // =========================
    // CLOSE MODAL
    // =========================
    closeLightboxBtn?.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox?.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

});
}