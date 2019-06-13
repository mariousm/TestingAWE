import { Root } from "../class/Root";
export declare abstract class ValueAbstract extends Root {
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
}
