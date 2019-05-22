import { Application, SpectronClient } from 'spectron';
import { join } from "path";

export class ApplicationInstance {

    private static _instance: ApplicationInstance;

    // ATRIBUTOS
    private app: Application;
    private client !: SpectronClient;
    private static _nameProject: string = "";

    // CONSTRUCTOR
    private constructor(nameProject: string) {
        this.app = new Application({
            path: join(__dirname, "..", "..", "node_modules", "electron", "dist", "electron.exe"),
            args: [join(__dirname, "..", "..", "..", "..", "..", nameProject)]
        });
    }

    public static getInstance(nameProject: string): ApplicationInstance {
        if (this._instance) {
            return this._instance;
        } else {
            this._nameProject = nameProject;
            this._instance = new this(nameProject);
            return this._instance
        }
    }

    // MÉTODOS
    public async startApplication() {
        await this.app.start().then((startApp) => {
            this.client = startApp.client;
        });
    }

    public async stopApplication() {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    }

    public getClient(): SpectronClient {
        return this.client;
    }

    public static getNameProject(): string {
        return this._nameProject;
    }

    // Guardar una captura de pantalla de una elmento a un archivo PNG
    async saveScreenhot(selector: string, filename: string) {
        return await this.getClient().$(selector).saveScreenshot(filename);
    }
}