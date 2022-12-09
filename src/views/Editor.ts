export type CallbackFn = (data: object) => any

export abstract class Editor {
    protected newBtn: HTMLButtonElement;
    protected newForm: HTMLFormElement;
    protected editForm: HTMLFormElement;
    protected onNew: CallbackFn;
    protected onEdit: CallbackFn;

    constructor(newBtnId: string, newFormId: string,  editFormId: string, onNew: CallbackFn, onEdit: CallbackFn) {
        this.newBtn = document.querySelector(newBtnId);
        this.onNew = onNew;
        this.onEdit = onEdit;

        this.newForm = document.getElementById(newFormId) as HTMLFormElement;
        this.newForm.addEventListener('submit', this.onSubmit.bind(this));
        this.newForm.addEventListener('reset', this.onCancel.bind(this));

        this.editForm = document.getElementById(editFormId) as HTMLFormElement;
        this.editForm.addEventListener('submit', this.onSubmit.bind(this));
        this.editForm.addEventListener('reset', this.onCancel.bind(this));
    }

    displayNewForm() {
        this.newBtn.addEventListener('click', () => {
            this.newForm.parentElement.style.display = "block";
            this.newBtn.parentElement.style.display = "none";
        });
    }

    displayEditForm(tbody, getRecord, deleteRecord) {
        tbody.addEventListener('click', (event) => {
            if (event.target.tagName == 'BUTTON') {
                const row = event.target.parentElement.parentElement;
                if (event.target.classList.contains('edit')) {
                    this.editRow(row, getRecord);
                } else if (event.target.classList.contains('delete')) {
                    this.deleteRow(row, deleteRecord);
                }
            }
        });
    }

    deleteRow(row, deleteRecord){
        deleteRecord(row);
        this.editForm.parentElement.style.display = "none";
        this.newForm.parentElement.style.display = "none";
        this.newBtn.parentElement.style.display = "block";
        row.remove()
    }

    protected abstract editRow(row, getRecord)

    private onSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (Object.values(data).every(x => x)) {
            if (event.target === this.newForm){
                this.onNew(data);
            } else {
                this.onEdit(data);
            }
        }
    }

    private onCancel(event) {
        event.target.reset();
        event.target.parentElement.style.display = "none";
        this.newBtn.parentElement.style.display = "block";
    }

}