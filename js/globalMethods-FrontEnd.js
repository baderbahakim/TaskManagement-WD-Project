// Query the Action Dialog to Fetch it Later
const actionDialog = document.querySelector("#action-dialog");

// Dialog fill select options
function createOptions(array, valueKey, nameKey, firstOptionText = null) {
    let options = "";

    if (firstOptionText) {
        options += `<option value="">${firstOptionText}</option>`;
    }

    array.forEach(item => {
        options += `<option value="${item[valueKey]}">${item[nameKey]}</option>`;
    });

    return options;
}

// Error Message Handling
function showError(errorMsg, message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
}

function clearError(errorMsg) {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

// Close Action Dialog
function closeActionDialog(event) {
    event.preventDefault();
    actionDialog.close();
    actionDialog.innerHTML = "";
    actionDialog.dataset.id = "";
    actionDialog.dataset.action = "";
}

// Change Header Title and Type
function changeHeaderTitleType(title, type) {
    document.querySelector("#header #header-title").textContent = title || null;
    document.querySelector("#header #header-type").textContent = type || null;
}

window.selectedSidebarItem;

// Change background color for selected .sidebar item
function selectSidebarItem(selectedItem) {
    selectedSidebarItem = selectedItem;

    const type = selectedItem.dataset.type;
    const id = selectedItem.dataset.id;
    const name = selectedItem.dataset.name;

    document.querySelectorAll(".sidebar li.selected").forEach(item => {
        item.classList.remove("selected");
    });

    let selector = `.sidebar li[data-type="${type}"]`;

    if (id) {
        selector += `[data-id="${id}"]`;
    }

    if (name) {
        selector += `[data-name="${name}"]`;
    }

    document.querySelectorAll(selector).forEach(item => {
        item.classList.add("selected");
    });
}

// When editing a tasklist or notelist name it keeps the edited item selected after rendering
function keepSidebarSelection(type, id) {
    const selectedItem = document.querySelector(
        `.sidebar li[data-type="${type}"][data-id="${id}"]`
    );

    if (selectedItem) {
        selectSidebarItem(selectedItem);
    }
}

// Handle Main View
function handleMainItemClick(item) {

    const newType = item.dataset.type;
    const newID = item.dataset.id || null;
    const newView = item.dataset.name || item.dataset.view || null;

    const sameList =
        mainType === newType &&
        mainID === newID &&
        mainView === newView;

    // close right-side only if different list clicked
    if (!sameList && rightSideStatus) {
        currentRightSideType = null;
        currentRightSideId = null;

        toggleRightSide(false);
    }

    // update main state
    mainType = newType;
    mainID = newID;
    mainView = newView;

    const sidebarDialogParent = item.closest("#sidebar-dialog");

    if (sidebarDialogParent && window.innerWidth < 576) {
        sidebarDialogParent.classList.remove("appear");
        setTimeout(() => sidebarDialogParent.close(), 200);
    }
}

// Refresh the current view
function refreshCurrentView() {
    if (mainType === "view") {
        const view = views.find(v => v.name === mainView);
        if (view) renderView(view);
        return;
    }

    if (mainType === "taskList") {
        const item = document.querySelector(
            `.sidebar .task-list[data-id="${mainID}"]`
        );

        if (item) taskListClick(item);
        return;
    }

    if (mainType === "noteList") {
        const item = document.querySelector(
            `.sidebar .note-list[data-id="${mainID}"]`
        );

        if (item) noteListClick(item);
    }
}