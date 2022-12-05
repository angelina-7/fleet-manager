import { Car, Truck, Vehicle } from "./data/models";
import { button, td, tr } from "./views/elementFactory";

export const ADD_NEW_BTN = '.new';

export function generateId(): string {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16))
}

export function hidrate(tbody: HTMLTableSectionElement, data: Vehicle[]) {
    for (let i = 0; i < data.length; i++) {
        let vehicle = data[i];

        const editBtn = button({}, 'Edit');
        editBtn.classList.add('action');
        editBtn.classList.add('edit');

        const deleteBtn = button({}, 'Delete');
        deleteBtn.classList.add('action');
        deleteBtn.classList.add('delete');

        let fragment = document.createDocumentFragment()
        if (vehicle instanceof Car) {
            fragment.append(
                td({}, vehicle.bodyType),
                td({}, vehicle.numberOfSeats.toString()),
                td({}, vehicle.transmission),
            );

        } else if (vehicle instanceof Truck) {
            fragment.append(
                td({}, vehicle.cargoType),
                td({}, `${vehicle.capacity} tons`),
            );
        }

        const vehicleRow = tr({},
            td({}, vehicle.id),
            td({}, vehicle.make),
            td({}, vehicle.model),
            fragment,
            td({}, `\$${vehicle.rentalPrice}/day`),
            td({},
                editBtn,
                deleteBtn,
            )
        );

        tbody.appendChild(vehicleRow);
    }
}