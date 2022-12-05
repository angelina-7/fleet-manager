import { Record, RecordId } from "./Storage";

export enum CarBodyType {
    sedan = 'Sedan',
    suv = 'SUV',
    hatchback = 'Hatchback'
}

export enum TruckCargoType {
    box = 'Box',
    flatbed = 'Flatbed',
    van = 'Van'
}

export enum Transmission {
    manual = 'Manual',
    automatic = 'Automatic'
}

export abstract class Vehicle implements Record{
    constructor(
        public id: RecordId,
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: string | null,
    ) { }
}

export class Car extends Vehicle {
    constructor(
        id: RecordId,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        public bodyType: CarBodyType,
        public numberOfSeats: number,
        public transmission: Transmission,
    ) {
        super(id, make, model, rentalPrice, rentedTo);
    }
}

export class Truck extends Vehicle {
    constructor(
        id: RecordId,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        public cargoType: TruckCargoType,
        public capacity: number,
    ) {
        super(id, make, model, rentalPrice, rentedTo);
    }
}
