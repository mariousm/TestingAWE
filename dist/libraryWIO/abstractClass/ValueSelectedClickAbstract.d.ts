/// <reference types="webdriverio" />
import { Root } from "../class/Root";
import { IValue } from "../interfaces/IValue";
import { ISelected } from "../interfaces/ISelected";
import { IClick } from "../interfaces/IClick";
export declare abstract class ValueSelectedClickAbstract extends Root implements IValue, ISelected, IClick {
    clearValue(): Promise<WebdriverIO.RawResult<null> | undefined>;
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
    isSelected(): Promise<boolean | undefined>;
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
