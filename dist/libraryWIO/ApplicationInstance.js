"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spectron_1 = require("spectron");
const path_1 = require("path");
class ApplicationInstance {
    // CONSTRUCTOR
    constructor(nameProject) {
        this.app = new spectron_1.Application({
            path: path_1.join(__dirname, "..", "..", "node_modules", "electron", "dist", "electron.exe"),
            args: [path_1.join(__dirname, "..", "..", "..", "..", "..", nameProject)]
        });
    }
    static getInstance(nameProject) {
        if (this._instance) {
            return this._instance;
        }
        else {
            this._nameProject = nameProject;
            this._instance = new this(nameProject);
            return this._instance;
        }
    }
    // MÉTODOS
    startApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.start().then((startApp) => {
                this.client = startApp.client;
            });
        });
    }
    stopApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.app && this.app.isRunning()) {
                return this.app.stop();
            }
        });
    }
    getClient() {
        return this.client;
    }
    static getNameProject() {
        return this._nameProject;
    }
    // Guardar una captura de pantalla de una elmento a un archivo PNG
    saveScreenhot(selector, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().$(selector).saveScreenshot(filename);
        });
    }
}
ApplicationInstance._nameProject = "";
exports.ApplicationInstance = ApplicationInstance;
