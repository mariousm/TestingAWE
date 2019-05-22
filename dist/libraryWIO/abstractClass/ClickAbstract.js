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
// IMPORTACIONES
const Root_1 = require("../class/Root");
class ClickAbstract extends Root_1.Root {
    // Método para pulsar un botón
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().click(this.id).pause(1000);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Método para realizar doble click
    doubleClick() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().doubleClick(this.id).pause(1000);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Método para realizar click con el botón derecho del ratón
    rightClick() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().rightClick(this.id).pause(1000);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ClickAbstract = ClickAbstract;
