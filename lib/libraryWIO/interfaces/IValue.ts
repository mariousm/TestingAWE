// Interfaz para las clases que usan addValue, clearValue, getValue

export interface IValue {

    getValue(): any;
    checkValue(value: string): any;

}