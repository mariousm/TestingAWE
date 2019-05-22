import { Root } from "../class/Root";
import { Click } from "../interfaces/Click";
export declare abstract class ClickAbstract extends Root implements Click {
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
