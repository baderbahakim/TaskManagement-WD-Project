// Note Local Data
// $$ خليها فاضية $$
var notes = [
    { id: 1, listId: 17, name: "Learn variables", description: "note note nogdfvf ", createdDate: "2026 25 September" },
    { id: 2, listId: 17, name: "ايش سوا هتلر", description: "هتلر هتلر هنلر ", createdDate: "2026 20 September" },

    { id: 3, listId: 69, name: "جوناااان", description: "جنون جنون جنون", createdDate: "2025 25 September" },
    { id: 4, listId: 69, name: "ماهو جنون العظمة", description: "ماهو جنون العظمة", createdDate: "2025 20 September" },

    { id: 5, listId: 96, name: "أفكاااار", description: "أفكاااارأفكاااارأفكاااارأفكاااارأفكاااار", createdDate: "2025 25 September" },
    { id: 6, listId: 96, name: "أفكار مجنونة", description: "أفكار مجنونةفكار مجنونةفكار مجنونةفكار مجنونة", createdDate: "2025 20 September" },
    { id: 7, listId: 96, name: "أفكاااار", description: "أفكاااارأفكاااارأفكاااارأفكاااارأفكاااار", createdDate: "2025 25 September" },
    { id: 8, listId: 96, name: "أفكار مجنونة", description: "أفكار مجنونةفكار مجنونةفكار مجنونةفكار مجنونة", createdDate: "2025 20 September" },
    { id: 9, listId: 96, name: "أفكاااار", description: "أفكاااارأفكاااارأفكاااارأفكاااارأفكاااار", createdDate: "2025 25 September" },
    { id: 10, listId: 96, name: "أفكار مجنونة", description: "أفكار مجنونةفكار مجنونةفكار مجنونةفكار مجنونة", createdDate: "2025 20 September" }
];
// $$

// $$ سوي كول للفنكشن اللي تحت
// loadNotes();
// $$

// $$ سوي فنكشن تجيب النوتس من الداتا بيس وتحطها في الارراي اللي فوق
function loadNotes() {

}
// $$

// ## Create Note Dialog ##
function openCreateNoteDialog(event) {
    event.stopPropagation();

    const noteListElement = event.target.closest("#note-list");
    const selectedListId = noteListElement ? noteListElement.dataset.id : "";

    actionDialog.className = "create-dialog modal";
    actionDialog.dataset.action = "create-note";
    actionDialog.dataset.id = "";

    actionDialog.innerHTML = `
            <form id="create-note-form" action="">
                <h2>Create Note</h2>

                <label>Name</label>
                <input id="note-name" type="text" name="note-name">

                <label>List</label>
                <select id="note-list" name="note-list">
                    ${createOptions(noteLists, "id", "name", "Choose note list")}
                </select>

                <label>Description</label>
                <textarea id="note-description" name="note-description"></textarea>

                <div class="dialog-button-container">
                    <button class="cancel-dialog-button cancel" type="button" onclick="closeActionDialog(event)">Cancel</button>
                    <button class="confirm-dialog-button create" type="submit" onclick="createEditNote(event, true)">Create</button>
                </div>

                <p class="error-message"></p>
            </form>
    `;
    var noteListSelect = actionDialog.querySelector("#note-list");
    noteListSelect.value = String(selectedListId);
    noteListSelect.disabled = true;

    actionDialog.showModal();
}

// ## Edit Note Dialog ##
function openEditNoteDialog(event) {
    event.stopPropagation();

    const noteElement = event.target.closest(".note");
    if (!noteElement) return;

    const noteID = noteElement.dataset.id;
    const note = notes.find(n => n.id == noteID);
    if (!note) return;

    actionDialog.className = "create-dialog modal";
    actionDialog.dataset.action = "edit-note";
    actionDialog.dataset.id = noteID;

    actionDialog.innerHTML = `
        <form id="create-note-form" action="">
            <h2>Edit Note</h2>

            <label>Name</label>
            <input id="note-name" type="text" name="note-name" value="${note.name}">

            <label>List</label>
            <select id="note-list" name="note-list">
                ${createOptions(noteLists, "id", "name", "Choose note list")}
            </select>

            <label>Description</label>
            <textarea id="note-description" name="note-description">${note.description}</textarea>

            <div class="dialog-button-container">
                <button class="cancel-dialog-button cancel" type="button" onclick="closeActionDialog(event)">Cancel</button>
                <button class="confirm-dialog-button edit" type="submit" onclick="createEditNote(event, false)">Edit</button>
            </div>

            <p class="error-message"></p>
        </form>
    `;

    actionDialog.querySelector("#note-list").value = note.listId;

    actionDialog.showModal();
}

// ## Delete Note Dialog ##
function openDeleteNoteDialog(event) {
    event.stopPropagation();

    const note = event.target.closest(".note");
    if (!note) return;

    const noteId = note.dataset.id;

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "delete-note";
    actionDialog.dataset.id = noteId;

    actionDialog.innerHTML = `
        <form id="delete-note-form">
            <h2 class="simple-dialog-message">Delete note?</h2>

            <div class="dialog-button-container">
                <button type="button" class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit" class="confirm-dialog-button delete"
                    onclick="deleteNote(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}