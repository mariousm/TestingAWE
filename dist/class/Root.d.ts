/// <reference types="webdriverio" />
import { SpectronClient } from 'spectron';
export declare abstract class Root {
    protected id: string;
    constructor(id: string);
    getClient(): SpectronClient;
    getSelector(): string;
    getAttribute(attribute: string): Promise<string & null>;
    getHTML(includeSelectorTag?: boolean): Promise<string>;
    getLocation(axis?: string): Promise<WebdriverIO.Position>;
    getTagName(): Promise<string>;
    getElementSize(prop?: string): Promise<number>;
    getValue(): Promise<string>;
    isEnabled(): Promise<boolean>;
    isVisible(): Promise<boolean>;
    isExisting(): Promise<boolean>;
}
