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
        <i class="fa-solid fa-pencil" data-dialog-target="#edit-task-dialog"></i>
        <i class="fa-regular fa-trash-can task-delete-icon"
        data-dialog-target="#delete-task-dialog"></i>
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
                    <i class="fa-solid fa-pencil" data-dialog-target="#edit-note-dialog"></i>
                    <i class="fa-regular fa-trash-can note-delete-icon"
                        data-dialog-target="#delete-note-dialog"></i>
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
function showError(errorMsg, message) {
    errorMsg.textContent = message;
    errorMsg.classList.add("error");
}

function clearError(errorMsg) {
    errorMsg.textContent = "";
    errorMsg.classList.remove("error");
    console.log("error cleared");

}
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
function createEditTaskList(event, create) {
    const form = document.querySelector("#create-task-list-form");

    if(!create) {
        var taskList = editTaskList(form);
    }

    const taskListNameInput = form.querySelector("#task-list-name");
    const createBtn = event.target;
    const errorMsg = form.querySelector(".error-message");

    event.preventDefault();

    const taskListName = taskListNameInput.value.trim();

    // Validation
    if (!taskListName) {
        showError(errorMsg, "Enter task list name");
        return;
    }

    // if OK
    clearError(errorMsg);
    console.log("Valid name:", taskListName);

    if (create) {
        //####### هنا ضيف التاسك ليست الجديدة
        const newTaskList = {
            id: Date.now(), // simple unique id
            name: taskListName // هذا الاسم اللي حتضيفه
        };
        
        taskLists.push(newTaskList);
        // #########
    }
    // else {
    //     //####### 
    //     taskList.name = taskListName;

    // }

    createBtn.closest("dialog").close();
    renderTaskLists(taskLists);
}

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