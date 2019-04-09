// IMPORTACIONES
import { Root } from "./Root";

export class Ul extends Root{
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Método para obtener el número de elementos
    async getCount(selector : string) {
        if (selector.length !== 0) {
            return await this.getClient().elements(selector).then((res) => {
                return res.value.length;
            });
        }
        return await this.getClient().elements(this.id).then((res) => {
            return res.value.length;
        });
    }
}
