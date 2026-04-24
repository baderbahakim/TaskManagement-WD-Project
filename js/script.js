const sidebarWindow = document.querySelector('#sidebar-dialog');
const openSidebarWindow = document.querySelector('.list-icon');
const closeSidebarWindow = document.querySelector('.list-close-icon');

handleDialogElements(sidebarWindow, openSidebarWindow, closeSidebarWindow);

const rightSideWindow = document.querySelector('#right-side-dialog');
const openRightSideWindow = document.querySelector('.task');
const closeRightSideWindow = document.querySelector('.right-side-close-icon');

handleDialogElements(rightSideWindow, openRightSideWindow, closeRightSideWindow);


function handleDialogElements(dialog, openDialog, closeDialog) {
    openDialog.addEventListener('click', () => {
        handleDialog("click", dialog);
    })
    
    closeDialog.addEventListener('click', () => {
        handleDialog("click", dialog);
    })
    
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            handleDialog("click", dialog);
        }
    })
}

function handleDialog(event, dialog) {
    if (window.innerWidth >= 700) {
        if (event !== "click") {
            if (asideWindow.open) {
                asideWindow.close();
            }
            asideWindow.show();
        }
        else {
            if (asideWindow.open) {
                asideWindow.close();
                return;
            }
            asideWindow.show();
        }
    } else {
        if (event === "load") {
            asideWindow.close();
        }
        // else if (event === "resize") {
        // }
        else if (event === "click") {
            if (dialog.open) {
                // asideWindow.style.left = "calc(0px - var(--aside-dialog-width))";
                // setTimeout(() => {
                dialog.close();
                // }, 200);
                return;
            }
            dialog.showModal();
            // asideWindow.style.left = "0";
        }
    }
}

window.addEventListener("load", handleDialog("load"));
window.addEventListener("resize", handleDialog("resize"));


// openAsideWindow.addEventListener('click', () => {
//     handleDialog("click");

//     // if(window.innerWidth >= 700) {
//     //     asideWindow.show();
//     // }
//     // else {
//     // document.body.classList.add("no-scroll");
//     // asideWindow.showModal();
//     // }
// })

// closeAsideWindow.addEventListener('click', () => {
//     document.body.classList.remove("no-scroll");
//     asideWindow.close();
// })

// asideWindow.addEventListener('click', (event) => {
//     if (event.target === asideWindow) {
//         handleDialog("click");
//         // document.body.classList.remove("no-scroll");
//         // asideWindow.close();
//     }
// })


// console.log("######" + window.innerWidth + "#######");
