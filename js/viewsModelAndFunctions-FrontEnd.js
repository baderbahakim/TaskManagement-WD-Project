// Views Local Place
const views = [
    { name: "Today" , iconClass: "fa-solid fa-calendar-day" },
    { name: "Kanban" , iconClass: "fa-brands fa-trello" },
    { name: "Completed" , iconClass: "fa-regular fa-calendar-check" }
];

// Render Views on sidebar call
renderViews(views);

// View the default dashboard call
viewChosenDashboard();

// View the default dashboard
function viewChosenDashboard() {
    // The default dashboard (you can change it)
    const chosenView = "Kanban";

    const view = views.find(v => v.name === chosenView);
    if (!view) return;

    // Query the default dashboard list item
    const viewItem = document.querySelector(
        `.sidebar li.view[data-name="${chosenView}"]`
    );
    
    // Fill the tasks of the default dashboard call
    fillTasksFromView(viewItem);

    if (viewItem) {
        // Make the default dashboard list item selected call
        selectSidebarItem(viewItem);

        // Close rightside when switching to different sidebar item call
        handleMainItemClick(viewItem);
    }
}

// Render Views on sidebar
function renderViews(views) {
    const containers = document.querySelectorAll(".sidebar ul.views");

    containers.forEach(container => {
        container.innerHTML = "";

        views.forEach(view => {
            const li = document.createElement("li");

            li.classList.add("view");
            li.dataset.type = "view";
            li.dataset.name = view.name;

            li.innerHTML = `
                <i class="${view.iconClass}"></i>
                <p class="item-title">${view.name}</p>
            `;

            li.addEventListener("click", viewClick);

            container.appendChild(li);
        });
    });
}

// view list item click
function viewClick(event) {
    const viewItem = event.target.closest(".view");
    if (!viewItem) return;

    // Change selected item to the clicked view
    selectSidebarItem(viewItem);

    // Close rightside when switching to different sidebar item
    handleMainItemClick(viewItem);

    // Fill the tasks of the selected view call
    fillTasksFromView(viewItem);
}

// Fill the tasks of the selected view
function fillTasksFromView(viewItem) {

    const viewItemIcon = viewItem.querySelector("i").className;
    const viewItemName = viewItem.querySelector(".item-title").textContent;
    const viewName = viewItem.dataset.name;
    
    // Change header icon, title, and type for the clicked sidebar item
    changeHeaderIconTitleType(viewItemIcon, viewItemName, "/views");

    const view = views.find(v => v.name == viewName);
    if (!view) return;

    // Call the function that fetches tasks for the clicked view
    if (view.name === "Today") {
        const main = document.querySelector("#main");

        main.innerHTML = `
        <h2>Today view is Work In Progress</h2>
        `;
        return;
    }

    if (view.name === "Kanban") {
        // Fill tasks in kanban view call
        fillTasksKanbanView();
        return;
    }

    if (view.name === "Completed") {
        // Fill tasks in completed view call
        fillTasksCompletedView();
        return;
    }

}

