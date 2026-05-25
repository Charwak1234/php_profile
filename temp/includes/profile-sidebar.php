<?php

/*
==================================
PROFILE STATUS
==================================
*/

$isBasicProfileCompleted = false;

/*
Later from DB:

$isBasicProfileCompleted = true;
*/

$userPhoto = "";
$userName = "Demo User";

?>

<div class="profile-sidebar">

    <!-- TOP BAR -->
    <div class="sidebar-top-bar">

        <a href="index.php" class="exit-btn">

            <i class="bi bi-arrow-left"></i>

            Exit

        </a>

    </div>

    <!-- USER CARD -->
    <div class="user-card">

        <div class="user-image-box">

            <?php

            if($userPhoto != ""){

            ?>

                <img src="<?php echo $userPhoto; ?>"
                     class="uploaded-user-img">

            <?php

            } else {

            ?>

                <lottie-player
                    src="assets/lottie/profile-animation.json"
                    background="transparent"
                    speed="1"
                    style="width: 90px; height: 90px;"
                    loop
                    autoplay>
                </lottie-player>

            <?php

            }

            ?>

            <div class="online-dot"></div>

        </div>

        <!-- USER NAME -->
        <h3 class="user-name">

            <?php echo $userName; ?>

        </h3>

        <!-- USER STATUS -->
        <div class="user-role">

            <?php

            if(!$isBasicProfileCompleted){

                echo "Complete Basic Profile";

            } else {

                echo "Profile Active";

            }

            ?>

        </div>

    </div>

    <!-- SIDEBAR MENU -->
    <div class="sidebar-menu">

        <!-- IMPORTANT -->
        <div class="menu-label">

            Important Information

        </div>

        <!-- AADHAR -->
        <div class="sidebar-item active"
             data-section="aadhar-section">

            <i class="bi bi-shield-check"></i>

            Aadhar Info

        </div>

        <!-- PROFILE -->
        <div class="sidebar-item"
             data-section="profile-section">

            <i class="bi bi-person"></i>

            Profile Info

        </div>

        <!-- ADDITIONAL MENUS -->
        <div class="menu-label secondary additional-hidden">

            Additional Information

        </div>

        <!-- LANGUAGE -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="language-section">

            <i class="bi bi-translate"></i>

            Language Info

        </div>

        <!-- HEALTH -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="health-section">

            <i class="bi bi-heart-pulse"></i>

            Health

        </div>

        <!-- DOCUMENT -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="document-section">

            <i class="bi bi-file-earmark"></i>

            Document Info

        </div>

        <!-- QUALIFICATION -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="qualification-section">

            <i class="bi bi-mortarboard"></i>

            Qualification Info

        </div>

        <!-- LOCATION -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="location-section">

            <i class="bi bi-geo-alt"></i>

            Location Info

        </div>

        <!-- VEHICLE -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="vehicle-section">

            <i class="bi bi-truck"></i>

            Vehicle Info

        </div>

        <!-- FAMILY -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="family-section">

            <i class="bi bi-people"></i>

            Family Info

        </div>

        <!-- CONTACT -->
        <div class="sidebar-item additional-menu additional-hidden"
             data-section="contact-section">

            <i class="bi bi-telephone"></i>

            Easy Contact

        </div>

    </div>

</div>