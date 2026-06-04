document.addEventListener("DOMContentLoaded", () => {

    const DOCUMENT_SAVE_URL = window.profileApiUrl("../../api/profile/save_document.php");

    function documentImageUrl(path) {
        if (!path) return null;
        if (path.startsWith("data:") || path.startsWith("http") || path.startsWith("/")) {
            return path;
        }
        return "../../" + String(path).replace(/^\.?\//, "");
    }

    function appendPanForm(fd, number, file) {
        if (number) fd.append("pan_number", number);
        if (file) fd.append("pan_image", file);
    }

    function appendLicenseForm(fd, number, file) {
        if (number) fd.append("driving_license_number", number);
        if (file) fd.append("driving_license_image", file);
    }

    function appendPassportForm(fd, number, file) {
        if (number) fd.append("passport_number", number);
        if (file) fd.append("passport_image", file);
    }

    function appendOptionalForm(fd, name, number, file) {
        if (name) fd.append("optional_document_name", name);
        if (number) fd.append("optional_document_number", number);
        if (file) fd.append("optional_document_image", file);
    }

    async function saveDocumentsFormData(formData) {
        const res = await fetch(DOCUMENT_SAVE_URL, {
            method: "POST",
            credentials: "same-origin",
            body: formData
        });
        return res.json();
    }

    // ================= SELECTORS =================
    const editBtn = document.getElementById("documentEditBtn");
    const form = document.getElementById("documentForm");

    const successPopup = document.getElementById("successPopup");

    const tableBody = document.getElementById("documentTableBody");

    const lightboxOverlay = document.getElementById("lightboxOverlay");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightboxBtn = document.getElementById("closeLightboxBtn");

    const allInputs = form.querySelectorAll("input");

    // ================= STATE =================
    let isEditable = false;

    let documents = [];

    let savedDocuments = {
        PAN: null,
        LICENSE: null,
        PASSPORT: null,
        OPTIONAL: null
    };

    let lockedEssentialDocs = {
        PAN: false,
        LICENSE: false,
        PASSPORT: false
    };

    // ================= INIT =================
    setDisabled(true);
    loadSavedDocuments();

    // watch file inputs so chosen files immediately show in preview/table
    ['panFile', 'licenseFile', 'passportFile', 'optionalDocFile'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('change', () => {
            renderPreviewFromInputs();
        });
    });

    // If user selects a file in Optional but Passport number exists and passport has no file,
    // copy that File into passport input so Passport shows in preview (small UX-fix).
    const optionalEl = document.getElementById('optionalDocFile');
    if (optionalEl) {
        optionalEl.addEventListener('change', () => {
            try {
                const passportEl = document.getElementById('passportFile');
                const passportNumEl = document.getElementById('passportNumber');
                if (passportEl && passportNumEl && passportNumEl.value && passportEl.files.length === 0) {
                    const f = optionalEl.files[0];
                    if (f) {
                        const dt = new DataTransfer();
                        dt.items.add(f);
                        passportEl.files = dt.files;
                        // re-render preview so table shows Passport file
                        renderPreviewFromInputs();
                    }
                }
            } catch (e) {
                console.error('Failed to mirror optional file to passport', e);
            }
        });
    }

    // ================= EDIT TOGGLE =================
    editBtn.addEventListener("click", () => {

        isEditable = !isEditable;

        if (isEditable) {
            enableEditMode();
        } else {
            disableEditMode();
        }
    });

    function enableEditMode() {
        editBtn.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
        editBtn.classList.add("active");

        setDisabled(false);
    }

    function disableEditMode() {
        editBtn.innerHTML = `<i class="bi bi-pencil-square"></i> Edit Mode`;
        editBtn.classList.remove("active");

        setDisabled(true);
    }

    // ================= ENABLE / DISABLE INPUTS =================
    function setDisabled(status) {
        allInputs.forEach(input => {
            input.disabled = status;
        });
    }

    // ================= SAFETY CHECK =================
    function requireEditMode() {
        if (!isEditable) {
            alert("Please enable Edit Mode first");
            return false;
        }
        return true;
    }

    // ================= SUBMIT FUNCTIONS =================
    window.submitPAN = function () {

        if (!requireEditMode()) return;

        if (lockedEssentialDocs.PAN) {
            return alert("PAN already uploaded. Delete to update.");
        }

        const number = document.getElementById("panNumber").value;
        const file = document.getElementById("panFile").files[0];

        if (!number || !file){
                return alert("Fill PAN details");
            }

            if(!isPanValid){
                return alert(
                    "Please enter PAN number using CAPITAL letters only."
                );
            }

        processDocument("Essential", "PAN Card", number, file, "PAN");
    };

    window.submitLICENSE = function () {

        if (!requireEditMode()) return;

        if (lockedEssentialDocs.LICENSE) {
            return alert("License already uploaded. Delete to update.");
        }

        const number = document.getElementById("licenseNumber").value;
        const file = document.getElementById("licenseFile").files[0];

        if (!number || !file) return alert("Fill License details");

        processDocument("Essential", "Driving License", number, file, "LICENSE");
    };

    window.submitPASSPORT = function () {

        if (!requireEditMode()) return;

        if (lockedEssentialDocs.PASSPORT) {
            return alert("Passport already uploaded. Delete to update.");
        }

        const number = document.getElementById("passportNumber").value;
        const file = document.getElementById("passportFile").files[0];

        if (!number || !file) return alert("Fill Passport details");

        processDocument("Essential", "Passport", number, file, "PASSPORT");
    };

    window.submitOPTIONAL = function () {

        if (!requireEditMode()) return;

        const name = document.getElementById("optionalDocName").value;
        const number = document.getElementById("optionalDocNumber").value;
        const file = document.getElementById("optionalDocFile").files[0];

        if (!name && !number && !file) {
            return alert("Fill optional document");
        }

        processDocument("Optional", name || "Optional Doc", number, file, "OPTIONAL");
    };

    // ================= CORE PROCESS =================
    function processDocument(category, name, number, file, key) {

        const reader = new FileReader();

        reader.onload = function (event) {

            const doc = {
                id: Date.now() + Math.random(),
                category,
                name,
                number: number || "N/A",
                image: event.target.result,
                file: file || null,
                fileName: file?.name || ""
            };

            documents.push(doc);
            savedDocuments[key] = doc;

            if (category === "Essential") {
                lockedEssentialDocs[key] = true;
            }

            appendTableRow(doc);
            showSuccess();
            // auto-save this single document to server so image gets persisted immediately
            (async () => {
                try {
                    const fd = new FormData();

                    if (key === "PAN") {
                        appendPanForm(fd, doc.number, doc.file);
                    } else if (key === "LICENSE") {
                        appendLicenseForm(fd, doc.number, doc.file);
                    } else if (key === "PASSPORT") {
                        appendPassportForm(fd, doc.number, doc.file);
                    } else {
                        appendOptionalForm(fd, doc.name, doc.number, doc.file);
                    }

                    const json = await saveDocumentsFormData(fd);
                    if (json && json.success) {
                        await loadSavedDocuments();
                    } else if (json && json.message) {
                        console.error("Auto-save document failed:", json.message);
                    }
                } catch (e) {
                    console.error("Auto-save document failed", e);
                }
            })();
        };

        reader.readAsDataURL(file);
    }

    // read file helper (used by final submit and preview)
    const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    // ================= TABLE =================
    function appendTableRow(item) {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.category}</td>
            <td>${item.name}</td>
            <td>${item.number}</td>

            <td style="text-align:center;">
                ${item.image
                ? `<button type="button" class="view-btn" data-img="${item.image}">View</button>`
                : `<span>No File</span>`}
            </td>

            <td style="text-align:center;">
                <button type="button" class="delete-btn" data-id="${item.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(tr);
    }

    // ================= PREVIEW FROM INPUTS =================
    // Build table preview based on current file inputs (so user sees chosen files immediately)
    async function renderPreviewFromInputs() {
        try {
            // prefer file inputs, then savedDocuments
            const preview = [];

            // PAN
            {
                const num = document.getElementById('panNumber')?.value || (savedDocuments.PAN && savedDocuments.PAN.number) || 'N/A';
                const file = document.getElementById('panFile')?.files[0];
                const img = file ? await readFileAsDataURL(file) : (savedDocuments.PAN && savedDocuments.PAN.image) || null;
                preview.push({ id: 'preview-pan', category: 'PAN', name: 'PAN Card', number: num, image: img });
            }

            // License
            {
                const num = document.getElementById('licenseNumber')?.value || (savedDocuments.LICENSE && savedDocuments.LICENSE.number) || 'N/A';
                const file = document.getElementById('licenseFile')?.files[0];
                const img = file ? await readFileAsDataURL(file) : (savedDocuments.LICENSE && savedDocuments.LICENSE.image) || null;
                preview.push({ id: 'preview-license', category: 'License', name: 'Driving License', number: num, image: img });
            }

            // Passport
            {
                const num = document.getElementById('passportNumber')?.value || (savedDocuments.PASSPORT && savedDocuments.PASSPORT.number) || 'N/A';
                const file = document.getElementById('passportFile')?.files[0];
                const img = file ? await readFileAsDataURL(file) : (savedDocuments.PASSPORT && savedDocuments.PASSPORT.image) || null;
                preview.push({ id: 'preview-passport', category: 'Passport', name: 'Passport', number: num, image: img });
            }

            // Optional
            {
                const name = document.getElementById('optionalDocName')?.value || (savedDocuments.OPTIONAL && savedDocuments.OPTIONAL.name) || 'Optional Doc';
                const num = document.getElementById('optionalDocNumber')?.value || (savedDocuments.OPTIONAL && savedDocuments.OPTIONAL.number) || 'N/A';
                const file = document.getElementById('optionalDocFile')?.files[0];
                const img = file ? await readFileAsDataURL(file) : (savedDocuments.OPTIONAL && savedDocuments.OPTIONAL.image) || null;
                preview.push({ id: 'preview-optional', category: 'Optional', name: name, number: num, image: img });
            }

            // render
            tableBody.innerHTML = '';
            preview.forEach(appendTableRow);
        } catch (err) {
            console.error('Failed to render preview from inputs', err);
        }
    }

    // ================= LOAD SAVED DOCUMENTS =================
    async function loadSavedDocuments() {
        try {
            const res = await fetch(window.profileApiUrl('../../api/profile/get_documents.php'), { credentials: 'same-origin' });
            const json = await res.json();
            if (!json.success || !json.data) return;

            const d = json.data;

            // clear and populate
            documents = [];

            // populate form inputs with saved values (so edit mode shows existing numbers)
            try {
                if (d.pan_number) document.getElementById('panNumber').value = d.pan_number;
                if (d.driving_license_number) document.getElementById('licenseNumber').value = d.driving_license_number;
                if (d.passport_number) document.getElementById('passportNumber').value = d.passport_number;
                if (d.optional_document_name) document.getElementById('optionalDocName').value = d.optional_document_name;
                if (d.optional_document_number) document.getElementById('optionalDocNumber').value = d.optional_document_number;
            } catch (e) {
                // ignore if inputs not present
            }

            if (d.pan_number || d.pan_image) {
                const img = documentImageUrl(d.pan_image);
                const obj = { number: d.pan_number || null, image: img };
                savedDocuments.PAN = obj;
                if (d.pan_number && d.pan_image) lockedEssentialDocs.PAN = true;
                documents.push({ id: "db-pan", category: "PAN", name: "PAN Card", number: obj.number || "N/A", image: obj.image });
            }
            if (d.driving_license_number || d.driving_license_image) {
                const img = documentImageUrl(d.driving_license_image);
                const obj = { number: d.driving_license_number || null, image: img };
                savedDocuments.LICENSE = obj;
                if (d.driving_license_number && d.driving_license_image) lockedEssentialDocs.LICENSE = true;
                documents.push({ id: "db-license", category: "License", name: "Driving License", number: obj.number || "N/A", image: obj.image });
            }
            if (d.passport_number || d.passport_image) {
                const img = documentImageUrl(d.passport_image);
                const obj = { number: d.passport_number || null, image: img };
                savedDocuments.PASSPORT = obj;
                if (d.passport_number && d.passport_image) lockedEssentialDocs.PASSPORT = true;
                documents.push({ id: "db-passport", category: "Passport", name: "Passport", number: obj.number || "N/A", image: obj.image });
            }
            if (d.optional_document_name || d.optional_document_image || d.optional_document_number) {
                const img = documentImageUrl(d.optional_document_image);
                const obj = { name: d.optional_document_name || null, number: d.optional_document_number || null, image: img };
                savedDocuments.OPTIONAL = obj;
                documents.push({ id: "db-optional", category: "Optional", name: obj.name || "Optional Doc", number: obj.number || "N/A", image: obj.image });
            }

            tableBody.innerHTML = '';
            documents.forEach(appendTableRow);
        } catch (err) {
            console.error('Failed to load saved documents', err);
        }
    }

    // ================= VIEW + DELETE =================
    tableBody.addEventListener("click", (e) => {

        const view = e.target.closest(".view-btn");

        if (view) {
            lightboxImage.src = view.dataset.img;
            lightboxOverlay.style.display = "flex";
            return;
        }

        const del = e.target.closest(".delete-btn");

        if (del) {

            const id = del.dataset.id;

            const item = documents.find(d => d.id == id);

            if (item) {
                if (item.name === "PAN Card") lockedEssentialDocs.PAN = false;
                if (item.name === "Driving License") lockedEssentialDocs.LICENSE = false;
                if (item.name === "Passport") lockedEssentialDocs.PASSPORT = false;
            }

            documents = documents.filter(d => d.id != id);
            del.closest("tr")?.remove();
        }
    });

    // ================= LIGHTBOX =================
    closeLightboxBtn.addEventListener("click", () => {
        lightboxOverlay.style.display = "none";
    });

    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = "none";
        }
    });

    // ================= SUCCESS =================
    function showSuccess() {
        successPopup.style.display = "block";

        setTimeout(() => {
            successPopup.style.display = "none";
        }, 2000);
    }

    // ================= FINAL SUBMIT =================
    window.finalSubmitDocuments = async function () {
        if (!requireEditMode()) return;

        const fd = new FormData();
        let hasData = false;
        const missingFiles = [];

        const panNumber = document.getElementById("panNumber")?.value?.trim() || "";
        const panFile = document.getElementById("panFile")?.files[0] || savedDocuments.PAN?.file || null;
        if (panNumber || panFile) {
            if (panNumber && !panFile && !savedDocuments.PAN?.image) {
                missingFiles.push("PAN");
            } else {
                appendPanForm(fd, panNumber, panFile);
                hasData = true;
            }
        }

        const licenseNumber = document.getElementById("licenseNumber")?.value?.trim() || "";
        const licenseFile = document.getElementById("licenseFile")?.files[0] || savedDocuments.LICENSE?.file || null;
        if (licenseNumber || licenseFile) {
            if (licenseNumber && !licenseFile && !savedDocuments.LICENSE?.image) {
                missingFiles.push("Driving License");
            } else {
                appendLicenseForm(fd, licenseNumber, licenseFile);
                hasData = true;
            }
        }

        const passportNumber = document.getElementById("passportNumber")?.value?.trim() || "";
        const passportFile = document.getElementById("passportFile")?.files[0] || savedDocuments.PASSPORT?.file || null;
        if (passportNumber || passportFile) {
            if (passportNumber && !passportFile && !savedDocuments.PASSPORT?.image) {
                missingFiles.push("Passport");
            } else {
                appendPassportForm(fd, passportNumber, passportFile);
                hasData = true;
            }
        }

        const optionalName = document.getElementById("optionalDocName")?.value?.trim() || "";
        const optionalNumber = document.getElementById("optionalDocNumber")?.value?.trim() || "";
        const optionalFile = document.getElementById("optionalDocFile")?.files[0] || savedDocuments.OPTIONAL?.file || null;
        if (optionalName || optionalNumber || optionalFile) {
            if ((optionalName || optionalNumber) && !optionalFile && !savedDocuments.OPTIONAL?.image) {
                missingFiles.push("Optional document");
            } else {
                appendOptionalForm(fd, optionalName, optionalNumber, optionalFile);
                hasData = true;
            }
        }

        if (missingFiles.length) {
            return alert("Please upload an image for: " + missingFiles.join(", "));
        }

        if (!hasData) {
            return alert("No documents to submit");
        }

        try {
            const json = await saveDocumentsFormData(fd);

            if (json.success) {
                alert("All documents submitted");
                await loadSavedDocuments();
                disableEditMode();
            } else {
                alert("Failed to submit documents: " + (json.message || ""));
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit documents");
        }
    };

    /* ===================================
    PAN CAPITAL LETTER VALIDATION
    =================================== */

    const panNumberField = document.getElementById("panNumber");

    const panErrorText = document.getElementById("panErrorText");

    let isPanValid = true;

    if (panNumberField) {
        panNumberField.addEventListener("input", () => {
            const value = panNumberField.value;

            // CHECK SMALL LETTERS
            if (/[a-z]/.test(value)) {
                if (panErrorText) panErrorText.style.display = "block";
                panNumberField.style.borderColor = "red";
                isPanValid = false;
            } else {
                if (panErrorText) panErrorText.style.display = "none";
                panNumberField.style.borderColor = "";
                isPanValid = true;
            }
        });
    }

});
