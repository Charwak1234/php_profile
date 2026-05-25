document.addEventListener("DOMContentLoaded", () => {
    // Structural DOM Selection Handles
    const section = document.getElementById("qualificationSection");
    const editToggleBtn = document.getElementById("qualEditToggleBtn");
    const form = document.getElementById("qualificationForm");
    const formFooter = document.getElementById("qualFormFooter");
    const errorBanner = document.getElementById("qualErrorBanner");
    const errorText = document.getElementById("qualErrorText");
    const successPopup = document.getElementById("qualSuccessPopup");
    const tableBody = document.getElementById("qualRegistryTableBody");

    // Form Field Handles
    const degreeInput = document.getElementById("qualDegree");
    const instTypeInput = document.getElementById("qualInstType");
    const boardInput = document.getElementById("qualBoard");
    const courseNameInput = document.getElementById("qualCourseName");
    const branchNameInput = document.getElementById("qualBranchName");
    const marksObtainedInput = document.getElementById("qualMarksObtained");
    const marksOutOfInput = document.getElementById("qualMarksOutOf");
    const percentageInput = document.getElementById("qualPercentage");
    const gradeInput = document.getElementById("qualGrade");
    
    // File Upload Handles
    const fileInput = document.getElementById("qualFile");
    const uploadWrapper = document.getElementById("qualUploadWrapper");
    const uploadStatusText = document.getElementById("uploadStatusText");

    // Modal Lightbox Handles
    const lightbox = document.getElementById("qualLightboxModal");
    const closeLightboxBtn = document.getElementById("closeQualLightbox");

    // Injecting Fix for Global Position overlay layer structure programmatically
    if (lightbox) {
        lightbox.style.position = "fixed";
        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100vw";
        lightbox.style.height = "100vh";
        lightbox.style.backgroundColor = "rgba(15, 23, 42, 0.6)"; // Dark overlay blur backdrop tint
        lightbox.style.backdropFilter = "blur(4px)";
        lightbox.style.zIndex = "9999"; // Assures popup floats above everything else
        lightbox.style.justifyContent = "center";
        lightbox.style.alignItems = "center";
    }

    // Local Tracking Repositories (Mirrors React State Collections)
    let qualificationsList = [
        {
            id: "qual-mock-1",
            degree: 'Degree',
            board: 'Mumbai University',
            institutionType: 'University',
            courseName: 'Bachelor of Engineering',
            branchName: 'Computer Science',
            marksObtained: '800',
            marksOutOf: '1000',
            percentage: '80.00',
            grade: 'A+',
            image: null
        }
    ];
    let certificateImageBase64 = null;
    let isEditable = false;

    // ==========================================================================
    // MODULE FLOW 1: TOGGLE EDIT CONTROL MODE
    // ==========================================================================
    editToggleBtn.addEventListener("click", () => {
        isEditable = !isEditable;
        errorBanner.style.display = "none";

        if (isEditable) {
            editToggleBtn.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
            editToggleBtn.classList.add("active");
            form.classList.remove("locked");
            if (formFooter) formFooter.style.display = "flex";
            
            // Enable Inputs
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
        marksOutOfInput.disabled = status;
        gradeInput.disabled = status;
        fileInput.disabled = status;

        // Shared CSS Dynamic Interface Toggle Rules
        if (uploadWrapper) {
            if (status) {
                uploadWrapper.classList.add("upload-disabled");
                uploadWrapper.style.cursor = "not-allowed";
            } else {
                uploadWrapper.classList.remove("upload-disabled");
                uploadWrapper.style.cursor = "pointer";
            }
        }
    }

    function resetFormWorkspace() {
        isEditable = false;
        editToggleBtn.innerHTML = `<i class="bi bi-pencil-square"></i> Add Credentials`;
        editToggleBtn.classList.remove("active");
        form.classList.add("locked");
        if (formFooter) formFooter.style.display = "none";
        
        // Reset values
        form.reset();
        certificateImageBase64 = null;
        percentageInput.value = "";
        if (uploadStatusText) {
            uploadStatusText.innerText = "Click here to upload your academic certificate image";
        }
        setInputsDisabledState(true);
    }

    // ==========================================================================
    // MODULE FLOW 2: REDIRECT UPLOAD AREA CLICK TO FILE PICKER
    // ==========================================================================
    if (uploadWrapper) {
        uploadWrapper.addEventListener("click", () => {
            if (!fileInput.disabled) {
                fileInput.click();
            }
        });
    }

    // ==========================================================================
    // MODULE FLOW 3: DYNAMIC AUTO-CALCULATION PERCENTAGE ENGINE LOOP
    // ==========================================================================
    function calculatePercentage() {
        const obtained = parseFloat(marksObtainedInput.value);
        const total = parseFloat(marksOutOfInput.value);

        if (obtained && total && total > 0) {
            if (obtained > total) {
                percentageInput.value = "";
                return;
            }
            const calculated = ((obtained / total) * 100).toFixed(2);
            percentageInput.value = `${calculated}%`;
        } else {
            percentageInput.value = "";
        }
    }

    marksObtainedInput.addEventListener("input", calculatePercentage);
    marksOutOfInput.addEventListener("input", calculatePercentage);

    // ==========================================================================
    // MODULE FLOW 4: BINARY FILE VALIDATION AND BASE64 MATRIX CONVERSION
    // ==========================================================================
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            // Strict Image Format Assertions (Blocks PDFs and Document Types)
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validImageTypes.includes(file.type)) {
                alert("Upload Rejected: Invalid file format! Only PNG and JPG images are acceptable. PDFs or other files cannot be accepted.");
                fileInput.value = ""; // Erases the illegal file reference stream from DOM
                if (uploadStatusText) {
                    uploadStatusText.innerText = "Click here to upload your academic certificate image";
                }
                certificateImageBase64 = null;
                return;
            }

            // Proceed if validation is passed cleanly
            if (uploadStatusText) {
                uploadStatusText.innerText = `Selected Asset: ${file.name}`;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                certificateImageBase64 = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // ==========================================================================
    // MODULE FLOW 5: VALIDATION ENGINE AND PIPELINE SUBMISSION
    // ==========================================================================
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorBanner.style.display = "none";

        // Strict Mandatory UI Fields Verification Check
        if (!degreeInput.value || !boardInput.value || !instTypeInput.value) {
            errorText.innerText = "Submission Denied: Degree/Diploma, Board/University, and Type of Institution are strictly mandatory fields.";
            errorBanner.style.display = "block";
            section.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const obtained = parseFloat(marksObtainedInput.value);
        const total = parseFloat(marksOutOfInput.value);
        if (obtained && total && obtained > total) {
            errorText.innerText = "Validation Error: Marks Obtained cannot exceed the Total Marks Out Off.";
            errorBanner.style.display = "block";
            section.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Processing Raw Local UI Display Variables
        const rawPercentage = percentageInput.value.replace('%', '');
        const currentId = "qual-" + Date.now();

        const newQualificationPayload = {
            id: currentId,
            degree: degreeInput.value,
            board: boardInput.value,
            institutionType: instTypeInput.value,
            courseName: courseNameInput.value || 'N/A',
            branchName: branchNameInput.value || 'N/A',
            marksObtained: marksObtainedInput.value || 'N/A',
            marksOutOf: marksOutOfInput.value || 'N/A',
            percentage: rawPercentage || 'N/A',
            grade: gradeInput.value || 'N/A',
            image: certificateImageBase64
        };

        // Push item into memory state collection array
        qualificationsList.push(newQualificationPayload);

        // Append Row directly into Document Table Layout Node
        renderNewTableEntry(newQualificationPayload);

        console.log("Transmitting processed dataset block directly to targeted application layer controllers:", newQualificationPayload);

        // Flash UI confirmation banner overlay
        if (successPopup) {
            successPopup.style.display = "flex";
            setTimeout(() => {
                successPopup.style.display = "none";
                resetFormWorkspace();
            }, 3000);
        }
    });

    // Dynamic Element Creator Row Injector Block
    function renderNewTableEntry(item) {
        const tr = document.createElement("tr");
        tr.id = item.id;

        const displayPercentage = item.percentage !== 'N/A' ? `${item.percentage}%` : 'N/A';

        // FIXED: Added Clean styled Bootstrap button rules directly to matching variables here!
        tr.innerHTML = `
            <td class="font-weight-600 text-dark-slate" style="padding: 12px 16px; font-weight: 600; color: #1e293b;">${item.degree}</td>
            <td class="text-cool-grey" style="padding: 12px 16px; color: #64748b;">${item.board}</td>
            <td class="font-weight-600 text-success" style="padding: 12px 16px; font-weight: 600; color: #10b981;">${displayPercentage}</td>
            <td style="padding: 12px 16px; text-align: center;">
                <div class="table-action-cell-flex-gap" style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                    <button type="button" class="btn btn-sm btn-light table-link-view-btn dynamic-view-trigger" data-id="${item.id}" style="border-radius: 8px; font-weight:600; color:#06b6d4;"><i class="bi bi-eye"></i> View Details</button>
                    <button type="button" class="btn btn-sm btn-light text-danger table-trash-action-btn dynamic-delete-trigger" data-id="${item.id}" style="border-radius: 8px;"><i class="bi bi-trash3"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    }

    // ==========================================================================
    // MODULE FLOW 6: REMOVE RECORD PIPELINE
    // ==========================================================================
    tableBody.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".table-trash-action-btn");
        if (deleteBtn) {
            if (!isEditable) return; // Prevent deletions while system interface is locked
            
            const targetId = deleteBtn.getAttribute("data-id") || deleteBtn.getAttribute("data-target");

            qualificationsList = qualificationsList.filter(item => item.id !== targetId);
            document.getElementById(targetId)?.remove();
        }
    });

    // ==========================================================================
    // MODULE FLOW 7: OVERVIEW LIGHTBOX MODAL DISPATCH SYSTEM
    // ==========================================================================
    tableBody.addEventListener("click", (e) => {
        const viewBtn = e.target.closest(".table-link-view-btn");
        if (viewBtn) {
            let record = null;

            if (viewBtn.classList.contains("mock-view-trigger")) {
                record = qualificationsList.find(item => item.id === "qual-mock-1");
            } else {
                const targetId = viewBtn.getAttribute("data-id");
                record = qualificationsList.find(item => item.id === targetId);
            }

            if (record) {
                document.getElementById("modalViewDegree").innerText = record.degree;
                document.getElementById("modalViewType").innerText = record.institutionType;
                document.getElementById("modalViewBoard").innerText = record.board;
                document.getElementById("modalViewCourse").innerText = record.courseName;
                document.getElementById("modalViewBranch").innerText = record.branchName;
                document.getElementById("modalViewMarks").innerText = `${record.marksObtained} / ${record.marksOutOf}`;
                document.getElementById("modalViewPercentage").innerText = record.percentage !== 'N/A' ? `${record.percentage}% (${record.grade})` : `N/A (${record.grade})`;

                const imgElement = document.getElementById("modalViewImg");
                const emptyMsgElement = document.getElementById("modalViewEmptyAsset");

                if (record.image) {
                    imgElement.src = record.image;
                    imgElement.style.display = "block";
                    emptyMsgElement.style.display = "none";
                } else {
                    imgElement.src = "";
                    imgElement.style.display = "none";
                    emptyMsgElement.style.display = "block";
                }

                // Dispatches layout container with fixed modal display layout
                lightbox.style.display = "flex";
            }
        }
    });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
});