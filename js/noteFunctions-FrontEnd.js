// ## fill notes in main ##
function fillNotesFromList(notes, noteListName) {
    changeHeaderTitleType(noteListName, "/notes");

    const container = document.querySelector("#note-list .notes-container");

    container.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");

        div.classList.add("note");
        div.dataset.type = "note";
        div.dataset.id = note.id;

        div.innerHTML = `
            <div class="note-header">
                <div class="note-name-wrap">
                    <div>
                        <h3 class="note-name">${note.name}</h3>
                        <p class="list-of-note">${noteListName}</p>
                    </div>
                </div>

                <div>
                    <i class="fa-solid fa-pencil edit-note-icon" onclick="openEditNoteDialog(event)"></i>
                    <i class="fa-regular fa-trash-can delete-note-icon" onclick="openDeleteNoteDialog(event)"></i>
                </div>
            </div>

            <div class="description-box">
                <p class="note-description">${note.description}</p>
            </div>
        `;

        div.addEventListener("click", event => {
            if (event.target.closest(".delete-note-icon, .edit-note-icon")) {
                return;
            }

            noteClick(div);
        });

        container.appendChild(div);
    });
}

// ## Note Click ##
function noteClick(noteElement) {
    const noteID = noteElement.dataset.id;

    // Close rightside if viewed note same as clicked note
    if (
        rightSideStatus &&
        currentRightSideType === "note" &&
        currentRightSideId == noteID
    ) {
        currentRightSideType = null;
        currentRightSideId = null;

        // Close rightside
        toggleRightSide(false);
        return;
    }

    const note = notes.find(n => n.id == noteID);
    if (!note) return;

    const noteList = noteLists.find(l => l.id == note.listId);
    const noteListName = noteList ? noteList.name : "";

    currentRightSideType = "note";
    currentRightSideId = noteID;

    // Show note details in rightside
    fillRightSideNote(note, noteListName);
    // Open rightside
    toggleRightSide(true);
}

// ## Show Note Details on rightside ##
function fillRightSideNote(note, noteListName) {
    const asides = document.querySelectorAll(".right-side-aside");

    asides.forEach(aside => {
        aside.querySelector(".right-side-title").textContent = "Note";

        aside.querySelectorAll(".right-side-view").forEach(view => {
            view.remove();
        });

        const noteView = document.createElement("div");

        noteView.classList.add("note", "right-side-view");
        noteView.dataset.type = "note";
        noteView.dataset.id = note.id;

        noteView.innerHTML = `
            <div class="note-header">
                <div>
                    <h2 class="note-name">${note.name}</h2>
                    <p class="list-of-note">${noteListName}</p>
                </div>

                <div class="note-actions">
                    <i class="fa-solid fa-pencil edit-note-icon"
                       onclick="openEditNoteDialog(event)"></i>

                    <i class="fa-regular fa-trash-can delete-note-icon"
                       onclick="openDeleteNoteDialog(event)"></i>
                </div>
            </div>

            <div class="note-details">
                <div class="description-box">
                    <span class="description-label">Description</span>
                    <p class="note-description">${note.description}</p>
                </div>

                <p class="note-created-date">${note.createdDate}</p>
            </div>
        `;

        aside.appendChild(noteView);
    });
}

// ## Create / Edit Note ##
function createEditNote(event, create) {
    event.preventDefault();

    const form = actionDialog.querySelector("form");

    const name = form.querySelector("#note-name").value.trim();
    const listId = form.querySelector("#note-list").value;
    const description = form.querySelector("#note-description").value.trim();
    const errorMsg = form.querySelector(".error-message");

    if (!name) {
        showError(errorMsg, "Enter note name");
        return;
    }

    if (!listId) {
        showError(errorMsg, "Choose note list");
        return;
    }

    if (!description) {
        showError(errorMsg, "Enter Description of the note");
        return;
    }

    clearError(errorMsg);

    // Create Path
    if (create) {
        // $$ صنع النوت
        const newNote = {
            id: Date.now(),
            listId: Number(listId),
            name: name,
            description: description,
            createdDate: new Date().toLocaleDateString()
        };

        notes.push(newNote);
        // $$
    }

    // Edit Path
    else {
        const noteID = actionDialog.dataset.id; // %% استخدم هذا الاي دي

        // $$ تعديل النوت
        const note = notes.find(n => n.id == noteID);
        if (!note) return;

        note.listId = Number(listId);
        note.name = name;
        note.description = description;
        // $$
    }

    const selectedList = noteLists.find(list => list.id == listId);
    const noteListName = selectedList ? selectedList.name : "";

    const filteredNotes = notes.filter(n => n.listId == listId);

    fillNotesFromList(filteredNotes, noteListName);

    // If rightside is open and note edited is the same in rightside, update rightside
    if (currentRightSideType === "note" && currentRightSideId == actionDialog.dataset.id) {
        const updatedNote = notes.find(n => n.id == actionDialog.dataset.id);
        if (updatedNote) {
            fillRightSideNote(updatedNote, noteListName);
        }
    }

    closeActionDialog(event);
}

// ## Delete Note ##
function deleteNote(event) {
    event.preventDefault();

    const noteId = actionDialog.dataset.id; // %% استخدم هذا الاي دي

    const note = notes.find(n => n.id == noteId);
    if (!note) return;

    const listId = note.listId; // %% اي دي الليست

    // $$ حذف النوت
    notes = notes.filter(n => n.id != noteId);
    // $$

    const selectedList = noteLists.find(list => list.id == listId);
    const noteListName = selectedList ? selectedList.name : "";

    const filteredNotes = notes.filter(n => n.listId == listId);

    fillNotesFromList(filteredNotes, noteListName);

    // If rightside is open and note deleted is the same in rightside, close rightside
    if (currentRightSideType === "note" && currentRightSideId == noteId) {
        toggleRightSide(false);
    }

    closeActionDialog(event);
}