<?php
// language-info.php
?>

<div class="section-card animate-pop-in">

    <!-- ================= HEADER ================= -->
    <div class="section-header-row">
        <h2 class="section-main-title">Language & Caste Information</h2>

        <button
            class="edit-toggle-btn"
            type="button"
            id="languageEditBtn"
        >
            <i class="bi bi-pencil-square"></i> Edit Info
        </button>
    </div>

    <form id="languageForm" class="address-card locked">

        <!-- ================= LANGUAGE SECTION ================= -->
        <div class="field-group">
            <label class="field-label">Mother Tongue</label>

            <select
                class="form-select"
                id="motherTongue"
                disabled
            >
                <option value="">Select Mother Tongue</option>

                <!-- BACKEND DEV:
                     Mother tongue list will come from backend API/database
                -->

                <option>Marathi</option>
                <option>Hindi</option>
                <option>English</option>
                <option>Gujarati</option>
            </select>
        </div>

        <div class="field-group">

            <label class="field-label">Known Languages</label>

            <div class="input-row">

                <select
                    class="form-select"
                    id="languageSelect"
                    disabled
                >
                    <option value="">Select Language</option>

                    <!-- BACKEND DEV:
                         Known languages list will come from backend
                    -->

                    <option value="Marathi">Marathi</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                </select>

                <button
                    type="button"
                    class="action-btn"
                    id="addLanguageBtn"
                    onclick="addLanguage()"
                    disabled
                >
                    Add
                </button>

            </div>

            <!-- LANGUAGE CHIPS -->
            <div
                id="languageChips"
                class="chip-container"
                style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:10px;
                    margin-top:15px;
                "
            ></div>

        </div>

        <hr>

        <!-- ================= CASTE SECTION ================= -->
        <h2 class="section-main-title mb-4">
            Caste Information
        </h2>

        <div class="field-group">

            <label class="field-label">Caste Category</label>

            <select
                class="form-select"
                id="casteCategory"
                disabled
            >
                <option value="">Select Category</option>

                <!-- BACKEND DEV:
                     Caste category data will come from backend
                -->

                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
            </select>

        </div>

        <div class="field-group">

            <label class="field-label">Caste</label>

            <select
                class="form-select"
                id="caste"
                disabled
            >
                <option value="">Select Caste</option>

                <!-- BACKEND DEV:
                     Caste list will come from backend
                -->

                <option>Caste A</option>
                <option>Caste B</option>
            </select>

        </div>

        <div class="field-group">

            <label class="field-label">Sub Caste</label>

            <select
                class="form-select"
                id="subCaste"
                disabled
            >
                <option value="">Select Sub Caste</option>

                <!-- BACKEND DEV:
                     Sub caste list will come from backend
                -->

                <option>Sub Caste 1</option>
                <option>Sub Caste 2</option>
            </select>

        </div>

        <!-- ================= SUBMIT BUTTON ================= -->
        <div
            class="form-footer animate-pop-in"
            id="languageFooter"
            style="display:none;"
        >
            <button
                type="submit"
                class="save-btn"
            >
                Save Information
            </button>
        </div>

    </form>

</div>