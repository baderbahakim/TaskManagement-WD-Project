// Views Local Place
const views = [
    { name: "Today" },
    { name: "Kanban" },
]

// Render Views call
renderViews(views);

// View Dashboard call
viewDashboard();

// ## View a certain view in main ##
function viewDashboard() {
    // View Chosen as Dashboard
    viewClick(views.find(v => v.name == "Today"));
    var viewItem = document.querySelector(`.sidebar li[data-name="Today"]`);
    selectSidebarItem(viewItem);
}

// Render Views
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

            li.addEventListener("click", event => {
                const viewItem = event.target.closest(".view");
                if (!viewItem) return;

                const viewName = viewItem.querySelector(".item-title").textContent;
                const viewItemShow = views.find(v => v.name == viewName);

                selectSidebarItem(viewItem);

                handleMainItemClick(viewItem);

                viewClick(viewItemShow);
            });

            container.appendChild(li);
        });
    });
}

// view click
function viewClick(viewItem) {
    const viewName = viewItem.name;

    changeHeaderTitleType(viewName, "/views");

    const main = document.querySelector("#main");

    main.innerHTML = "";

    main.innerHTML = `${viewName}
    <h2>Dashboard Will Be Here</h2>
    `;
}