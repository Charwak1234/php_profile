/* ===================================
SIDEBAR SECTION SWITCHING & LOCK LOGIC
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Unlock additional sections if already completed
    if (
        localStorage.getItem("aadharCompleted") === "true" &&
        localStorage.getItem("profileCompleted") === "true"
    ) {
        window.unlockAdditionalSections();
    }

    const sidebarItems = document.querySelectorAll(".sidebar-item");
    const sections = document.querySelectorAll(".profile-section");

    sidebarItems.forEach(item => {

        item.addEventListener("click", () => {

            // LOCK CHECK
            const isHidden =
                item.classList.contains("additional-hidden");

            const isUnlocked =
                localStorage.getItem("aadharCompleted") === "true" &&
                localStorage.getItem("profileCompleted") === "true";

            if (isHidden && !isUnlocked) {
                alert("Complete Aadhaar and Profile first");
                return;
            }

            // REMOVE ACTIVE
            sidebarItems.forEach(i => {
                i.classList.remove("active");
            });

            // ADD ACTIVE
            item.classList.add("active");

            // HIDE ALL SECTIONS
            sections.forEach(section => {
                section.classList.remove("active-section");
            });

            // SHOW TARGET SECTION
            const targetId = item.getAttribute("data-section");

            const targetSection =
                document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add("active-section");
            } else {
                console.error("Section not found:", targetId);
            }

        });

    });

});

/* ===================================
UNLOCK ADDITIONAL SECTIONS
=================================== */

window.unlockAdditionalSections = function () {

    document
        .querySelectorAll(".additional-hidden")
        .forEach(el => {
            el.classList.remove("additional-hidden");
        });

    const secondaryLabel =
        document.querySelector(".menu-label.secondary");

    if (secondaryLabel) {
        secondaryLabel.classList.remove("additional-hidden");
    }

};