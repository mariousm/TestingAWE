// IMPORTACIONES
import { Root } from "./Root";
import { Click } from "../interfaces/Click";

export class A extends Root implements Click {
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para pulsar un botón
    async click() {
        return await this.getClient().click(this.id).pause(1000);
    }

    // Método para realizar doble click
    async doubleClick() {
        return await this.getClient().doubleClick(this.id).pause(1000);
    }

    // Método para realizar click con el botón derecho del ratón
    async rightClick() {
        return await this.getClient().rightClick(this.id).pause(1000);
    }
}
