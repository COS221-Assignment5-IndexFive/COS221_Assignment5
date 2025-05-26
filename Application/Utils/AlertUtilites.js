export class AlertUtilities {
    constructor(alertEl, itemName = "") {
        this.alertEl = alertEl;
        switch (alertEl.id) {
            case "add-success":
                this.message = "Added " + itemName;
                break;
            case "add-error":
                this.message = "Failed to add " + itemName;
                break;
            case "delete-confirm":
                var pMessage = document.createElement("p");
                pMessage.innerText = "Are you sure you want to delete " + itemName + "?";
                this.alertEl.prepend(pMessage);
                return;
            case "delete-success":
                this.message = "Deleted " + itemName;
                break;
            case "delete-error":
                this.message = "Failed to delete " + itemName;
                break;
            case "update-success":
                this.message = "Successfully Updated " + itemName;
                break;
            case "update-error":
                this.message = "Failed to update " + itemName;
                break;
        }
        alertEl.innerHTML = "";
        var messageSpan = document.createElement("span");
        messageSpan.innerHTML = this.message;
        this.alertEl.appendChild(messageSpan);
    }

    dismissAlert(duration = 3000) {
        setTimeout(() => {
            this.alertEl.style.animation = 'fadeOut 0.5s forwards';

            this.alertEl.addEventListener('animationend', () => {
                this.alertEl.classList.add('hidden');
                this.alertEl.classList.remove('visible');
                this.alertEl.style.animation = '';
            }, { once: true });

        }, duration);
    }

    showAlert() {
        this.alertEl.classList.remove("hidden");
        this.alertEl.classList.add("visible");
    }

    showAndDismissAlert() {
        this.showAlert();
        this.dismissAlert();
    }
}