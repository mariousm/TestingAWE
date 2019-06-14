// IMPORTACIONES
import { ValueSelectedClickAbstract } from "../abstractClass/ValueSelectedClickAbstract";

export class Input extends ValueSelectedClickAbstract {
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para establecer un valor
    async addValue(value: string) {
        try {
            return await this.getClient().addValue(this.id, value);
        } catch (error) {
            console.log(error);
        }
    }

    // Método para establecer un valor (borra lo que había)
    async setValue(value: string) {
        try {
            return await this.getClient().setValue(this.id, value);
        } catch (error) {
            console.log(error);
        }
    }
}
