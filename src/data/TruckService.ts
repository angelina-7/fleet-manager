import { Truck, TruckCargoType } from "./models";
import { DataService } from "./Service";
import { Record } from "./Storage";

type TruckData = {
    make: string,
    model: string,
    rentalPrice: number,
    cargoType: TruckCargoType,
    capacity: number,
}

export class TruckService extends DataService<Truck, TruckData>{
    protected name = 'truck';
    
    protected validate(data: TruckData): void {
        if (typeof data.make != 'string') {
            throw new TypeError('Invalid data for "make"')
        }
        if (typeof data.model != 'string') {
            throw new TypeError('Invalid data for "model"')
        }
        if (isNaN(data.rentalPrice)) {
            throw new TypeError('Invalid data for "rental price"')
        }
        if (typeof data.cargoType != 'string' || (data.cargoType != TruckCargoType.box.toLowerCase() && data.cargoType != TruckCargoType.flatbed.toLowerCase() && data.cargoType != TruckCargoType.van.toLowerCase())) {
            throw new TypeError('Invalid data for "cargo type"')
        }
        if (isNaN(data.capacity)) {
            throw new TypeError('Invalid data for "capacity"')
        }
    }

    protected parseRecord(record: Record): Truck {
        const data = record as any;
        const result = new Truck(
            data.id,
            data.make,
            data.model,
            Number(data.rentalPrice),
            (data.rentedTo || null),
            TruckCargoType[data.cargoType],
            Number(data.capacity)
        );

        return result;
    }
}