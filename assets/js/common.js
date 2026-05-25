/* ===================================
PROFILE COMPLETION CHECK
=================================== */

function checkProfileCompletion(){

    const aadharCompleted =
    localStorage.getItem("aadharCompleted");

    const profileCompleted =
    localStorage.getItem("profileCompleted");

    // BOTH COMPLETED
    if(
        aadharCompleted === "true" &&
        profileCompleted === "true"
    ){

        document
        .querySelectorAll(".additional-hidden")
        .forEach(item => {

            item.style.display = "flex";

        });

    }

}

/* ===================================
RUN ON PAGE LOAD
=================================== */

document.addEventListener(
    "DOMContentLoaded",
    checkProfileCompletion
);