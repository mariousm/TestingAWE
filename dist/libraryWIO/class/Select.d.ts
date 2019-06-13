/// <reference types="webdriverio" />
import { ValueClickAbstract } from "../abstractClass/ValueClickAbstract";
export declare class Select extends ValueClickAbstract {
    constructor(id: string);
    selectByIndex(index: number): Promise<WebdriverIO.RawResult<null> | undefined>;
    selectByVisibleText(text: string): Promise<WebdriverIO.RawResult<null> | undefined>;
}
