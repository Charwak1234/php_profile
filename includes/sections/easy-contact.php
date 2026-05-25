<?php
// easy-contact.php
?>

<div class="section-card animate-pop-in">

    <!-- ================= HEADER ================= -->
    <div class="section-header-row">
        <h2 class="section-main-title">Contact Information</h2>

        <button type="button"
            id="editContactBtn"
            class="edit-toggle-btn"
            onclick="toggleContactEdit()">
            Edit Info
        </button>
    </div>

    <!-- ================= CARD ================= -->
    <div class="address-card locked" id="contactCard">

        <!-- ================= MOBILE ================= -->
        <div class="field-group">
            <label class="field-label">Current Mobile No.</label>

            <div class="input-row">
                <input type="text"
                    id="countryCode"
                    class="custom-input"
                    style="width:80px"
                    value="+91"
                    disabled />

                <input type="text"
                    id="mobileNumber"
                    class="custom-input"
                    placeholder="Enter Mobile Number"
                    value="9876543210"
                    disabled />
            </div>
        </div>

        <!-- ================= EMAIL ================= -->
        <div class="field-group">
            <label class="field-label">Current Email ID</label>

            <input type="email"
                id="email"
                class="custom-input"
                placeholder="email@example.com"
                value="charwak.bhonde@example.com"
                disabled />
        </div>

    </div>

    <!-- ================= SAVE BUTTON ================= -->
    <div class="form-footer" id="contactFooter" style="display:none;">
        <button class="action-btn" onclick="saveContactInfo()">
            Update Contact Info
        </button>
    </div>

</div>

<!-- JS FILE -->
<!-- <script src="easy-contact.js"></script> -->