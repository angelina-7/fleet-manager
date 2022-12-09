import { LocalStorage } from "./data/LocalStorage";
import { CarService } from "./data/CarService";
import { TruckService } from "./data/TruckService";
import { Vehicle } from "./data/models";
import { hidrate } from "./util";

const storage = new LocalStorage();
const carService = new CarService(storage);
const truckService = new TruckService(storage);

const tbody = document.querySelector('tbody');

start()

async function start(){
    const cars = await carService.getAll();
    const trucks = await truckService.getAll();
    const vehicles = sort([...cars, ...trucks]);
    hidrate(tbody, vehicles, true);
}

function sort(vehicles: Vehicle[]): Vehicle[] {
    return vehicles.sort((a,b) => a.make.charCodeAt(0) - b.make.charCodeAt(0));
}