// ### Handle RightSide ### //
const rightSideDialog = document.querySelector("#right-side-dialog");
const rightSideDiv = document.querySelector("#right-side-div");

rightSideDiv.innerHTML = rightSideDialog.innerHTML;

var rightSideStatus = false;
var currentRightSideType = rightSideDialog.dataset.type;
var currentRightSideId = rightSideDialog.dataset.id;

// const openRightSideButtons = document.querySelectorAll("#main :is(.task, .note)");
const closeRightSideButtons = document.querySelectorAll(".right-side-close-icon");

setupRightSide();

function setupRightSide() {
    const openRightSideButtons = document.querySelectorAll("#main :is(.task, .note)");
    openRightSideButtons.forEach(item => {
        item.addEventListener("click", event => {
            if (event.target.closest(".task-delete-icon, .note-delete-icon, .delete-task-btn, .delete-note-btn, .task-check-icon")) {
                return;
            }

            const type = item.classList.contains("task") ? "task" : "note";
            const id = item.dataset.id.trim();

            if (rightSideStatus && currentRightSideType === type && currentRightSideId === id) {
                toggleRightSide(false);
                return;
            }

            var rightSideView = null;
            if (type === "task") {
                rightSideView = document.querySelectorAll(".right-side .task");
            }
            else {
                rightSideView = document.querySelectorAll(".right-side .note");
            }

            currentRightSideType = type;
            currentRightSideId = id;

            setRightSideView(type);
            toggleRightSide(true);
        });
    });

    closeRightSideButtons.forEach(btn => {
        btn.addEventListener("click", event => {
            event.stopPropagation();
            toggleRightSide(false);
        });
    });

    rightSideDialog.addEventListener("click", event => {
        if (event.target === rightSideDialog) {
            toggleRightSide(false);
        }
    });
}

function setRightSideView(type) {
    const rightSides = [rightSideDialog, rightSideDiv];

    rightSides.forEach(side => {
        side.querySelectorAll(".right-side .task, .right-side .note").forEach(view => {
            view.classList.remove("active");
        });

        var rightSideTitle = document.querySelectorAll(".right-side-title");
        var rsTitle;
        if (type === "task") {
            side.querySelector(".right-side .task").classList.add("active");
            rsTitle = "Task";
        }

        if (type === "note") {
            side.querySelector(".right-side .note").classList.add("active");
            rsTitle = "Note";
        }

        rightSideTitle.forEach(title => {
            title.textContent = rsTitle;
        });
    });
}

function toggleRightSide(open) {
    rightSideStatus = open;

    if (!open) {
        currentRightSideType = null;
        currentRightSideId = null;
        setRightSideView(null);
    }

    if (window.innerWidth < 768) {
        if (open) {
            if (!rightSideDialog.open) {
                rightSideDialog.showModal();
            }
            rightSideDialog.classList.add("appear");
        } else {
            rightSideDialog.classList.remove("appear");
            setTimeout(() => rightSideDialog.close(), 200);
        }

        return;
    }

    if (open) {
        rightSideDiv.classList.add("active");
        setTimeout(() => rightSideDiv.classList.add("appear"), 1);
    } else {
        rightSideDiv.classList.remove("appear");
        setTimeout(() => rightSideDiv.classList.remove("active"), 200);
    }
}

// ### Handle Sidebar ### //
var sidebarStatus = true;

const sidebarDialog = document.querySelector("#sidebar-dialog");
const sidebarDiv = document.querySelector("#sidebar-div");

sidebarDiv.innerHTML = sidebarDialog.innerHTML;

const openSidebarDialog = document.querySelectorAll(".list-icon");
const closeSidebarDialog = document.querySelectorAll(".list-close-icon");

addSidebarListener();

function addSidebarListener() {
    [...openSidebarDialog, ...closeSidebarDialog].forEach(btn => {
        btn.addEventListener("click", handleSidebar);
    });

    sidebarDialog.addEventListener("click", event => {
        if (event.target === sidebarDialog) {
            handleSidebar();
        }
    });
}

function handleSidebar() {
    if (window.innerWidth < 576) {
        if (sidebarDialog.open) {
            sidebarDialog.classList.remove("appear");
            setTimeout(() => sidebarDialog.close(), 200);
        } else {
            sidebarDialog.showModal();
            sidebarDialog.classList.add("appear");
        }
        return;
    }

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

// ##### main view
var mainType = null;
var mainID = null;
var mainView = null;
var mainWindow = document.querySelector("#task-list");

mainWindow.classList.add("active");

function setupMainView() {
    const sidebarItems = document.querySelectorAll(".sidebar li");

    sidebarItems.forEach(item => {
        item.addEventListener("click", event => {
            // event.stopPropagation();

            if (mainWindow) {
                mainWindow.classList.remove("active");
            }

            const type = item.dataset.type;
            const id = item.dataset.id || null;
            const view = item.dataset.view || null;

            if (!(mainType === type && mainID === id && mainView === view)) {
                toggleRightSide(false);
            }

            mainType = type;
            mainID = id;
            mainView = view;

            var newView;

            var mainTitle = document.querySelector("#main-title");
            var itemTitle = item.querySelector(".item-title").textContent || null;
            // mainTitle.textContent = itemTitle.textContent;
            mainTitle.textContent = itemTitle;

            var mainWindowType = document.querySelector(".main-window-type");
            if (type === "taskView") {
                mainWindowType.textContent = "/views";
                mainWindow = document.querySelector("#today-view");
                // TODO: change view content based on Today / This Week / All
            }
            else if (type === "taskList") {
                mainWindowType.textContent = "/tasks";
                mainWindow = document.querySelector("#task-list");

                // TODO: load tasks using mainID
            }
            else if (type === "noteList") {
                mainWindowType.textContent = "/notes";
                mainWindow = document.querySelector("#note-list");

                // TODO: load notes using mainID
            }

            mainWindow.dataset.id = id;
            console.log(mainWindow.dataset.id);

            if (mainWindow) {
                mainWindow.classList.add("active");
                // 
                let sideBarDialog = item.closest("dialog");
                sideBarDialog.classList.remove("appear");
                setTimeout(() => {
                    sideBarDialog.close();
                }, 200);
                // 
            }
        });
    });
}

// setupMainView();

// ### Handle Window Resize ### //
window.addEventListener("resize", checkWindowResize);
window.addEventListener("load", checkWindowResize);

function checkWindowResize() {
    // sidebar stay dialog below 576px
    if (window.innerWidth < 576) {
        sidebarDiv.classList.remove("active", "appear");
    } else {
        sidebarDialog.close();
        sidebarDialog.classList.remove("appear");

        if (sidebarStatus) {
            sidebarDiv.classList.add("active", "appear");
        } else {
            sidebarDiv.classList.remove("active", "appear");
        }
    }

    // right-side stay dialog below 768px
    if (window.innerWidth < 768) {
        rightSideDiv.classList.remove("active", "appear");

        if (rightSideStatus) {
            if (!rightSideDialog.open) {
                rightSideDialog.showModal();
            }
            rightSideDialog.classList.add("appear");
        } else {
            rightSideDialog.classList.remove("appear");
            rightSideDialog.close();
        }
    } else {
        rightSideDialog.close();
        rightSideDialog.classList.remove("appear");

        if (rightSideStatus) {
            rightSideDiv.classList.add("active", "appear");
        } else {
            rightSideDiv.classList.remove("active", "appear");
        }
    }
}

// ############################################################################
// ##### Dialog Open #######/////////////
var currentModalType = null;
var currentModalID = null;

function setupOpenDialogs() {
    const openButtons = document.querySelectorAll("[data-dialog-target]");

    openButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();

            const dialog = document.querySelector(button.dataset.dialogTarget);
            if (!dialog) return;

            const source = event.target.closest(".task, .note, #task-list, #note-list");

            currentModalType = source ? source.dataset.type : null;
            currentModalID = source ? source.dataset.id : null;

            dialog.dataset.id = source ? source.dataset.id : null;
            console.log(dialog.dataset.id);


            dialog.showModal();
        });
    });
}

setupOpenDialogs();

// Dialog Buttons: Cancel and Confirm
function setupDialogActions() {
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
            currentModalType = null;
            currentModalID = null;
            dialog.close();
        });
    });
}

setupDialogActions();


// ##############################################
// ##############################################
// ##############################################
// ##############################################
// ##############################################
// ##############################################

