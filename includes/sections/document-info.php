<?php
/* ==========================================================================
   ATTN: BACKEND DEVELOPER
   ==========================================================================
   1. ON PAGE LOAD: Fetch this user's document numbers/file paths from the database.
   2. POPULATE INPUTS: Replace the placeholder values in the inputs below using:
      value="<?php echo isset($db_pan_number) ? htmlspecialchars($db_pan_number) : ''; ?>"
   3. REGISTRY TABLE: Update the text elements in the table below (e.g., id="txtNum-panCard")
      with the saved values on initial render, and check if files exist to change the 
      "No file attached" status block.
   ========================================================================== */
?>

<div id="successPopup" class="complete-badge animate-pop-in" style="display: none; position: fixed; top: 20px; right: 20px; z-index: 9999; background: #10b981; color: white;">
    <i class="bi bi-check-circle-fill"></i> Document registry package saved successfully!
</div>

<div id="lightboxOverlay" class="address-card locked" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.75); justify-content: center; align-items: center; z-index: 10000;">
    <div class="section-card" style="position: relative; max-width: 90%; max-height: 90%;">
        <button id="closeLightboxBtn" type="button" class="edit-toggle-btn active" style="position: absolute; top: -15px; right: -15px; border-radius: 50%; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;">✕</button>
        <img id="lightboxImage" src="" alt="Document Preview" style="max-width: 100%; max-height: 70vh; border-radius: 14px; object-fit: contain;">
    </div>
</div>

<div class="section-card">
    
    <div class="section-header-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 class="section-main-title" style="margin: 0;">Document Management</h3>
        <button type="button" id="editToggleBtn" class="edit-toggle-btn">
            <i class="bi bi-pencil-square"></i> Edit & Upload
        </button>
    </div>

    <form id="documentVaultForm">
        
        <div id="essentialDocsCard" class="address-card locked">
            <div class="section-top" style="border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 class="section-title" style="margin: 0;">
                    <i class="bi bi-shield-check"></i> Essential Documents 
                    <span class="secure-note" style="display: inline-block; margin-left: 10px; font-weight: normal; font-size: 0.85em;">(Optional Submission)</span>
                </h3>
            </div>

            <div class="essential-doc-row field-group" data-key="panCard" style="padding: 15px; background: #f8fafc; border-radius: 14px; border: 1px solid #dbe2ea; margin-bottom: 15px;">
                <span class="field-label" style="font-weight: 600; display: block; margin-bottom: 10px;">PAN Card</span>
                <div class="input-row" style="display: flex; gap: 15px;">
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Document Number</label>
                        <input type="text" class="custom-input doc-number" placeholder="Enter PAN Card Identification Number" disabled style="width: 100%;">
                    </div>
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Upload Image File</label>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="file" class="custom-input doc-file" accept="image/*" disabled style="padding: 6px; flex: 1;">
                            <button type="button" class="preview-btn edit-toggle-btn" style="display:none;"><i class="bi bi-image"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="essential-doc-row field-group" data-key="drivingLicense" style="padding: 15px; background: #f8fafc; border-radius: 14px; border: 1px solid #dbe2ea; margin-bottom: 15px;">
                <span class="field-label" style="font-weight: 600; display: block; margin-bottom: 10px;">Driving License</span>
                <div class="input-row" style="display: flex; gap: 15px;">
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Document Number</label>
                        <input type="text" class="custom-input doc-number" placeholder="Enter Driving License Identification Number" disabled style="width: 100%;">
                    </div>
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Upload Image File</label>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="file" class="custom-input doc-file" accept="image/*" disabled style="padding: 6px; flex: 1;">
                            <button type="button" class="preview-btn edit-toggle-btn" style="display:none;"><i class="bi bi-image"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="essential-doc-row field-group" data-key="passport" style="padding: 15px; background: #f8fafc; border-radius: 14px; border: 1px solid #dbe2ea; margin-bottom: 15px;">
                <span class="field-label" style="font-weight: 600; display: block; margin-bottom: 10px;">Passport</span>
                <div class="input-row" style="display: flex; gap: 15px;">
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Document Number</label>
                        <input type="text" class="custom-input doc-number" placeholder="Enter Passport Identification Number" disabled style="width: 100%;">
                    </div>
                    <div class="field-group" style="flex: 1;">
                        <label class="field-label">Upload Image File</label>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="file" class="custom-input doc-file" accept="image/*" disabled style="padding: 6px; flex: 1;">
                            <button type="button" class="preview-btn edit-toggle-btn" style="display:none;"><i class="bi bi-image"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="optionalDocsCard" class="address-card locked" style="margin-top: 25px;">
            <div class="section-top" style="border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 class="section-title" style="margin: 0;"><i class="bi bi-folder-plus"></i> Optional Extra Documents</h3>
            </div>

            <div class="input-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                <div class="field-group" style="flex: 1;">
                    <label class="field-label">Document Name</label>
                    <input type="text" id="extraDocName" class="custom-input" placeholder="e.g. Leave & License, Light Bill" disabled style="width: 100%;">
                </div>
                <div class="field-group" style="flex: 1;">
                    <label class="field-label">Document Number (If applicable)</label>
                    <input type="text" id="extraDocNumber" class="custom-input" placeholder="Enter Document ID Reference String" disabled style="width: 100%;">
                </div>
            </div>

            <div class="field-group" style="margin-bottom: 15px;">
                <label class="field-label">Upload Image Attachment</label>
                <input type="file" id="extraDocFile" class="custom-input" accept="image/*" disabled style="padding: 8px; width: 100%;">
            </div>

            <div id="addOptionalWrapper" style="display: none; justify-content: flex-end;">
                <button type="button" id="addOptionalBtn" class="edit-toggle-btn">
                    <i class="bi bi-plus"></i> Include Document in Table Below
                </button>
            </div>
        </div>

        <h4 class="field-label" style="margin-top: 35px; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.5px;">
            Current Vault Documents Registry Table
        </h4>

        <div style="width: 100%; overflow-x: auto; background: #fff; border-radius: 14px; border: 1px solid #dbe2ea; margin-top: 10px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #dbe2ea;">
                        <th style="padding: 12px 16px;">Category</th>
                        <th style="padding: 12px 16px;">Document Name</th>
                        <th style="padding: 12px 16px;">Document Number Reference</th>
                        <th style="padding: 12px 16px; text-align: center;">Actions</th>
                    </tr>
                </thead>
                <tbody id="registryTableBody">
                    <tr id="row-panCard" style="border-bottom: 1px solid #dbe2ea;">
                        <td style="padding: 12px 16px;"><span class="complete-badge" style="background: #eef2ff; color: #6366f1; padding: 4px 8px; border-radius: 6px; font-size: 0.85em;">Essential</span></td>
                        <td style="padding: 12px 16px; font-weight: 500;">PAN Card</td>
                        <td id="txtNum-panCard" style="padding: 12px 16px; color: #cbd5e1; font-style: italic;">Empty</td>
                        <td style="padding: 12px 16px; text-align: center;">
                            <div id="actions-panCard" style="display: flex; justify-content: center; gap: 15px; align-items: center;">
                                <span class="secure-note" style="color: #94a3b8; font-size: 0.9em;">No file attached</span>
                            </div>
                        </td>
                    </tr>
                    <tr id="row-drivingLicense" style="border-bottom: 1px solid #dbe2ea;">
                        <td style="padding: 12px 16px;"><span class="complete-badge" style="background: #eef2ff; color: #6366f1; padding: 4px 8px; border-radius: 6px; font-size: 0.85em;">Essential</span></td>
                        <td style="padding: 12px 16px; font-weight: 500;">Driving License</td>
                        <td id="txtNum-drivingLicense" style="padding: 12px 16px; color: #cbd5e1; font-style: italic;">Empty</td>
                        <td style="padding: 12px 16px; text-align: center;">
                            <div id="actions-drivingLicense" style="display: flex; justify-content: center; gap: 15px; align-items: center;">
                                <span class="secure-note" style="color: #94a3b8; font-size: 0.9em;">No file attached</span>
                            </div>
                        </td>
                    </tr>
                    <tr id="row-passport" style="border-bottom: 1px solid #dbe2ea;">
                        <td style="padding: 12px 16px;"><span class="complete-badge" style="background: #eef2ff; color: #6366f1; padding: 4px 8px; border-radius: 6px; font-size: 0.85em;">Essential</span></td>
                        <td style="padding: 12px 16px; font-weight: 500;">Passport</td>
                        <td id="txtNum-passport" style="padding: 12px 16px; color: #cbd5e1; font-style: italic;">Empty</td>
                        <td style="padding: 12px 16px; text-align: center;">
                            <div id="actions-passport" style="display: flex; justify-content: center; gap: 15px; align-items: center;">
                                <span class="secure-note" style="color: #94a3b8; font-size: 0.9em;">No file attached</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="formFooter" class="form-footer" style="display: none; margin-top: 25px;">
            <button type="submit" class="action-btn">Save & Upload Document Pack</button>
        </div>
    </form>
</div>