import { ADD_NEW_BTN } from "./util";
import { Editor } from "./views/Editor";

const newCarForm = new Editor(ADD_NEW_BTN, 'new-car');
newCarForm.displayForm();