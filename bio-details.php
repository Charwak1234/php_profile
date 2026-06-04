<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>BIO Details</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link rel="stylesheet" href="assets/css/bio.css">

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

        <button class="back-btn" onclick="window.location.href='index.php'">
            <i class="bi bi-arrow-left"></i>
            Back to Dashboard
        </button>

            <h2 class="page-title">BIO Section</h2>
            <p class="sub-title">Write structured bio points</p>

            <div class="bio-card">

                <!-- AVATAR -->
                <div class="avatar-wrapper">

                <div class="avatar">
                    <i class="bi bi-person"></i>
                </div>

                <div>
                    <h5 class="mb-1">Your Professional BIO</h5>
                    <small class="text-muted">
                        Build your identity like a profile card
                    </small>
                </div>

                </div>

                <!-- BULLET EDITOR -->
                <div id="bioEditor" class="bio-editor" contenteditable="true">

                    <div class="bio-line">
                        <span class="bullet"></span>
                        <span class="text" contenteditable="true"></span>
                    </div>

                </div>

                <div class="save">
                <button id="save" class="btn btn-primary mt-3">
                    <i class="bi bi-check-circle"></i> Save BIO
                </button>
                </div>

            </div>

        </div>

    </div>

</div>

<script src="assets/js/bio.js"></script>

</body>
</html>