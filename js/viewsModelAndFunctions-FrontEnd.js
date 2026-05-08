// Views Local Place
const views = [
    { name: "Today" , iconClass: "fa-solid fa-calendar-day" },
    { name: "Kanban" , iconClass: "fa-brands fa-trello" },
    { name: "Completed" , iconClass: "fa-regular fa-calendar-check" }
];
// Render Views on sidebar call
renderViews(views);

// View Dashboard call, with the chosen dashboard
viewChosenDashboard();

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

function viewChosenDashboard() {
    const chosenView = "Kanban";

    const view = views.find(v => v.name === chosenView);
    if (!view) return;

    
    const viewItem = document.querySelector(
        `.sidebar li.view[data-name="${chosenView}"]`
    );
    
    fillTasksFromView(viewItem);

    if (viewItem) {
        selectSidebarItem(viewItem);
        handleMainItemClick(viewItem);
    }
}

// view click
function viewClick(event) {
    const viewItem = event.target.closest(".view");
    if (!viewItem) return;

    selectSidebarItem(viewItem);

    handleMainItemClick(viewItem);

    fillTasksFromView(viewItem);
}

function fillTasksFromView(viewItem) {

    const viewItemIcon = viewItem.querySelector("i").className;
    const viewItemName = viewItem.querySelector(".item-title").textContent;
    const viewName = viewItem.dataset.name;
    
    changeHeaderIconTitleType(viewItemIcon, viewItemName, "/views");

    const view = views.find(v => v.name == viewName);
    if (!view) return;

    if (view.name === "Today") {
        const main = document.querySelector("#main");

        main.innerHTML = `
        <h2>Dashboard Will Be Here</h2>
        `;
        return;
    }

    if (view.name === "Kanban") {
        renderKanbanView();
        return;
    }

    if (view.name === "Completed") {
        renderCompletedView();
        return;
    }

}

