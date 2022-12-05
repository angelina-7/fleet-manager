import { CarService } from "./data/CarService";
import { LocalStorage } from "./data/LocalStorage";
import { ADD_NEW_BTN } from "./util";
import { Editor } from "./views/Editor";
import { tr, td, button } from "./views/elementFactory";

const storage = new LocalStorage();
const carService = new CarService(storage);

const tbody = document.querySelector('tbody');
const newCarForm = new Editor(ADD_NEW_BTN, 'new-car', onSubmit);
newCarForm.displayForm();

async function onSubmit(data) {
    if (Object.values(data).every(x => x)) {
        const car = await carService.create(data);

        console.log(car);
        
        let carRow = tr( {},
            td({}, car.id),
            td({}, car.make),
            td({}, car.model),
            td({}, car.bodyType),
            td({}, car.numberOfSeats.toString()),
            td({}, car.transmission),
            td({}, car.rentalPrice.toString()),
            td({}, 
                button({}, 'Edit'),
                button({}, 'Delete'),
                ),
            );
        tbody.appendChild(carRow);
    }

}
// <tr>
//     <td>0076-5b58</td>
//     <td>Opel</td>
//     <td>Corsa</td>
//     <td>Hatchback</td>
//     <td>4</td>
//     <td>Manual</td>
//     <td>$55/day</td>
//     <td>
//         <button class="action edit">Edit</button>
//         <button class="action delete">Delete</button>
//     </td>
// </tr>