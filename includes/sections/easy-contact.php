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

        <div class="row" style="display:flex; gap:15px; flex-wrap:wrap;">

            <!-- ================= MOBILE ================= -->
            <div class="field-group" style="flex:1; min-width:250px;">
                <label class="field-label">Current Mobile No.</label>

                <div class="input-row" style="display:flex; gap:10px;">
                    <input type="text"
                        id="countryCode"
                        class="custom-input"
                        style="width:80px"
                        placeholder="+91"
                        disabled />

                    <input type="text"
                        id="mobileNumber"
                        class="custom-input"
                        placeholder="Enter Mobile Number"
                        disabled />
                </div>
            </div>

            <!-- ================= EMAIL (PERMANENTLY LOCKED) ================= -->
            <div class="field-group" style="flex:1; min-width:250px;">
                <label class="field-label">Current Email ID</label>

                <input type="email"
                    id="email"
                    class="custom-input"
                    placeholder="email@example.com"
                    disabled
                    style="background:#f3f4f6; cursor:not-allowed;" />
            </div>

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