import { Record, RecordId } from "./Storage";

export enum CarBodyType {
    Sedan = 'sedan',
    SUV = 'suv',
    Hatchback = 'hatchback'
}

export enum TruckCargoType {
    Box = 'box',
    Flatbed = 'flatbed',
    Van = 'van'
}

export enum Transmision {
    Manual = 'manual',
    Automatic = 'automatic'
}

export abstract class Vehicle {
    constructor(
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: string | null,
    ) { }
}

export class Car extends Vehicle {
    constructor(
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        public bodyType: CarBodyType,
        public numberOfSeats: number,
        public transmission: Transmision,
    ) {
        super(make, model, rentalPrice, rentedTo);
    }
}

export class CarRecord extends Car implements Record {
    constructor(
        public id: RecordId,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        bodyType: CarBodyType,
        numberOfSeats: number,
        transmission: Transmision,
    ) {
        super(make, model, rentalPrice, rentedTo, bodyType, numberOfSeats, transmission);
    }

}

export class Truck extends Vehicle {
    constructor(
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        public cargoType: TruckCargoType,
        public capacity: number,
    ) {
        super(make, model, rentalPrice, rentedTo);
    }
}

export class TruckRecord extends Truck implements Record {
    constructor(
        public id: RecordId,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string | null,
        cargoType: TruckCargoType,
        capacity: number,
    ) {
        super(make, model, rentalPrice, rentedTo, cargoType, capacity);
    }
}

