<?php
// health-info.php
?>

<div class="section-card animate-pop-in">
    

    <!-- ================= MENU ================= -->
<div id="healthMenuSection" class="health-menu-grid">

    <div class="health-card-option"
         onclick="openHealthSection('basic')">

        <div class="health-card-icon">
            <i class="bi bi-heart-pulse-fill"></i>
        </div>

        <div class="health-card-content">
            <h3>Basic Health Details</h3>
            <p>Manage blood group, vitals, BP, and medical history</p>
        </div>

    </div>

    <div class="health-card-option"
         onclick="openHealthSection('handicap')">

        <div class="health-card-icon">
            <i class="bi bi-person-wheelchair"></i>
        </div>

        <div class="health-card-content">
            <h3>Handicap Details</h3>
            <p>Disability types, certifications, and documents</p>
        </div>

    </div>

</div>

    <!-- ===================================================== -->
    <!-- ================= BASIC HEALTH SECTION ============== -->
    <!-- ===================================================== -->

    <div id="basicHealthSection" style="display:none;">

        <!-- BACK BUTTON -->
        <button type="button"
                class="back-btn"
                onclick="goBackHealthMenu()">

            ← Back

        </button>

        <div class="section-header-row">

            <h2 class="section-main-title">
                Medical & Health Details
            </h2>

            <button type="button"
                    id="editHealthBtn"
                    class="edit-toggle-btn"
                    onclick="toggleHealthEdit()">

                Edit Details

            </button>

        </div>

        <!-- MAIN CARD -->
        <div class="address-card locked" id="healthCard">

            <!-- BLOOD GROUP -->
            <div class="row">

                <div class="col-md-6">
                    <div class="field-group">

                        <label class="field-label">
                            Permanent Blood Group
                        </label>

                        <div class="select-left-wrapper">

                            <i class="bi bi-chevron-down select-left-icon"></i>

                            <select class="form-select left-arrow-select"
                                    id="bloodGroup"
                                    disabled>

                                <option value="" selected disabled>
                                    Select Blood Group
                                </option>

                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>

                            </select>

                        </div>

                    </div>
                </div>

                <!-- CERTIFICATE -->
                <div class="col-md-6">

                    <div class="field-group">

                        <label class="field-label">
                            Blood Group Certificate (Optional)
                        </label>

                        <input type="file"
                               id="bloodCert"
                               class="form-control"
                               accept="image/*"
                               disabled />

                    </div>

                </div>

            </div>
                            <!-- BLOOD GROUP SAVE -->
                <div class="form-footer"
                    id="bloodGroupSaveFooter"
                    style="display:none;">

                    <button class="save-btn"
                            onclick="saveBloodGroupData()">

                        Save Blood Group Details

                    </button>

                </div>

            <hr>

            <!-- VITALS INPUT -->
            <h4 class="section-main-title" style="font-size:18px;">
                Log Current Vitals
            </h4>

            <div class="input-row" style="align-items:end;">

                <div class="field-group" style="flex:1;">

                    <label class="field-label">
                        Measurement Date
                    </label>

                    <input type="date"
                           class="form-control"
                           id="currentDate"
                           readonly />

                </div>
                    <div class="field-group" style="flex:1;">

                        <label class="field-label">
                            Blood Pressure
                            <span style="font-size:12px; color:#6b7280;">
                                (Systolic / Diastolic)
                            </span>
                        </label>

                        <div class="bp-wrapper">

                            <input type="number"
                                id="systolicInput"
                                class="bp-box"
                                placeholder="120"
                                disabled>

                            <span class="bp-separator">/</span>

                            <input type="number"
                                id="diastolicInput"
                                class="bp-box"
                                placeholder="80"
                                disabled>

                        </div>

                    </div>
                <div class="field-group" style="flex:1;">

                    <label class="field-label">
                        Weight (kg)
                    </label>

                    <input type="number"
                           class="form-control"
                           id="weightInput"
                           placeholder="kg"
                           disabled />

                </div>

                <div class="field-group" style="flex:1;">

                    <label class="field-label">
                        Height (cm)
                    </label>

                    <input type="number"
                           class="form-control"
                           id="heightInput"
                           placeholder="cm"
                           disabled />

                </div>

                <button type="button"
                        class="action-btn"
                        onclick="addVitals()"
                        id="addVitalsBtn"
                        disabled>

                    + Add

                </button>

            </div>

            <!-- TABLE -->
            <h4 class="section-main-title"
                style="font-size:18px; margin-top:20px;">

                Vitals History

            </h4>

            <div class="table-responsive">

                <table class="vitals-table"
                       style="width:100%; border-collapse:collapse;">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>BP</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody id="vitalsTableBody"></tbody>

                </table>

            </div>

        </div>

        <!-- SAVE -->
        

    </div>

<!-- ===================================================== -->
<!-- ================= HANDICAP SECTION ================== -->
<!-- ===================================================== -->


<div id="handicapSection" style="display:none;">
        <style>
            /* ONLY Handicap Section Labels */
            #handicapSection .field-label {
                font-size: 15px;
                font-weight: 800;
                color: #111827;
                margin-bottom: 8px;
                display: block;
                letter-spacing: 0.3px;
            }
        </style>

    <!-- BACK -->
    <button type="button"
            class="back-btn"
            onclick="goBackHealthMenu()">
        ← Back
    </button>
    <div class="field-group" style="max-width:220px;">

    <label class="field-label">
        Handicap Status
    </label>

    <input type="text"
           value="YES"
           readonly
           class="form-control"
           style="
                width:75px;
                background:#f3f4f6;
                font-weight:400;
                text-align:center;
                cursor:not-allowed;
           "/>

</div>

    <div class="section-header-row">
        <h2 class="section-main-title">Handicap Details</h2>
    </div>

    <div class="address-card">

        <!-- ================= TYPE SELECT ================= -->
        <div class="field-group">

            <label class="field-label">
                Select Handicap Type
            </label>

            <select id="handicapTypeSelect"
                    class="form-control"
                    onchange="addHandicapType()">

                <option value="">Select Type</option>
                <option value="Visual Impairment">Visual Impairment</option>
                <option value="Hearing Impairment">Hearing Impairment</option>
                <option value="Locomotor Disability">Locomotor Disability</option>
                <option value="Speech Impairment">Speech Impairment</option>

            </select>

        </div>

        <!-- ================= TAGS ================= -->
        <div id="selectedHandicapTags"
             style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; color:#374151;">
        </div>

        <hr>

        <!-- ================= SPLIT HEADER CHECKBOX ================= -->
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:10px;
        ">

            <label>
                <input type="checkbox"
                       id="stateGovCheck"
                       onchange="renderCertificateFields()">
                State Govt Certified
            </label>

            <div style="width:10px; height:50px; background:white;"></div>

            <label>
                <input type="checkbox"
                       id="centralGovCheck"
                       onchange="renderCertificateFields()">
                Central Govt Certified
            </label>

        </div>

        <!-- ================= SPLIT CONTAINER ================= -->
        <div style="
            display:flex;
            gap:20px;
            margin-top:10px;
        ">

            <!-- ================= STATE SIDE ================= -->
            <div style="
                flex:1;
                border:1px solid #e5e7eb;
                border-radius:10px;
                padding:15px;
                min-height:200px;
            ">

                <h4 style="margin-bottom:10px;">State Certificates</h4>

                <div id="stateCertSection"></div>

            </div>

            <!-- VERTICAL DIVIDER -->
            <div style="
                width:1px;
                background:#e5e7eb;
            "></div>

            <!-- ================= CENTRAL SIDE ================= -->
            <div style="
                flex:1;
                border:1px solid #e5e7eb;
                border-radius:10px;
                padding:15px;
                min-height:200px;
            ">

                <h4 style="margin-bottom:10px;">Central Certificates</h4>

                <div id="centralCertSection"></div>

            </div>

        </div>

        <!-- ================= SUBMIT ================= -->
        <div style="margin-top:20px; text-align:right;">

            <button class="save-btn"
                    onclick="saveHandicapData()">

                Save Handicap Details

            </button>
                            <hr style="margin:20px 0;">

                <h4 style="font-weight:700;">
                    Uploaded Certificates
                </h4>

                <div class="table-responsive">

                    <table class="table table-bordered">

                        <thead>

                            <tr>
                                <th>Sr No</th>
                                <th>Handicap Type</th>
                                <th>Certificate Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody id="handicapCertificateTableBody">

                        </tbody>

                    </table>

                </div>

        </div>

    </div>
</div>

</div>
<div id="certificatePreviewModal"
     style="
        display:none;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.7);
        z-index:9999;
        justify-content:center;
        align-items:center;
     ">

    <div style="
        background:white;
        padding:20px;
        border-radius:10px;
        max-width:800px;
        max-height:90vh;
        position:relative;
    ">

        <button
            onclick="closeCertificateModal()"
            style="
                position:absolute;
                top:10px;
                right:10px;
                border:none;
                background:red;
                color:white;
                border-radius:5px;
                padding:5px 10px;
            ">
            ✕
        </button>

        <img id="certificatePreviewImage"
             src=""
             style="
                max-width:100%;
                max-height:80vh;
             ">
    </div>

</div>

<!-- JS -->
<!-- <script src="health-info.js"></script> -->