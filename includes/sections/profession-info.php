
<div class="section-card address-card locked" id="professionCard">

    <!-- =====================================
         SECTION HEADER
    ====================================== -->

    <div class="section-header-row">

        <h2 class="section-main-title">
            Profession Information
        </h2>

        <button type="button"
                class="edit-toggle-btn"
                id="professionEditBtn">
            Edit Information
        </button>

    </div>


    <!-- =====================================
         EMPLOYMENT CATEGORY SECTION
    ====================================== -->

    <div class="profession-sub-section">

        <h4 class="profession-sub-title">
            Employment Categories
        </h4>

        <p class="profession-sub-note">
            Select one or multiple employment categories.
        </p>


        <!--
            BACKEND NOTE:
            This list will come dynamically from database.
            Admin can add/remove/update employment categories.

            Current dummy sequence must remain same for frontend testing.
        -->

        <div class="profession-checkbox-grid" id="employmentCategoryWrapper">

            <label class="custom-check-card">
                <input type="checkbox"
                       class="employment-checkbox profession-input"
                       value="Government Employees"
                       disabled>
                <span>Government Employees</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="employment-checkbox profession-input"
                       value="Semi-Government Employees"
                       disabled>
                <span>Semi-Government Employees</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="employment-checkbox profession-input"
                       value="Private Employees"
                       disabled>
                <span>Private Employees</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="employment-checkbox profession-input"
                       value="Businessman (Entrepreneur)"
                       disabled>
                <span>Businessman (Entrepreneur)</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="employment-checkbox profession-input"
                       value="Labour (Workers)"
                       disabled>
                <span>Labour (Workers)</span>
            </label>

        </div>


        <div class="form-footer">

            <button type="button"
                    class="action-btn"
                    id="employmentSaveBtn"
                    disabled>

                Save Employment Categories

            </button>

        </div>

    </div>


    <hr class="profession-divider">


    <!-- =====================================
         JOB TYPE SECTION
    ====================================== -->

    <div class="profession-sub-section">

        <h4 class="profession-sub-title">
            Type of Job
        </h4>

        <p class="profession-sub-note">
            Select one or multiple job types.
        </p>


        <!--
            BACKEND NOTE:
            This list will come dynamically from database.
            Admin can add/remove/update job types.

            Current dummy sequence must remain same for frontend testing.
        -->

        <div class="profession-checkbox-grid" id="jobTypeWrapper">

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Indoor Job"
                       disabled>
                <span>Indoor Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Outdoor Job"
                       disabled>
                <span>Outdoor Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Full Time Job"
                       disabled>
                <span>Full Time Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Part Time Job"
                       disabled>
                <span>Part Time Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="City Location Job"
                       disabled>
                <span>City Location Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Village Location Job"
                       disabled>
                <span>Village Location Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Temporary Job"
                       disabled>
                <span>Temporary Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Contract Basis Job"
                       disabled>
                <span>Contract Basis Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Independent Job (Freelancers)"
                       disabled>
                <span>Independent Job (Freelancers)</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Seasonal Job"
                       disabled>
                <span>Seasonal Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="On-Call Job"
                       disabled>
                <span>On-Call Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Apprenticeship"
                       disabled>
                <span>Apprenticeship</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Probation"
                       disabled>
                <span>Probation</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Traineeship"
                       disabled>
                <span>Traineeship</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Commission-based Job"
                       disabled>
                <span>Commission-based Job</span>
            </label>

            <label class="custom-check-card">
                <input type="checkbox"
                       class="jobtype-checkbox profession-input"
                       value="Casual Employment Job"
                       disabled>
                <span>Casual Employment Job</span>
            </label>

        </div>


        <div class="form-footer">

            <button type="button"
                    class="action-btn"
                    id="jobTypeSaveBtn"
                    disabled>

                Save Job Types

            </button>

        </div>

    </div>


    <hr class="profession-divider">


    <!-- =====================================
         PROFESSION CATEGORY SECTION
    ====================================== -->

    <div class="profession-sub-section">

        <h4 class="profession-sub-title">
            Profession Categories
        </h4>

        <p class="profession-sub-note">
            Select your profession category hierarchy.
        </p>


        <!--
            BACKEND NOTE:

            Main Profession Category,
            Sub Profession Category,
            Twice Sub Profession Category

            all dropdown data will come dynamically from backend.

            Backend should return:
            - parent categories
            - child categories
            - nested child categories

            Current frontend uses dummy testing data.
        -->


        <form id="professionForm">

            <div class="row">

                <!-- MAIN CATEGORY -->

                <div class="col-md-6 field-group">

                    <label class="field-label">
                        Main Profession Category
                    </label>

                    <select class="custom-input profession-input"
                            id="mainProfession"
                            disabled>

                        <option value="">
                            Select Main Profession
                        </option>

                        <option value="Technology">
                            Technology
                        </option>

                        <option value="Medical">
                            Medical
                        </option>

                        <option value="Business">
                            Business
                        </option>

                    </select>

                </div>


                <!-- SUB CATEGORY -->

                <div class="col-md-6 field-group hidden-field"
                     id="subProfessionWrapper">

                    <label class="field-label">
                        Sub Profession Category
                    </label>

                    <select class="custom-input profession-input"
                            id="subProfession"
                            disabled>

                        <option value="">
                            Select Sub Profession
                        </option>

                    </select>

                </div>

            </div>


            <!-- TWICE SUB CATEGORY -->

            <div class="row hidden-field"
                 id="twiceSubProfessionWrapper">

                <div class="col-md-6 field-group">

                    <label class="field-label">
                        Twice Sub Profession Category
                    </label>

                    <select class="custom-input profession-input"
                            id="twiceSubProfession"
                            disabled>

                        <option value="">
                            Select Profession
                        </option>

                    </select>

                </div>

            </div>


            <div class="form-footer">

                <button type="button"
                        class="action-btn"
                        id="professionSaveBtn"
                        disabled>

                    Save Profession Category

                </button>

            </div>

        </form>

    </div>
        <div class="profession-table-wrapper "
         id="professionTableWrapper"
         style="display:none;">

        <table class="vitals-table custom-registry-table">

            <thead>

                <tr>
                    <th>Main Category</th>
                    <th>Sub Category</th>
                    <th>Profession</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody id="professionTableBody">
            </tbody>

        </table>

    </div>

    <hr class="profession-divider">
                            <!--
                        BACKEND NOTE:

                        Schedule entries will come from database.

                        Fields:

                        schedule_from
                        schedule_to
                        schedule_description

                        Maximum rows allowed:
                        10

                        Backend should return all
                        previously saved schedules.

                        Frontend currently handles
                        dynamic row creation.
                        -->

                <!-- =====================================
                    SCHEDULE SECTION
                ====================================== -->

                <div class="profession-sub-section">

                    <h4 class="profession-sub-title">
                        Schedule Information
                    </h4>

                    <p class="profession-sub-note">
                        Add up to 10 schedule entries.
                    </p>

                    <div id="scheduleContainer">

                        <div class="schedule-row">

                            <div class="row">

                                <!-- DAY -->

                                <div class="col-md-2 field-group">

                                    <label class="field-label">
                                        Day
                                    </label>

                                    <select class="custom-input profession-input schedule-day"
                                            disabled>

                                        <option value="">
                                            Select Day
                                        </option>

                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>

                                    </select>

                                </div>

                                <!-- FROM -->

                                <div class="col-md-2 field-group">

                                    <label class="field-label">
                                        From Time
                                    </label>

                                    <input type="time"
                                        class="custom-input profession-input schedule-from"
                                        disabled>

                                </div>

                                <div class="col-md-2 field-group">

                                    <label class="field-label">
                                        To Time
                                    </label>

                                    <input type="time"
                                        class="custom-input profession-input schedule-to"
                                        disabled>

                                </div>

                                <div class="col-md-4 field-group">

                                    <label class="field-label">
                                        Description
                                    </label>

                                    <input type="text"
                                        class="custom-input profession-input schedule-description"
                                        placeholder="Enter description"
                                        maxlength="30"
                                        disabled>

                                </div>

                                <div class="col-md-2 field-group d-flex align-items-end">

                                    <button type="button"
                                            class="action-btn schedule-add-btn"
                                            disabled>

                                        Add

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                    <div class="profession-table-wrapper "
     id="scheduleTableWrapper"
     style="display:none;">

    <table class="vitals-table custom-registry-table">

            <thead>

                <tr>

                    <th>Day</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Description</th>
                    <th>Action</th>

                </tr>

            </thead>

        <tbody id="scheduleTableBody">
        </tbody>

    </table>

</div>


    <!-- =====================================
         PROFESSION TABLE
    ====================================== -->



    <hr class="profession-divider">

<div class="form-footer">

    <button type="button"
            class="action-btn"
            id="professionFinalSubmitBtn"
            disabled>

        Submit Profession Information

    </button>

</div>

</div>


<style>

/* ===================================
PROFESSION SECTION
=================================== */

.profession-sub-section{
    margin-bottom: 35px;
}

.profession-sub-title{
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
}

.profession-sub-note{
    font-size: 13px;
    color: #64748b;
    margin-bottom: 22px;
}

.profession-divider{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 35px 0;
}

/* ===================================
CHECKBOX GRID
=================================== */

.profession-checkbox-grid{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
    gap: 15px;
}

.custom-check-card{
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f8fafc;
    border: 1px solid #dbe2ea;
    border-radius: 16px;
    padding: 16px;
    transition: 0.3s;
    cursor: pointer;
}

.custom-check-card:hover{
    border-color: #c084fc;
    background: #ffffff;
}

.custom-check-card input{
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.custom-check-card span{
    font-size: 14px;
    font-weight: 600;
    color: #334155;
}

/* ===================================
TABLE WRAPPER
=================================== */

.profession-table-wrapper{
    margin-top: 40px;
}

/* ===================================
HIDDEN FIELD
=================================== */

.hidden-field{
    display: none;
}

/* ===================================
LOCKED EFFECT
=================================== */

.address-card.locked .custom-check-card{
    opacity: 0.85;
}

/* ===================================
RESPONSIVE
=================================== */

@media(max-width:768px){

    .profession-checkbox-grid{
        grid-template-columns: 1fr;
    }

}
/* ===================================
SCHEDULE SECTION
=================================== */

.schedule-row{
    margin-bottom:20px;
}

.schedule-add-btn{
    width:100%;
}

#scheduleTableWrapper{
    margin-top:30px;
}

</style>