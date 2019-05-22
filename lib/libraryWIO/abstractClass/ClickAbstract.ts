// IMPORTACIONES
import { Root } from "../class/Root";
import { Click } from "../interfaces/Click";

export abstract class ClickAbstract extends Root implements Click {

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