// IMPORTACIONES
import { Root } from "../class/Root";
import { Selected } from "../interfaces/Selected";
import { Click } from "../interfaces/Click";

export abstract class SelectedClickAbstract extends Root implements Selected, Click {

    // Devuelve verdadero si una Opcion o un Input es seleccionado
    async isSelected() {
        try {
            return await this.getClient().isSelected(this.id);
        } catch (error) {
            console.log(error);
        }
    }

    // Método para pulsar un botón
    async click() {
        try {
            return await this.getClient().click(this.id).pause(1000);
        } catch (error) {
            console.log(error);
        }
    }

    // Método para realizar doble click
    async doubleClick() {
        try {
            return await this.getClient().doubleClick(this.id).pause(1000);
        } catch (error) {
            console.log(error);
        }
    }

    // Método para realizar click con el botón derecho del ratón
    async rightClick() {
        try {
            return await this.getClient().rightClick(this.id).pause(1000);
        } catch (error) {
            console.log(error);
        }
    }
}
