// IMPORTACIONES
import { Root } from "../class/Root";
import { Value } from "../interfaces/Value";
import { Selected } from "../interfaces/Selected";

export abstract class ValueSelectedAbstract extends Root implements Value, Selected {

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

    // Método para limpiar el valor
    async clearValue() {
        try {
            return await this.getClient().clearElement(this.id);
        } catch (error) {
            console.log(error);
        }
    }

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

    // Devuelve verdadero si una Opcion o un Input es seleccionado
    async isSelected() {
        try {
            return await this.getClient().isSelected(this.id);
        } catch (error) {
            console.log(error);
        }

    }

}