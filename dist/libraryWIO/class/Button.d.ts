import { Root } from "./Root";
import { Click } from "../interfaces/Click";
export declare class Button extends Root implements Click {
    constructor(id: string);
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
