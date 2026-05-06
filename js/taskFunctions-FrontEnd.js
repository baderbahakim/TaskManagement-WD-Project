// ## fill tasks in main ##
function fillTasksFromList(tasks, taskListName) {
    changeHeaderTitleType(taskListName, "/tasks");

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
            <i class="fa-solid fa-pencil edit-task-icon" onclick="openEditTaskDialog(event)"></i>
            <i class="fa-regular fa-trash-can delete-task-icon" onclick="openDeleteTaskDialog(event)"></i>
            </div>
            
            <span class="status"></span>
            </div>
            </div>
            
            <p class="task-start-due-date">${task.startDate} | ${task.dueDate}</p>
        `;

        div.addEventListener("click", event => {
            if (event.target.closest(".delete-task-icon, .edit-task-icon, .task-check-icon")) {
                return;
            }
            console.log("Reached task click istener");

            taskClick(div);
        });



        container.appendChild(div);
    });
}

// ## Task Click ##
function taskClick(taskElement) {
    const taskID = taskElement.dataset.id;

    // same task clicked while right-side already open
    if (
        rightSideStatus &&
        currentRightSideType === "task" &&
        currentRightSideId == taskID
    ) {
        currentRightSideType = null;
        currentRightSideId = null;

        toggleRightSide(false);
        return;
    }

    const task = tasks.find(t => t.id == taskID);
    if (!task) return;

    const taskList = taskLists.find(l => l.id == task.listId);
    const taskListName = taskList ? taskList.name : "";

    currentRightSideType = "task";
    currentRightSideId = taskID;

    fillRightSideTask(task, taskListName);

    toggleRightSide(true);
}

// ## Show Task Details on rightside ##
function fillRightSideTask(task, taskListName) {
    const asides = document.querySelectorAll(".right-side-aside");

    asides.forEach(aside => {
        aside.querySelector(".right-side-title").textContent = "Task";

        aside.querySelectorAll(".right-side-view").forEach(view => {
            view.remove();
        });

        const taskView = document.createElement("div");

        taskView.classList.add("task", "right-side-view", task.priority, task.status);
        taskView.dataset.type = "task";
        taskView.dataset.id = task.id;

        taskView.innerHTML = `
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
                    <i class="fa-solid fa-pencil edit-task-icon"
                       onclick="openEditTaskDialog(event)"></i>

                    <i class="fa-regular fa-trash-can delete-task-icon"
                       onclick="openDeleteTaskDialog(event)"></i>
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

        aside.appendChild(taskView);
    });
}

// ## Create / Edit Task ##
function createEditTask(event, create) {
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

    // Create Path
    if (create) {
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
    }
    // Edit Path
    else {
        const taskID = actionDialog.dataset.id;

        const task = tasks.find(t => t.id == taskID);
        if (!task) return;

        task.listId = Number(listId);
        task.name = name;
        task.priority = priority;
        task.status = status;
        task.startDate = startDate;
        task.dueDate = dueDate;
        task.description = description;
    }

    const selectedList = taskLists.find(list => list.id == listId);
    const taskListName = selectedList ? selectedList.name : "";

    const filteredTasks = tasks.filter(task => task.listId == listId);

    fillTasksFromList(filteredTasks, taskListName);

    if (currentRightSideType === "task" && currentRightSideId == actionDialog.dataset.id) {
        const updatedTask = tasks.find(t => t.id == actionDialog.dataset.id);
        if (updatedTask) {
            fillRightSideTask(updatedTask, taskListName);
        }
    }

    closeActionDialog(event);
}

// ## Delete Task ##
function deleteTask(event) {
    event.preventDefault();

    const taskId = actionDialog.dataset.id;

    const task = tasks.find(t => t.id == taskId);
    if (!task) return;

    const listId = task.listId;

    tasks = tasks.filter(t => t.id != taskId);

    const selectedList = taskLists.find(list => list.id == listId);
    const taskListName = selectedList ? selectedList.name : "";

    const filteredTasks = tasks.filter(t => t.listId == listId);

    fillTasksFromList(filteredTasks, taskListName);

    if (currentRightSideType === "task" && currentRightSideId == taskId) {
        toggleRightSide(false);
    }

    closeActionDialog(event);
}