import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { ADD_NEW_BTN } from "./util";
import { Editor } from "./views/Editor";
import { tr, td, button } from "./views/elementFactory";

const storage = new LocalStorage();
const carService = new CarService(storage);

const tbody = document.querySelector('tbody');
async function hidrate() {
    const cars = await carService.getAll();
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        const editBtn = button({}, 'Edit');
        editBtn.classList.add('action');
        editBtn.classList.add('edit');

        const deleteBtn = button({}, 'Delete');
        deleteBtn.classList.add('action');
        deleteBtn.classList.add('delete');

        const carRow = tr({},
            td({}, car.id),
            td({}, car.make),
            td({}, car.model),
            td({}, car.bodyType),
            td({}, car.numberOfSeats.toString()),
            td({}, car.transmission),
            td({}, `\$${car.rentalPrice}/day`),
            td({},
                editBtn,
                deleteBtn,
            ),
        );

        tbody.appendChild(carRow);
    }
}

hidrate();

const newCarForm = new Editor(ADD_NEW_BTN, 'new-car', onSubmit);
newCarForm.displayForm();

async function onSubmit(data) {

    const car = await carService.create(data);

    console.log(car);

    const editBtn = button({}, 'Edit');
    editBtn.classList.add('action');
    editBtn.classList.add('edit');

    const deleteBtn = button({}, 'Delete');
    deleteBtn.classList.add('action');
    deleteBtn.classList.add('delete');

    const carRow = tr({},
        td({}, car.id),
        td({}, car.make),
        td({}, car.model),
        td({}, car.bodyType),
        td({}, car.numberOfSeats.toString()),
        td({}, car.transmission),
        td({}, `\$${car.rentalPrice}/day`),
        td({},
            editBtn,
            deleteBtn,
        ),
    );
    tbody.appendChild(carRow);

}