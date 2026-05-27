<?php
// health-info.php
?>

<div class="section-card animate-pop-in">

    <!-- ================= HEADER ================= -->
    <div class="section-header-row">
        <h2 class="section-main-title">Medical & Health Details</h2>

        <button type="button"
            id="editHealthBtn"
            class="edit-toggle-btn"
            onclick="toggleHealthEdit()">
            Edit Details
        </button>
    </div>

    <!-- ================= MAIN CARD ================= -->
    <div class="address-card locked" id="healthCard">

        <!-- ================= BLOOD GROUP + CERTIFICATE ================= -->
        <div class="row">

            <!-- BLOOD GROUP -->
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

            <!-- CERTIFICATE UPLOAD -->
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

        <hr>

        <!-- ================= VITAL INPUT ================= -->
        <h4 class="section-main-title" style="font-size:18px;">
            Log Current Vitals
        </h4>

        <div class="input-row" style="align-items:end;">

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

            <div class="field-group" style="flex:1.2;">

                <label class="field-label">
                    Measurement Date
                </label>

                <!-- AUTO CURRENT DATE (NOT EDITABLE) -->
                <input type="date"
                    class="form-control"
                    id="currentDate"
                    readonly />

            </div>

            <button type="button"
                class="action-btn"
                onclick="addVitals()"
                id="addVitalsBtn"
                disabled>

                + Add

            </button>

        </div>

        <!-- ================= TABLE ================= -->
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
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody id="vitalsTableBody">
                    <!-- JS will render -->
                </tbody>

            </table>

        </div>

    </div>

    <!-- ================= SAVE BUTTON ================= -->
    <div class="form-footer"
         id="saveFooter"
         style="display:none;">

        <!-- BACKEND DEV:
        Send image using FormData with AJAX/fetch API -->

        <button class="save-btn"
                onclick="saveHealthData()">

            Save Master Vitals Changes

        </button>

    </div>

</div>

<!-- JS FILE -->
<!-- <script src="health-info.js"></script> -->