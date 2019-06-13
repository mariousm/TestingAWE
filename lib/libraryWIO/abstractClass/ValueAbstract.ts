// IMPORTACIONES
import { Root } from "../class/Root";

export abstract class ValueAbstract extends Root {

    // Método para obtener el valor
    async getValue() {
        try {
            return await this.getClient().getValue(this.id);
        } catch (error) {
            console.log(error);
        }
    }

    // Método para chequear que es correcto el valor
    async checkValue(value: string) {
        try {

            let check: boolean = false;
            let valor = await this.getValue();

            if (valor === value) {
                check = true;
            }

            return check;

        } catch (error) {
            console.log(error);
        }
    }

}
