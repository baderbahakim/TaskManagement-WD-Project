// ## fill tasks in main ##
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
            <i class="fa-solid fa-check task-check-icon" onclick="toggleTaskCompleted(event)"></i>
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
            // Exclude icons on task card to not call taskClick()
            if (event.target.closest(".delete-task-icon, .edit-task-icon, .task-check-icon, .task-uncomplete-icon")) {
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

    // Close rightside if open and if viewed task in rightside is same as clicked task
    if (
        rightSideStatus &&
        currentRightSideType === "task" &&
        currentRightSideId == taskID
    ) {
        currentRightSideType = null;
        currentRightSideId = null;

        // Close rightside
        toggleRightSide(false);
        return;
    }

    const task = tasks.find(t => t.id == taskID);
    if (!task) return;

    const taskList = taskLists.find(l => l.id == task.listId);
    const taskListName = taskList ? taskList.name : "";

    // Change rightside type and ID
    currentRightSideType = "task";
    currentRightSideId = taskID;

    // Show task details in rightside call
    fillRightSideTask(task, taskListName);

    // Open rightside call
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
                ${task.completed
                ? `<i class="fa-solid fa-rotate-left task-uncomplete-icon" onclick="toggleTaskCompleted(event)"></i>`
                : `<i class="fa-solid fa-check task-check-icon" onclick="toggleTaskCompleted(event)"></i>`
            }

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
    const listId = form.querySelector("#task-list").value; // %% استخدم هذا الاي دي حق التاسك ليست لما تسوي تاسك
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
        // $$ صنع التاسك
        // %% الاي دي حق التاسك ليست موجود فوق
        const newTask = {
            id: Date.now(), // %% ما راح تستخدم هذا الاي دي أحذف هذا السطر
            listId: Number(listId),
            name: name,
            priority: priority,
            status: status,
            completed: false,
            startDate: startDate,
            dueDate: dueDate,
            description: description,
            createdDate: new Date().toLocaleDateString()
        };

        tasks.push(newTask);
        // $$

        // Check mainType if taskList to change, if view not change it, call
        refreshCurrentView();
    }
    // Edit Path
    else {
        const taskID = actionDialog.dataset.id; // %% الاي دي حق التاسك

        const task = tasks.find(t => t.id == taskID);
        if (!task) return;

        // $$ تعديل التاسك
        // %% اي دي التاسك فوق
        task.listId = Number(listId);
        task.name = name;
        task.priority = priority;
        task.status = status;
        task.startDate = startDate;
        task.dueDate = dueDate;
        task.description = description;
        // $$

        // Check if task edited from a taskList view to change the view
        if (mainType === "taskList") {
            const newListItem = document.querySelector(
                `.sidebar .task-list[data-id="${task.listId}"]`
            );

            if (newListItem) {
                // Change selected sidebar taskList to the new taskList
                selectSidebarItem(newListItem);

                // Check if tasklist is edited to close rightside
                handleMainItemClick(newListItem);

                // Change tasklist selected to the new edited to tasklist if task viewed on rightside
                taskListClick(newListItem);
            }
            // Task is edited from a Dashboard view
        } else {
            // Check mainType to change it or not call
            refreshCurrentView();
        }

        // Check if edited task is the one viewed on the rightside or not, to update it
        if (currentRightSideType === "task" && currentRightSideId == taskID) {
            const taskList = taskLists.find(list => list.id == task.listId);
            const taskListName = taskList ? taskList.name : "";

            // Show task details on rightside (Update)
            fillRightSideTask(task, taskListName);
        }
    }

    closeActionDialog(event);
}

// Toggle Task Complete
function toggleTaskCompleted(event) {
    event.stopPropagation();

    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const taskId = taskElement.dataset.id; // %% استخدم هذا الاي دي

    const task = tasks.find(t => t.id == taskId);
    if (!task) return;

    // $$ تعديل الكومبليت للتاسك
    // %% استخدم التاسك اي دي اللي فوق
    // %% سوي toggle لل complete


    task.completed = !task.completed;
    // $$

    // If the task complete status was toggled it will stay on the same view (tasklist or completed) and update the tasks viewed
    refreshCurrentView();

    // If the task completed or uncompleted is viewed on the rightside, close rightside
    if (currentRightSideType === "task" && currentRightSideId == taskId) {
        const taskList = taskLists.find(list => list.id == task.listId);
        const taskListName = taskList ? taskList.name : "";

        // Close rightside
        toggleRightSide(false);
    }
}

// ## Delete Task ##
function deleteTask(event) {
    event.preventDefault();

    const taskId = actionDialog.dataset.id; // %% استخدم هذا الاي دي

    const task = tasks.find(t => t.id == taskId);
    if (!task) return;

    // $$ حذف التاسك
    // %% اي دي التاسك فوق
    tasks = tasks.filter(t => t.id != taskId);
    // $$

    // Check mainType to change it or not call
    refreshCurrentView();

    // Check if deleted task is the one viewed on the rightside or not, to close it
    if (currentRightSideType === "task" && currentRightSideId == taskId) {
        toggleRightSide(false);
    }

    closeActionDialog(event);
}