<?php
// 1. Initialize variables to prevent errors
$userPhoto = $userPhoto ?? ""; 
$userName = $userName ?? "User";
$isBasicProfileCompleted = $isBasicProfileCompleted ?? false;

// 2. Logic to keep sections unlocked if already completed
// We set this class to empty string if completed, otherwise 'additional-hidden'
$unlockClass = $isBasicProfileCompleted ? "" : "additional-hidden";
?>

<div class="profile-sidebar">
    <div class="sidebar-top-bar">
        <a href="index.php" class="exit-btn">
            <i class="bi bi-arrow-left"></i> Exit
        </a>
    </div>

    <div class="user-card">
        <div class="user-image-box">
            <?php if($userPhoto != "") { ?>
                <img src="<?php echo $userPhoto; ?>" class="uploaded-user-img">
            <?php } else { ?>
                <lottie-player
                    src="assets/lottie/profile-animation.json"
                    background="transparent"
                    speed="1"
                    style="width: 90px; height: 90px;"
                    loop
                    autoplay>
                </lottie-player>
            <?php } ?>
            <div class="online-dot"></div>
        </div>

        <h3 class="user-name"><?php echo htmlspecialchars($userName); ?></h3>

        <div class="user-role">
            <?php echo !$isBasicProfileCompleted ? "Complete Basic Profile" : "Profile Active"; ?>
        </div>
    </div>

    <div class="sidebar-menu">
        <div class="menu-label">Important Information</div>

        <div class="sidebar-item active" data-section="profile-section">
            <i class="bi bi-person"></i> Profile Info
        </div>

        <div class="sidebar-item" data-section="aadhar-section">
            <i class="bi bi-shield-check"></i> Aadhaar  Info
        </div>

        <div class="menu-label secondary <?php echo $unlockClass; ?>">Additional Information</div>


<div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="location-section">
        <i class="bi bi-geo-alt"></i> Location Info
    </div>

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="language-section">
            <i class="bi bi-translate"></i> Language and Cast
        </div>

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="health-section">
            <i class="bi bi-heart-pulse"></i> Health
        </div>

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="document-section">
            <i class="bi bi-file-earmark"></i> Document Info
        </div>

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="qualification-section">
            <i class="bi bi-mortarboard"></i> Qualification Info
        </div>

        <!-- <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="vehicle-section">
            <i class="bi bi-truck"></i> Vehicle Info
        </div>
        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="Property-section">
            <i class="bi bi-house"></i> Property Info
        </div>

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="family-section">
            <i class="bi bi-people"></i> Family Info
        </div> -->

        <div class="sidebar-item additional-menu <?php echo $unlockClass; ?>" data-section="contact-section">
            <i class="bi bi-telephone"></i> Easy Contact
        </div>
    </div>
</div>