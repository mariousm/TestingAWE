/// <reference types="webdriverio" />
import { Root } from "../class/Root";
import { Value } from "../interfaces/Value";
import { Selected } from "../interfaces/Selected";
export declare abstract class ValueSelectedAbstract extends Root implements Value, Selected {
    addValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    setValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    clearValue(): Promise<WebdriverIO.RawResult<null> | undefined>;
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
    isSelected(): Promise<boolean | undefined>;
}
