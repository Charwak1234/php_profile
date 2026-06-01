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

        // send to backend
        saveCaste(data).then(resp => {
            if (resp && resp.success) {
                alert('Information Saved Successfully');
            } else {
                alert('Failed to save.');
            }
        }).catch(() => {
            alert('Failed to save.');
        });

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

    // load existing data
    loadCaste();

});

async function saveCaste(data) {
    const form = new FormData();
    form.append('motherTongue', data.motherTongue || '');
    if (Array.isArray(data.knownLanguages)) {
        data.knownLanguages.forEach(lang => form.append('knownLanguages[]', lang));
    } else if (data.knownLanguages) {
        form.append('knownLanguages', data.knownLanguages);
    }
    form.append('casteCategory', data.casteCategory || '');
    form.append('caste', data.caste || '');
    form.append('subCaste', data.subCaste || '');

    const res = await fetch('../../api/profile/save_caste.php', {
        method: 'POST',
        body: form,
        credentials: 'same-origin'
    });

    return res.json();
}

async function loadCaste() {
    try {
        const res = await fetch('../../api/profile/get_caste.php', { credentials: 'same-origin' });
        const json = await res.json();
        if (!json.success || !json.data) return;

        const d = json.data;
        if (d.mother_tongue) document.getElementById('motherTongue').value = d.mother_tongue;

        // known languages can be array or JSON string
        if (Array.isArray(d.known_languages)) {
            selectedLanguages = d.known_languages.slice();
        } else if (typeof d.known_languages === 'string' && d.known_languages.trim() !== '') {
            try {
                const parsed = JSON.parse(d.known_languages);
                if (Array.isArray(parsed)) selectedLanguages = parsed;
                else selectedLanguages = d.known_languages.split(',').map(s => s.trim()).filter(Boolean);
            } catch (e) {
                selectedLanguages = d.known_languages.split(',').map(s => s.trim()).filter(Boolean);
            }
        }
        renderLanguages();

        if (d.caste_category) document.getElementById('casteCategory').value = d.caste_category;
        if (d.caste) document.getElementById('caste').value = d.caste;
        if (d.sub_caste) document.getElementById('subCaste').value = d.sub_caste;

    } catch (err) {
        console.warn('Failed to load caste data', err);
    }
}

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