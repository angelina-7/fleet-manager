import { ADD_NEW_BTN } from "./util";
import { Editor } from "./views/Editor";

const newTruckForm = new Editor(ADD_NEW_BTN, 'new-truck', onSubmit);
newTruckForm.displayForm();

function onSubmit(data) {
    console.log(data);
    
}