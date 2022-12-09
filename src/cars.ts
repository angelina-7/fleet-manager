import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { ADD_NEW_BTN, hidrate } from "./util";
import { Editor } from "./views/Editor";

const storage = new LocalStorage();
const carService = new CarService(storage);

const tbody = document.querySelector('tbody');

let currId;

start()

async function start() {
    const cars = await carService.getAll()
    hidrate(tbody, cars);

    const newCarForm = new Editor(ADD_NEW_BTN, 'new-car', onNewRecord);
    newCarForm.displayForm();

    const editCarForm = new Editor(ADD_NEW_BTN, 'edit-car', onEditRecord);
    editCarForm.displayEditForm(tbody, editRow, deleteRow);
}

async function onNewRecord(data) {
    await carService.create(data);
}

async function onEditRecord(data) {
    await carService.update(currId, data);
}

async function editRow(row) {
    const car = await carService.getById(row.id);
    currId = row.id;
    return car;
}

function deleteRow(row) {
    if (confirm("Are you sure you want to DELETE this Vehicle?")) {
        carService.delete(row.id);
        row.remove();
    }
}