// Interfaz para las clases que usan addValue, clearValue, getValue

export interface Value {

    addValue(value: string): any;
    setValue(value: string): any;
    clearValue(): any;
    getValue(): any;

}