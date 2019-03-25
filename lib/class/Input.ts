// IMPORTACIONES
import { Root } from "./Root";

export class Input extends Root{
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para establecer un valor
    async setValue(value: string) {
        return await this.getClient().setValue(this.id, value);
    }
}
