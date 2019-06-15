/// <reference types="webdriverio" />
import { ValueSelectedClickAbstract } from "../abstractClass/ValueSelectedClickAbstract";
export declare class Input extends ValueSelectedClickAbstract {
    constructor(id: string);
    addValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
    setValue(value: string): Promise<WebdriverIO.RawResult<null> | undefined>;
}
