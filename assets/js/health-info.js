let isEditable = false;

// initial data (same as React state example)
let vitalsHistory = [
    { id: 1, height: 175, weight: 70, date: "2026-01-15" },
    { id: 2, height: 175, weight: 72, date: "2026-03-10" }
];

// ================= INIT =================
window.onload = function () {
    setCurrentDate();
    renderTable();
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

        vitalsHistory:
            vitalsHistory
    };

    console.log("Health Data:", data);

    alert("Health data ready for backend (check console)");

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