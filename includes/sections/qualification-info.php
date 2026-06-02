<div class="section-card animate-pop-in" id="qualificationSection">

    <!-- SUCCESS POPUP -->
    <div id="qualSuccessPopup" class="complete-badge text-center mb-3"
        style="display:none; background:#ecfdf5; color:#059669;">
        <i class="bi bi-check-circle-fill"></i> Academic credential saved cleanly!
    </div>

    <!-- ERROR BANNER -->
    <div id="qualErrorBanner" class="complete-badge text-center mb-3"
        style="display:none; background:#fef2f2; color:#dc2626;">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span id="qualErrorText"></span>
    </div>

    <!-- HEADER -->
    <div class="section-header-row">
        <h3 class="section-main-title">Educational Profile Details</h3>

        <button type="button" id="qualEditToggleBtn" class="edit-toggle-btn">
            <i class="bi bi-pencil-square"></i> Add Credentials
        </button>
    </div>

    <!-- FORM -->
    <form id="qualificationForm" class="address-card locked" novalidate>

        <div class="row">
            <div class="col-md-6">
                <div class="field-group">
                    <label class="field-label">Degree / Diploma <span class="required-star">*</span></label>
                    <select id="qualDegree" class="custom-input" disabled>
                        <option value="">Select Option</option>
                        <option value="SSC">SSC (10th)</option>
                        <option value="HSC">HSC (12th)</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Degree">Degree</option>
                        <option value="PostGraduation">Post Graduation</option>
                    </select>
                </div>
            </div>

            <div class="col-md-6">
                <div class="field-group">
                    <label class="field-label">Institution Type <span class="required-star">*</span></label>
                    <select id="qualInstType" class="custom-input" disabled>
                        <option value="">Select Type</option>
                        <option value="State Board">State Board</option>
                        <option value="CBSE Board">CBSE Board</option>
                        <option value="ICSE Board">ICSE Board</option>
                        <option value="University">University</option>
                        <option value="Autonomous">Autonomous</option>
                    </select>
                </div>
            </div>
        </div>

<!-- =====================================================
BACKEND NOTE:

Dropdown values for Board / University category
will eventually come from backend/API.

Example response:

[
    "State Board",
    "CBSE Board",
    "ICSE Board",
    "University",
    "Autonomous"
]

Frontend currently uses temporary static options.

===================================================== -->

<div class="field-group">
    <div class="row">

        <div class="col-md-6">

            <label class="field-label">
                Board / University
                <span class="required-star">*</span>
            </label>

            <select id="qualBoard"
                    class="custom-input"
                    disabled>

                <option value="">
                    Select Board / University
                </option>

                <!-- TEMP DATA -->
                <option value="State Board">
                    State Board
                </option>

                <option value="CBSE Board">
                    CBSE Board
                </option>

                <option value="ICSE Board">
                    ICSE Board
                </option>

                <option value="University">
                    University
                </option>

                <option value="Autonomous">
                    Autonomous
                </option>

            </select>

        </div>

        <div class="col-md-6">

            <label class="field-label">
                Name of Board / University
                <span class="required-star">*</span>
            </label>

            <input type="text"
                   id="qualBoardName"
                   class="custom-input"
                   placeholder="Enter Name"
                   disabled>

        </div>

    </div>
</div>

<!-- =====================================================
BACKEND NOTE:
Store passing_month and passing_year in qualification table.

Suggested columns:

passing_month VARCHAR(20)
passing_year INT

While fetching qualification records, return data sorted by:

ORDER BY passing_year ASC,
         passing_month ASC

This will show oldest qualification first
and latest qualification last.
===================================================== -->

<div class="field-group">
    <div class="row">

        <div class="col-md-6">
            <label class="field-label">
                Passing Month <span class="required-star">*</span>
            </label>

            <select id="qualPassingMonth"
                    class="custom-input"
                    disabled>

                <option value="">Select Month</option>

                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>

            </select>
        </div>

        <div class="col-md-6">
                    <label class="field-label">
                        Passing Year <span class="required-star">*</span>
                    </label>

                    <input type="number"
                        id="qualPassingYear"
                        class="custom-input"
                        placeholder="Select Year"
                        min="1950"
                        max="2100"
                        disabled>
                </div>

            </div>
        </div>

        <div class=field-group>
        <div class="row">
            <div class="col-md-6">
                <input type="text" id="qualCourseName" class="custom-input" placeholder="Course" disabled>
            </div>
            <div class="col-md-6">
                <input type="text" id="qualBranchName" class="custom-input" placeholder="Branch" disabled>
            </div>
        </div>
        </div>

        <div class=field-group>
        <div class="row">
            <div class="col-md-6">
                <input type="number" id="qualMarksObtained" class="custom-input" placeholder="Marks Obtained" disabled>
            </div>
            <div class="col-md-6">
                <input type="number" id="qualMarksOutOf" class="custom-input" placeholder="Total Marks" disabled>
            </div>
        </div>
        </div>

        <div class=field-group>
        <div class="row">
            <div class="col-md-6">
                <input type="text" id="qualPercentage" class="custom-input age-field" placeholder="Percentage (Autofill)" disabled>
            </div>
            <div class="col-md-6">
                <input type="text" id="qualGrade" class="custom-input" placeholder="Grade" disabled>
            </div>
        </div>
        </div>

        <!-- UPLOAD -->
        <div class="field-group">
            <label class="field-label">Certificate Image</label>

            <div class="upload-area upload-disabled" id="qualUploadWrapper">
                <i class="bi bi-cloud-arrow-up-fill upload-icon"></i>
                <p class="upload-text" id="uploadStatusText">
                    Click here to upload certificate
                </p>
                <input type="file" id="qualFile" accept="image/*" disabled hidden>
            </div>
        </div>

        <div id="qualFormFooter" class="form-footer" style="display:none;">
            <button type="submit" class="action-btn">
                Submit Qualification
            </button>
        </div>

    </form>

    <hr>

    <!-- TABLE -->
    <h4 class="section-main-title">Education Registry History Log</h4>

    <div class="table-responsive">
        <table class="table custom-registry-table">
            <thead>
                <tr>
                    <th>Degree</th>
                    <th>Board / University Name</th>
                    <th>Passing</th>
                    <th>Percentage</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <!-- =====================================================
                    BACKEND NOTE:

                    Fetch qualification records ordered by:

                    ORDER BY passing_year ASC,
                            passing_month ASC

                    Example:

                    SSC         March     2018
                    HSC         March     2020
                    Diploma     May       2023
                    Degree      June      2026

                    Return sorted records to frontend.

                    Frontend currently performs temporary sorting
                    until backend API integration is completed.
                    ===================================================== -->

                    <tbody id="qualRegistryTableBody">

                

            </tbody>
        </table>
    </div>
</div>

<!-- MODAL FIXED -->
<div id="qualLightboxModal" class="custom-modal-overlay" style="display:none;">

    <div class="qual-modal-content-card animate-pop-in">

        <div class="qual-modal-header">
            <h3>Qualification Overview</h3>
            <button id="closeQualLightbox">✕</button>
        </div>

        <div class="qual-modal-body-wrapper">

            <div class="modal-info-block">
                <div class="modal-info-label">Degree</div>
                <div id="modalViewDegree">-</div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">Type</div>
                <div id="modalViewType">-</div>
            </div>

            <div class="modal-info-block full-width">
                <div class="modal-info-label">Board</div>
                <div id="modalViewBoard">-</div>
            </div>
            <div class="modal-info-block full-width">
                <div class="modal-info-label">
                    Board / University Name
                </div>

                <div id="modalViewBoardName">
                    -
                </div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">Course</div>
                <div id="modalViewCourse">-</div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">Branch</div>
                <div id="modalViewBranch">-</div>
            </div>
            <div class="modal-info-block">
                <div class="modal-info-label">
                    Passing Month
                </div>

                <div id="modalViewPassingMonth">
                    -
                </div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">
                    Passing Year
                </div>

                <div id="modalViewPassingYear">
                    -
                </div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">Marks</div>
                <div id="modalViewMarks">-</div>
            </div>

            <div class="modal-info-block">
    <div class="modal-info-label">Percentage</div>
    <div id="modalViewPercentage">-</div>
</div>

<div class="modal-info-block">
    <div class="modal-info-label">Grade</div>
    <div id="modalViewGrade">-</div>
</div>

<div class="modal-image-preview-area">
    <img id="modalViewImg" alt="Certificate Preview">
    <div id="modalViewEmptyAsset">
        No certificate uploaded
    </div>
</div>

</div>
</div>
</div>