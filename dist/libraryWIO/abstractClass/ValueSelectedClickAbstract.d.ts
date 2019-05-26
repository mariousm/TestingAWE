/// <reference types="webdriverio" />
import { Root } from "../class/Root";
import { Value } from "../interfaces/Value";
import { Selected } from "../interfaces/Selected";
import { Click } from "../interfaces/Click";
export declare abstract class ValueSelectedClickAbstract extends Root implements Value, Selected, Click {
    addValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    setValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    clearValue(): Promise<WebdriverIO.RawResult<null> | undefined>;
    getValue(): Promise<string | undefined>;
    checkValue(value: string): Promise<boolean | undefined>;
    isSelected(): Promise<boolean | undefined>;
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
