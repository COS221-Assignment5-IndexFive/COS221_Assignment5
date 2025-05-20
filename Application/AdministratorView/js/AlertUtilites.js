export class AlertUtilities {
    constructor(alertEl, message="Alert") {
        this.alertEl = alertEl;
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