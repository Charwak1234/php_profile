<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Profile Dashboard</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/dashboard-cards.css">

</head>

<body>

<div class="dashboard-wrapper">

    <!-- NAVBAR SPACE -->
    <div class="existing-navbar-space"></div>

    <div class="dashboard-body">

        <!-- SIDEBAR SPACE -->
        <div class="existing-sidebar-space"></div>

        <!-- CONTENT -->
        <div class="dashboard-content">

            <div class="page-title-section">

                <h2 class="main-title">
                    My Dashboard
                </h2>

                <p class="sub-title">
                    Manage your profile and account information
                </p>

            </div>

            <!-- CARDS -->
            <div class="row g-4">

                <!-- PROFILE CARD -->
                <div class="col-md-4">

                    <a href="profile-details.php" class="dashboard-card">

                        <div class="card-icon profile-bg">
                            <i class="bi bi-person"></i>
                        </div>

                        <h4>Profile</h4>

                        <p>
                            Manage personal profile details
                        </p>

                    </a>

                </div>

                                    <!-- BIO CARD -->
                    <div class="col-md-4">

                        <a href="bio-details.php" class="dashboard-card">

                            <div class="card-icon bio-bg">
                                <i class="bi bi-file-earmark-person"></i>
                            </div>

                            <h4>BIO</h4>

                            <p>
                                Manage biography and personal information
                            </p>

                        </a>

                    </div>

                    <!-- BANK CARD -->
                    <div class="col-md-4">

                        <a href="bank-details.php" class="dashboard-card">

                            <div class="card-icon bank-bg">
                                <i class="bi bi-bank"></i>
                            </div>

                            <h4>Bank Details</h4>

                            <p>
                                Manage bank account information
                            </p>

                        </a>

                    </div>

                <!-- OTHER CARD -->
                <div class="col-md-4">

                    <a href="other-details.php" class="dashboard-card">

                        <div class="card-icon other-bg">
                            <i class="bi bi-grid"></i>
                        </div>

                        <h4>Other Details</h4>

                        <p>
                            Additional account information
                        </p>

                    </a>

                </div>

            </div>

        </div>

    </div>

</div>

</body>
</html>