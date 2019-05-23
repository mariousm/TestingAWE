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
const Root_1 = require("./Root");
class Datalist extends Root_1.Root {
    // ATRIBUTOS
    // CONSTRUCTOR
    constructor(id) {
        super(id);
    }
    // MÉTODOS
    // Seleccionar una opción a partir del index
    selectByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().selectByIndex(this.id, index);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Seleccionar una opción a partir del texto
    selectByVisibleText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().selectByVisibleText(this.id, text);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Datalist = Datalist;
