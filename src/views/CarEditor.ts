import { CallbackFn, Editor } from "./Editor";

const NEW_BTN = '.new';
const NEW_FORM = 'new-car';
const EDIT_FORM = 'edit-car';

export class CarEditor extends Editor {

    constructor(onNew: CallbackFn, onEdit: CallbackFn) {
        super(NEW_BTN, NEW_FORM, EDIT_FORM, onNew, onEdit);
    }

    protected async editRow(row, getRecord) {
        this.editForm.parentElement.style.display = "block";
        this.newBtn.parentElement.style.display = "none";

        const record = await getRecord(row);
        console.log(record);

        (this.editForm.querySelector('[name="make"]') as HTMLInputElement).value = record.make;
        (this.editForm.querySelector('[name="model"]') as HTMLInputElement).value = record.model;
        (this.editForm.querySelector('[name="rentalPrice"]') as HTMLInputElement).value = record.rentalPrice;
        (this.editForm.querySelector('[name="bodyType"]') as HTMLSelectElement).value = record.bodyType.toLowerCase();
        (this.editForm.querySelector('[name="numberOfSeats"]') as HTMLInputElement).value = record.numberOfSeats.toString();
        (this.editForm.querySelector('[name="transmission"]') as HTMLSelectElement).value = record.transmission.toLowerCase();

    }
}


