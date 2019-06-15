import { Root } from "../class/Root";
import { IClick } from "../interfaces/IClick";
import { IValue } from "../interfaces/IValue";
export declare abstract class ValueClickAbstract extends Root implements IValue, IClick {
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
