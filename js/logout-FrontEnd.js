// ## Logout Dialog ##
function openLogoutDialog(event) {
    event.stopPropagation();

    actionDialog.className = "simple-dialog modal";
    actionDialog.dataset.action = "logout";

    actionDialog.innerHTML = `
        <form id="logout-form">
            <h2 class="simple-dialog-message">Log out?</h2>

            <div class="dialog-button-container">
                <button type="button" class="cancel-dialog-button cancel"
                    onclick="closeActionDialog(event)">
                    Cancel
                </button>

                <button type="submit" class="confirm-dialog-button logout"
                    onclick="confirmLogout(event)">
                    Log out
                </button>
            </div>
        </form>
    `;

    actionDialog.showModal();
}

// ## Logout User ##
function confirmLogout(event) {
    // سوي اللوق اوت هنا

}