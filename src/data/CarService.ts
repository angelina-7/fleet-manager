import { Car, CarBodyType, Transmission } from "./models";
import { DataService } from "./Service";
import { Record } from "./Storage";

type CarData = {
    make: string,
    model: string,
    rentalPrice: number,
    bodyType: CarBodyType,
    numberOfSeats: number,
    transmission: Transmission,
}

export class CarService extends DataService<Car, CarData>{
    protected name = 'car';

    protected validate(data: CarData): void {
        if (typeof data.make != 'string') {
            throw new TypeError('Invalid data for "make"')
        }
        if (typeof data.model != 'string') {
            throw new TypeError('Invalid data for "model"')
        }
        if (isNaN(data.rentalPrice)) {
            throw new TypeError('Invalid data for "rental price"')
        }
        if (typeof data.bodyType != 'string' || (data.bodyType != CarBodyType.hatchback.toLowerCase() && data.bodyType != CarBodyType.suv.toLowerCase() && data.bodyType != CarBodyType.sedan.toLowerCase())) {
            throw new TypeError('Invalid data for "body type"')
        }
        if (isNaN(data.numberOfSeats) || data.numberOfSeats > 8) {
            throw new TypeError('Invalid data for "number of seats"')
        }
        if (typeof data.transmission != 'string' || (data.transmission != Transmission.automatic.toLowerCase() && data.transmission != Transmission.manual.toLowerCase())) {
            throw new TypeError('Invalid data for "transmission"')
        }
    }

    protected parseRecord(record: Record): Car {
        const data = record as any;
        const result = new Car(
            data.id,
            data.make,
            data.model,
            Number(data.rentalPrice),
            (data.rentedTo || null),
            CarBodyType[data.bodyType],
            Number(data.numberOfSeats),
            Transmission[data.transmission]
        );

        return result;
    }
}