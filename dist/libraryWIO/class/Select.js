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
class Select extends Root_1.Root {
    // ATRIBUTOS
    // CONSTRUCTOR
    constructor(id) {
        super(id);
    }
    // MÉTODOS
    // Método para establecer un valor
    addValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().addValue(this.id, value);
        });
    }
    // Método para establecer un valor (borra lo que había)
    setValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().setValue(this.id, value);
        });
    }
    // Método para limpiar el valor
    clearValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().clearElement(this.id);
        });
    }
    // Método para obtener el valor
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient().getValue(this.id);
        });
    }
}
exports.Select = Select;
