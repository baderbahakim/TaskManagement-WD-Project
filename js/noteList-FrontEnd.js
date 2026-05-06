// NoteList Local Data
var noteLists = [
    { id: 17, name: "هتلر" },
    { id: 69, name: "جنون العظمة" },
    { id: 96, name: "Ideaaaas" }
];

// ## Create NoteList Dialog ##
function openCreateNoteListDialog(event) {
    event.stopPropagation();

    actionDialog.className = "create-list-dialog modal";
    actionDialog.dataset.action = "create-note-list";
    actionDialog.dataset.id = "";

    actionDialog.innerHTML = `
            <form id="create-note-list-form" action="">
                <h2>Create Note List</h2>

                <div class="note-list-name-field">
                    <label>Name</label>
                    <input id="note-list-name" type="text" name="note-list-name">
                </div>

                <div class="dialog-button-container">
                    <button class="cancel-dialog-button cancel" type="button"
                        onclick="closeActionDialog(event)">
                        Cancel
                    </button>

                    <button class="confirm-dialog-button create" type="submit"
                        onclick="createEditNoteList(event, true)">
                        Create
                    </button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// ## Edit NoteList Dialog ##
function openEditNoteListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest("#note-list");
    if (!item) return;

    const id = item.dataset.id;
    const noteList = noteLists.find(l => l.id == id);
    if (!noteList) return;

    actionDialog.className = "action-dialog edit-list-dialog modal";
    actionDialog.dataset.action = "edit-note-list";
    actionDialog.dataset.id = id;

    actionDialog.innerHTML = `
            <form id="edit-note-list-form">
                <h2>Edit Note List</h2>

                <div class="note-list-name-field">
                    <label>Name</label>
                    <input id="note-list-name" type="text" value="${noteList.name}">
                </div>

                <div class="dialog-button-container">
                    <button type="button"
                        class="cancel-dialog-button cancel"
                        onclick="closeActionDialog(event)">
                        Cancel
                    </button>

                    <button type="submit"
                        class="confirm-dialog-button edit"
                        onclick="createEditNoteList(event, false)">
                        Edit
                    </button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// ## Delete NoteList Dialog ##
function openDeleteNoteListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest("#note-list");
    if (!item) return;

    const id = item.dataset.id;

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "delete-note-list";
    actionDialog.dataset.id = id;

    actionDialog.innerHTML = `
        <form id="delete-note-list-form">
            <h2 class="simple-dialog-message">Delete note list?</h2>

            <div class="dialog-button-container">
                <button type="button" class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit" class="confirm-dialog-button delete"
                    onclick="deleteNoteList(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}








