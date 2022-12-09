import { Car, Truck } from "../data/models";

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
        this.form.addEventListener('reset', this.onCancel.bind(this))
    }

    displayForm() {
        this.newBtn.addEventListener('click', () => {
            this.form.parentElement.style.display = "block";
            this.newBtn.parentElement.style.display = "none";
        });
    }

    displayEditForm(tbody, getRecord, deleteRow) {
        tbody.addEventListener('click', (event) => {
            if (event.target.tagName == 'BUTTON') {
                const row = event.target.parentElement.parentElement;
                if (event.target.classList.contains('edit')) {
                    this.editRow(row, getRecord);
                } else if (event.target.classList.contains('delete')) {
                    deleteRow(row);
                }
            }
            this.form.parentElement.style.display = "block";
            this.newBtn.parentElement.style.display = "none";
        });
    }

    private async editRow(row, getRecord){
        const record = await getRecord(row);
        console.log(record);
        
        (this.form.querySelector('[name="make"]') as HTMLInputElement).value = record.make;
        (this.form.querySelector('[name="model"]') as HTMLInputElement).value = record.model;
        (this.form.querySelector('[name="rentalPrice"]') as HTMLInputElement).value = record.rentalPrice;

        if(record instanceof Car){
            (this.form.querySelector('[name="bodyType"]') as HTMLSelectElement).value = record.bodyType.toLowerCase();
            (this.form.querySelector('[name="numberOfSeats"]') as HTMLInputElement).value = record.numberOfSeats.toString();
            (this.form.querySelector('[name="transmission"]') as HTMLSelectElement).value = record.transmission.toLowerCase();
        }else if (record instanceof Truck) {
            (this.form.querySelector('[name="cargoType"]') as HTMLSelectElement).value = record.cargoType.toLowerCase();
            (this.form.querySelector('[name="capacity"]') as HTMLInputElement).value = record.capacity.toString();
        }
    }

    private onSubmit(event: SubmitEvent) {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        if (Object.values(data).every(x => x)) {
            this.callback(data);
        }
    }

    private onCancel() {
        this.form.reset();
        this.form.parentElement.style.display = "none";
        this.newBtn.parentElement.style.display = "block";
    }


}