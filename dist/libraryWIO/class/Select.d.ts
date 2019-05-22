/// <reference types="webdriverio" />
import { ValueAbstract } from "../abstractClass/ValueAbstract";
export declare class Select extends ValueAbstract {
    constructor(id: string);
    selectByIndex(index: number): Promise<WebdriverIO.RawResult<null> | undefined>;
    selectByVisibleText(text: string): Promise<WebdriverIO.RawResult<null> | undefined>;
}
