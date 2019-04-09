import { Application, SpectronClient } from 'spectron';
import { join } from "path";

export class ApplicationInstance {

    private static _instance: ApplicationInstance;

    // ATRIBUTOS
    private app: Application;
    private client !: SpectronClient;

    // CONSTRUCTOR
    private constructor() {
        this.app = new Application({
            path: join(__dirname, "..", "..", "node_modules", "electron","dist","electron.exe"),
            args: [join(__dirname, "../../../../../tour-of-heroes")]
        });
    }

    public static getInstance(): ApplicationInstance {
        if (this._instance) {
            //console.log("instancia creada");
            return this._instance;
        } else {
            //console.log("instancia nueva");
            this._instance = new this();
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
}