/// <reference types="webdriverio" />
import { ClickAbstract } from "../abstractClass/ClickAbstract";
export declare class Select extends ClickAbstract {
    constructor(id: string);
    selectByIndex(index: number): Promise<WebdriverIO.RawResult<null> | undefined>;
    selectByVisibleText(text: string): Promise<WebdriverIO.RawResult<null> | undefined>;
}
