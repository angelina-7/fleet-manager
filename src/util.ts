import { Car, Truck, Vehicle } from "./data/models";
import { button, td, tr, a } from "./views/elementFactory";

export function generateId(): string {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16))
}

export function hidrate(tbody: HTMLTableSectionElement, data: Vehicle[], index = false) {
    for (let i = 0; i < data.length; i++) {
        let vehicle = data[i];

        let vehicleRow;

        if (!index) {
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
            vehicleRow = tr({},
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
        } else {
            let vehicleType;
            if (vehicle instanceof Car) {
                vehicleType = 'Car';
            } else if (vehicle instanceof Truck) {
                vehicleType = 'Truck';
            }
            vehicleRow = tr({},
                td({}, vehicle.id),
                td({}, vehicleType),
                td({}, vehicle.make),
                td({}, vehicle.model),
                td({}, `\$${vehicle.rentalPrice}/day`),
                td({}, `${vehicle.rentedTo ? 'Rented' : 'Available'}`),
                td({}, a({ href: `details.html?${vehicleType}=${vehicle.id}` }, 'Show Details'))
            );
        }

        vehicleRow.id = vehicle.id;

        tbody.appendChild(vehicleRow);
    }
}