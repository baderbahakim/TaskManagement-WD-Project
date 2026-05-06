// Render NoteLists call
renderNoteLists(noteLists);

// ## Render NoteLists ##
function renderNoteLists(noteLists) {
    const containers = document.querySelectorAll(".sidebar ul.notes");

    containers.forEach(container => {
        container.innerHTML = "";

        noteLists.forEach(noteList => {
            const li = document.createElement("li");

            li.classList.add("note-list");
            li.dataset.type = "noteList";
            li.dataset.id = noteList.id;

            li.innerHTML = `
                <i class="fa-regular fa-note-sticky"></i>
                <p class="item-title">${noteList.name}</p>
            `;

            li.addEventListener("click", event => {
                const noteListItem = event.target.closest(".note-list");
                if (!noteListItem) return;

                selectSidebarItem(noteListItem);

                handleMainItemClick(noteListItem);
                noteListClick(noteListItem);
            });

            container.appendChild(li);
        });
    });
}

// ## NoteList click ##
function noteListClick(noteListItem) {
    const noteListID = noteListItem.dataset.id;
    const noteListName = noteListItem.querySelector(".item-title").textContent;

    const main = document.querySelector("#main");

    main.innerHTML = "";

    main.innerHTML = `
        <div id="note-list" class="main-window" data-type="noteList" data-id="${noteListID}">
            <div class="note-list-header">
                <i class="fa-solid fa-plus create-task-list-icon" onclick="openCreateNoteDialog(event)"></i>
                <div>
                    <i class="fa-solid fa-pencil edit-note-list-icon" onclick="openEditNoteListDialog(event)"></i>
                    <i class="fa-regular fa-trash-can delete-note-list-icon" onclick="openDeleteNoteListDialog(event)"></i>
                </div>
            </div>

            <div class="notes-container">
            </div>
            
        </div>
    `;

    const filteredNotes = notes.filter(note => note.listId == noteListID);

    fillNotesFromList(filteredNotes, noteListName);
}

// ## Create Edit NoteList ##
function createEditNoteList(event, create) {
    event.preventDefault();

    const form = actionDialog.querySelector("form");

    const name = form.querySelector("#note-list-name").value.trim();
    const errorMsg = form.querySelector(".error-message");

    if (!name) {
        showError(errorMsg, "Enter note list name");
        return;
    }

    clearError(errorMsg);

    // Create Path
    if (create) {

        const newNoteList = {
            id: Date.now(),
            name: name
        };

        noteLists.push(newNoteList);
    }

    // Edit Path
    else {
        const noteListID = actionDialog.dataset.id;

        const noteList = noteLists.find(l => l.id == noteListID);
        if (!noteList) return;

        noteList.name = name;
    }

    renderNoteLists(noteLists);

    closeActionDialog(event);
}

// ## Delete Note List ##
function deleteNoteList(event) {
    event.preventDefault();

    const noteListId = actionDialog.dataset.id;

    noteLists = noteLists.filter(l => l.id != noteListId);

    // delete related notes
    notes = notes.filter(n => n.listId != noteListId);

    renderNoteLists(noteLists);

    document.querySelector("#note-list .notes-container").innerHTML = "";

    closeActionDialog(event);

    viewDashboard();
}