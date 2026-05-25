document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // SELECTORS
    // ==========================================

    const editBtn =
        document.getElementById("documentEditBtn");

    const form =
        document.getElementById("documentForm");

    const footer =
        document.getElementById("documentFooter");

    const successPopup =
        document.getElementById("successPopup");

    const tableBody =
        document.getElementById("documentTableBody");

    const lightboxOverlay =
        document.getElementById("lightboxOverlay");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightboxBtn =
        document.getElementById("closeLightboxBtn");

    const allInputs =
        form.querySelectorAll("input");

    // ==========================================
    // STATE
    // ==========================================

    let isEditable = false;

    let documents = [];

    let savedDocuments = {
        PAN: null,
        LICENSE: null,
        PASSPORT: null,
        OPTIONAL: null
    };

    // ==========================================
    // INITIAL LOCK
    // ==========================================

    setDisabled(true);

    // ==========================================
    // TOGGLE EDIT
    // ==========================================

    editBtn.addEventListener("click", () => {

        isEditable = !isEditable;

        if (isEditable) {

            editBtn.innerHTML =
                `<i class="bi bi-x-circle"></i> Cancel`;

            editBtn.classList.add("active");

            footer.style.display = "flex";

            setDisabled(false);

        } else {

            resetForm();

        }

    });

    // ==========================================
    // ENABLE/DISABLE
    // ==========================================

    function setDisabled(status) {

        allInputs.forEach((input) => {
            input.disabled = status;
        });

    }

    // ==========================================
    // RESET FORM
    // ==========================================

    function resetForm() {

        isEditable = false;

        editBtn.innerHTML =
            `<i class="bi bi-pencil-square"></i> Edit & Upload`;

        editBtn.classList.remove("active");

        footer.style.display = "none";

        setDisabled(true);

        form.reset();

        refillFormAfterSubmit();
    }

    // ==========================================
    // REFILL FORM AFTER SUBMIT (FILE NAME FIXED)
    // ==========================================

    function refillFormAfterSubmit() {

        if (savedDocuments.PAN) {

            document.getElementById("panNumber").value =
                savedDocuments.PAN.number;

            if (document.getElementById("panPreview")) {
                document.getElementById("panPreview").src =
                    savedDocuments.PAN.image;
            }

            const el = document.getElementById("panFileName");
            if (el) el.innerText = savedDocuments.PAN.fileName || "";
        }

        if (savedDocuments.LICENSE) {

            document.getElementById("licenseNumber").value =
                savedDocuments.LICENSE.number;

            const el = document.getElementById("licenseFileName");
            if (el) el.innerText = savedDocuments.LICENSE.fileName || "";
        }

        if (savedDocuments.PASSPORT) {

            document.getElementById("passportNumber").value =
                savedDocuments.PASSPORT.number;

            const el = document.getElementById("passportFileName");
            if (el) el.innerText = savedDocuments.PASSPORT.fileName || "";
        }

        if (savedDocuments.OPTIONAL) {

            document.getElementById("optionalDocNumber").value =
                savedDocuments.OPTIONAL.number;

            document.getElementById("optionalDocName").value =
                savedDocuments.OPTIONAL.name;

            const el = document.getElementById("optionalFileName");
            if (el) el.innerText = savedDocuments.OPTIONAL.fileName || "";
        }
    }

    // ==========================================
    // FORM SUBMIT
    // ==========================================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        processDocument("Essential", "PAN Card",
            document.getElementById("panNumber").value,
            document.getElementById("panFile").files[0]
        );

        processDocument("Essential", "Driving License",
            document.getElementById("licenseNumber").value,
            document.getElementById("licenseFile").files[0]
        );

        processDocument("Essential", "Passport",
            document.getElementById("passportNumber").value,
            document.getElementById("passportFile").files[0]
        );

        processDocument("Optional",
            document.getElementById("optionalDocName").value,
            document.getElementById("optionalDocNumber").value,
            document.getElementById("optionalDocFile").files[0]
        );

        successPopup.style.display = "flex";

        setTimeout(() => {
            successPopup.style.display = "none";
            resetForm();
        }, 3000);

    });

    // ==========================================
    // PROCESS DOCUMENT (FILE NAME FIXED)
    // ==========================================

    function processDocument(category, name, number, file) {

        if (!number && !file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            const image = event.target.result;

            const documentData = {

                id: Date.now() + Math.random(),
                category,
                name,
                number: number || "N/A",
                image,
                fileName: file ? file.name : "No file uploaded"
            };

            documents.push(documentData);
            appendTableRow(documentData);

            if (name === "PAN Card") savedDocuments.PAN = documentData;
            if (name === "Driving License") savedDocuments.LICENSE = documentData;
            if (name === "Passport") savedDocuments.PASSPORT = documentData;
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reader.onload({ target: { result: "" } });
        }
    }

    // ==========================================
    // TABLE ROW (UNCHANGED → DELETE SAFE)
    // ==========================================

    function appendTableRow(item) {

        const tr = document.createElement("tr");

        tr.style.borderBottom = "1px solid #dbe2ea";

        tr.innerHTML = `
            <td style="padding:12px 16px;">
                <span class="complete-badge"
                    style="background:#eef2ff;color:#6366f1;
                    padding:4px 8px;border-radius:6px;font-size:0.85em;">
                    ${item.category}
                </span>
            </td>

            <td style="padding:12px 16px;font-weight:500;">
                ${item.name}
            </td>

            <td style="padding:12px 16px;">
                ${item.number}
            </td>

            <td style="padding:12px 16px;text-align:center;">
                ${item.image ? `
                    <button type="button"
                        class="edit-toggle-btn view-btn"
                        data-image="${item.image}">
                        <i class="bi bi-eye"></i> View
                    </button>
                ` : `
                    <span style="color:#94a3b8;">No File</span>
                `}
            </td>

            <!-- DELETE BUTTON (RESTORED) -->
            <td style="padding:12px 16px;text-align:center;">
                <button class="delete-btn"
                    data-id="${item.id}"
                    style="color:white;">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(tr);
    }

    // ==========================================
    // VIEW IMAGE
    // ==========================================

    tableBody.addEventListener("click", (e) => {

        const btn = e.target.closest(".view-btn");

        if (!btn) return;

        lightboxImage.src = btn.dataset.image;
        lightboxOverlay.style.display = "flex";

    });

    // ==========================================
    // DELETE (RESTORED)
    // ==========================================

    tableBody.addEventListener("click", (e) => {

        const del = e.target.closest(".delete-btn");

        if (!del) return;

        const id = del.dataset.id;

        documents = documents.filter(d => d.id != id);

        del.closest("tr")?.remove();

    });

    // ==========================================
    // CLOSE LIGHTBOX
    // ==========================================

    closeLightboxBtn.addEventListener("click", () => {
        lightboxOverlay.style.display = "none";
    });

    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = "none";
        }
    });

});