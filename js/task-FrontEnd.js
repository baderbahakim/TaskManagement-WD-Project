// Tasks Local Data
// $$ خليها فاضية $$
var tasks = [
    { id: 1, listId: 1, name: "Learn variables", priority: "high", status: "to-do", startDate: "2026-05-01", dueDate: "2026-09-09", description: "task task task rtask task ", createdDate: "2024-05-26" },
    { id: 2, listId: 1, name: "Practice functions", priority: "low", status: "done", startDate: "2026-05-06", dueDate: "2027-05-06", description: "abc abc anc kyuf  iugf ", createdDate: "2023-08-16" },

    { id: 3, listId: 35, name: "مهمة 1", priority: "high", status: "to-do", startDate: "2026-05-06", dueDate: "2027-09-06", description: "task task task rtask task ", createdDate: "2026-04-06" },
    { id: 4, listId: 35, name: "مهمة 2", priority: "low", status: "in-progress", startDate: "2026-05-06", dueDate: "2026-07-06", description: "taskdf vfgngft rnfgn thth th ", createdDate: "2026-05-06" },

    { id: 5, listId: 20, name: "Chest workout", priority: "high", status: "in-progress", startDate: "2026-05-06", dueDate: "2026-08-26", description: "task task ger ertge rgre gre gre rtask task ", createdDate: "2026-01-06" },
    { id: 6, listId: 20, name: "Leg day", priority: "medium", status: "done", startDate: "2026-05-06", dueDate: "2026-05-16", description: "task task task rtask task ", createdDate: "2025-05-06" }
];
// $$

// $$ سوي كول للفنكشن اللي تحت
// loadTasks();
// $$

// $$ سوي فنكشن تجيب التاسكس من الداتا بيس وتحطها في الارراي اللي فوق
function loadTasks() {

}
// $$

const priorities = [
    { value: "", name: "Choose priority" },
    { value: "high", name: "High" },
    { value: "medium", name: "Medium" },
    { value: "low", name: "Low" }
];

const statuses = [
    { value: "", name: "Choose status" },
    { value: "to-do", name: "To-do" },
    { value: "in-progress", name: "In-progress" },
    { value: "done", name: "Done" }
];


// ####### Task Dialogs #######
// ## Create Task Dialog ##
function openCreateTaskDialog(event) {
    event.stopPropagation();

    const taskListElement = event.target.closest("#task-list");
    const selectedListId = taskListElement ? taskListElement.dataset.id : "";

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
                    <button class="confirm-dialog-button create" type="submit" onclick="createEditTask(event, true)">Create</button>
                </div>

                <p class="error-message"></p>
            </form>
    `;
    var taskListSelect = actionDialog.querySelector("#task-list");
    taskListSelect.value = String(selectedListId);
    taskListSelect.disabled = true;

    actionDialog.showModal();
}

// ## Edit Task Dialog ##
function openEditTaskDialog(event) {
    event.stopPropagation();

    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const taskID = taskElement.dataset.id;
    const task = tasks.find(t => t.id == taskID);
    if (!task) return;

    actionDialog.className = "create-dialog modal";
    actionDialog.dataset.action = "edit-task";
    actionDialog.dataset.id = taskID;

    actionDialog.innerHTML = `
        <form id="create-task-form" action="">
            <h2>Edit Task</h2>

            <div class="row">
                <div class="field">
                    <label>Name</label>
                    <input id="task-name" type="text" name="task-name" value="${task.name}">
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
                    <input id="task-start-date" type="date" name="task-start-date" value="${task.startDate}">
                </div>

                <div class="field">
                    <label>Due Date</label>
                    <input id="task-due-date" type="date" name="task-due-date" value="${task.dueDate}">
                </div>
            </div>

            <label>Description</label>
            <textarea id="task-description" name="task-description">${task.description}</textarea>

            <div class="dialog-button-container">
                <button class="cancel-dialog-button cancel" type="button" onclick="closeActionDialog(event)">Cancel</button>
                <button class="confirm-dialog-button edit" type="submit" onclick="createEditTask(event, false)">Edit</button>
            </div>

            <p class="error-message"></p>
        </form>
    `;

    actionDialog.querySelector("#task-list").value = String(task.listId);
    actionDialog.querySelector("#task-status").value = task.status;
    actionDialog.querySelector("#task-priority").value = task.priority;

    actionDialog.showModal();
}

// ## Delete Task Dialog ##
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
                    onclick="deleteTask(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

