let isEditable = false;
let uploadedCertificates = [];
// initial data (EMPTY now — no default vitals)
let vitalsHistory = [];

let selectedHandicapTypes = [];

// ================= SET CURRENT DATE =================
function setCurrentDate() {

    const el = document.getElementById("currentDate");

    if (!el) return;

    const today = new Date();

    const formatted =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    el.value = formatted;
}


// ================= TOGGLE EDIT =================
function toggleHealthEdit() {

    isEditable = !isEditable;

    const fields = [
        "bloodGroup",
        "bloodCert",
        "heightInput",
        "weightInput",
        "systolicInput",
        "diastolicInput",
        "addVitalsBtn"
    ];

    fields.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.disabled = !isEditable;
        }

    });

    // SAVE BUTTON
    document.getElementById("bloodGroupSaveFooter").style.display =
        isEditable ? "block" : "none";

    // BUTTON TEXT
    document.getElementById("editHealthBtn").innerHTML =
        isEditable
            ? `<i class="bi bi-x-circle"></i> Cancel`
            : `<i class="bi bi-pencil-square"></i> Edit Details`;

    // ACTIVE CLASS
    document
        .getElementById("editHealthBtn")
        .classList.toggle("active", isEditable);

    // CARD LOCK
    document
        .getElementById("healthCard")
        .classList.toggle("locked", !isEditable);
}

// ================= ADD VITALS =================
function addVitals() {

    if (!isEditable) return;

    const systolic =
        document.getElementById("systolicInput").value;

    const diastolic =
        document.getElementById("diastolicInput").value;

    const bp =
        `${systolic}/${diastolic}`;

    const height =
        document.getElementById("heightInput").value;

    const weight =
        document.getElementById("weightInput").value;

    const date =
        document.getElementById("currentDate").value;

    if (
        !height ||
        !weight ||
        !systolic ||
        !diastolic
    ) {
        alert("Please fill all vitals.");
        return;
    }

    const newEntry = {
        id: Date.now(),
        height,
        weight,
        bp,
        date,
        source: "OWN"
    };

    // ADD TO TABLE ARRAY
    vitalsHistory.unshift(newEntry);

    // SAVE TO BACKEND
    saveVitalEntry(newEntry);

    // REFRESH TABLE
    renderTable();

    // CLEAR INPUTS
    document.getElementById("heightInput").value = "";
    document.getElementById("weightInput").value = "";
    document.getElementById("systolicInput").value = "";
    document.getElementById("diastolicInput").value = "";

    // RESET DATE
    setCurrentDate();
}

// ================= DELETE VITAL =================
function deleteVitals(id) {

    vitalsHistory =
        vitalsHistory.filter(item => item.id !== id);

    renderTable();
}

// ================= RENDER TABLE =================
function renderTable() {

    const tbody =
        document.getElementById("vitalsTableBody");

                    tbody.innerHTML = "";

                    vitalsHistory.forEach(item => {

                        const row =
                            document.createElement("tr");

                    row.innerHTML = `
                    <td>${item.date}</td>

                    <td>${item.height} cm</td>

                    <td>${item.weight} kg</td>

                    <td>${item.bp ? item.bp : '-'}</td>

                    <td>
                        <span class="status-badge ${item.source === 'DR' ? 'dr-status' : 'own-status'}">
                            ${item.source || 'OWN'}
                        </span>
                    </td>

                    <td>
                        <button
                            onclick="deleteVitals(${item.id})"
                            style="
                                background:#ef4444;
                                color:white;
                                border:none;
                                padding:5px 10px;
                                border-radius:6px;
                                cursor:pointer;
                            ">
                            Delete
                        </button>
                    </td>
                `;

        tbody.appendChild(row);

    });
}

// ================= SAVE =================
function saveHealthData() {

    const data = {
        bloodGroup:
            document.getElementById("bloodGroup").value,

        vitalsHistory: vitalsHistory
    };

    // send to backend
    submitHealth(data).then(resp => {
        if (resp && resp.success) {
            alert('Health data saved');
        } else {
            alert('Failed to save health data');
        }
    }).catch(() => alert('Failed to save health data'));

    // ================= LOCK AGAIN AFTER SAVE =================

    isEditable = false;

    const fields = [
        "bloodGroup",
        "bloodCert",
        "heightInput",
        "weightInput",
        "systolicInput",
        "diastolicInput",
        "addVitalsBtn"
    ];

    fields.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.disabled = true;
        }

    });

    // HIDE SAVE BUTTON
    document.getElementById("saveFooter").style.display = "none";

    // RESET BUTTON
    document.getElementById("editHealthBtn").innerHTML =
        `<i class="bi bi-pencil-square"></i> Edit Details`;

    // REMOVE ACTIVE CLASS
    document
        .getElementById("editHealthBtn")
        .classList.remove("active");

    // LOCK CARD
    document
        .getElementById("healthCard")
        .classList.add("locked");
}

async function submitHealth(data) {
    const form = new FormData();
    form.append('bloodGroup', data.bloodGroup || '');
    form.append('vitalsHistory', JSON.stringify(data.vitalsHistory || []));

    const fileEl = document.getElementById('bloodCert');
    if (fileEl && fileEl.files && fileEl.files.length) {
        form.append('bloodCert', fileEl.files[0]);
    }

    const res = await fetch(window.profileApiUrl('../../api/profile/save_health.php'), {
        method: 'POST',
        body: form,
        credentials: 'same-origin'
    });

    return res.json();
}

async function loadHealth() {
    try {
        const res = await fetch(window.profileApiUrl('../../api/profile/get_health.php'), { credentials: 'same-origin' });
        const json = await res.json();
        if (!json.success || !json.data) return;

        const d = json.data;
        if (d.blood_group) document.getElementById('bloodGroup').value = d.blood_group;

        // load vitals history array
        if (Array.isArray(d.vitalsHistory) && d.vitalsHistory.length) {
            vitalsHistory = d.vitalsHistory.map((v, idx) => ({
                id: Date.now() + idx,
                height: v.height,
                weight: v.weight,
                bp: v.bp,
                date: v.date,
                source: v.source || "DR"
            }));
            renderTable();
        }

        // TODO: show link to existing certificate if needed (d.blood_group_certificate)
    } catch (err) {
        console.warn('Failed to load health data', err);
    }
}

// ================= HEALTH SECTION CONTROLLER (SAFE ADDITION) =================

function openHealthSection(type) {

    const menu = document.getElementById("healthMenuSection");
    const basic = document.getElementById("basicHealthSection");
    const handicap = document.getElementById("handicapSection");

    // ALWAYS reset everything first (important fix)
    menu.style.display = "none";
    basic.style.display = "none";
    handicap.style.display = "none";

if (type === "basic") {
    basic.style.display = "block";

    // ALWAYS RESET DATE WHEN OPENING BASIC SECTION
    setCurrentDate();
}

        if (type === "handicap") {
            handicap.style.display = "block";

            // 🔥 SAFE RE-RENDER ON OPEN
            renderHandicapTags();
            renderCertificateFields();
        }
}


// ================= BACK BUTTON FIX =================

function goBackHealthMenu() {

    const menu = document.getElementById("healthMenuSection");
    const basic = document.getElementById("basicHealthSection");
    const handicap = document.getElementById("handicapSection");

    basic.style.display = "none";
    handicap.style.display = "none";

    menu.style.display = "grid"; 
    // IMPORTANT: keeps card layout intact (not block)

}

// ================= INIT FIX =================

window.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("healthMenuSection");
    const basic = document.getElementById("basicHealthSection");
    const handicap = document.getElementById("handicapSection");

    if (menu) menu.style.display = "grid";
    if (basic) basic.style.display = "none";
    if (handicap) handicap.style.display = "none";

});


// ================= HANDICAP TYPES STORE =================




// ================= ADD TYPE (LIKE LINKEDIN SKILLS) =================

function addHandicapType() {

    const select =
        document.getElementById("handicapTypeSelect");

    const value = select.value;

    if (!value) return;

    if (selectedHandicapTypes.includes(value)) return;

    selectedHandicapTypes.push(value);

    renderHandicapTags();
    renderCertificateFields();

    select.value = "";
}


// ================= REMOVE TYPE =================

function removeHandicapType(type) {

    selectedHandicapTypes =
        selectedHandicapTypes.filter(t => t !== type);

    renderHandicapTags();
    renderCertificateFields();
}


// ================= RENDER TAGS =================

function renderHandicapTags() {

    const container =
        document.getElementById("selectedHandicapTags");

    container.innerHTML = "";

    selectedHandicapTypes.forEach(type => {

        const tag = document.createElement("div");

        tag.style.cssText = `
            background:#2563eb;
            color:white;
            padding:5px 10px;
            border-radius:20px;
            display:flex;
            align-items:center;
            gap:6px;
            font-size:13px;
        `;

        tag.innerHTML = `
            ${type}
            <span style="cursor:pointer;"
                  onclick="removeHandicapType('${type}')">
                ✕
            </span>
        `;

        container.appendChild(tag);
    });
}


// ================= CERTIFICATE SECTION =================

function toggleCertificateSection() {
    renderCertificateFields();
}

// ================= RENDER CERTIFICATE UPLOAD FIELDS =================
function renderCertificateFields() {

    const stateBox =
        document.getElementById("stateCertSection");

    const centralBox =
        document.getElementById("centralCertSection");

    stateBox.innerHTML = "";
    centralBox.innerHTML = "";

    const stateChecked =
        document.getElementById("stateGovCheck").checked;

    const centralChecked =
        document.getElementById("centralGovCheck").checked;

    selectedHandicapTypes.forEach(type => {

        if (stateChecked) {

            stateBox.innerHTML += `
                <div class="field-group">
                    <label>State Certificate - ${type}</label>
                    <input type="file" class="form-control"/>
                </div>
            `;
        }

        if (centralChecked) {

            centralBox.innerHTML += `
                <div class="field-group">
                    <label>Central Certificate - ${type}</label>
                    <input type="file" class="form-control"/>
                </div>
            `;
        }
    });
}
/*
====================================================================
🧾 BACKEND CONTRACT - HANDICAP MODULE
====================================================================

📌 API Purpose:
Save user handicap details including types + certificates

--------------------------------------------------------------------
📤 REQUEST PAYLOAD (Frontend → Backend)
--------------------------------------------------------------------

{
  "is_handicapped": true,

  "types": [
    "Visual Impairment",
    "Hearing Impairment"
  ],

  "certificates": {
    "state": {
      "Visual Impairment": File | null,
      "Hearing Impairment": File | null
    },
    "central": {
      "Visual Impairment": File | null,
      "Hearing Impairment": File | null
    }
  }
}

--------------------------------------------------------------------
📌 FIELD MEANING
--------------------------------------------------------------------

✔ is_handicapped
- Always true if user enters this section

✔ types
- Array of selected disability types from UI tags

✔ certificates.state
- Files uploaded when "State Govt certified" is checked
- Key = disability type
- Value = uploaded file

✔ certificates.central
- Files uploaded when "Central Govt certified" is checked
- Key = disability type
- Value = uploaded file

--------------------------------------------------------------------
📌 IMPORTANT RULES FOR BACKEND DEV
--------------------------------------------------------------------

1. Each disability type can have multiple certificates
2. File upload must be handled via FormData (NOT JSON)
3. Keys must match EXACT strings from frontend
4. Missing files should be treated as null
5. Backend should return saved file URLs if successful

--------------------------------------------------------------------
📤 EXPECTED RESPONSE FORMAT

{
  "success": true,
  "message": "Handicap details saved successfully",
  "data": {
    "user_id": "...",
    "saved_types": [...],
    "certificate_urls": {...}
  }
}

====================================================================
*/
window.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("healthMenuSection");
    const basic = document.getElementById("basicHealthSection");
    const handicap = document.getElementById("handicapSection");

    if (menu) menu.style.display = "grid";
    if (basic) basic.style.display = "none";
    if (handicap) handicap.style.display = "none";

    // ✅ IMPORTANT INITIAL RENDERS
    renderHandicapTags();
    renderCertificateFields();
});
function saveHandicapData() {
    

    const data = {
        is_handicapped: true,
        types: selectedHandicapTypes || [],
        certificates: {
            state: {},
            central: {}
        }
    };
    

    const stateInputs = document.querySelectorAll("#stateCertSection input[type='file']");
    const centralInputs = document.querySelectorAll("#centralCertSection input[type='file']");

        // collect state files
        stateInputs.forEach((input, index) => {

            if (input.files.length) {

                const label =
                    input.closest(".field-group")
                        ?.querySelector("label")
                        ?.innerText || `type_${index}`;

                data.certificates.state[label] =
                    input.files[0];

                    const handicapType =
                        label.replace("State Certificate - ", "");

                    const exists =
                        uploadedCertificates.some(item =>
                            item.handicapType === handicapType &&
                            item.type === "State Govt"
                        );

                    if (!exists) {

                        const existingIndex =
                            uploadedCertificates.findIndex(item =>
                                item.handicapType === label &&
                                item.type === "State Govt"
                            );

                        const newData = {
                            handicapType: label,
                            type: "State Govt",
                            image: URL.createObjectURL(input.files[0])
                        };

                        if (existingIndex !== -1) {

                            uploadedCertificates[existingIndex] = newData;

                        } else {

                            uploadedCertificates.push(newData);

                        }
                    }
            }
        });

        // collect central files
        centralInputs.forEach((input, index) => {

            if (input.files.length) {

                const label =
                    input.closest(".field-group")
                        ?.querySelector("label")
                        ?.innerText || `type_${index}`;

                data.certificates.central[label] =
                    input.files[0];
                    const handicapType =
                        label.replace("Central Certificate - ", "");

                    const exists =
                        uploadedCertificates.some(item =>
                            item.handicapType === handicapType &&
                            item.type === "Central Govt"
                        );

                    if (!exists) {

                            const existingIndex =
                                uploadedCertificates.findIndex(item =>
                                    item.handicapType === label &&
                                    item.type === "Central Govt"
                                );

                            const newData = {
                                handicapType: label,
                                type: "Central Govt",
                                image: URL.createObjectURL(input.files[0])
                            };

                            if (existingIndex !== -1) {

                                uploadedCertificates[existingIndex] = newData;

                            } else {

                                uploadedCertificates.push(newData);

                            }
                    }
            }
        });

    // send to backend (placeholder API)
    const form = new FormData();

    form.append("is_handicapped", data.is_handicapped);
    form.append("types", JSON.stringify(data.types));
    form.append("state_certificates", JSON.stringify(Object.keys(data.certificates.state)));
    form.append("central_certificates", JSON.stringify(Object.keys(data.certificates.central)));

    // append files
    Object.keys(data.certificates.state).forEach(key => {
        form.append("state_" + key, data.certificates.state[key]);
    });

    Object.keys(data.certificates.central).forEach(key => {
        form.append("central_" + key, data.certificates.central[key]);
    });
    renderHandicapTable();

alert("Handicap details saved successfully");

    // fetch("../../api/profile/save_handicap.php", {
    //     method: "POST",
    //     body: form,
    //     credentials: "same-origin"
    // })
    // .then(res => res.json())
    // .then(resp => {
    //     if (resp.success) {

    //             renderHandicapTable();

    //             alert(
    //                 "Handicap details saved successfully"
    //             );

    //         } else {
    //         alert("Failed to save handicap details");
    //     }
    // })
    // .catch(err => {
    //     console.error(err);
    //     alert("Server error while saving handicap data");
    // });
}


async function saveBloodGroupData() {

    const form = new FormData();

    form.append(
        "bloodGroup",
        document.getElementById("bloodGroup").value
    );

    const file =
        document.getElementById("bloodCert");

    if (file.files.length) {

        form.append(
            "bloodCert",
            file.files[0]
        );
    }

    try {

        const response = await fetch(
            "../../api/profile/save_blood_group.php",
            {
                method: "POST",
                body: form,
                credentials: "same-origin"
            }
        );

        const result =
            await response.json();

        if (result.success) {

            alert("Blood Group saved");

        } else {

            alert("Failed to save");
        }

    } catch (err) {

        console.error(err);

        alert("Server error");
    }
}



async function saveVitalEntry(vital) {

    try {

        const response = await fetch(
            "../../api/profile/save_vital.php",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                credentials: "same-origin",
                body: JSON.stringify(vital)
            }
        );

        const result =
            await response.json();

        if (!result.success) {

            console.error(
                "Vital save failed"
            );
        }

    } catch (err) {

        console.error(
            "Vital save error",
            err
        );
    }
}

document.addEventListener("input", function (e) {

    if (e.target.id !== "bpInput") return;

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 3) {
        value =
            value.substring(0, 3) +
            "/" +
            value.substring(3, 6);
    }

    e.target.value = value;
});
/*
==================================================

BACKEND DEV NOTE

API:
save_vital.php

REQUEST

{
    "height": "170",
    "weight": "65",
    "bp": "120/80",
    "date": "2026-08-07",
    "source": "OWN"
}

SOURCE VALUES

OWN = User entered

DR = Doctor entered from Medical Module

Doctor entries will come from Medical System
and should also be stored in same table.

==================================================
*/
// ================= HANDICAP TABLE =================

function renderHandicapTable() {

    const tbody =
        document.getElementById(
            "handicapCertificateTableBody"
        );

    if (!tbody) return;

    tbody.innerHTML = "";

    uploadedCertificates.forEach(
        (item, index) => {

                tbody.innerHTML += `
                    <tr>

                        <td>${index + 1}</td>

                        <td>${item.handicapType}</td>

                        <td>${item.type}</td>

                        <td>

                            <button
                                class="btn btn-sm btn-primary"
                                onclick="viewCertificate('${item.image}')">

                                View

                            </button>

                        </td>

                    </tr>
                `;
        }
    );
}


// ================= VIEW IMAGE =================

function viewCertificate(imageUrl) {

    document.getElementById(
        "certificatePreviewImage"
    ).src = imageUrl;

    document.getElementById(
        "certificatePreviewModal"
    ).style.display = "flex";
}


// ================= CLOSE POPUP =================

function closeCertificateModal() {

    document.getElementById(
        "certificatePreviewModal"
    ).style.display = "none";
}



