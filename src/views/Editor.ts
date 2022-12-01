type CallbackFn = (data: object) => any 

export class Editor {
    private newBtn: HTMLButtonElement;
    private form: HTMLFormElement;
    private callback: CallbackFn;

    constructor(startingPoint: string, formId: string, callback: CallbackFn) {
        this.callback = callback;
        this.newBtn = document.querySelector(startingPoint);
        this.form = document.getElementById(formId) as HTMLFormElement;
        this.form.addEventListener('submit', this.onSubmit.bind(this))
    }

    displayForm() {
        this.newBtn.addEventListener('click', () => {
            this.form.parentElement.style.display = "block";
            this.newBtn.parentElement.style.display = "none";
        });
    }

    private onSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        this.callback(data);

        this.form.reset();
    }


}