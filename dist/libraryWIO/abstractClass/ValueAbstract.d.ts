/// <reference types="webdriverio" />
import { Root } from "../class/Root";
import { Value } from "../interfaces/Value";
export declare abstract class ValueAbstract extends Root implements Value {
    addValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    setValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    clearValue(): Promise<WebdriverIO.RawResult<null> | undefined>;
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
}
