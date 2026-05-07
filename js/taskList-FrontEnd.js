// TaskList Local Data
// $$ خليها فاضية $$
var taskLists = [
    { id: 1, name: "Study JS" },
    { id: 35, name: "جونااااان" },
    { id: 20, name: "Gym" }
];
// $$

// $$ سوي كول للفنكشن اللي تحت
// loadTaskLists();
// $$

// $$ سوي فنكشن تجيب التاسك ليستس من الداتا بيس وتحطها في الارراي اللي فوق
function loadTaskLists() {

}
// $$

// ## Create TaskList Dialog ##
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

// ## Edit TaskList Dialog ##
function openEditTaskListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest("#task-list");
    if (!item) return;

    const id = item.dataset.id;
    const taskList = taskLists.find(l => l.id == id);
    if (!taskList) return;

    actionDialog.className = "action-dialog edit-list-dialog modal";
    actionDialog.dataset.action = "edit-task-list";
    actionDialog.dataset.id = id;

    actionDialog.innerHTML = `
            <form id="edit-task-list-form">
                <h2>Edit Task List</h2>

                <div class="task-list-name-field">
                    <label>Name</label>
                    <input id="task-list-name" type="text" value="${taskList.name}">
                </div>

                <div class="dialog-button-container">
                    <button type="button"
                        class="cancel-dialog-button cancel"
                        onclick="closeActionDialog(event)">
                        Cancel
                    </button>

                    <button type="submit"
                        class="confirm-dialog-button edit"
                        onclick="createEditTaskList(event, false)">
                        Edit
                    </button>
                </div>

                <p class="error-message"></p>
            </form>
    `;

    actionDialog.showModal();
}

// ## Delete TaskList Dialog ##
function openDeleteTaskListDialog(event) {
    event.stopPropagation();

    const item = event.target.closest("#task-list");
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
                    onclick="deleteTaskList(event)">
                    Delete
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}