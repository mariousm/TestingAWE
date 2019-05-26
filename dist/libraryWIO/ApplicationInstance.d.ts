/// <reference types="node" />
import { Application, SpectronClient } from 'spectron';
export declare class ApplicationInstance {
    private static _instance;
    private app;
    private client;
    private static _nameProject;
    private constructor();
    static getInstance(nameProject: string): ApplicationInstance;
    startApplication(): Promise<void>;
    stopApplication(): Promise<Application | undefined>;
    getClient(): SpectronClient;
    static getNameProject(): string;
    saveScreenhot(selector: string, filename: string): Promise<Buffer>;
}
