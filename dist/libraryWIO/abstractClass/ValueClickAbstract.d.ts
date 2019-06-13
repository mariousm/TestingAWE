import { Root } from "../class/Root";
import { Click } from "../interfaces/Click";
export declare abstract class ValueClickAbstract extends Root implements Click {
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
