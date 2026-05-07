// Render Kanban view
function renderKanbanView(tasks) {
    const main = document.querySelector("#main");

    main.innerHTML = `
        <div id="kanban-view" class="main-window">
            <section class="kanban-container">
                <div class="kanban-column" data-status="to-do">
                    <h2>To-Do</h2>
                    <div class="kanban-tasks"></div>
                </div>

                <div class="kanban-column" data-status="in-progress">
                    <h2>In-Progress</h2>
                    <div class="kanban-tasks"></div>
                </div>

                <div class="kanban-column" data-status="done">
                    <h2>Done</h2>
                    <div class="kanban-tasks"></div>
                </div>
            </section>
        </div>
    `;

    tasks.forEach(task => {
        const column = document.querySelector(
            `.kanban-column[data-status="${task.status}"] .kanban-tasks`
        );

        if (!column) return;

        const taskList = taskLists.find(list => list.id == task.listId);
        const taskListName = taskList ? taskList.name : "";

        const card = document.createElement("div");

        card.classList.add("task", task.priority, task.status);
        card.dataset.type = "task";
        card.dataset.id = task.id;

        card.innerHTML = `
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
                    <i class="fa-solid fa-pencil edit-task-icon"
                       onclick="openEditTaskDialog(event)"></i>

                    <i class="fa-regular fa-trash-can delete-task-icon"
                       onclick="openDeleteTaskDialog(event)"></i>
                </div>
            </div>
        </div>

        <p class="task-start-due-date">${task.startDate} | ${task.dueDate}</p>
    `;

        card.addEventListener("click", event => {
            if (event.target.closest(".delete-task-icon, .edit-task-icon, .task-check-icon")) {
                return;
            }

            taskClick(card);
        });

        column.appendChild(card);
    });
}