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

        <div class="field-group">
            <label class="field-label">Board / University *</label>
            <input type="text" id="qualBoard" class="custom-input" disabled>
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
                    <th>Board</th>
                    <th>Percentage</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody id="qualRegistryTableBody">

                <tr id="qual-mock-1">
                    <td>Degree</td>
                    <td>Mumbai University</td>
                    <td>80%</td>
                    <td>
                        <button class="mock-view-trigger">View</button>
                        <button class="mock-delete-trigger">Delete</button>
                    </td>
                </tr>

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

            <div class="modal-info-block">
                <div class="modal-info-label">Course</div>
                <div id="modalViewCourse">-</div>
            </div>

            <div class="modal-info-block">
                <div class="modal-info-label">Branch</div>
                <div id="modalViewBranch">-</div>
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