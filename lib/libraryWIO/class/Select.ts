// IMPORTACIONES
import { Root } from "./Root";
import { Value } from "../interfaces/Value";

export class Select extends Root implements Value {
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para establecer un valor
    async addValue(value: string) {
        return await this.getClient().addValue(this.id, value);
    }

    // Método para establecer un valor (borra lo que había)
    async setValue(value: string) {
        return await this.getClient().setValue(this.id, value);
    }

    // Método para limpiar el valor
    async clearValue() {
        return await this.getClient().clearElement(this.id);
    }

    // Método para obtener el valor
    async getValue() {
        return await this.getClient().getValue(this.id);
    }
}
