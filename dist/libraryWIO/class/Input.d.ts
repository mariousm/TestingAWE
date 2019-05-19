/// <reference types="webdriverio" />
import { Root } from "./Root";
import { Value } from "../interfaces/Value";
export declare class Input extends Root implements Value {
    constructor(id: string);
    addValue(value: string): Promise<WebdriverIO.RawResult<null>>;
    setValue(value: string): Promise<WebdriverIO.RawResult<null>>;
    clearValue(): Promise<WebdriverIO.RawResult<null>>;
    getValue(): Promise<string>;
}
