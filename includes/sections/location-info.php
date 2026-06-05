<?php
/* ==========================================================================
   ATTN: BACKEND DEVELOPER
   ==========================================================================
   1. ON PAGE LOAD: Fetch saved address values from your database to populate 
      the profile values into the form fields.
   2. RENDERING REPOS: If records exist, inject data properties directly 
      into value fields or setup JSON initialization payloads for JS.
   ========================================================================== */
?>

<div class="section-card animate-pop-in" style="position: relative;">
    
    <div id="locationSuccessPopup" class="complete-badge text-center mb-3" style="display: none; background: #ecfdf5; color: #059669;">
        <i class="bi bi-check-circle-fill"></i> Location details saved successfully!
    </div>

    <div id="locationErrorBanner" class="complete-badge text-center mb-3" style="display: none; background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5;">
        <i class="bi bi-exclamation-triangle-fill"></i> <span id="locationErrorText"></span>
    </div>

    <div class="section-header-row">
        <h3 class="section-main-title">Location Details</h3>
        <button type="button" id="locationEditToggleBtn" class="edit-toggle-btn">
            <i class="bi bi-pencil-square"></i> Edit Info
        </button>
    </div>

    <form id="locationForm" class="address-card locked" novalidate>
        
        <div class="address-card-segment mb-4">
            <div class="address-card-header mb-3">
                <i class="bi bi-geo-alt-fill text-primary" style="font-size: 18px;"></i>
                <h3 style="display: inline-block; font-size: 16px; font-weight: 700; margin: 0; margin-left: 8px; color: #1e293b;">Current Address</h3>
            </div>
            
            <div class="field-group">
                <label class="field-label">House Status <span class="required-star">*</span></label>
                <select class="custom-input" id="currentHouseStatus" name="currentHouseStatus" disabled>
                    <option value="">Select Status</option>
                    <option value="Own">Own</option>
                    <option value="Rented">Rented</option>
                </select>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select State <span class="required-star">*</span></label>
                        <select class="custom-input" id="currentState" name="currentState" disabled>
                            <option value="">Select State</option>
                           </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select District <span class="required-star">*</span></label>
                        <select class="custom-input" id="currentDistrict" name="currentDistrict" disabled>
                            <option value="">Select District</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select City/Taluka <span class="required-star">*</span></label>
                        <select class="custom-input" id="currentCityTaluka" name="currentCityTaluka" disabled>
                            <option value="">Select City/Taluka</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select Village/Town <span class="required-star">*</span></label>
                        <select class="custom-input" id="currentVillageTown" name="currentVillageTown" disabled>
                            <option value="">Select Village/Town</option>
                        </select>
                    </div>
                </div>
            </div>

            <h4 style="font-size: 13px; font-weight: 600; color: #475569; margin: 20px 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Pin Code Details
            </h4>

            <div class="col-md-12">
                    <div class="field-group">
                        <label class="field-label">Select Pin Code<span id="starCurrentpin" class="required-star">*</span></label>
                        <select class="custom-input" id="currentPincode" name="currentPincode" disabled>
                            <option value="">Select Pin Code</option>
                        </select>
                    </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Plot No / Flat No</label>
                        <input type="text" id="currentPlotFlatNo" name="currentPlotFlatNo" class="custom-input" disabled placeholder="e.g. Plot No. 42" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Building / Appartment Name</label>
                        <input type="text" id="currentBuildingName" name="currentBuildingName" class="custom-input" disabled placeholder="e.g. Sunrise Heights" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Colony</label>
                        <input type="text" id="currentColony" name="currentColony" class="custom-input" disabled placeholder="e.g. Green Valley" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Area</label>
                        <input type="text" id="currentArea" name="currentArea" class="custom-input" disabled placeholder="e.g. Airport Road" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Nearby</label>
                        <input type="text" id="currentNearby" name="currentNearby" class="custom-input" disabled placeholder="e.g. Nearby School" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Behind</label>
                        <input type="text" id="currentBehind" name="currentBehind" class="custom-input" disabled placeholder="e.g. Behind Bank" />
                    </div>
                </div>
            </div>

                <div class="field-group">
                    <label class="field-label">Map Link (Must add)</label>

                    <div style="display:flex; gap:10px; align-items:center;">
                        
                        <input type="url"
                            id="currentMapLink"
                            name="currentMapLink"
                            class="custom-input"
                            disabled
                            placeholder="https://maps.google.com/..."
                            style="flex:1;" />

                        <a href="https://maps.google.com"
                        target="_blank"
                        class="btn btn-primary"
                        style="white-space:nowrap;">
                            Google Link
                        </a>

                    </div>
                </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="field-group">
                        <label class="field-label">STD Code</label>
                        <input type="text" id="currentStd" name="currentStd" class="custom-input" disabled placeholder="022" />
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="field-group">
                        <label class="field-label">Phone No.</label>
                        <input type="tel" id="currentPhoneNo" name="currentPhoneNo" class="custom-input" disabled placeholder="Landline connection number" />
                    </div>
                </div>
            </div>
        </div>

        <div id="syncCheckboxWrapper" class="sync-checkbox-container disabled-sync" style="margin: 25px 0; padding: 12px 16px; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; margin: 0;">
                <input type="checkbox" id="locationAddressSyncCheckbox" disabled style="width: 16px; height: 16px; margin: 0;" />
                <span class="checkbox-text" style="font-size: 13px; font-weight: 600; color: #475569;">Set current address as permanent address</span>
            </label>
        </div>

        <div class="address-card-segment">
            <div class="address-card-header mb-3">
                <i class="bi bi-house-door-fill text-success" style="font-size: 18px;"></i>
                <h3 style="display: inline-block; font-size: 16px; font-weight: 700; margin: 0; margin-left: 8px; color: #1e293b;">Permanent Address</h3>
            </div>

            <div class="field-group">
                <label class="field-label">House Status <span id="starPermHouse" class="required-star">*</span></label>
                <select class="custom-input" id="permanentHouseStatus" name="permanentHouseStatus" disabled>
                    <option value="">Select Status</option>
                    <option value="Own">Own</option>
                    <option value="Rented">Rented</option>
                </select>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select State <span id="starPermState" class="required-star">*</span></label>
                        <select class="custom-input" id="permanentState" name="permanentState" disabled>
                            <option value="">Select State</option>
                           </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select District <span id="starPermDistrict" class="required-star">*</span></label>
                        <select class="custom-input" id="permanentDistrict" name="permanentDistrict" disabled>
                            <option value="">Select District</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select City/Taluka <span id="starPermCity" class="required-star">*</span></label>
                        <select class="custom-input" id="permanentCityTaluka" name="permanentCityTaluka" disabled>
                            <option value="">Select City/Taluka</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Select Village/Town <span id="starPermVillage" class="required-star">*</span></label>
                        <select class="custom-input" id="permanentVillageTown" name="permanentVillageTown" disabled>
                            <option value="">Select Village/Town</option>
                        </select>
                    </div>
                </div>
            </div>

            <h4 style="font-size: 13px; font-weight: 600; color: #475569; margin: 20px 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Pin Code Details
            </h4>

            <div class="col-md-12">
                    <div class="field-group">
                        <label class="field-label">Select Pin Code <span id="starPermPin" class="required-star">*</span></label>
                        <select class="custom-input" id="permanentPincode" name="permanentPincode" disabled>
                            <option value="">Select Pincode</option>
                        </select>
                    </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Plot No / Flat No</label>
                        <input type="text" id="permanentPlotFlatNo" name="permanentPlotFlatNo" class="custom-input" disabled />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Building / Appartment Name</label>
                        <input type="text" id="permanentBuildingName" name="permanentBuildingName" class="custom-input" disabled />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Colony</label>
                        <input type="text" id="permanentColony" name="permanentColony" class="custom-input" disabled />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Area</label>
                        <input type="text" id="permanentArea" name="permanentArea" class="custom-input" disabled />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Nearby</label>
                        <input type="text" id="permanentNearby" name="permanentNearby" class="custom-input" disabled />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="field-group">
                        <label class="field-label">Behind</label>
                        <input type="text" id="permanentBehind" name="permanentBehind" class="custom-input" disabled />
                    </div>
                </div>
            </div>

                <div class="field-group">
                    <label class="field-label">Map Link (Must add)</label>

                    <div style="display:flex; gap:10px; align-items:center;">
                        
                        <input type="url"
                            id="permanentMapLink"
                            name="permanentMapLink"
                            class="custom-input"
                            disabled
                            placeholder="https://maps.google.com/..."
                            style="flex:1;" />

                        <a href="https://maps.google.com"
                        target="_blank"
                        class="btn btn-primary"
                        style="white-space:nowrap;">
                            Google Link
                        </a>

                    </div>
                </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="field-group">
                        <label class="field-label">STD Code</label>
                        <input type="text" id="permanentStd" name="permanentStd" class="custom-input" disabled />
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="field-group">
                        <label class="field-label">Phone No.</label>
                        <input type="tel" id="permanentPhoneNo" name="permanentPhoneNo" class="custom-input" disabled />
                    </div>
                </div>
            </div>
        </div>

        <div id="locationFormFooter" class="form-footer text-end animate-pop-in" style="display: none;">
            <button type="submit" class="action-btn">Save Location</button>
        </div>
    </form>
</div>