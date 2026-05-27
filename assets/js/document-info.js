document.addEventListener("DOMContentLoaded", () => {

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
                fileName: file?.name || ""
            };

            documents.push(doc);
            savedDocuments[key] = doc;

            if (category === "Essential") {
                lockedEssentialDocs[key] = true;
            }

            appendTableRow(doc);
            showSuccess();
        };

        reader.readAsDataURL(file);
    }

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

});
/* ===================================
PAN CAPITAL LETTER VALIDATION
=================================== */

const panNumberField =
document.getElementById("panNumber");

const panErrorText =
document.getElementById("panErrorText");

let isPanValid = true;

if(panNumberField){

    panNumberField.addEventListener(
        "input",
        () => {

            const value =
            panNumberField.value;

            // CHECK SMALL LETTERS
            if(/[a-z]/.test(value)){

                panErrorText.style.display =
                "block";

                panNumberField.style.borderColor =
                "red";

                isPanValid = false;

            }else{

                panErrorText.style.display =
                "none";

                panNumberField.style.borderColor =
                "";

                isPanValid = true;

            }

        }
    );

}