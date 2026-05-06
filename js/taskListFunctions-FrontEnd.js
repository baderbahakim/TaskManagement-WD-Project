// Render TaskLists call
renderTaskLists(taskLists);

// ## Render TaskLists ##
function renderTaskLists(taskLists) {
    const containers = document.querySelectorAll(".sidebar ul.tasks");

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

                selectSidebarItem(taskListItem);

                handleMainItemClick(taskListItem);
                taskListClick(taskListItem);
            });

            container.appendChild(li);
        });
    });
}

// ## TaskList Click ##
function taskListClick(taskListItem) {

    const taskListID = taskListItem.dataset.id;
    const taskListName = taskListItem.querySelector(".item-title").textContent;

    const main = document.querySelector("#main");

    main.innerHTML = "";

    main.innerHTML = `
        <div id="task-list" class="main-window" data-type="taskList" data-id="${taskListID}">
            <div class="task-list-header">
                <i class="fa-solid fa-plus create-task-icon" onclick="openCreateTaskDialog(event)"></i>
                <div>
                    <i class="fa-solid fa-pencil edit-task-list-icon" onclick="openEditTaskListDialog(event)"></i>
                    <i class="fa-regular fa-trash-can delete-task-list-icon" onclick="openDeleteTaskListDialog(event)"></i>
                </div>
            </div>

            <div class="tasks-container"></div>
        </div>
    `;

    const filteredTasks = tasks.filter(task => task.listId == taskListID);

    fillTasksFromList(filteredTasks, taskListName);
}

// ## Create Edit TaskList ##
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

// ## Delete Task List ##
function deleteTaskList(event) {
    event.preventDefault();

    const taskListId = actionDialog.dataset.id;

    taskLists = taskLists.filter(l => l.id != taskListId);

    tasks = tasks.filter(t => t.listId != taskListId);

    renderTaskLists(taskLists);

    document.querySelector("#task-list .tasks-container").innerHTML = "";

    closeActionDialog(event);

    viewDashboard();
}