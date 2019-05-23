// IMPORTACIONES
import { ClickAbstract } from "../abstractClass/ClickAbstract";

export class Select extends ClickAbstract {
    // ATRIBUTOS

    // CONSTRUCTOR
    constructor(id: string) {
        super(id)
    }

    // MÉTODOS

    // Seleccionar una opción a partir del index
    async selectByIndex(index: number) {
        try {
            return await this.getClient().selectByIndex(this.id, index);

        } catch (error) {
            console.log(error);
        }
    }

    // Seleccionar una opción a partir del texto
    async selectByVisibleText(text: string) {
        try {
            return await this.getClient().selectByVisibleText(this.id, text);

        } catch (error) {
            console.log(error);
        }
    }
}
