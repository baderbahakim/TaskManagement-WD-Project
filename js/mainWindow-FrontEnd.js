// ### Handle RightSide ### //

// Query both rightside dialog and div
const rightSideDialog = document.querySelector("#right-side-dialog");
const rightSideDiv = document.querySelector("#right-side-div");

// Duplicate Dialog Inner html to Div in wide screen
rightSideDiv.innerHTML = rightSideDialog.innerHTML;

// Global RightSide Variables
window.rightSideStatus = false;
window.currentRightSideType = null;
window.currentRightSideId = null;

// Query RightSide Close Buttons
const closeRightSideButtons = document.querySelectorAll(".right-side-close-icon");


// Right-side close buttons click event listener
closeRightSideButtons.forEach(btn => {
    btn.addEventListener("click", event => {
        event.stopPropagation();

        // make rightside type and id null
        currentRightSideType = null;
        currentRightSideId = null;

        // close rightside
        toggleRightSide(false);
    });
});

// Backdrop click (dialog only)
rightSideDialog.addEventListener("click", event => {
    if (event.target === rightSideDialog) {

        // make rightside type and id null
        currentRightSideType = null;
        currentRightSideId = null;

        // close rightside
        toggleRightSide(false);
    }
});

// Toggle RightSide with open(true / false)
function toggleRightSide(open) {
    rightSideStatus = open;

    // When called to close
    if (!open) {
        currentRightSideType = null;
        currentRightSideId = null;
        document.body.style.overflow = "auto";
    }

    // When small screen, deal with rightside dialog
    if (window.innerWidth < 992) {
        // When called to open
        if (open) {
            if (!rightSideDialog.open) {
                rightSideDialog.showModal();
                document.body.style.overflow = "hidden";
            }
            rightSideDialog.classList.add("appear");
        // When called to close
        } else {
            rightSideDialog.classList.remove("appear");
            setTimeout(() => {
                rightSideDialog.close();
                document.body.style.overflow = "auto";
            }, 200);
        }
        return;
    }
    // When wide screen, deal with rightside div

    // When called to open
    if (open) {
        rightSideDiv.classList.add("active");
        setTimeout(() => rightSideDiv.classList.add("appear"), 1);
    }
    // When called to close
    else {
        rightSideDiv.classList.remove("appear");
        setTimeout(() => rightSideDiv.classList.remove("active"), 200);
        document.body.style.overflow = "auto";
    }
}



// ###### Handle Sidebar ######## //
var sidebarStatus = true;

// Query both rightside dialog and div
const sidebarDialog = document.querySelector("#sidebar-dialog");
const sidebarDiv = document.querySelector("#sidebar-div");

// Duplicate Dialog Inner html to Div in wide screen
sidebarDiv.innerHTML = sidebarDialog.innerHTML;

// Query SideBar open and close buttons
const openSidebarDialog = document.querySelectorAll("#header-icon");
const closeSidebarDialog = document.querySelectorAll(".list-close-icon");

// SideBar buttons listener call
addSidebarListener();

// ## Sidebar buttons listener ##
function addSidebarListener() {
    [...openSidebarDialog, ...closeSidebarDialog].forEach(btn => {
        btn.addEventListener("click", handleSidebar);
    });

    // Backdrop click (dialog only)
    sidebarDialog.addEventListener("click", event => {
        if (event.target === sidebarDialog) {
            handleSidebar();
        }
    });
}

// ## Toggle SideBar ##
function handleSidebar() {

    // When small screen, deal with sidebar dialog
    if (window.innerWidth < 576) {
        if (sidebarDialog.open) {
            sidebarDialog.classList.remove("appear");
            setTimeout(() => {
                sidebarDialog.close();
                document.body.style.overflow = "auto";
            }, 200);
        } else {
            sidebarDialog.showModal();
            sidebarDialog.classList.add("appear");
            document.body.style.overflow = "hidden";
        }
        return;
    }

    // When wide screen, deal with sidebar div
    const isOpen = sidebarDiv.classList.contains("active");

    if (isOpen) {
        sidebarDiv.classList.remove("appear");
        setTimeout(() => sidebarDiv.classList.remove("active"), 200);
    } else {
        sidebarDiv.classList.add("active");
        setTimeout(() => sidebarDiv.classList.add("appear"), 1);
    }

    sidebarStatus = !isOpen;
}

// ##### Global main view variables #####
window.mainType = null;
window.mainID = null;
window.mainView = null;

// Handle Window Resize and Load call
window.addEventListener("resize", checkWindowResize);
window.addEventListener("load", checkWindowResize);

// ### Handle Window Resize ### //
function checkWindowResize() {
    // sidebar stay dialog below 576px
    if (window.innerWidth < 576) {
        sidebarDiv.classList.remove("active", "appear");
    } 
    // Wide screen 
    else {
        sidebarDialog.close();
        sidebarDialog.classList.remove("appear");
        document.body.style.overflow = "auto";

        // If sidebar status true show
        if (sidebarStatus) {
            sidebarDiv.classList.add("active", "appear");
        } else {
            sidebarDiv.classList.remove("active", "appear");
        }
    }

    // right-side stay dialog below 768px
    if (window.innerWidth < 992) {
        rightSideDiv.classList.remove("active", "appear");

        // if rightside status true open
        if (rightSideStatus) {
            if (!rightSideDialog.open) {
                rightSideDialog.showModal();
            }
            rightSideDialog.classList.add("appear");
            document.body.style.overflow = "hidden";
        } 
        // If false
        else {
            rightSideDialog.classList.remove("appear");
            rightSideDialog.close();
        }
    } 
    // Wide screen
    else {
        rightSideDialog.close();
        rightSideDialog.classList.remove("appear");

        // if rightside status true open
        if (rightSideStatus) {
            rightSideDiv.classList.add("active", "appear");
        } 
        // If false
        else {
            rightSideDiv.classList.remove("active", "appear");
        }
    }
}