<div class="section-card">

    <!-- SECTION HEADER -->
    <div class="section-header-row">

        <h3 class="section-main-title">
            Aadhar Verification
        </h3>

        <!-- EDIT BUTTON -->
        <button type="button"
                class="edit-toggle-btn"
                id="aadharEditBtn"
                onclick="toggleAadharEdit()">

            <i class="bi bi-pencil-square"></i>
            Edit Info

        </button>

    </div>

    <!-- SECTION BODY -->
    <div class="address-card locked"
         id="aadharCard">

        <!-- FULL NAME -->
        <div class="field-group">

            <label class="field-label">
                Full Name (As per Aadhar)
            </label>

            <input type="text"
                   id="fullName"
                   class="custom-input"
                   value="Sahitya Baman"
                   disabled
                   placeholder="Enter full name">

        </div>

        <!-- AADHAR NUMBER -->
        <div class="field-group">

            <label class="field-label">
                Aadhar Number
            </label>

            <div class="input-row">

                <input type="password"
                       class="custom-input aadhar-field"
                       maxlength="4"
                       value="1234"
                       disabled
                       placeholder="XXXX">

                <input type="password"
                       class="custom-input aadhar-field"
                       maxlength="4"
                       value="5678"
                       disabled
                       placeholder="XXXX">

                <input type="text"
                       class="custom-input aadhar-field"
                       maxlength="4"
                       value="9012"
                       disabled
                       placeholder="XXXX">

            </div>

            <small class="secure-note">

                <i class="bi bi-shield-lock-fill"></i>

                Your Aadhar details are encrypted and stored securely.

            </small>

        </div>

        <!-- FILE UPLOAD -->
        <div class="field-group upload-disabled"
             id="uploadSection">

            <label class="field-label">
                Verification Document (Front Side)
            </label>

            <div class="upload-area"
                 id="uploadBox">

                <i class="bi bi-cloud-arrow-up upload-icon"></i>

                <p class="upload-text">
                    Upload Locked
                </p>

                <input type="file"
                       hidden
                       id="aadharUpload">

            </div>

        </div>

    </div>

    <!-- SAVE BUTTON -->
    <div class="form-footer d-none"
         id="aadharSaveSection">

            <button class="action-btn"
                    onclick="submitAadharForm()">

                Submit for Verification

            </button>

    </div>

</div>