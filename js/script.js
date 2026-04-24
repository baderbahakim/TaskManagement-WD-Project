
const sidebarDialog = document.querySelector('#sidebar-dialog');
const openSidebarDialog = document.querySelectorAll('.list-icon');
const closeSidebarDialog = document.querySelectorAll('.list-close-icon');

const rightSideDialog = document.querySelector('#right-side-dialog');
const openRightSideDialog = document.querySelectorAll('.task');
const closeRightSideDialog = document.querySelectorAll('.right-side-close-icon');

const sidebarDiv = document.querySelector('#sidebar-div');
const rightSideDiv = document.querySelector('#right-side-div');

sidebarDiv.innerHTML = sidebarDialog.innerHTML;
rightSideDiv.innerHTML = rightSideDialog.innerHTML;

var sidebarStatus = true;
var rightSideStatus = false;

addDialogListener(sidebarDialog, sidebarDiv, openSidebarDialog, closeSidebarDialog);
addDialogListener(rightSideDialog, rightSideDiv, openRightSideDialog, closeRightSideDialog);
///////////////////////////////////////////////



window.addEventListener("resize", checkWindowResize());

function checkWindowResize() {
    if (window.innerWidth < 576) {
        sidebarDiv.classList.remove("active");
        rightSideDiv.classList.remove("active");

        if (rightSideStatus) {
            rightSideDialog.showModal();
        }
        return;
    }
    else if (window.innerWidth >= 576) {
        sidebarDialog.close();

        if (sidebarStatus) {
            sidebarDiv.classList.add("active");
        }
    }
    if (window.innerWidth >= 768) {
        rightSideDialog.close();

        if (rightSideStatus) {
            rightSideDiv.classList.add("active");
        }
    }
}


function addDialogListener(dialog, div, openDialog, closeDialog) {
    openDialog.forEach(open => {
        open.addEventListener('click', () => {
            handleSideDialog("click", dialog, div);
        })
    });

    closeDialog.forEach(close => {
        close.addEventListener('click', () => {
            handleSideDialog("click", dialog, div);
        })
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            handleSideDialog("click", dialog, div);
        }
    })
}

function handleSideDialog(event, dialog, div) {
    if (window.innerWidth < 576) {
        if (event === "click") {
            if (dialog.open) {
                dialog.close();
            }
            else {
                dialog.showModal();
            }
        }
    }
    else if (window.innerWidth >= 576) {
        if (div === rightSideDiv) {
            // //////
            div.classList.toggle("active");
            // /////
        }
        else {
            div.classList.toggle("active");
            
        }
    }
    else {

    }
}