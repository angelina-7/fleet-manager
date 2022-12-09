import { LocalStorage } from "./data/LocalStorage";
import { TruckService } from "./data/TruckService";
import { hidrate } from "./util";
import { TruckEditor } from "./views/TruckEditor";

const storage = new LocalStorage();
const truckService = new TruckService(storage);

const tbody = document.querySelector('tbody');

let currId;

start()

async function start() {
    const trucks = await truckService.getAll()
    hidrate(tbody, trucks);

    const editor = new TruckEditor(onNewRecord, onEditRecord);
    editor.displayNewForm();
    editor.displayEditForm(tbody, getCurrentRecord, deleteCurrentRecord);
}

async function onNewRecord(data) {
    await truckService.create(data)
}

async function onEditRecord(data) {
    await truckService.update(currId, data);
}

async function getCurrentRecord(row) {
    const car = await truckService.getById(row.id);
    currId = row.id;
    return car;
}

function deleteCurrentRecord(row) {
    if (confirm("Are you sure you want to DELETE this Truck?")) {
        truckService.delete(row.id);
    }
}