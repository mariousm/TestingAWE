// IMPORTACIONES
import { Root } from "../class/Root";
import { Selected } from "../interfaces/Selected";

export abstract class SelectedAbstract extends Root implements Selected {

    // Devuelve verdadero si una Opcion o un Input es seleccionado
    async isSelected() {
        try {
            return await this.getClient().isSelected(this.id);
        } catch (error) {
            console.log(error);
        }
    }

}
