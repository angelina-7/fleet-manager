import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { hidrate } from "./util";
import { CarEditor } from "./views/CarEditor";

const storage = new LocalStorage();
const carService = new CarService(storage);

const tbody = document.querySelector('tbody');

let currId;

start()

async function start() {
    const cars = await carService.getAll()
    hidrate(tbody, cars);

    const editor = new CarEditor(onNewRecord, onEditRecord);
    editor.displayNewForm();
    editor.displayEditForm(tbody, getCurrentRecord, deleteCurrentRecord);
}

async function onNewRecord(data) {
    await carService.create(data);
}

async function onEditRecord(data) {
    await carService.update(currId, data);
}

async function getCurrentRecord(row) {
    const car = await carService.getById(row.id);
    currId = row.id;
    return car;
}

function deleteCurrentRecord(row) {
    if (confirm("Are you sure you want to DELETE this Vehicle?")) {
        carService.delete(row.id);
    }
}