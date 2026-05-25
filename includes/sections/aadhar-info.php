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
                   placeholder="Enter full name" required>

        </div>

        <!-- AADHAR NUMBER -->
        <div class="field-group">

            <label class="field-label" >
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

        <!-- ===================================
AADHAAR IMAGE UPLOAD SECTION
=================================== -->

<div id="uploadSection">

    <!-- FRONT IMAGE -->
    <div class="field-group upload-disabled">

        <label class="field-label">
            Aadhaar Front / Upper View
        </label>

        <div class="upload-area"
             id="frontUploadBox">

            <i class="bi bi-cloud-arrow-up upload-icon"></i>

            <p class="upload-text"
               id="frontUploadText">
                Upload Front Side Image
            </p>

            <input
                type="file"
                hidden
                id="aadharFrontImage"
                accept="image/*"
            >

        </div>

    </div>

    <!-- BACK IMAGE -->
    <div class="field-group upload-disabled mt-3">

        <label class="field-label">
            Aadhaar Back / Lower View
        </label>

        <div class="upload-area"
             id="backUploadBox">

            <i class="bi bi-cloud-arrow-up upload-icon"></i>

            <p class="upload-text"
               id="backUploadText">
                Upload Back Side Image
            </p>

            <input
                type="file"
                hidden
                id="aadharBackImage"
                accept="image/*"
            >

        </div>

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
<div id="registrationSuccessModal" class="success-modal-overlay">

    <div class="success-modal-box animate-pop-in">

        <div class="success-icon">
            <i class="bi bi-check-circle-fill"></i>
        </div>

        <h2>Registration Successful</h2>

        <p>
            You are registered successfully.<br>
            You can proceed to your tasks now.
        </p>

        <small>
            All other details are optional and can be filled later.
        </small>

        <button id="closeSuccessModal" class="success-modal-btn">
            Continue
        </button>

    </div>

</div>