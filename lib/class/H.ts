// IMPORTACIONES
import { Root } from "./Root";

export class H extends Root{
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para obtener el texto
    async getText() {
        return await this.getClient().getText(this.id);
    }
}
