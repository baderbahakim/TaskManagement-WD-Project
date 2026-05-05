const actionDialog = document.querySelector("#action-dialog");

const priorities = [
    { value: "", name: "Choose priority" },
    { value: "high", name: "High" },
    { value: "medium", name: "Medium" },
    { value: "low", name: "Low" }
];

const statuses = [
    { value: "", name: "Choose status" },
    { value: "to-do", name: "To-Do" },
    { value: "in-progress", name: "In-Progress" },
    { value: "done", name: "Done" }
];

// fake data ##########
var taskLists = [
    { id: 1, name: "Study JS" },
    { id: 35, name: "جونااااان" },
    { id: 20, name: "Gym" }
];

var tasks = [
    { id: 1, listId: 1, name: "Learn variables", priority: "high", status: "to-do", startDate: "25 October", dueDate: "15 November", description: "task task task rtask task ", createdDate: "2026 25 September" },
    { id: 2, listId: 1, name: "Practice functions", priority: "low", status: "done", startDate: "25 August", dueDate: "15 October", description: "abc abc anc kyuf  iugf ", createdDate: "2026 25 november" },

    { id: 3, listId: 35, name: "مهمة 1", priority: "high", status: "to-do", startDate: "25 October", dueDate: "15 November", description: "task task task rtask task ", createdDate: "2026 25 September" },
    { id: 4, listId: 35, name: "مهمة 2", priority: "low", status: "in-progress", startDate: "14 October", dueDate: "15 November", description: "taskdf vfgngft rnfgn thth th ", createdDate: "2026 25 september" },

    { id: 5, listId: 20, name: "Chest workout", priority: "high", status: "in-progress", startDate: "15 October", dueDate: "15 November", description: "task task ger ertge rgre gre gre rtask task ", createdDate: "2026 25 September" },
    { id: 6, listId: 20, name: "Leg day", priority: "medium", status: "done", startDate: "12 April", dueDate: "15 November", description: "task task task rtask task ", createdDate: "2026 25 September" }
];

var noteLists = [
    { id: 17, name: "هتلر" },
    { id: 69, name: "جنون العظمة" },
    { id: 96, name: "Ideaaaas" }
];

var notes = [
    { id: 1, listId: 17, name: "Learn variables", description: "note note nogdfvf ", createdDate: "2026 25 September" },
    { id: 2, listId: 17, name: "ايش سوا هتلر", description: "هتلر هتلر هنلر ", createdDate: "2026 20 September" },

    { id: 3, listId: 69, name: "جوناااان", description: "جنون جنون جنون", createdDate: "2025 25 September" },
    { id: 4, listId: 69, name: "ماهو جنون العظمة", description: "ماهو جنون العظمة", createdDate: "2025 20 September" },

    { id: 5, listId: 96, name: "أفكاااار", description: "أفكاااارأفكاااارأفكاااارأفكاااارأفكاااار", createdDate: "2025 25 September" },
    { id: 6, listId: 96, name: "أفكار مجنونة", description: "أفكار مجنونةفكار مجنونةفكار مجنونةفكار مجنونة", createdDate: "2025 20 September" }
];


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

// Close dialog
function closeActionDialog(event) {
    event.preventDefault();
    actionDialog.close();
    actionDialog.innerHTML = "";
    actionDialog.dataset.id = "";
    actionDialog.dataset.action = "";
}

// ##### Open Dialogs ######
// Create Task Dialog
function openCreateTaskDialog(event) {
    event.stopPropagation();

    actionDialog.className = "create-dialog modal";
    actionDialog.dataset.action = "create-task";
    actionDialog.dataset.id = "";

    actionDialog.innerHTML = `
            <form id="create-task-form" action="">
                <h2>Create Task</h2>

                <div class="row">
                    <div class="field">
                        <label>Name</label>
                        <input id="task-name" type="text" name="task-name">
                    </div>

                    <div class="field">
                        <label>List</label>
                        <select id="task-list" name="task-list">
                            ${createOptions(taskLists, "id", "name", "Choose task list")}
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="field">
                        <label>Status</label>
                        <select id="task-status" name="task-status">
                            ${createOptions(statuses, "value", "name")}
                        </select>
                    </div>

                    <div class="field">
                        <label>Priority</label>
                        <select id="task-priority" name="task-priority">
                            ${createOptions(priorities, "value", "name")}
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="field">
                        <label>Start Date</label>
                        <input id="task-start-date" type="date" name="task-start-date">
                    </div>

                    <div class="field">
                        <label>Due Date</label>
                        <input id="task-due-date" type="date" name="task-due-date">
                    </div>
                </div>

                <label>Description</label>
                <textarea id="task-description" name="task-description"></textarea>

                <div class="dialog-button-container">
                    <button class="cancel-dialog-button cancel" type="button" onclick="closeActionDialog(event)">Cancel</button>
                    <button class="confirm-dialog-button create" type="submit" onclick="createTask(event)">Create</button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// Create Note Dialog
function openCreateNoteDialog(event) {
    event.stopPropagation();

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
                    <button class="confirm-dialog-button create" type="submit" onclick="createNote(event)">Create</button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// Create TaskList Dialog
function openCreateTaskListDialog(event) {
    event.stopPropagation();

    actionDialog.className = "create-list-dialog modal";
    actionDialog.dataset.action = "create-task-list";
    actionDialog.dataset.id = "";

    actionDialog.innerHTML = `
            <form id="create-task-list-form" action="">
                <h2>Create Task List</h2>

                <div class="task-list-name-field">
                    <label>Name</label>
                    <input id="task-list-name" type="text" name="task-list-name">
                </div>

                <div class="dialog-button-container">
                    <button class="cancel-dialog-button cancel" type="button" onclick="closeActionDialog(event)">Cancel</button>

                    <button class="confirm-dialog-button create" type="submit"
                        onclick="createEditTaskList(event, true)">
                        Create
                    </button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// Create NoteList Dialog
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

// Delete Task Dialog
function openDeleteTaskDialog(event) {
    event.stopPropagation();

    const task = event.target.closest(".task");
    if (!task) return;

    const taskId = task.dataset.id;

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "delete-task";
    actionDialog.dataset.id = taskId;

    actionDialog.innerHTML = `
        <form id="delete-task-form">
            <h2 class="simple-dialog-message">Delete task?</h2>

            <div class="dialog-button-container">
                <button type="button"
                    class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit"
                    class="confirm-dialog-button delete"
                    onclick="confirmDeleteTask(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// Delete Note Dialog
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
                    onclick="confirmDeleteNote(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// Delete TaskList Dialog
function openDeleteTaskListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest(".task-list");
    if (!item) return;

    const id = item.dataset.id;

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "delete-task-list";
    actionDialog.dataset.id = id;

    actionDialog.innerHTML = `
        <form id="delete-task-list-form">
            <h2 class="simple-dialog-message">Delete task list?</h2>

            <div class="dialog-button-container">
                <button type="button" class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit" class="confirm-dialog-button delete"
                    onclick="confirmDeleteTaskList(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// Delete NoteList Dialog
function openDeleteNoteListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest(".note-list");
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
                    onclick="confirmDeleteNoteList(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// Logout Dialog
function openLogoutDialog(event) {
    event.stopPropagation();

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "logout";

    actionDialog.innerHTML = `
        <form id="logout-form">
            <h2 class="simple-dialog-message">Log out?</h2>

            <div class="dialog-button-container">
                <button type="button" class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit" class="confirm-dialog-button logout"
                    onclick="confirmLogout(event)">
                    Log out
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// ###### Create ######
// Create Task
function createTask(event) {
    event.preventDefault();

    const form = actionDialog.querySelector("form");

    const name = form.querySelector("#task-name").value.trim();
    const listId = form.querySelector("#task-list").value;
    const status = form.querySelector("#task-status").value;
    const priority = form.querySelector("#task-priority").value;
    const startDate = form.querySelector("#task-start-date").value;
    const dueDate = form.querySelector("#task-due-date").value;
    const description = form.querySelector("#task-description").value.trim();
    const errorMsg = form.querySelector(".error-message");

    if (!name) {
        showError(errorMsg, "Enter task name");
        return;
    }

    if (!listId) {
        showError(errorMsg, "Choose task list");
        return;
    }

    if (!status) {
        showError(errorMsg, "Choose status");
        return;
    }

    if (!priority) {
        showError(errorMsg, "Choose priority");
        return;
    }

    if (!startDate) {
        showError(errorMsg, "Choose start date");
        return;
    }

    if (!dueDate) {
        showError(errorMsg, "Choose due date");
        return;
    }

    if (new Date(dueDate) < new Date(startDate)) {
        showError(errorMsg, "Due date cannot be before start date");
        return;
    }

    clearError(errorMsg);

    const newTask = {
        id: Date.now(),
        listId: Number(listId),
        name: name,
        priority: priority,
        status: status,
        startDate: startDate,
        dueDate: dueDate,
        description: description,
        createdDate: new Date().toLocaleDateString()
    };

    tasks.push(newTask);

    const selectedList = taskLists.find(list => list.id == listId);
    const taskListName = selectedList ? selectedList.name : "";

    const filteredTasks = tasks.filter(task => task.listId == listId);

    fillTasksFromList(filteredTasks, taskListName);

    closeActionDialog(event);
}

// Create Note
function createNote(event) {
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

    clearError(errorMsg);

    const newNote = {
        id: Date.now(),
        listId: Number(listId),
        name: name,
        description: description,
        createdDate: new Date().toLocaleDateString()
    };

    notes.push(newNote);

    const selectedList = noteLists.find(list => list.id == listId);
    const noteListName = selectedList ? selectedList.name : "";

    const filteredNotes = notes.filter(n => n.listId == listId);

    fillNotesFromList(filteredNotes, noteListName);

    closeActionDialog(event);
}

// Create Edit Task List
function createEditTaskList(event, create) {
    event.preventDefault();

    const form = actionDialog.querySelector("form");

    const name = form.querySelector("#task-list-name").value.trim();
    const errorMsg = form.querySelector(".error-message");

    if (!name) {
        showError(errorMsg, "Enter task list name");
        return;
    }

    clearError(errorMsg);

    // Create Path
    if (create) {

        const newTaskList = {
            id: Date.now(),
            name: name
        };

        taskLists.push(newTaskList);
    }
    // Edit Path
    else {
        const taskListID = actionDialog.dataset.id;

        const taskList = taskLists.find(l => l.id == taskListID);
        if (!taskList) return;

        taskList.name = name;
    }

    renderTaskLists(taskLists);

    closeActionDialog(event);
}




// ##########################

// render sidebar lists
renderTaskLists(taskLists);
renderNoteLists(noteLists);
// setupMainView();

function renderTaskLists(taskLists) {
    const containers = document.querySelectorAll(".sidebar .task-lists");

    containers.forEach(container => {
        container.innerHTML = "";

        taskLists.forEach(taskList => {
            const li = document.createElement("li");

            li.classList.add("task-list");
            li.dataset.type = "taskList";
            li.dataset.id = taskList.id;

            li.innerHTML = `
                <i class="fa-solid fa-list"></i>
                <p class="item-title">${taskList.name}</p>
            `;

            li.addEventListener("click", event => {
                const taskListItem = event.target.closest(".task-list");
                if (!taskListItem) return;

                taskListClick(taskListItem);
            });

            container.appendChild(li);
        });
    });
    setupMainView();
}

function renderNoteLists(noteLists) {
    const containers = document.querySelectorAll(".sidebar .note-lists");

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

                noteListClick(noteListItem);
            });

            container.appendChild(li);
        });
    });
    setupMainView();
}



// task list click
function taskListClick(taskListItem) {
    const taskListID = taskListItem.dataset.id;
    // to do bring tasks array


    const filteredTasks = tasks.filter(task => task.listId == taskListID);
    const taskListName = taskListItem.querySelector(".item-title").textContent;

    fillTasksFromList(filteredTasks, taskListName);
}

// fill tasks in main
function fillTasksFromList(tasks, taskListName) {
    const container = document.querySelector("#task-list .tasks-container");

    container.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");

        div.classList.add("task", task.priority, task.status);
        div.dataset.type = "task";
        div.dataset.id = task.id;

        div.innerHTML = `
        <div class="task-header">
        <div class="task-name-wrap">
        <i class="fa-solid fa-check task-check-icon"></i>
        <div>
        <h3 class="task-name">${task.name}</h3>
        <p class="list-of-task">${taskListName}</p>
        </div>
        </div>
        
        <div class="icons-status">
        <div>
        <i class="fa-solid fa-pencil" onclick="openEditTaskDialog(event)"></i>
        <i class="fa-regular fa-trash-can"
            onclick="openDeleteTaskDialog(event)"></i>
        </div>
        
        <span class="status"></span>
        </div>
        </div>
        
        <p class="task-start-due-date">${task.startDate} | ${task.dueDate}</p>
        `;

        div.addEventListener("click", event => {
            if (event.target.closest(".task-delete-icon, .note-delete-icon, .delete-task-btn, .delete-note-btn, .task-check-icon")) {
                return;
            }
            const taskClicked = event.target.closest(".task");
            if (!taskClicked) return;
            const taskListName = taskClicked.querySelector(".list-of-task").textContent;

            taskClick(taskClicked, taskListName);
        });

        container.appendChild(div);
    });

    setupOpenDialogs();
    setupRightSide();
}

// note list click
function noteListClick(noteListItem) {
    const noteListID = noteListItem.dataset.id;
    // bring notes from notes list id

    const filteredNotes = notes.filter(note => note.listId == noteListID);
    const noteListName = noteListItem.querySelector(".item-title").textContent;

    fillNotesFromList(filteredNotes, noteListName);
}

// fill notes in main
function fillNotesFromList(notes, noteListName) {
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
                    <i class="fa-solid fa-pencil" onclick="openEditNoteDialog(event)"></i>
                    <i class="fa-regular fa-trash-can" onclick="openDeleteNoteDialog(event)"></i>
                </div>
            </div>

            <div class="description-box">
                <p class="note-description">${note.description}</p>
            </div>
        `;

        div.addEventListener("click", event => {
            if (event.target.closest(".task-delete-icon, .note-delete-icon, .delete-task-btn, .delete-note-btn, .task-check-icon")) {
                return;
            }
            const noteClicked = event.target.closest(".note");
            if (!noteClicked) return;
            const noteListName = noteClicked.querySelector(".list-of-note").textContent;

            noteClick(noteClicked, noteListName);
        });

        container.appendChild(div);
    });

    setupOpenDialogs();
    setupRightSide();
}

// fill task in right-side window
function taskClick(taskClicked, taskListName) {
    const taskID = taskClicked.dataset.id;// هذا الاي دي حق التاسك
    // #### جيب بيانات التاسك من الاي دي
    const task = tasks.find(t => t.id == taskID); //

    // ######

    showTaskDetails(task, taskListName);
}

function showTaskDetails(task, taskListName) {
    const containers = document.querySelectorAll(".right-side .task");

    containers.forEach(container => {
        container.innerHTML = "";

        container.className = "";
        container.classList.add("task", "right-side-view", task.priority, task.status);
        container.dataset.type = "task";
        container.dataset.id = task.id;

        container.innerHTML = `
            <div class="task-header">
                <div>
                    <h2 class="task-name">${task.name}</h2>
                    <p class="list-of-task">${taskListName}</p>
                </div>
                <div class="priority-status">
                    <span class="priority"></span>
                    <span class="status"></span>
                </div>
            </div>

            <div class="task-actions">
                <i class="fa-solid fa-check check-task-icon"></i>
                <div>
                    <i class="fa-solid fa-pencil" data-dialog-target="#edit-task-dialog"></i>
                    <i class="fa-regular fa-trash-can task-delete-icon"
                        data-dialog-target="#delete-task-dialog"></i>
                </div>
            </div>

            <div class="task-details">
                <div class="task-start-due-date">${task.startDate} | ${task.dueDate}</div>

                <div class="description-box">
                    <span class="description-label">Description</span>
                    <p class="task-description">${task.description}</p>
                </div>

                <p class="task-created-date">${task.createdDate}</p>
            </div>
            `;
    });
    setupOpenDialogs();
}


// fill note in right-side window
function noteClick(noteClicked, noteListName) {
    const noteID = noteClicked.dataset.id; // هذا ال اي دي
    // من هنا حتجيب بيانات النوت
    const note = notes.find(t => t.id == noteID);

    //#########

    showNoteDetails(note, noteListName);
}

function showNoteDetails(note, noteListName) {
    const containers = document.querySelectorAll(".right-side .note");

    containers.forEach(container => {
        container.innerHTML = "";

        container.className = "";
        container.classList.add("note", "right-side-view");
        container.dataset.type = "note";
        container.dataset.id = note.id;

        container.innerHTML = `
            <div class="note-header">
                <div>
                    <h2 class="note-name">${note.name}</h2>
                    <p class="list-of-note">${noteListName}</p>
                </div>
                <div class="note-actions">
                    <i class="fa-solid fa-pencil" data-dialog-target="#edit-note-dialog"></i>
                    <i class="fa-regular fa-trash-can task-delete-icon"
                        data-dialog-target="#delete-note-dialog"></i>
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
    });
    setupOpenDialogs();
}






// ##################################### Handle Dialog Confirm Buttons  ###################################
// general errorMsg handling
// هذي الاثنين سيبها
//#########
// create






// function createEditTaskList(event, create) {
//     event.preventDefault();

//     const form = document.querySelector("#create-task-list-form");
//     const taskListNameInput = form.querySelector("#task-list-name");
//     const createBtn = event.target;
//     const errorMsg = form.querySelector(".error-message");

//     const taskListName = taskListNameInput.value.trim();

//     if (!taskListName) {
//         showError(errorMsg, "Enter task list name");
//         return;
//     }

//     clearError(errorMsg);

//     if (create) {
//         const newTaskList = {
//             id: Date.now(),
//             name: taskListName
//         };

//         taskLists.push(newTaskList);
//     } else {
//         const taskListID = form.closest("dialog").dataset.id;
//         const taskList = taskLists.find(l => l.id == taskListID);

//         if (!taskList) return;

//         taskList.name = taskListName;
//     }

//     createBtn.closest("dialog").close();
//     renderTaskLists(taskLists);
// }

// function showEditTaskList(event) {
//     const form = document.querySelector("#edit-task-list-form");
//     const taskListID = form.closest("dialog").dataset.id;
//     const taskList = taskLists.find(l => l.id == taskListID);

//     if (!taskList) return;

//     // form.innerHTML = "";

//     form.innerHTML = `
//         <h2>Edit Task List</h2>

//         <div class="task-list-name-field">
//             <label>Name</label>
//             <input id="task-list-name" type="text" name="task-list-name" value="vrdfgbdfrbf">
//         </div>

//         <div class="dialog-button-container">
//             <button class="cancel-dialog-button cancel">Cancel</button>
//             <button class="confirm-dialog-button edit" type="submit" onclick="createEditTaskList(event, false)">Edit</button>
//         </div>

//         <p class="error-message"></p>
//     `;
// }









// create task list


// // Edit task list
// function editTaskList(form) {
//     const taskListID = form.closest("dialog").dataset.id;

//     // ######## bring task list data by task list id
//     const taskList = taskLists.find(l => l.id == taskListID);

//     // ##############

//     form.innerHTML = "";

//     form.innerHTML = `
//         <h2>Edit Task List</h2>

//         <div class="task-list-name-field">
//             <label>Name</label>
//             <input id="task-list-name" type="text" name="task-list-name" value="${taskList.name}">
//         </div>

//         <div class="dialog-button-container">
//             <button class="cancel-dialog-button cancel">Cancel</button>
//             <!-- زر تعديل التاسك ليست -->
//             <button class="confirm-dialog-button edit" data-action="update" type="submit" onclick='(createEditTaskList(event, false))'>Edit
//             </button>
//         </div>
//         <p class="error-message"></p>
//     `;
//      return taskList;
// }

// create note list
function createEditNoteList(event) {
    const form = document.querySelector("#create-note-list-form");

    const noteListNameInput = form.querySelector("#note-list-name");
    const createBtn = event.target;
    const errorMsg = form.querySelector(".error-message");

    event.preventDefault();

    const noteListName = noteListNameInput.value.trim();

    // Validation
    if (!noteListName) {
        showError(errorMsg, "Enter note list name");
        return;
    }

    // if OK
    clearError(errorMsg);
    console.log("Valid name:", noteListName);

    //####### هنا ضيف النوت ليست الجديد، عندك الاسم noteListName سوي نوت ليست جديدة بهذا الاسم
    const newNoteList = {
        id: Date.now(), // simple unique id
        name: noteListName /// الاسم اللي حتضيفه
    };

    noteLists.push(newNoteList);
    ///#################

    createBtn.closest("dialog").close();
    renderNoteLists(noteLists);
}


// Delete Simple Dialogs
function deleteTask(event) {
    var taskId = event.target.closest("dialog").dataset.id;
    console.log(taskId);

}

function deleteNote(event) {
    var noteId = event.target.closest("dialog").dataset.id;
    console.log(noteId);

}

function deleteTaskList(event) {
    var taskListId = event.target.closest("dialog").dataset.id;
    console.log(taskListId);

}

function deleteNoteList(event) {
    var noteListId = event.target.closest("dialog").dataset.id;
    console.log(noteListId);

}

// Logout Simple Dialog
function logout() {
    //logout the user 
}