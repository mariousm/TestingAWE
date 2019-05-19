import { Root } from "./Root";
export declare class Div extends Root {
    constructor(id: string);
    getCount(selector: string): Promise<number>;
}
