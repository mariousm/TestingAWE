import { Root } from "../class/Root";
import { Selected } from "../interfaces/Selected";
import { Click } from "../interfaces/Click";
export declare abstract class SelectedClickAbstract extends Root implements Selected, Click {
    isSelected(): Promise<boolean | undefined>;
    click(): Promise<void>;
    doubleClick(): Promise<void>;
    rightClick(): Promise<void>;
}
