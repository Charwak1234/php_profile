let selectedLanguages = [];

document.addEventListener("DOMContentLoaded", () => {

    const editBtn =
        document.getElementById("languageEditBtn");

    const form =
        document.getElementById("languageForm");

    const footer =
        document.getElementById("languageFooter");

    const addBtn =
        document.getElementById("addLanguageBtn");

    const fields =
        form.querySelectorAll("input, select, textarea, button");

    let isEditable = false;

    // =========================
    // EDIT BUTTON LOGIC
    // =========================

    editBtn.addEventListener("click", () => {

        isEditable = !isEditable;

        // ENABLE / DISABLE FIELDS
        document
            .querySelectorAll(
                "#languageForm select, #languageForm input"
            )
            .forEach(field => {
                field.disabled = !isEditable;
            });

        // ADD BUTTON
        addBtn.disabled = !isEditable;

        // UI CHANGES
        if (isEditable) {

            editBtn.innerHTML =
                `<i class="bi bi-x-circle"></i> Cancel`;

            editBtn.classList.add("active");

            form.classList.remove("locked");

            footer.style.display = "block";

        } else {

            editBtn.innerHTML =
                `<i class="bi bi-pencil-square"></i> Edit Info`;

            editBtn.classList.remove("active");

            form.classList.add("locked");

            footer.style.display = "none";

        }

    });

    // =========================
    // FORM SAVE
    // =========================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const data = {
            motherTongue:
                document.getElementById("motherTongue").value,

            knownLanguages:
                selectedLanguages,

            casteCategory:
                document.getElementById("casteCategory").value,

            caste:
                document.getElementById("caste").value,

            subCaste:
                document.getElementById("subCaste").value
        };

        console.log("Language & Caste Data:", data);

        // BACKEND DEV:
        // Send this object using AJAX / fetch API

        alert("Information Saved Successfully");

        // =========================
        // LOCK AGAIN AFTER SAVE
        // =========================

        isEditable = false;

        document
            .querySelectorAll(
                "#languageForm select, #languageForm input"
            )
            .forEach(field => {
                field.disabled = true;
            });

        addBtn.disabled = true;

        editBtn.innerHTML =
            `<i class="bi bi-pencil-square"></i> Edit Info`;

        editBtn.classList.remove("active");

        form.classList.add("locked");

        footer.style.display = "none";

    });

});

/* ================= ADD LANGUAGE ================= */

function addLanguage() {

    const select =
        document.getElementById("languageSelect");

    const value = select.value;

    if (!value || selectedLanguages.includes(value)) {
        return;
    }

    selectedLanguages.push(value);

    renderLanguages();

    select.value = "";

}

/* ================= REMOVE LANGUAGE ================= */

function removeLanguage(lang) {

    selectedLanguages =
        selectedLanguages.filter(l => l !== lang);

    renderLanguages();

}

/* ================= RENDER CHIPS ================= */

function renderLanguages() {

    const container =
        document.getElementById("languageChips");

    container.innerHTML = "";

    selectedLanguages.forEach(lang => {

        const chip =
            document.createElement("div");

        chip.style.background = "#eef2ff";
        chip.style.color = "#3730a3";
        chip.style.padding = "8px 14px";
        chip.style.borderRadius = "30px";
        chip.style.display = "flex";
        chip.style.alignItems = "center";
        chip.style.gap = "10px";
        chip.style.fontSize = "13px";
        chip.style.fontWeight = "600";

        chip.innerHTML = `
            ${lang}
            <span
                style="cursor:pointer;font-weight:bold;"
                onclick="removeLanguage('${lang}')"
            >
                ×
            </span>
        `;

        container.appendChild(chip);

    });

}