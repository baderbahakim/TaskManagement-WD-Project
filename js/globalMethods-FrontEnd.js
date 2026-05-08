// Query the Action Dialog to Fetch in it Later
const actionDialog = document.querySelector("#action-dialog");

// Dialog fill select options
function createOptions(array, valueKey, nameKey, firstOptionText = null) {
    let options = "";

    // Fill the first empty option 
    if (firstOptionText) {
        options += `<option value="">${firstOptionText}</option>`;
    }

    // Fill the options with array items
    array.forEach(item => {
        options += `<option value="${item[valueKey]}">${item[nameKey]}</option>`;
    });

    return options;
}

// Show error message
function showError(errorMsg, message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
}

// Clear error message
function clearError(errorMsg) {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

// Close Action Dialog when clicking cancel or clicking submit button and passing the front end validation
function closeActionDialog(event) {
    event.preventDefault();
    actionDialog.close();
    actionDialog.innerHTML = "";
    actionDialog.dataset.id = "";
    actionDialog.dataset.action = "";
}

// Change Header Icon, Title, and Type for the clicked item
function changeHeaderIconTitleType(iconClass, title, type) {
    document.querySelector("#header #header-icon").className = iconClass || null;
    document.querySelector("#header #header-title").textContent = title || null;
    document.querySelector("#header #header-type").textContent = type || null;
}

// The current selected sidebar item
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

    // Make the query selector string for the selected item to make it selected
    let selector = `.sidebar li[data-type="${type}"]`;

    if (id) {
        selector += `[data-id="${id}"]`;
    }

    if (name) {
        selector += `[data-name="${name}"]`;
    }

    document.querySelectorAll(selector).forEach(item => {
        // make the selected item selected
        item.classList.add("selected");
    });
}

// When editing a tasklist or notelist name it keeps the edited item selected after rendering
function keepSidebarSelection(type, id) {
    const selectedItem = document.querySelector(
        `.sidebar li[data-type="${type}"][data-id="${id}"]`
    );

    if (selectedItem) {
        // make the edited item selected after rendering
        selectSidebarItem(selectedItem);
    }
}

// Handle 
function handleMainItemClick(item) {

    const newType = item.dataset.type;
    const newID = item.dataset.id || null;
    const newView = item.dataset.name || null;

    // make the boolean variable that will determine if the current item viewed is the same as the clicked or not
    const sameItem =
        mainType === newType &&
        mainID === newID &&
        mainView === newView;

    // close right-side only if different item clicked
    if (!sameItem && rightSideStatus) {
        currentRightSideType = null;
        currentRightSideId = null;

        // Cl;ose rightside
        toggleRightSide(false);
    }

    // update main state
    mainType = newType;
    mainID = newID;
    mainView = newView;

    const sidebarDialogParent = item.closest("#sidebar-dialog");

    // Close sidebar dialog when clicking an item on mobile screen
    if (sidebarDialogParent && window.innerWidth < 576) {

        sidebarDialogParent.classList.remove("appear");

        setTimeout(() => {
            sidebarDialogParent.close();
            document.body.style.overflow = "auto";
        }, 200);

    }
}

// Refresh the current view on main after an operation on data
function refreshCurrentView() {
    if (mainType === "view") {
        const view = views.find(v => v.name === mainView);

        const viewItem = document.querySelector(
            `.sidebar li.view[data-name="${mainView}"]`
        );

        // If a view item is viewed on main update the main for the same view
        if (viewItem) fillTasksFromView(viewItem);
        return;
    }

    if (mainType === "taskList") {
        const item = document.querySelector(
            `.sidebar .task-list[data-id="${mainID}"]`
        );

        // If a tasklist item is viewed on main update the main for the tasklist with current main ID
        if (item) taskListClick(item);
        return;
    }

    if (mainType === "noteList") {
        const item = document.querySelector(
            `.sidebar .note-list[data-id="${mainID}"]`
        );

        // If a notelist item is viewed on main update the main for the notelist with current main ID
        if (item) noteListClick(item);
    }
}