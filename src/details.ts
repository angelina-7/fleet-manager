import { LocalStorage } from "./data/LocalStorage";
import { CarService } from "./data/CarService";
import { TruckService } from "./data/TruckService";
import { Car, Vehicle } from "./data/models";

let url = document.location.href;
let [type, currId] = url.split('?')[1].split('=');

const storage = new LocalStorage();
const carService = new CarService(storage);
const truckService = new TruckService(storage);

start();

async function start() {
    let vehicle;
    if (type == 'Car') {
        vehicle = await carService.getById(currId);
    } else if (type == 'Truck') {
        vehicle = await truckService.getById(currId);
    }

    fillData(vehicle);
}

function fillData(vehicle: Vehicle) {
    const makeEl = document.querySelector('h3');
    makeEl.textContent = `${vehicle.make} ${vehicle.model}`

    const listOfEl = document.getElementsByTagName('strong');

    listOfEl[0].textContent = vehicle.id;
    if (vehicle instanceof Car) {
        listOfEl[1].textContent = vehicle.bodyType;
        listOfEl[2].textContent = vehicle.numberOfSeats.toString();
        listOfEl[3].textContent = vehicle.transmission;
    }
    listOfEl[4].textContent = `\$${vehicle.rentalPrice}/day`
    if (vehicle.rentedTo) {
        listOfEl[5].textContent = 'Rented';
        listOfEl[6].textContent = vehicle.rentedTo;
    } else {
        listOfEl[5].textContent = 'Available';
        listOfEl[6].parentElement.style.display = 'none'
    }


}