import { Root } from "../class/Root";
import { IClick } from "../interfaces/IClick";
export declare abstract class ClickAbstract extends Root implements IClick {
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
