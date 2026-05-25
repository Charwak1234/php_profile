<div id="successPopup"
    class="complete-badge animate-pop-in"
    style="
        display:none;
        position:fixed;
        top:20px;
        right:20px;
        z-index:9999;
        background:#10b981;
        color:white;
    ">

    <i class="bi bi-check-circle-fill"></i>
    Documents Saved Successfully

</div>

<!-- LIGHTBOX -->

<div id="lightboxOverlay"
    style="
        display:none;
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        background:rgba(15,23,42,0.75);
        justify-content:center;
        align-items:center;
        z-index:9999;
    ">

    <div class="section-card"
        style="
            position:relative;
            max-width:90%;
            max-height:90%;
        ">

        <button type="button"
            id="closeLightboxBtn"
            class="edit-toggle-btn active"
            style="
                position:absolute;
                top:-15px;
                right:-15px;
                border-radius:50%;
                width:32px;
                height:32px;
            ">

            ✕

        </button>

        <img id="lightboxImage"
            src=""
            style="
                max-width:100%;
                max-height:80vh;
                border-radius:14px;
                object-fit:contain;
            ">

    </div>

</div>

<div class="section-card">

    <!-- HEADER -->

    <div class="section-header-row"
        style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:20px;
        ">

        <h3 class="section-main-title"
            style="margin:0;">

            Document Management

        </h3>

        <button type="button"
            id="documentEditBtn"
            class="edit-toggle-btn">

            <i class="bi bi-pencil-square"></i>
            Edit & Upload

        </button>

    </div>

    <!-- FORM -->

    <form id="documentForm">

        <!-- PAN CARD -->

        <div class="address-card"
            style="margin-bottom:20px;">

            <h3 class="section-title">
                PAN Card
            </h3>

            <div class="input-row"
                style="display:flex; gap:15px;">

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        PAN Number
                    </label>

                    <input type="text"
                        id="panNumber"
                        class="custom-input"
                        placeholder="Enter PAN Number"
                        disabled>

                </div>

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        Upload PAN Image
                    </label>

                    <input type="file"
                        id="panFile"
                        class="custom-input"
                        accept="image/*"
                        disabled>

                </div>

            </div>

        </div>

        <!-- LICENSE -->

        <div class="address-card"
            style="margin-bottom:20px;">

            <h3 class="section-title">
                Driving License
            </h3>

            <div class="input-row"
                style="display:flex; gap:15px;">

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        License Number
                    </label>

                    <input type="text"
                        id="licenseNumber"
                        class="custom-input"
                        placeholder="Enter License Number"
                        disabled>

                </div>

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        Upload License Image
                    </label>

                    <input type="file"
                        id="licenseFile"
                        class="custom-input"
                        accept="image/*"
                        disabled>

                </div>

            </div>

        </div>

        <!-- PASSPORT -->

        <div class="address-card"
            style="margin-bottom:20px;">

            <h3 class="section-title">
                Passport
            </h3>

            <div class="input-row"
                style="display:flex; gap:15px;">

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        Passport Number
                    </label>

                    <input type="text"
                        id="passportNumber"
                        class="custom-input"
                        placeholder="Enter Passport Number"
                        disabled>

                </div>

                <div class="field-group"
                    style="flex:1;">

                    <label class="field-label">
                        Upload Passport Image
                    </label>

                    <input type="file"
                        id="passportFile"
                        class="custom-input"
                        accept="image/*"
                        disabled>

                </div>

            </div>

        </div>
        <!-- OPTIONAL DOCUMENTS -->

<div class="address-card"
    style="margin-bottom:20px;">

    <div class="section-top"
        style="
            border-bottom:1px solid #e2e8f0;
            padding-bottom:10px;
            margin-bottom:15px;
        ">

        <h3 class="section-title"
            style="margin:0;">

            <i class="bi bi-folder-plus"></i>
            Optional Extra Documents

        </h3>

    </div>

    <div class="input-row"
        style="
            display:flex;
            gap:15px;
            margin-bottom:15px;
        ">

        <div class="field-group"
            style="flex:1;">

            <label class="field-label">
                Document Name
            </label>

            <input type="text"
                id="optionalDocName"
                class="custom-input"
                placeholder="e.g. Leave & License"
                disabled>

        </div>

        <div class="field-group"
            style="flex:1;">

            <label class="field-label">
                Document Number
            </label>

            <input type="text"
                id="optionalDocNumber"
                class="custom-input"
                placeholder="Enter Document Number"
                disabled>

        </div>

    </div>

    <div class="field-group">

        <label class="field-label">
            Upload Document Image
        </label>

        <input type="file"
            id="optionalDocFile"
            class="custom-input"
            accept="image/*"
            disabled>

    </div>

</div>

        <!-- TABLE -->

        <div style="
            width:100%;
            overflow-x:auto;
            background:#fff;
            border-radius:14px;
            border:1px solid #dbe2ea;
            margin-top:20px;
        ">

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <thead>

                    <tr style="
                        background:#f8fafc;
                        border-bottom:2px solid #dbe2ea;
                    ">

                        <th style="padding:12px 16px;">
                            Category
                        </th>

                        <th style="padding:12px 16px;">
                            Document Name
                        </th>

                        <th style="padding:12px 16px;">
                            Document Number
                        </th>

                        <th style="
                            padding:12px 16px;
                            text-align:center;
                        ">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody id="documentTableBody">

                </tbody>

            </table>

        </div>

        <!-- FOOTER -->

        <div id="documentFooter"
            class="form-footer"
            style="
                display:none;
                margin-top:25px;
            ">

            <button type="submit"
                class="action-btn">

                Save Documents

            </button>

        </div>

    </form>

</div>