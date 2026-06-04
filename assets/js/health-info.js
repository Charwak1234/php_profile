let isEditable = false;

// initial data (EMPTY now — no default vitals)
let vitalsHistory = [];

// ================= INIT =================
window.onload = function () {
    setCurrentDate();
    renderTable();
    loadHealth();
};

// ================= SET CURRENT DATE =================
function setCurrentDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("currentDate").value = today;
}

// ================= TOGGLE EDIT =================
function toggleHealthEdit() {

    isEditable = !isEditable;

    const fields = [
        "bloodGroup",
        "bloodCert",
        "heightInput",
        "weightInput",
        "addVitalsBtn"
    ];

    fields.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.disabled = !isEditable;
        }

    });

    // SAVE BUTTON
    document.getElementById("saveFooter").style.display =
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

    const height = document.getElementById("heightInput").value;

    const weight = document.getElementById("weightInput").value;

    const date = document.getElementById("currentDate").value;

    if (!height || !weight) return;

    const newEntry = {
        id: Date.now(),
        height,
        weight,
        date
    };

    vitalsHistory.unshift(newEntry);

    document.getElementById("heightInput").value = "";
    document.getElementById("weightInput").value = "";

    renderTable();
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
            <td>
                <span class="bmi-badge-calc">
                    Active Tracking
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
                    "
                >
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
            vitalsHistory = d.vitalsHistory.map((v, idx) => ({ id: Date.now() + idx, height: v.height, weight: v.weight, date: v.date }));
            renderTable();
        }

        // TODO: show link to existing certificate if needed (d.blood_group_certificate)
    } catch (err) {
        console.warn('Failed to load health data', err);
    }
}
