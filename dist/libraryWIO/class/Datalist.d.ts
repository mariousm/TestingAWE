/// <reference types="webdriverio" />
import { Root } from "./Root";
export declare class Datalist extends Root {
    constructor(id: string);
    selectByIndex(index: number): Promise<WebdriverIO.RawResult<null> | undefined>;
    selectByVisibleText(text: string): Promise<WebdriverIO.RawResult<null> | undefined>;
}
