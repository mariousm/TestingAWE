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
class Ul extends Root_1.Root {
    // ATRIBUTOS
    // CONSTRUCTOR
    constructor(id) {
        super(id);
    }
    // MÉTODOS
    // Método para obtener el número de elementos
    getCount(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (selector.length !== 0) {
                return yield this.getClient().elements(selector).then((res) => {
                    return res.value.length;
                });
            }
            return yield this.getClient().elements(this.id).then((res) => {
                return res.value.length;
            });
        });
    }
}
exports.Ul = Ul;
