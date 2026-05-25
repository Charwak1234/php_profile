<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Profile Module</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/profile-layout.css">
    <link rel="stylesheet" href="assets/css/sidebar.css">
    <link rel="stylesheet" href="assets/css/shared-form.css">

</head>

<body>

<div class="profile-page-wrapper">

    <!-- EXISTING NAVBAR SPACE -->
    <div class="existing-navbar-space">

        <!-- OLD NAVBAR WILL COME HERE -->

    </div>

    <!-- BODY -->
    <div class="profile-body-wrapper">

        <!-- EXISTING LEFT SIDEBAR SPACE -->
        <div class="existing-sidebar-space">

            <!-- OLD SIDEBAR WILL COME HERE -->

        </div>

        <!-- PROFILE MODULE -->
        <div class="profile-container">

            <!-- PROFILE INNER SIDEBAR -->
            <?php include 'includes/profile-sidebar.php'; ?>

            <!-- CONTENT -->
                <div class="profile-content-area">

                    <!-- AADHAR -->
                    <div class="profile-section active-section"
                        id="aadhar-section">

                        <?php include 'includes/sections/aadhar-info.php'; ?>

                    </div>

                    <!-- PROFILE -->
                        <div class="profile-section"
                            id="profile-section">

                            <?php include 'includes/sections/profile-info.php'; ?>

                        </div>

                    <!-- HEALTH -->
                    <div class="profile-section"
                        id="health-section">

                        <div class="section-card">

                            <h2>Health Section</h2>

                        </div>

                    </div>

                </div>

        </div>

    </div>

</div>
<script src="assets/js/common.js"></script>

<script src="assets/js/sidebar.js"></script>

<script src="assets/js/aadhar.js"></script>

<script src="assets/js/profile-info.js"></script>



<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

</body>
</html>