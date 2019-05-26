import { Root } from "../class/Root";
import { Selected } from "../interfaces/Selected";
export declare abstract class SelectedAbstract extends Root implements Selected {
    isSelected(): Promise<boolean | undefined>;
}
