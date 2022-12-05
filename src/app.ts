import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { Vehicle } from "./data/models";
import { TruckService } from "./data/TruckService";
import { hidrate } from "./util";

const storage = new LocalStorage();
const carService = new CarService(storage);
const truckService = new TruckService(storage);

const tbody = document.querySelector('tbody');

start()

async function start(){
    // const cars = await carService.getAll();
    // const trucks = await truckService.getAll();
    // const vehicles: Vehicle[] = [...cars, ...trucks];
    // hidrate(tbody, vehicles);
}