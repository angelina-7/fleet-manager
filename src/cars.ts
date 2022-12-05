import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { ADD_NEW_BTN, hidrate } from "./util";
import { Editor } from "./views/Editor";

const storage = new LocalStorage();
const carService = new CarService(storage);

const tbody = document.querySelector('tbody');

const newCarForm = new Editor(ADD_NEW_BTN, 'new-car', onSubmit);
newCarForm.displayForm();

start()

async function start(){
    const cars = await carService.getAll()
    hidrate(tbody, cars);
}

async function onSubmit(data) {
    await carService.create(data);
}