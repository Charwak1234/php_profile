if (window.__qualificationModuleLoaded) {
    console.warn("Qualification module already initialized. Skipping duplicate bind.");
} else {
    window.__qualificationModuleLoaded = true;

document.addEventListener("DOMContentLoaded", () => {

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
        isEditable = !isEditable;
        errorBanner.style.display = "none";

        if (isEditable) {
            editToggleBtn.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
            editToggleBtn.classList.add("active");
            form.classList.remove("locked");
            formFooter.style.display = "flex";
            setInputsDisabledState(false);
        } else {
            resetFormWorkspace();
        }
    });

    function setInputsDisabledState(status) {

        degreeInput.disabled = status;
        instTypeInput.disabled = status;
        boardInput.disabled = status;
        courseNameInput.disabled = status;
        branchNameInput.disabled = status;
        marksObtainedInput.disabled = status;
        marksOutOf.disabled = status;
        gradeInput.disabled = status;

        // FIXED MONTH/YEAR
        passingMonthInput.disabled = status;
        passingYearInput.disabled = status;

        fileInput.disabled = status;

        uploadWrapper.classList.toggle("upload-disabled", status);
    }

    function resetFormWorkspace() {
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

        if (!degreeInput.value || !boardInput.value || !instTypeInput.value) {
            errorText.innerText = "Required fields missing";
            errorBanner.style.display = "block";
            return;
        }

        const id = "qual-" + Date.now();

        const payload = {
            id,
            degree: degreeInput.value,
            board: boardInput.value,
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
                <td>${item.board}</td>
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