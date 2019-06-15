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
const ValueSelectedClickAbstract_1 = require("../abstractClass/ValueSelectedClickAbstract");
class Input extends ValueSelectedClickAbstract_1.ValueSelectedClickAbstract {
    // ATRIBUTOS
    // CONSTRUCTOR
    constructor(id) {
        super(id);
    }
    // MÉTODOS
    // Método para establecer un valor
    addValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().addValue(this.id, value);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Método para establecer un valor (borra lo que había)
    setValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getClient().setValue(this.id, value);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Input = Input;
