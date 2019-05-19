/// <reference types="webdriverio" />
import { Root } from "./Root";
export declare class Input extends Root {
    constructor(id: string);
    setValue(value: string): Promise<WebdriverIO.RawResult<null>>;
}
