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

// ##### Handle Dialogs #######/////////////

function setupSimpleDialog(openSelector, dialogSelector, confirmSelector) {
    const dialog = document.querySelector(dialogSelector);
    const openButtons = document.querySelectorAll(openSelector);

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            event.stopPropagation();
            dialog.showModal();
        });
    });

    dialog.querySelectorAll(".cancel-dialog-button, .cancel-dialog-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.close();
        });
    });

    dialog.querySelectorAll(confirmSelector).forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            // TODO: handle create / delete / edit / logout logic here

            dialog.close();
        });
    });
}

setupSimpleDialog(".create-task-list-icon", "#new-task-list-dialog", ".create-task-list-button");

setupSimpleDialog(".create-note-list-icon", "#new-note-list-dialog", ".create-note-list-btn");

setupSimpleDialog(".delete-task-btn, .task-delete-icon", "#delete-task-dialog", ".delete-task-btn");

setupSimpleDialog(".delete-note-btn, .note-delete-icon", "#delete-note-dialog", ".delete-note-btn");

setupSimpleDialog(".edit-task-btn", "#new-task-dialog", ".create-task-button");

setupSimpleDialog(".edit-note-btn", "#new-note-dialog", ".create-note-button");

setupSimpleDialog(".logout-word", "#logout-dialog", ".log-out-btn");