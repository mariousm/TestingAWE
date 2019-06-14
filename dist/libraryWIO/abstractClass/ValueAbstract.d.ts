import { Root } from "../class/Root";
import { IValue } from "../interfaces/IValue";
export declare abstract class ValueAbstract extends Root implements IValue {
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
}
