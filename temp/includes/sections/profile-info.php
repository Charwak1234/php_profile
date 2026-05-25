<div class="section-card">

    <!-- HEADER -->
    <div class="section-header-row">

        <h3 class="section-main-title">
            Profile Information
        </h3>

        <button type="button"
                class="edit-toggle-btn"
                id="profileEditBtn"
                onclick="toggleProfileEdit()">
                

            <i class="bi bi-pencil-square"></i>
            Edit Info

        </button>

    </div>

    <!-- FORM -->
    <form id="profileForm"
          class="address-card locked">

        <!-- PROFILE IMAGE -->
        <div class="profile-avatar-row">

            <div class="avatar-wrapper">

                <div class="lottie-container">

                    <i class="bi bi-person-circle profile-avatar-icon"></i>

                </div>

            </div>

        </div>

        <!-- GENDER + MARITAL -->
        <div class="row">

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Gender
                        <span class="required-star">*</span>
                    </label>

                    <select class="custom-input profile-field"
                            id="gender"
                            disabled>

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>

            </div>

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Marital Status
                        <span class="required-star">*</span>
                    </label>

                    <select class="custom-input profile-field"
                            id="maritalStatus"
                            disabled>

                        <option value="">
                            Select Status
                        </option>

                        <option value="Bachelor">
                            Bachelor / Single
                        </option>

                        <option value="Married">
                            Married
                        </option>

                        <option value="Divorced">
                            Divorced
                        </option>

                        <option value="Widowed">
                            Widowed
                        </option>

                    </select>

                </div>

            </div>

        </div>

        <!-- NAME ROW -->
        <div class="row">

            <div class="col-md-4">

                <div class="field-group">

                    <label class="field-label">
                        First Name
                        <span class="required-star">*</span>
                    </label>

                    <input type="text"
                           class="custom-input profile-field"
                           id="firstName"
                           disabled
                           placeholder="First Name">

                </div>

            </div>

            <div class="col-md-4">

                <div class="field-group">

                    <label class="field-label">
                        Middle Name
                        <span class="required-star">*</span>
                    </label>

                    <input type="text"
                           class="custom-input profile-field"
                           id="middleName"
                           disabled
                           placeholder="Middle Name">

                </div>

            </div>

            <div class="col-md-4">

                <div class="field-group">

                    <label class="field-label">
                        Last Name
                        <span class="required-star">*</span>
                    </label>

                    <input type="text"
                           class="custom-input profile-field"
                           id="lastName"
                           disabled
                           placeholder="Last Name">

                </div>

            </div>

        </div>

        <!-- PARENTS -->
        <div class="row">

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Father's Name
                    </label>

                    <input type="text"
                           class="custom-input profile-field"
                           disabled
                           placeholder="Father's Full Name">

                </div>

            </div>

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Mother's Name
                    </label>

                    <input type="text"
                           class="custom-input profile-field"
                           disabled
                           placeholder="Mother's Full Name">

                </div>

            </div>

        </div>

        <!-- SPOUSE -->
        <div class="row">

            <div class="col-md-6">

                <div class="field-group spouse-disabled"
                     id="husbandFieldWrapper">

                    <label class="field-label">
                        Husband's Name
                    </label>

                    <input type="text"
                           class="custom-input"
                           id="husbandName"
                           disabled
                           placeholder="Locked">

                </div>

            </div>

            <div class="col-md-6">

                <div class="field-group spouse-disabled"
                     id="wifeFieldWrapper">

                    <label class="field-label">
                        Wife's Name
                    </label>

                    <input type="text"
                           class="custom-input"
                           id="wifeName"
                           disabled
                           placeholder="Locked">

                </div>

            </div>

        </div>

        <!-- DOB -->
        <div class="row">

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Date of Birth
                        <span class="required-star">*</span>
                    </label>

                    <input type="date"
                           class="custom-input profile-field"
                           id="dob"
                           disabled>

                </div>

            </div>

            <div class="col-md-6">

                <div class="field-group">

                    <label class="field-label">
                        Age (Auto Calculated)
                    </label>

                    <input type="text"
                           class="custom-input age-field"
                           id="age"
                           disabled
                           placeholder="Select DOB">

                </div>

            </div>

        </div>

        <!-- SAVE -->
        <div class="form-footer d-none"
             id="profileSaveSection">

            <button type="button"
                    class="action-btn"
                    onclick="submitProfileForm()">

                Save Profile Changes

            </button>

        </div>

    </form>

</div>