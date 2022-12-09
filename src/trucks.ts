import { LocalStorage } from "./data/LocalStorage";
import { TruckService } from "./data/TruckService";
import { hidrate } from "./util";
import { Editor } from "./views/Editor";

const storage = new LocalStorage();
const truckService = new TruckService(storage);

const tbody = document.querySelector('tbody');

// const newTruckForm = new Editor(ADD_NEW_BTN, 'new-truck', onSubmit);
// newTruckForm.displayForm();

start()

async function start() {
    const trucks = await truckService.getAll()
    hidrate(tbody, trucks);
}

async function onSubmit(data) {
    await truckService.create(data)
}