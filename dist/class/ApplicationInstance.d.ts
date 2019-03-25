import { Application, SpectronClient } from 'spectron';
export declare class ApplicationInstance {
    private static _instance;
    private app;
    private client;
    private constructor();
    static getInstance(): ApplicationInstance;
    startApplication(): Promise<void>;
    stopApplication(): Promise<Application | undefined>;
    getClient(): SpectronClient;
}
