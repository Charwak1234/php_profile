const editor = document.getElementById("bioEditor");

window.addEventListener("load", () => {
    focusLastLine();
});

/* =========================
   HARD KEY CONTROL (CAPTURE PHASE)
========================= */
document.addEventListener("keydown", function(e){

    const active = document.activeElement;

    if(!active) return;

    // ONLY APPLY INSIDE EDITOR
    if(!editor.contains(active)) return;

    const lines = document.querySelectorAll(".bio-line");

    const firstLine = lines[0];

    const firstText = firstLine?.querySelector(".text");

    /* BLOCK BACKSPACE ON FIRST LINE COMPLETELY */
    if(e.key === "Backspace"){

        const isFirstLineActive = active === firstText;

        const isEmpty = active.innerText.trim() === "";

        if(isFirstLineActive && isEmpty){

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        if(isFirstLineActive && !isEmpty){
            // allow normal typing delete inside first line text
            return;
        }

        if(isEmpty){

            e.preventDefault();

                const parent = active?.closest?.(".bio-line");

                if(!parent) return; // 🔥 SAFETY CHECK (FIXES ERROR)

                // PROTECT FIRST LINE
                if(parent === firstLine){
                    return;
                }

                // REMOVE SAFELY
                parent.remove();

            focusLastLine();
        }
    }

});

/* ENTER → NEW BULLET */
editor.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        createNewBullet();
    }
});

/* CREATE NEW BULLET */
function createNewBullet(){

    const newLine = document.createElement("div");
    newLine.className = "bio-line";

    newLine.innerHTML = `
        <span class="bullet"></span>
        <span class="text" contenteditable="true"></span>
    `;

    editor.appendChild(newLine);

    focusLastLine();
}

/* FOCUS LAST */
function focusLastLine(){

    const lines = document.querySelectorAll(".bio-line .text");

    if(lines.length > 0){

        const last = lines[lines.length - 1];

        last.focus();
        placeCursorAtEnd(last);
    }
}

/* CURSOR CONTROL */
function placeCursorAtEnd(el){

    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);

    sel.removeAllRanges();
    sel.addRange(range);
}
document.addEventListener("click", function(e){

    if(e.target.classList.contains("text")){
        e.target.focus();
    }

});