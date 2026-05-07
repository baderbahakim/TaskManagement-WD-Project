// Views Local Place
const views = [
    { name: "Today" },
    { name: "Kanban" },
]

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
                <i class="fa-solid fa-bars"></i>
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

    renderView(view);

    const viewItem = document.querySelector(
        `.sidebar li.view[data-name="${chosenView}"]`
    );

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

    const viewName = viewItem.dataset.name;
    const view = views.find(v => v.name == viewName);
    if (!view) return;

    renderView(view);
}

function renderView(view) {
    changeHeaderTitleType(view.name, "/views");

    if (view.name === "Kanban") {
        renderKanbanView(tasks);
        return;
    }

    if (view.name === "Today") {
        const main = document.querySelector("#main");
        main.innerHTML = `
        <h2>Dashboard Will Be Here</h2>
        `;
    }
}

