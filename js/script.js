const sidebarDialog = document.querySelector("#sidebar-dialog");
const rightSideDialog = document.querySelector("#right-side-dialog");

const sidebarDiv = document.querySelector("#sidebar-div");
const rightSideDiv = document.querySelector("#right-side-div");

sidebarDiv.innerHTML = sidebarDialog.innerHTML;
rightSideDiv.innerHTML = rightSideDialog.innerHTML;

const openSidebarDialog = document.querySelectorAll(".list-icon");
const closeSidebarDialog = document.querySelectorAll(".list-close-icon");
const closeRightSideButtons = document.querySelectorAll(".right-side-close-icon");

var sidebarStatus = true;
var rightSideStatus = false;

window.addEventListener("resize", checkWindowResize);
window.addEventListener("load", checkWindowResize);

addSidebarListener();

// ### Handle Window Resize ### //
function checkWindowResize() {
    if (window.innerWidth < 576) {
        sidebarDiv.classList.remove("active", "appear");
        rightSideDiv.classList.remove("active", "appear");

        sidebarDialog.classList.remove("appear");
        rightSideDialog.classList.remove("appear");

        sidebarDialog.close();
        rightSideDialog.close();

        if (rightSideStatus) {
            rightSideDialog.showModal();
            rightSideDialog.classList.add("appear");
        }

        return;
    }

    sidebarDialog.close();
    rightSideDialog.close();

    sidebarDialog.classList.remove("appear");
    rightSideDialog.classList.remove("appear");

    if (sidebarStatus) {
        sidebarDiv.classList.add("active", "appear");
    } else {
        sidebarDiv.classList.remove("active", "appear");
    }

    if (rightSideStatus) {
        rightSideDiv.classList.add("active", "appear");
    } else {
        rightSideDiv.classList.remove("active", "appear");
    }
}


function addSidebarListener() {
    openSidebarDialog.forEach(btn => {
        btn.addEventListener("click", () => {
            handleSidebar();
        });
    });

    closeSidebarDialog.forEach(btn => {
        btn.addEventListener("click", () => {
            handleSidebar();
        });
    });

    sidebarDialog.addEventListener("click", event => {
        if (event.target === sidebarDialog) {
            handleSidebar();
        }
    });
}

// ### Handle Sidebar ### //
function handleSidebar() {
    if (window.innerWidth < 576) {
        if (sidebarDialog.open) {
            sidebarDialog.classList.remove("appear");

            setTimeout(() => {
                sidebarDialog.close();
            }, 200);
        } else {
            sidebarDialog.showModal();
            sidebarDialog.classList.add("appear");
        }

        return;
    }
    if (sidebarDiv.classList.contains("active")) {
        sidebarDiv.classList.remove("appear");

        setTimeout(() => {
            sidebarDiv.classList.remove("active");
        }, 200);

        sidebarStatus = false;
    }
    else {
        sidebarDiv.classList.add("active");

        setTimeout(() => {
            sidebarDiv.classList.add("appear");
        }, 10);

        sidebarStatus = true;
    }

    // if (sidebarDiv.classList.contains("active")) {
    //     sidebarDiv.classList.remove("appear");

    //     setTimeout(() => {
    //         sidebarDiv.classList.remove("active");
    //     }, 300);

    //     // sidebarStatus = false;
    // }
    // else {
    //     sidebarDiv.classList.toggle("active");
    //     sidebarDiv.classList.toggle("appear");
    // }
    // sidebarStatus = !sidebarStatus;
}

// ### Handle RightSide ### //
var currentRightSideType = null;
var currentRightSideId = null;

setupRightSideItemClick(".task", ".task-id", "task");
setupRightSideItemClick(".note", ".note-id", "note");
setupRightSideCloseButtons();

rightSideDialog.addEventListener("click", event => {
    if (event.target === rightSideDialog) {
        closeRightSide();
    }
});

function setupRightSideItemClick(itemSelector, idSelector, type) {
    document.querySelectorAll(itemSelector).forEach(item => {
        item.addEventListener("click", event => {

            if (event.target.closest(".task-delete-icon, .note-delete-icon, .delete-task-btn, .delete-note-btn")) {
                return;
            }

            const clickedId = item.querySelector(idSelector).textContent.trim();

            if (rightSideStatus) {
                if (currentRightSideType === type && currentRightSideId === clickedId) {
                    closeRightSide();
                    return;
                }

                // TODO: different task/note clicked while right-side is already open
                // update the right-side content here, but do not close it

                currentRightSideType = type;
                currentRightSideId = clickedId;
                return;
            }

            currentRightSideType = type;
            currentRightSideId = clickedId;

            openRightSide();
        });
    });
}

function setupRightSideCloseButtons() {
    closeRightSideButtons.forEach(btn => {
        btn.addEventListener("click", event => {
            event.stopPropagation();
            closeRightSide();
        });
    });
}

function openRightSide() {
    rightSideStatus = true;

    if (window.innerWidth < 768) {
        if (!rightSideDialog.open) {
            rightSideDialog.showModal();
        }

        rightSideDialog.classList.add("appear");
        return;
    }

    rightSideDiv.classList.add("active", "appear");
}

function closeRightSide() {
    rightSideStatus = false;
    currentRightSideType = null;
    currentRightSideId = null;

    if (window.innerWidth < 768) {
        rightSideDialog.classList.remove("appear");

        setTimeout(() => {
            rightSideDialog.close();
        }, 200);

        return;
    }

    rightSideDiv.classList.remove("appear");

    setTimeout(() => {
        rightSideDiv.classList.remove("active");
    }, 200);
}
// ############################################################################
// ##### Handle Simple Dialogs #######/////////////
function setupOpenDialogs() {
    const openButtons = document.querySelectorAll("[data-dialog-target]");

    openButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();

            const dialog = document.querySelector(button.dataset.dialogTarget);
            if (!dialog) return;

            // TODO: add specific logic before opening if needed

            dialog.showModal();
        });
    });
}

setupOpenDialogs();
// Dialog Buttons: Cancel and Confirm
function setupDialogActions() {
    // const cancelButtons = document.querySelectorAll(".cancel-dialog-button");
    // const cancelButtons = document.querySelectorAll(".cancel-dialog-button");
    const dialogActionButtons = document.querySelectorAll('button[class*="-dialog-button"]');

    // CONFIRM
    dialogActionButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const dialog = button.closest("dialog");
            if (!dialog) return;

            if (button.classList.contains("confirm-dialog-button")) {
                // TODO: handle confirm logic here
                // create task / delete / edit / logout ...
            }

            // before close 
            dialog.close();
        });
    });
}

setupDialogActions();