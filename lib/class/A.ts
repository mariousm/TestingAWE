// IMPORTACIONES
import { Root } from "./Root";

export class A extends Root{
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
}
