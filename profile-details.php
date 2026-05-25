<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Module</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="assets/css/profile-layout.css">
    <link rel="stylesheet" href="assets/css/sidebar.css">
    <link rel="stylesheet" href="assets/css/shared-form.css">
</head>

<body>

<div class="profile-page-wrapper">

    <div class="existing-navbar-space"></div>

    <div class="profile-body-wrapper">

        <div class="existing-sidebar-space"></div>

        <div class="profile-container">

            <?php include 'includes/profile-sidebar.php'; ?>

            <div class="profile-content-area">

                <div class="profile-section active-section" id="profile-section">
                    <?php include 'includes/sections/profile-info.php'; ?>
                </div>

                <div class="profile-section" id="aadhar-section">
                    <?php include 'includes/sections/aadhar-info.php'; ?>
                </div>

                <div class="profile-section" id="language-section">
                    <?php include 'includes/sections/language-info.php'; ?>
                </div>

                <div class="profile-section" id="health-section">
                    <?php include 'includes/sections/health-info.php'; ?>
                </div>

                <div class="profile-section" id="document-section">
                    <?php include 'includes/sections/document-info.php'; ?>
                </div>

                <div class="profile-section" id="qualification-section">
                    <?php include 'includes/sections/qualification-info.php'; ?>
                </div>

                <div class="profile-section" id="location-section">
                    <?php include 'includes/sections/location-info.php'; ?>
                </div>

                <div class="profile-section" id="vehicle-section">
                    <div class="section-card">
                        <h2>Vehicle Info</h2>
                    </div>
                </div>
                <div class="profile-section" id="property-section">
                    <div class="section-card">
                        <h2>Property</h2>
                    </div>

                <div class="profile-section" id="family-section">
                    <div class="section-card">
                        <h2>Family Info</h2>
                    </div>
                </div>
                </div>

                <div class="profile-section" id="contact-section">
                    <?php include 'includes/sections/easy-contact.php'; ?>
                </div>

            </div>

        </div>

    </div>

</div>

<script src="assets/js/common.js"></script>
<script src="assets/js/sidebar.js"></script>
<script src="assets/js/aadhar.js"></script>
<script src="assets/js/profile-info.js"></script>
<script src="assets/js/document-info.js"></script>
<script src="assets/js/qualification-info.js"></script>
<script src="assets/js/location-info.js"></script>
<script src="assets/js/language-info.js"></script>
<script src="assets/js/health-info.js"></script>
<script src="assets/js/easy-contact.js"></script>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

</body>
</html>