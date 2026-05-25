/* ===================================
SIDEBAR SECTION SWITCHING
=================================== */

const sidebarItems = document.querySelectorAll(".sidebar-item");

const sections = document.querySelectorAll(".profile-section");

sidebarItems.forEach(item => {

    item.addEventListener("click", () => {

        // REMOVE ACTIVE MENU
        sidebarItems.forEach(i => {

            i.classList.remove("active");

        });

        // ADD ACTIVE MENU
        item.classList.add("active");

        // SECTION ID
        const sectionId =
        item.getAttribute("data-section");

        // HIDE ALL SECTIONS
        sections.forEach(section => {

            section.classList.remove("active-section");

        });

        // SHOW CURRENT SECTION
        document.getElementById(sectionId)
        .classList.add("active-section");

    });

});