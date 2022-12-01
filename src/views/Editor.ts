export class Editor {
    private newBtn: HTMLButtonElement;
    private form: HTMLFormElement;

    constructor(startingPoint: string, formId: string) {
        this.newBtn = document.querySelector(startingPoint);
        this.form = document.getElementById(formId) as HTMLFormElement;
    }

    displayForm() {
        this.newBtn.addEventListener('click', () => {
            this.form.style.display = "block";
            this.newBtn.parentElement.style.display = "none";
        });
    }

}